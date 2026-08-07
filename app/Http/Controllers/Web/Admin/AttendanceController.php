<?php

namespace App\Http\Controllers\Web\Admin;

use App\Enums\AttendanceStatus;
use App\Enums\AttendanceType;
use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\Office;
use App\Models\Setting;
use App\Models\User;
use App\Models\UserProfile;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    public function index(Request $request)
    {
        $year = (int) $request->input('year', now()->year);
        $month = (int) $request->input('month', now()->month);

        $query = Attendance::with(['user.office', 'user.profile'])
            ->latest('waktu')
            ->whereYear('tanggal', $year)
            ->whereMonth('tanggal', $month);

        if ($request->filled('opd')) {
            $query->filterByOpd($request->opd);
        }

        if ($request->filled('unit_kerja')) {
            $query->filterByUnitKerja($request->unit_kerja);
        }

        if ($request->filled('jenis') && $request->jenis !== 'all') {
            $query->where('jenis', $request->jenis);
        }

        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->whereHas('user', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('nip', 'like', "%{$search}%");
            });
        }

        $atts = $query->paginate(20)->withQueryString()->through(function ($att) {
            return [
                'id' => $att->id,
                'tanggal' => $att->tanggal ? $att->tanggal->translatedFormat('d F Y') : '-',
                'waktu' => $att->waktu ? $att->waktu->format('H:i') : '--:--',
                'name' => $att->user->name ?? '-',
                'nip' => $att->user->profile?->nip ?? $att->user->nip ?? '-',
                'opd' => $att->user->office->opd_name ?? '-',
                'unit_kerja' => $att->user->profile?->unit_kerja ?? $att->user->office->name ?? '-',
                'jenis' => $att->jenis->value ?? $att->jenis,
                'status' => $att->status->value ?? $att->status,
                'latitude' => $att->latitude,
                'longitude' => $att->longitude,
            ];
        });

        // Summary stats calculation
        $baseQuery = Attendance::whereYear('tanggal', $year)->whereMonth('tanggal', $month);
        if ($request->filled('opd')) {
            $baseQuery->filterByOpd($request->opd);
        }

        $summary = [
            'total' => (clone $baseQuery)->count(),
            'tepat_waktu' => (clone $baseQuery)->where('status', AttendanceStatus::TEPAT_WAKTU)->count(),
            'terlambat' => (clone $baseQuery)->whereIn('status', [AttendanceStatus::TERLAMBAT, AttendanceStatus::SANGAT_TERLAMBAT])->count(),
            'masuk' => (clone $baseQuery)->where('jenis', AttendanceType::MASUK)->count(),
            'pulang' => (clone $baseQuery)->where('jenis', AttendanceType::PULANG)->count(),
        ];

        $unitKerjaList = UserProfile::whereNotNull('unit_kerja')
            ->distinct()
            ->pluck('unit_kerja')
            ->values();

        return inertia('Admin/Attendances', [
            'attendances' => $atts,
            'summary' => $summary,
            'offices' => Office::select('id', 'name', 'opd_name', 'parent_id')->get(),
            'unitKerjaList' => $unitKerjaList,
            'currentMonth' => $month,
            'currentYear' => $year,
            'filters' => $request->only(['month', 'year', 'opd', 'unit_kerja', 'jenis', 'status', 'search']),
        ]);
    }

    public function exportAttendances(Request $request)
    {
        $query = Attendance::with('user.office')->latest();

        if ($request->filled('month')) {
            $query->whereMonth('tanggal', $request->month);
        }
        if ($request->filled('year')) {
            $query->whereYear('tanggal', $request->year);
        }
        if ($request->filled('opd')) {
            $query->filterByOpd($request->opd);
        }
        if ($request->filled('unit_kerja')) {
            $query->filterByUnitKerja($request->unit_kerja);
        }

        $atts = $query->get();
        $filename = 'attendance_export_'.now()->format('Y-m-d_H-i-s').'.csv';

        $handle = fopen('php://temp', 'w+');
        fputcsv($handle, ['Tanggal', 'NIP', 'Nama', 'OPD', 'Jenis', 'Waktu', 'Status', 'Dalam Radius']);

        foreach ($atts as $att) {
            fputcsv($handle, [
                $att->tanggal ? $att->tanggal->translatedFormat('d F Y') : '-',
                $att->user->nip ?? '-',
                $att->user->name ?? '-',
                $att->user->office->opd_name ?? '-',
                $att->jenis->value ?? $att->jenis,
                $att->waktu ? $att->waktu->format('H:i:s') : '-',
                $att->status->value ?? $att->status,
                $att->in_radius ? 'Ya' : 'Tidak',
            ]);
        }

        rewind($handle);
        $content = stream_get_contents($handle);
        fclose($handle);

        return response($content)
            ->header('Content-Type', 'text/csv')
            ->header('Content-Disposition', "attachment; filename=\"$filename\"");
    }

    public function exportAttendanceRecap(Request $request)
    {
        $year = (int) $request->input('year', now()->year);
        $month = (int) $request->input('month', now()->month);
        $officeId = $request->input('opd');
        $type = $request->input('type');

        $query = Attendance::with(['user.office', 'user.profile'])->latest();
        $query->whereYear('tanggal', $year)->whereMonth('tanggal', $month);

        if ($officeId) {
            $query->filterByOpd($officeId);
        }

        if ($type) {
            $query->where('jenis', $type);
        }

        $atts = $query->get();

        $attendances = $atts->map(function ($att) {
            return [
                'tanggal' => $att->tanggal ? $att->tanggal->translatedFormat('d/m/Y') : '-',
                'nip' => $att->user->profile?->nip ?? $att->user->nip ?? '-',
                'name' => $att->user->name ?? '-',
                'opd' => $att->user->office->opd_name ?? '-',
                'jenis' => $att->jenis->value ?? $att->jenis,
                'waktu' => $att->waktu ? $att->waktu->format('H:i') : '--:--',
                'status' => $att->status->value ?? $att->status,
                'in_radius' => (bool) $att->in_radius,
            ];
        });

        $summaryData = [
            'total' => $attendances->count(),
            'tepat_waktu' => $attendances->where('status', 'tepat_waktu')->count(),
            'terlambat' => $attendances->whereIn('status', ['terlambat', 'sangat_terlambat'])->count(),
            'wfh' => $attendances->where('jenis', 'wfh')->count(),
            'dinas_luar' => $attendances->where('jenis', 'dinas_luar')->count(),
        ];

        $officeName = 'Semua OPD';
        if ($officeId) {
            $off = Office::find($officeId);
            if ($off) {
                $officeName = $off->opd_name;
            }
        }

        $monthName = Carbon::createFromDate($year, $month, 1)->translatedFormat('F Y');

        return response()->view('exports.attendance_recap', [
            'attendances' => $attendances,
            'summary' => $summaryData,
            'officeName' => $officeName,
            'monthName' => $monthName,
            'type' => $type,
        ]);
    }

    public function exportTppReport(Request $request)
    {
        $year = (int) $request->input('year', now()->year);
        $month = (int) $request->input('month', now()->month);
        $officeId = $request->input('opd');

        $usersQuery = User::with(['office', 'profile'])->where('is_active', true);
        if ($officeId) {
            $usersQuery->where('office_id', $officeId);
        }
        $users = $usersQuery->get();

        $potonganTerlambat = (float) Setting::get('potongan_terlambat', 1.0);
        $potonganSangatTerlambat = (float) Setting::get('potongan_sangat_terlambat', 2.5);
        $potonganPsw = (float) Setting::get('potongan_psw', 1.0);
        $potonganTk = (float) Setting::get('potongan_tk', 5.0);

        $reportData = $users->map(function ($u) use ($year, $month, $potonganTerlambat, $potonganSangatTerlambat, $potonganPsw) {
            $atts = Attendance::where('user_id', $u->id)
                ->whereYear('tanggal', $year)
                ->whereMonth('tanggal', $month)
                ->get();

            $totalMasuk = $atts->where('jenis', AttendanceType::MASUK)->count();
            $tepatWaktu = $atts->where('jenis', AttendanceType::MASUK)->where('status', AttendanceStatus::TEPAT_WAKTU)->count();
            $terlambat = $atts->where('jenis', AttendanceType::MASUK)->where('status', AttendanceStatus::TERLAMBAT)->count();
            $sangatTerlambat = $atts->where('jenis', AttendanceType::MASUK)->where('status', AttendanceStatus::SANGAT_TERLAMBAT)->count();
            $psw = $atts->where('jenis', AttendanceType::PULANG)->where('status', AttendanceStatus::PULANG_CEPAT)->count();

            $totalPotonganPct = ($terlambat * $potonganTerlambat) + ($sangatTerlambat * $potonganSangatTerlambat) + ($psw * $potonganPsw);
            $persentaseKehadiran = min(100, max(0, 100 - $totalPotonganPct));

            return [
                'nip' => $u->profile?->nip ?? $u->nip ?? '-',
                'name' => $u->name,
                'opd' => $u->office->opd_name ?? '-',
                'jabatan' => $u->profile?->jabatan ?? '-',
                'total_masuk' => $totalMasuk,
                'tepat_waktu' => $tepatWaktu,
                'terlambat' => $terlambat,
                'sangat_terlambat' => $sangatTerlambat,
                'psw' => $psw,
                'total_potongan_pct' => number_format($totalPotonganPct, 1),
                'persentase_kehadiran' => number_format($persentaseKehadiran, 1),
            ];
        });

        $officeName = 'Semua OPD';
        if ($officeId) {
            $off = Office::find($officeId);
            if ($off) {
                $officeName = $off->opd_name;
            }
        }
        $monthName = Carbon::createFromDate($year, $month, 1)->translatedFormat('F Y');

        return response()->view('exports.tpp_report', compact('reportData', 'officeName', 'monthName', 'year', 'month'));
    }

    public function verifyQrCode(Request $request)
    {
        $data = $request->validate([
            'qr_code' => 'required|string',
            'acara' => 'nullable|string',
        ]);

        $rawQr = trim($data['qr_code']);
        $nip = trim(preg_replace('/^NIP:/i', '', $rawQr));

        $targetUser = User::with(['profile', 'office'])
            ->where('nip', $nip)
            ->orWhereHas('profile', function ($q) use ($nip) {
                $q->where('nip', $nip);
            })
            ->first();

        if (! $targetUser) {
            return response()->json([
                'success' => false,
                'message' => "Pegawai dengan NIP '$nip' tidak ditemukan dalam database SIMPATI.",
            ], 404);
        }

        $today = now()->toDateString();
        $acaraName = $data['acara'] ?? 'Acara Kedinasan / Apel';

        $existing = Attendance::where('user_id', $targetUser->id)
            ->where('tanggal', $today)
            ->where('jenis', AttendanceType::MASUK->value)
            ->first();

        if (! $existing) {
            $attendance = Attendance::create([
                'user_id' => $targetUser->id,
                'tanggal' => $today,
                'jenis' => AttendanceType::MASUK->value,
                'waktu' => now()->toTimeString(),
                'latitude' => $targetUser->office?->latitude ?? 0,
                'longitude' => $targetUser->office?->longitude ?? 0,
                'status' => AttendanceStatus::TEPAT_WAKTU->value,
                'in_radius' => true,
                'keterangan' => "Presensi QR oleh Admin ({$acaraName})",
            ]);
        } else {
            $attendance = $existing;
        }

        return response()->json([
            'success' => true,
            'message' => "Presensi QR berhasil diverifikasi untuk {$targetUser->name}!",
            'user' => [
                'id' => $targetUser->id,
                'name' => $targetUser->name,
                'nip' => $targetUser->profile?->nip ?? $targetUser->nip ?? '-',
                'opd_name' => $targetUser->office?->opd_name ?? 'Pemerintah Kab. Soppeng',
                'jabatan' => $targetUser->profile?->jabatan ?? 'Aparatur Sipil Negara',
            ],
            'attendance' => [
                'id' => $attendance->id,
                'tanggal' => $attendance->tanggal ? $attendance->tanggal->format('d/m/Y') : $today,
                'waktu' => $attendance->waktu ? $attendance->waktu->format('H:i:s') : now()->format('H:i:s'),
                'status' => 'Tepat Waktu',
                'keterangan' => $attendance->keterangan,
            ],
        ]);
    }
}
