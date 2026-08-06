<?php

namespace App\Http\Controllers\Api;

use App\Enums\AttendanceStatus;
use App\Enums\AttendanceType;
use App\Enums\LeaveStatus;
use App\Enums\LeaveType;
use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\LeaveRequest;
use App\Models\Office;
use App\Models\User;
use App\Models\UserProfile;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class SimpegIntegrationController extends Controller
{
    /**
     * INBOUND: Synchronize Master Data (Users, OPD, Unit Kerja, Profiles) from SIMPEG to SIMPATI.
     */
    public function syncMasterData(Request $request): JsonResponse
    {
        $data = $request->validate([
            'offices' => 'nullable|array',
            'offices.*.id' => 'required',
            'offices.*.name' => 'required|string',
            'offices.*.opd_name' => 'required|string',
            'offices.*.latitude' => 'nullable|numeric',
            'offices.*.longitude' => 'nullable|numeric',
            'offices.*.radius_meters' => 'nullable|integer',

            'users' => 'nullable|array',
            'users.*.nip' => 'required|string',
            'users.*.name' => 'required|string',
            'users.*.email' => 'nullable|email',
            'users.*.office_id' => 'nullable',
            'users.*.jabatan' => 'nullable|string',
            'users.*.unit_kerja' => 'nullable|string',
            'users.*.pangkat_golongan' => 'nullable|string',
            'users.*.is_active' => 'nullable|boolean',
        ]);

        $syncedOffices = 0;
        $syncedUsers = 0;

        // 1. Sync Offices / OPD
        if (! empty($data['offices'])) {
            foreach ($data['offices'] as $o) {
                Office::updateOrCreate(
                    ['id' => $o['id']],
                    [
                        'name' => $o['name'],
                        'opd_name' => $o['opd_name'],
                        'latitude' => $o['latitude'] ?? -4.3422,
                        'longitude' => $o['longitude'] ?? 120.0123,
                        'radius_meters' => $o['radius_meters'] ?? 150,
                        'is_active' => true,
                    ]
                );
                $syncedOffices++;
            }
        }

        // 2. Sync Users & Profiles
        if (! empty($data['users'])) {
            foreach ($data['users'] as $u) {
                $user = User::updateOrCreate(
                    ['nip' => $u['nip']],
                    [
                        'name' => $u['name'],
                        'email' => $u['email'] ?? strtolower($u['nip']).'@soppengkab.go.id',
                        'password' => Hash::make($u['password'] ?? 'password123'),
                        'office_id' => $u['office_id'] ?? null,
                        'role_id' => 1, // Default ASN
                        'is_active' => $u['is_active'] ?? true,
                    ]
                );

                UserProfile::updateOrCreate(
                    ['user_id' => $user->id],
                    [
                        'jabatan' => $u['jabatan'] ?? 'Aparatur Sipil Negara',
                        'unit_kerja' => $u['unit_kerja'] ?? 'Utama',
                        'pangkat_golongan' => $u['pangkat_golongan'] ?? null,
                    ]
                );

                $syncedUsers++;
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Sinkronisasi Master Data dari SIMPEG berhasil!',
            'synced' => [
                'offices' => $syncedOffices,
                'users' => $syncedUsers,
            ],
        ]);
    }

    /**
     * OUTBOUND: Provide Monthly Attendance & TPP Recap Data from SIMPATI to SIMPEG.
     */
    public function getRecapForSimpeg(Request $request): JsonResponse
    {
        $year = (int) $request->input('year', now()->year);
        $month = (int) $request->input('month', now()->month);
        $nip = $request->input('nip');
        $officeId = $request->input('opd_id');

        $startOfMonth = Carbon::createFromDate($year, $month, 1);
        $endOfMonth = $startOfMonth->copy()->endOfMonth();

        // Calculate working days
        $workingDays = 0;
        $cursor = $startOfMonth->copy();
        while ($cursor->lte($endOfMonth)) {
            if ($cursor->isWeekday()) {
                $workingDays++;
            }
            $cursor->addDay();
        }

        $userQuery = User::with(['profile', 'office'])->where('is_active', true);
        if ($nip) {
            $userQuery->where('nip', $nip);
        }
        if ($officeId) {
            $userQuery->where('office_id', $officeId);
        }
        $users = $userQuery->get();

        $attendances = Attendance::whereYear('tanggal', $year)
            ->whereMonth('tanggal', $month)
            ->get()
            ->groupBy('user_id');

        $leaveRequests = LeaveRequest::where('status', LeaveStatus::DISETUJUI->value)
            ->where(function ($q) use ($startOfMonth, $endOfMonth) {
                $q->whereBetween('tanggal_mulai', [$startOfMonth, $endOfMonth])
                    ->orWhereBetween('tanggal_selesai', [$startOfMonth, $endOfMonth]);
            })
            ->get()
            ->groupBy('user_id');

        $result = [];

        foreach ($users as $user) {
            $userAtts = $attendances->get($user->id, collect());
            $userLeaves = $leaveRequests->get($user->id, collect());

            $hadirDays = $userAtts->whereIn('jenis', [AttendanceType::MASUK, AttendanceType::WFH])
                ->pluck('tanggal')
                ->map(fn ($d) => $d instanceof Carbon ? $d->toDateString() : (string) $d)
                ->unique()
                ->count();

            $terlambatCount = $userAtts->whereIn('status', [AttendanceStatus::TERLAMBAT, AttendanceStatus::SANGAT_TERLAMBAT])->count();
            $pswCount = $userAtts->where('status', AttendanceStatus::PULANG_CEPAT)->count();

            $sakitDays = 0;
            $cutiDays = 0;
            $dlDays = 0;

            foreach ($userLeaves as $leave) {
                $leaveStart = $leave->tanggal_mulai->max($startOfMonth);
                $leaveEnd = $leave->tanggal_selesai->min($endOfMonth);
                $days = $leaveStart->diffInDays($leaveEnd) + 1;

                $type = $leave->type instanceof LeaveType ? $leave->type : LeaveType::tryFrom($leave->type);
                match ($type) {
                    LeaveType::SAKIT => $sakitDays += $days,
                    LeaveType::CUTI => $cutiDays += $days,
                    LeaveType::DINAS_LUAR, LeaveType::DINAS_DALAM => $dlDays += $days,
                    default => null,
                };
            }

            $tkDays = max(0, $workingDays - $hadirDays - $sakitDays - $cutiDays - $dlDays);

            // Calculate TPP deduction percentage
            $potonganTerlambat = $terlambatCount * 1.5;
            $potonganPsw = $pswCount * 1.5;
            $potonganTk = $tkDays * 5.0;
            $totalPotonganTpp = min(100.0, $potonganTerlambat + $potonganPsw + $potonganTk);

            $result[] = [
                'nip' => $user->profile?->nip ?? $user->nip,
                'nama' => $user->name,
                'opd_id' => $user->office_id,
                'opd_name' => $user->office?->opd_name ?? '-',
                'unit_kerja' => $user->profile?->unit_kerja ?? 'Utama',
                'jabatan' => $user->profile?->jabatan ?? '-',
                'periode' => [
                    'bulan' => $month,
                    'tahun' => $year,
                    'hari_kerja_efektif' => $workingDays,
                ],
                'rekap_presensi' => [
                    'hadir' => $hadirDays,
                    'terlambat' => $terlambatCount,
                    'pulang_sebelum_waktu' => $pswCount,
                    'tanpa_keterangan' => $tkDays,
                    'sakit' => $sakitDays,
                    'cuti' => $cutiDays,
                    'dinas' => $dlDays,
                ],
                'kalkulasi_tpp' => [
                    'persen_potongan_tpp' => $totalPotonganTpp,
                    'persen_capaian_tpp' => max(0, 100.0 - $totalPotonganTpp),
                ],
            ];
        }

        return response()->json([
            'success' => true,
            'message' => 'Data rekapitulasi presensi SIMPATI untuk SIMPEG berhasil diambil',
            'data' => $result,
        ]);
    }
}
