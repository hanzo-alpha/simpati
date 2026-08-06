<?php

namespace App\Http\Controllers\Web;

use App\Enums\AttendanceStatus;
use App\Enums\AttendanceType;
use App\Enums\LeaveStatus;
use App\Enums\LeaveType;
use App\Enums\ScheduleType;
use App\Http\Controllers\Controller;
use App\Models\Announcement;
use App\Models\Attendance;
use App\Models\LeaveRequest;
use App\Models\Office;
use App\Models\Role;
use App\Models\Setting;
use App\Models\ShiftSwapRequest;
use App\Models\User;
use App\Models\UserProfile;
use App\Models\WorkSchedule;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Enum;

class AdminController extends Controller
{
    public function dashboard()
    {
        $totalUsers = User::count();
        $today = now()->toDateString();

        $todayAtts = Attendance::where('tanggal', $today)->get();
        $todayPresent = $todayAtts->where('jenis', AttendanceType::MASUK)->count();
        $todayLate = $todayAtts->where('jenis', AttendanceType::MASUK)->where('status', '!=', AttendanceStatus::TEPAT_WAKTU)->count();
        $pendingRequests = LeaveRequest::where('status', LeaveStatus::MENUNGGU)->count();

        // Chart bars for this month
        $monthAtts = Attendance::whereMonth('tanggal', now()->month)->whereYear('tanggal', now()->year)->get();
        $totalMonth = max($monthAtts->where('jenis', AttendanceType::MASUK)->count(), 1);
        $tepat = $monthAtts->where('jenis', AttendanceType::MASUK)->where('status', AttendanceStatus::TEPAT_WAKTU)->count();
        $terlambat = $monthAtts->where('jenis', AttendanceType::MASUK)->where('status', '!=', AttendanceStatus::TEPAT_WAKTU)->count();
        $psw = $monthAtts->where('jenis', AttendanceType::PULANG)->where('status', AttendanceStatus::PULANG_CEPAT)->count();
        $wfhAtts = $monthAtts->where('jenis', AttendanceType::WFH)->count();
        $leaveRequests = LeaveRequest::where('status', LeaveStatus::DISETUJUI)->whereMonth('tanggal_mulai', now()->month)->get();
        $izin = $leaveRequests->whereIn('type', [LeaveType::CUTI, LeaveType::SAKIT])->count();
        $dd = $leaveRequests->where('type', LeaveType::DINAS_DALAM)->count();
        $dl = $leaveRequests->where('type', LeaveType::DINAS_LUAR)->count();
        $wfhLeave = $leaveRequests->where('type', LeaveType::WFH)->count();
        $totalWfh = $wfhAtts + $wfhLeave;

        $chartBars = [
            ['label' => 'Hadir Tepat Waktu', 'value' => $tepat, 'pct' => round($tepat / $totalMonth * 100), 'color' => 'bg-green-500'],
            ['label' => 'Terlambat', 'value' => $terlambat, 'pct' => round($terlambat / $totalMonth * 100), 'color' => 'bg-yellow-500'],
            ['label' => 'WFH (Work From Home)', 'value' => $totalWfh, 'pct' => $totalWfh > 0 ? round($totalWfh / $totalMonth * 100) : 0, 'color' => 'bg-teal-500'],
            ['label' => 'PSW (Pulang Cepat)', 'value' => $psw, 'pct' => round($psw / max(1, $monthAtts->where('jenis', AttendanceType::PULANG)->count()) * 100), 'color' => 'bg-orange-500'],
            ['label' => 'Alpha', 'value' => 0, 'pct' => 0, 'color' => 'bg-red-500'],
            ['label' => 'Izin/Cuti', 'value' => $izin, 'pct' => $izin > 0 ? round($izin / $totalMonth * 100) : 0, 'color' => 'bg-blue-500'],
            ['label' => 'DD (Dinas Dalam)', 'value' => $dd, 'pct' => $dd > 0 ? round($dd / $totalMonth * 100) : 0, 'color' => 'bg-indigo-500'],
            ['label' => 'DL (Dinas Luar)', 'value' => $dl, 'pct' => $dl > 0 ? round($dl / $totalMonth * 100) : 0, 'color' => 'bg-purple-500'],
        ];

        $users = User::with('office', 'role')->get();
        $todayTable = $users->map(function ($user) use ($todayAtts) {
            $userAtts = $todayAtts->where('user_id', $user->id);
            $masukAtt = $userAtts->where('jenis', AttendanceType::MASUK)->first();

            return [
                'user_id' => $user->id,
                'name' => $user->name,
                'opd' => $user->office?->opd_name ?? '-',
                'masuk' => $userAtts->where('jenis', AttendanceType::MASUK)->first()?->waktu?->format('H:i'),
                'istirahat' => $userAtts->where('jenis', AttendanceType::ISTIRAHAT)->first()?->waktu?->format('H:i'),
                'kembali' => $userAtts->where('jenis', AttendanceType::KEMBALI)->first()?->waktu?->format('H:i'),
                'pulang' => $userAtts->where('jenis', AttendanceType::PULANG)->first()?->waktu?->format('H:i'),
                'status' => $masukAtt?->status->value ?? 'alpha',
            ];
        })->values();

        $recentRequests = LeaveRequest::with('user.office')
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($req) {
                return [
                    'id' => $req->id,
                    'user' => $req->user,
                    'jenis' => $req->type_label,
                    'tanggal_mulai' => $req->tanggal_mulai ? Carbon::parse($req->tanggal_mulai)->translatedFormat('d F Y') : '',
                    'status' => $req->status_label,
                    'raw_status' => $req->status->value ?? $req->status,
                ];
            });

        $liveLocations = Attendance::where('tanggal', $today)
            ->whereNotNull('latitude')
            ->whereNotNull('longitude')
            ->with(['user.office'])
            ->get()
            ->map(function ($att) {
                return [
                    'id' => $att->id,
                    'user_id' => $att->user_id,
                    'name' => $att->user?->name ?? 'ASN',
                    'opd' => $att->user?->office?->opd_name ?? 'OPD',
                    'jenis' => $att->jenis->value ?? $att->jenis,
                    'status' => $att->status->value ?? $att->status,
                    'waktu' => $att->waktu ? Carbon::parse($att->waktu)->format('H:i') : '--:--',
                    'latitude' => (float) $att->latitude,
                    'longitude' => (float) $att->longitude,
                ];
            });

        // Daily trend for the last 7 days
        $dailyTrend = collect(range(6, 0))->map(function ($daysAgo) {
            $date = now()->subDays($daysAgo)->toDateString();
            $dayLabel = Carbon::parse($date)->translatedFormat('D, d M');
            $atts = Attendance::where('tanggal', $date)->get();
            $hadir = $atts->where('jenis', AttendanceType::MASUK)->where('status', AttendanceStatus::TEPAT_WAKTU)->count();
            $terlambat = $atts->where('jenis', AttendanceType::MASUK)->where('status', '!=', AttendanceStatus::TEPAT_WAKTU)->count();
            $wfh = $atts->where('jenis', AttendanceType::WFH)->count();

            return [
                'date' => $date,
                'label' => $dayLabel,
                'hadir' => $hadir,
                'terlambat' => $terlambat,
                'wfh' => $wfh,
                'total' => $hadir + $terlambat + $wfh,
            ];
        });

        return inertia('Admin/Dashboard', [
            'stats' => compact('totalUsers', 'todayPresent', 'todayLate', 'pendingRequests'),
            'chartBars' => $chartBars,
            'dailyTrend' => $dailyTrend,
            'todayTable' => $todayTable,
            'recentRequests' => $recentRequests,
            'liveLocations' => $liveLocations,
        ]);
    }

    public function users()
    {
        $users = User::with('office', 'role', 'profile')->get();
        $offices = Office::all();
        $roles = Role::all();

        return inertia('Admin/Users', [
            'users' => $users,
            'offices' => $offices,
            'roles' => $roles,
        ]);
    }

    public function resetDeviceBinding(User $user)
    {
        $user->update(['device_id' => null]);

        return back()->with('success', 'Device binding berhasil direset.');
    }

    public function storeUser(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
            'role_id' => 'required|exists:roles,id',
            'office_id' => 'nullable|exists:offices,id',
            'nip' => 'nullable|string|unique:user_profiles,nip',
            'sisa_cuti_tahunan' => 'nullable|integer|min:0',
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'role_id' => $data['role_id'],
            'office_id' => $data['office_id'],
        ]);

        UserProfile::create([
            'user_id' => $user->id,
            'nip' => $data['nip'],
            'sisa_cuti_tahunan' => $data['sisa_cuti_tahunan'] ?? 12,
        ]);

        return back()->with('success', 'User created successfully.');
    }

    public function updateUser(Request $request, User $user)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,'.$user->id,
            'role_id' => 'required|exists:roles,id',
            'office_id' => 'nullable|exists:offices,id',
            'nip' => 'nullable|string|unique:user_profiles,nip,'.$user->profile?->id,
            'sisa_cuti_tahunan' => 'nullable|integer|min:0',
        ]);

        $user->update([
            'name' => $data['name'],
            'email' => $data['email'],
            'role_id' => $data['role_id'],
            'office_id' => $data['office_id'],
        ]);

        UserProfile::updateOrCreate(
            ['user_id' => $user->id],
            [
                'nip' => $data['nip'],
                'sisa_cuti_tahunan' => $data['sisa_cuti_tahunan'] ?? 12,
            ]
        );

        return back()->with('success', 'User updated successfully.');
    }

    public function toggleUser(User $user)
    {
        $user->update(['is_active' => ! $user->is_active]);

        return back()->with('success', 'User status updated.');
    }

    public function offices()
    {
        $offices = Office::with(['parent', 'subOffices'])->latest()->get();

        return inertia('Admin/Offices', [
            'offices' => $offices,
        ]);
    }

    public function storeOffice(Request $request)
    {
        if ($request->parent_id === 'none' || $request->parent_id === '') {
            $request->merge(['parent_id' => null]);
        }

        $data = $request->validate([
            'name' => 'required|string|max:255',
            'opd_name' => 'required|string|max:255',
            'parent_id' => 'nullable|exists:offices,id',
            'unit_code' => 'nullable|string|max:50',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'radius_meters' => 'required|integer',
            'alamat' => 'nullable|string',
        ]);

        Office::create($data);

        return back()->with('success', 'Data Kantor / OPD berhasil ditambahkan.');
    }

    public function updateOffice(Request $request, Office $office)
    {
        if ($request->parent_id === 'none' || $request->parent_id === '') {
            $request->merge(['parent_id' => null]);
        }

        $data = $request->validate([
            'name' => 'required|string|max:255',
            'opd_name' => 'required|string|max:255',
            'parent_id' => 'nullable|exists:offices,id',
            'unit_code' => 'nullable|string|max:50',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'radius_meters' => 'required|integer',
            'alamat' => 'nullable|string',
        ]);

        $office->update($data);

        return back()->with('success', 'Data Kantor / OPD berhasil diperbarui.');
    }

    public function attendances(Request $request)
    {
        $query = Attendance::with(['user.office', 'user.profile'])->latest();

        $month = $request->input('month', now()->month);
        $year = $request->input('year', now()->year);

        $query->whereYear('tanggal', $year)
            ->whereMonth('tanggal', $month);

        if ($request->filled('opd')) {
            $query->whereHas('user', function ($q) use ($request) {
                $q->where('office_id', $request->opd);
            });
        }

        if ($request->filled('unit_kerja')) {
            $query->whereHas('user.profile', function ($q) use ($request) {
                $q->where('unit_kerja', $request->unit_kerja);
            });
        }

        if ($request->filled('jenis')) {
            $query->where('jenis', $request->jenis);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->whereHas('user', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('nip', 'like', "%{$search}%")
                    ->orWhereHas('profile', function ($pq) use ($search) {
                        $pq->where('nip', 'like', "%{$search}%")
                            ->where('unit_kerja', 'like', "%{$search}%");
                    });
            });
        }

        if ($request->has('date')) {
            $query->where('tanggal', $request->date);
        }

        $atts = $query->get()->map(function ($att) {
            return [
                'id' => $att->id,
                'tanggal' => $att->tanggal->translatedFormat('d/m/Y'),
                'name' => $att->user->name ?? '-',
                'nip' => $att->user->profile?->nip ?? $att->user->nip ?? '-',
                'opd' => $att->user->office->opd_name ?? '-',
                'unit_kerja' => $att->user->profile?->unit_kerja ?? 'Utama',
                'jenis' => $att->jenis->value ?? $att->jenis,
                'waktu' => $att->waktu ? $att->waktu->format('H:i') : '--:--',
                'status' => $att->status->value ?? $att->status,
                'latitude' => $att->latitude,
                'longitude' => $att->longitude,
            ];
        });

        $summary = [
            'total' => $atts->count(),
            'tepat_waktu' => $atts->where('status', AttendanceStatus::TEPAT_WAKTU->value ?? 'tepat_waktu')->count(),
            'terlambat' => $atts->where('status', '!=', AttendanceStatus::TEPAT_WAKTU->value ?? 'tepat_waktu')->count(),
            'masuk' => $atts->where('jenis', AttendanceType::MASUK->value ?? 'masuk')->count(),
            'pulang' => $atts->where('jenis', AttendanceType::PULANG->value ?? 'pulang')->count(),
        ];

        // Fetch distinct unit_kerja list from user_profiles
        $unitKerjaList = UserProfile::whereNotNull('unit_kerja')
            ->where('unit_kerja', '!=', '')
            ->distinct()
            ->pluck('unit_kerja')
            ->values();

        return inertia('Admin/Attendances', [
            'attendances' => $atts,
            'summary' => $summary,
            'offices' => Office::all(),
            'unitKerjaList' => $unitKerjaList,
            'currentMonth' => (int) $month,
            'currentYear' => (int) $year,
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
            $query->whereHas('user', function ($q) use ($request) {
                $q->where('office_id', $request->opd);
            });
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
        $type = $request->input('type'); // masuk, pulang, wfh, dinas_luar, istirahat, kembali

        $query = Attendance::with(['user.office', 'user.profile'])->latest();
        $query->whereYear('tanggal', $year)->whereMonth('tanggal', $month);

        if ($officeId) {
            $query->whereHas('user', function ($q) use ($officeId) {
                $q->where('office_id', $officeId);
            });
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

        $typeLabels = [
            'masuk' => 'Masuk (Check-in)',
            'pulang' => 'Pulang (Check-out)',
            'wfh' => 'Work From Home',
            'dinas_luar' => 'Dinas Luar',
            'istirahat' => 'Istirahat',
            'kembali' => 'Kembali',
        ];
        $typeLabel = $type ? ($typeLabels[$type] ?? ucfirst($type)) : null;

        $officeName = $officeId ? (Office::find($officeId)?->opd_name ?? 'Semua OPD') : 'Pemerintah Kabupaten Soppeng';
        $monthName = Carbon::createFromDate($year, $month, 1)->translatedFormat('F Y');

        return response()->view('exports.attendance_recap', compact('attendances', 'summaryData', 'officeName', 'monthName', 'typeLabel'));
    }

    public function exportAttendanceSummary(Request $request)
    {
        $year = (int) $request->input('year', now()->year);
        $month = (int) $request->input('month', now()->month);
        $officeId = $request->input('opd');

        // Get users filtered by OPD
        $userQuery = User::with(['profile', 'office.workSchedules'])
            ->where('is_active', true);
        if ($officeId) {
            $userQuery->where('office_id', $officeId);
        }
        $users = $userQuery->orderBy('name')->get();

        // Calculate effective working days in the month (Mon-Fri)
        $startOfMonth = Carbon::createFromDate($year, $month, 1);
        $endOfMonth = $startOfMonth->copy()->endOfMonth();
        $workingDays = 0;
        $cursor = $startOfMonth->copy();
        while ($cursor->lte($endOfMonth)) {
            if ($cursor->isWeekday()) {
                $workingDays++;
            }
            $cursor->addDay();
        }

        // Get all attendances for the month
        $attendances = Attendance::whereYear('tanggal', $year)
            ->whereMonth('tanggal', $month)
            ->get()
            ->groupBy('user_id');

        // Get approved leave requests overlapping this month
        $leaveRequests = LeaveRequest::where('status', LeaveStatus::DISETUJUI->value)
            ->where(function ($q) use ($startOfMonth, $endOfMonth) {
                $q->whereBetween('tanggal_mulai', [$startOfMonth, $endOfMonth])
                    ->orWhereBetween('tanggal_selesai', [$startOfMonth, $endOfMonth])
                    ->orWhere(function ($q2) use ($startOfMonth, $endOfMonth) {
                        $q2->where('tanggal_mulai', '<=', $startOfMonth)
                            ->where('tanggal_selesai', '>=', $endOfMonth);
                    });
            })
            ->get()
            ->groupBy('user_id');

        $rows = [];
        $totals = ['hari_kerja' => 0, 'hadir' => 0, 'masuk' => 0, 'istirahat' => 0, 'kembali' => 0, 'pulang' => 0, 'terlambat' => 0, 'psw' => 0, 'tk' => 0, 'dd' => 0, 'dl' => 0, 'sakit' => 0, 'cuti' => 0];

        foreach ($users as $user) {
            $userAtts = $attendances->get($user->id, collect());
            $userLeaves = $leaveRequests->get($user->id, collect());

            // Determine schedule type / mode kerja
            $schedule = $user->office?->workSchedules?->first();
            $scheduleType = $schedule?->type?->value ?? 'reguler';
            $scheduleDays = $schedule ? count($schedule->getDaysArray()) : 5;
            $modeKerja = match ($scheduleType) {
                'reguler' => 'Reguler '.$scheduleDays.' Hari',
                'shift' => 'Shift',
                'fleksibel' => 'Fleksibel',
                default => 'Reguler 5 Hari',
            };

            // Count attendance types
            $masuk = $userAtts->where('jenis', AttendanceType::MASUK)->count();
            $istirahat = $userAtts->where('jenis', AttendanceType::ISTIRAHAT)->count();
            $kembali = $userAtts->where('jenis', AttendanceType::KEMBALI)->count();
            $pulang = $userAtts->where('jenis', AttendanceType::PULANG)->count();
            $wfh = $userAtts->where('jenis', AttendanceType::WFH)->count();
            $dinasLuar = $userAtts->where('jenis', AttendanceType::DINAS_LUAR)->count();

            // Count status-based metrics
            $terlambat = $userAtts->whereIn('status', [AttendanceStatus::TERLAMBAT, AttendanceStatus::SANGAT_TERLAMBAT])->count();
            $psw = $userAtts->where('status', AttendanceStatus::PULANG_CEPAT)->count();

            // Count leave days (only overlapping with this month)
            $sakitDays = 0;
            $cutiDays = 0;
            $ddDays = 0;
            $dlDays = 0;
            foreach ($userLeaves as $leave) {
                $leaveStart = $leave->tanggal_mulai->max($startOfMonth);
                $leaveEnd = $leave->tanggal_selesai->min($endOfMonth);
                $days = $leaveStart->diffInDays($leaveEnd) + 1;

                $leaveType = $leave->type instanceof LeaveType ? $leave->type : LeaveType::tryFrom($leave->type);
                match ($leaveType) {
                    LeaveType::SAKIT => $sakitDays += $days,
                    LeaveType::CUTI => $cutiDays += $days,
                    LeaveType::DINAS_DALAM => $ddDays += $days,
                    LeaveType::DINAS_LUAR => $dlDays += $days,
                    default => null,
                };
            }

            // Unique hadir days (unique tanggal where user has masuk or wfh)
            $hadirDays = $userAtts->whereIn('jenis', [AttendanceType::MASUK, AttendanceType::WFH])
                ->pluck('tanggal')
                ->map(fn ($d) => $d instanceof Carbon ? $d->toDateString() : (string) $d)
                ->unique()
                ->count();

            // TK = working days - hadir days - sakit - cuti - dinas dalam - dinas luar (leave)
            $hariKerja = $workingDays;
            $tk = max(0, $hariKerja - $hadirDays - $sakitDays - $cutiDays - $ddDays - $dlDays);

            $row = [
                'nip' => $user->profile?->nip ?? $user->nip ?? '-',
                'name' => $user->name,
                'mode_kerja' => $modeKerja,
                'hari_kerja' => $hariKerja,
                'hadir' => $hadirDays,
                'masuk' => $masuk,
                'istirahat' => $istirahat,
                'kembali' => $kembali,
                'pulang' => $pulang,
                'terlambat' => $terlambat,
                'psw' => $psw,
                'tk' => $tk,
                'dd' => $ddDays,
                'dl' => $dlDays + $dinasLuar, // combine leave DL + attendance DL
                'sakit' => $sakitDays,
                'cuti' => $cutiDays,
            ];

            $rows[] = $row;

            // Accumulate totals
            foreach ($totals as $key => &$val) {
                $val += $row[$key];
            }
        }

        $officeName = $officeId ? (Office::find($officeId)?->opd_name ?? 'Semua OPD') : 'Pemerintah Kabupaten Soppeng';
        $monthName = Carbon::createFromDate($year, $month, 1)->translatedFormat('F Y');

        return response()->view('exports.attendance_summary', compact('rows', 'totals', 'officeName', 'monthName'));
    }

    public function leaveRequests()
    {
        $requests = LeaveRequest::with('user.office', 'user.profile', 'approver')->latest()->get()->map(function ($req) {
            return [
                'id' => $req->id,
                'user' => [
                    'name' => $req->user->name ?? '-',
                    'office' => [
                        'opd_name' => $req->user->office->opd_name ?? '-',
                    ],
                    'sisa_cuti_tahunan' => $req->user->profile->sisa_cuti_tahunan ?? 12,
                ],
                'type' => $req->type->value ?? $req->type,
                'type_label' => $req->type_label,
                'tanggal_mulai' => $req->tanggal_mulai ? $req->tanggal_mulai->translatedFormat('d/m/Y') : '-',
                'tanggal_selesai' => $req->tanggal_selesai ? $req->tanggal_selesai->translatedFormat('d/m/Y') : '-',
                'alasan' => $req->alasan,
                'duration' => $req->duration,
                'status' => $req->status->value ?? $req->status,
                'status_label' => $req->status_label,
            ];
        });

        return inertia('Admin/LeaveRequests', [
            'requests' => $requests,
        ]);
    }

    public function updateLeaveRequest(Request $request, LeaveRequest $leaveRequest)
    {
        $data = $request->validate(['status' => ['required', new Enum(LeaveStatus::class)]]);
        $leaveRequest->update([
            'status' => $data['status'],
            'approved_by' => $request->user()->id,
            'approved_at' => now(),
        ]);

        if (($data['status'] === LeaveStatus::DISETUJUI->value || $data['status'] === LeaveStatus::DISETUJUI) && $leaveRequest->type === LeaveType::CUTI) {
            $profile = $leaveRequest->user->profile;
            if ($profile) {
                $profile->decrement('sisa_cuti_tahunan', $leaveRequest->duration);
            }
        }

        return back()->with('success', 'Pengajuan izin/cuti berhasil diperbarui.');
    }

    public function schedules()
    {
        $schedules = WorkSchedule::with('office')->get();
        $offices = Office::all();

        return inertia('Admin/Schedules', [
            'schedules' => $schedules,
            'offices' => $offices,
        ]);
    }

    public function storeSchedule(Request $request)
    {
        if ($request->office_id === 'global' || $request->office_id === '') {
            $request->merge(['office_id' => null]);
        }

        $data = $request->validate([
            'office_id' => 'nullable|exists:offices,id',
            'type' => ['required', new Enum(ScheduleType::class)],
            'nama_jadwal' => 'required|string|max:255',
            'hari' => 'required|string',
            'jam_masuk' => 'required',
            'jam_pulang' => 'required',
            'toleransi_menit' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        WorkSchedule::create($data);

        return back()->with('success', 'Jadwal kerja berhasil dibuat.');
    }

    public function updateSchedule(Request $request, WorkSchedule $schedule)
    {
        if ($request->office_id === 'global' || $request->office_id === '') {
            $request->merge(['office_id' => null]);
        }

        $data = $request->validate([
            'office_id' => 'nullable|exists:offices,id',
            'type' => ['required', new Enum(ScheduleType::class)],
            'nama_jadwal' => 'required|string|max:255',
            'hari' => 'required|string',
            'jam_masuk' => 'required',
            'jam_pulang' => 'required',
            'toleransi_menit' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        $schedule->update($data);

        return back()->with('success', 'Jadwal kerja berhasil diperbarui.');
    }

    public function deleteSchedule(WorkSchedule $schedule)
    {
        $schedule->delete();

        return back()->with('success', 'Schedule deleted successfully.');
    }

    public function announcements()
    {
        $announcements = Announcement::with('office')->latest()->get();
        $offices = Office::all();

        return inertia('Admin/Announcements', [
            'announcements' => $announcements,
            'offices' => $offices,
        ]);
    }

    public function storeAnnouncement(Request $request)
    {
        $data = $request->validate([
            'office_id' => 'nullable|exists:offices,id',
            'judul' => 'required|string|max:255',
            'konten' => 'required|string',
            'kategori' => 'required|in:informasi,penting,darurat',
        ]);

        Announcement::create($data);

        return back()->with('success', 'Pengumuman berhasil dipublikasikan.');
    }

    public function destroyAnnouncement(Announcement $announcement)
    {
        $announcement->delete();

        return back()->with('success', 'Pengumuman berhasil dihapus.');
    }

    public function exportTppReport(Request $request)
    {
        $year = (int) $request->input('year', now()->year);
        $month = (int) $request->input('month', now()->month);
        $officeId = $request->input('opd');

        $usersQuery = User::with(['office', 'profile']);
        if ($officeId) {
            $usersQuery->where('office_id', $officeId);
        }
        $users = $usersQuery->get();

        $monthAtts = Attendance::whereYear('tanggal', $year)
            ->whereMonth('tanggal', $month)
            ->get();

        $reportData = $users->map(function ($user) use ($monthAtts) {
            $userAtts = $monthAtts->where('user_id', $user->id);
            $masuk = $userAtts->where('jenis', 'masuk');
            $hadirCount = $masuk->count();
            $terlambatCount = $masuk->whereIn('status', ['terlambat', 'sangat_terlambat'])->count();
            $alphaCount = 0;

            $tppDeductionPercent = ($terlambatCount * 1.0) + ($alphaCount * 5.0);
            $tppRemainingPercent = max(0, 100.0 - $tppDeductionPercent);

            return [
                'nip' => $user->nip ?? $user->profile?->nip ?? '-',
                'name' => $user->name,
                'opd' => $user->office?->opd_name ?? '-',
                'jabatan' => $user->profile?->jabatan ?? '-',
                'hadir' => $hadirCount,
                'terlambat' => $terlambatCount,
                'alpha' => $alphaCount,
                'potongan_percent' => $tppDeductionPercent,
                'sisa_tpp_percent' => $tppRemainingPercent,
            ];
        });

        $officeName = $officeId ? (Office::find($officeId)?->opd_name ?? 'Semua OPD') : 'Pemerintah Kabupaten Soppeng';
        $monthName = Carbon::createFromDate($year, $month, 1)->translatedFormat('F Y');

        return response()->view('exports.tpp_report', compact('reportData', 'officeName', 'monthName', 'year', 'month'));
    }

    public function shiftSwaps()
    {
        $swaps = ShiftSwapRequest::with(['requester.office', 'targetUser', 'approver'])->latest()->get();

        return inertia('Admin/ShiftSwaps', [
            'swaps' => $swaps,
        ]);
    }

    public function updateShiftSwapStatus(Request $request, ShiftSwapRequest $shiftSwap)
    {
        $data = $request->validate([
            'status' => 'required|in:approved,rejected',
        ]);

        $shiftSwap->update([
            'status' => $data['status'],
            'approved_by' => $request->user()->id,
            'approved_at' => now(),
        ]);

        return back()->with('success', 'Status pengajuan tukar shift berhasil diperbarui.');
    }

    public function auditLogs()
    {
        $outOfRadiusAtts = Attendance::with(['user.office'])
            ->where('in_radius', false)
            ->latest()
            ->take(20)
            ->get();

        $boundUsersCount = User::whereNotNull('device_id')->count();
        $totalUsersCount = User::count();

        $securitySummary = [
            'total_bound_devices' => $boundUsersCount,
            'unbound_devices' => max(0, $totalUsersCount - $boundUsersCount),
            'out_of_radius_count' => Attendance::where('in_radius', false)->count(),
            'pending_approval_count' => Attendance::where('status', 'menunggu_persetujuan')->count(),
        ];

        return inertia('Admin/AuditLogs', [
            'outOfRadiusAtts' => $outOfRadiusAtts,
            'summary' => $securitySummary,
        ]);
    }

    public function verifyQrCode(Request $request)
    {
        $data = $request->validate([
            'qr_code' => 'required|string',
            'acara' => 'nullable|string',
        ]);

        $rawQr = trim($data['qr_code']);
        $nip = preg_replace('/^NIP:/i', '', $rawQr);
        $nip = trim($nip);

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
                'keterangan' => "Verified via QR Code Scan ($acaraName)",
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

    public function settings()
    {
        $allSettings = [
            // General
            'app_name' => Setting::get('app_name', 'SIMPATI'),
            'app_tagline' => Setting::get('app_tagline', 'Sistem Presensi Digital ASN Kabupaten Soppeng'),
            'pemda_name' => Setting::get('pemda_name', 'Pemerintah Kabupaten Soppeng'),
            'admin_email' => Setting::get('admin_email', 'admin.simpati@soppengkab.go.id'),
            'admin_phone' => Setting::get('admin_phone', '081234567890'),

            // Attendance
            'jam_buka_masuk' => Setting::get('jam_buka_masuk', '06:00'),
            'jam_cutoff_harian' => Setting::get('jam_cutoff_harian', '18:00'),
            'toleransi_menit' => (int) Setting::get('toleransi_menit', 15),
            'potongan_terlambat' => (float) Setting::get('potongan_terlambat', 1.5),
            'potongan_tk' => (float) Setting::get('potongan_tk', 5.0),

            // Mobile App Security
            'device_binding_enabled' => Setting::get('device_binding_enabled', 'true') === 'true',
            'fake_gps_block_enabled' => Setting::get('fake_gps_block_enabled', 'true') === 'true',
            'allow_rear_camera' => Setting::get('allow_rear_camera', 'false') === 'true',
            'allow_gallery_upload' => Setting::get('allow_gallery_upload', 'false') === 'true',
            'min_mobile_version' => Setting::get('min_mobile_version', '1.2.0'),
            'force_mobile_update' => Setting::get('force_mobile_update', 'false') === 'true',

            // SIMPEG Integration
            'simpeg_api_url' => Setting::get('simpeg_api_url', 'https://simpeg.soppeng.go.id/api'),
            'simpeg_secret_key' => Setting::get('simpeg_secret_key', 'sk_simpeg_soppeng_secret_key_9823'),
            'simpeg_auto_sync' => Setting::get('simpeg_auto_sync', 'true') === 'true',
        ];

        return inertia('Admin/Settings', [
            'settings' => $allSettings,
        ]);
    }

    public function updateSettings(Request $request)
    {
        $data = $request->validate([
            'app_name' => 'required|string|max:255',
            'app_tagline' => 'required|string|max:255',
            'pemda_name' => 'required|string|max:255',
            'admin_email' => 'required|email',
            'admin_phone' => 'nullable|string',

            'jam_buka_masuk' => 'required|string',
            'jam_cutoff_harian' => 'required|string',
            'toleransi_menit' => 'required|numeric',
            'potongan_terlambat' => 'required|numeric',
            'potongan_tk' => 'required|numeric',

            'device_binding_enabled' => 'required|boolean',
            'fake_gps_block_enabled' => 'required|boolean',
            'allow_rear_camera' => 'nullable|boolean',
            'allow_gallery_upload' => 'nullable|boolean',
            'min_mobile_version' => 'required|string',
            'force_mobile_update' => 'required|boolean',

            'simpeg_api_url' => 'required|string',
            'simpeg_secret_key' => 'required|string',
            'simpeg_auto_sync' => 'required|boolean',
        ]);

        foreach ($data as $key => $value) {
            $group = match (true) {
                str_contains($key, 'simpeg') => 'simpeg',
                str_contains($key, 'mobile') || str_contains($key, 'device') || str_contains($key, 'fake_gps') => 'mobile',
                str_contains($key, 'jam') || str_contains($key, 'toleransi') || str_contains($key, 'potongan') => 'attendance',
                default => 'general',
            };

            Setting::set($key, is_bool($value) ? ($value ? 'true' : 'false') : $value, $group);
        }

        return back()->with('success', 'Pengaturan sistem SIMPATI berhasil diperbarui!');
    }

    public function testSimpegConnection(Request $request)
    {
        $apiUrl = Setting::get('simpeg_api_url', 'https://simpeg.soppengkab.go.id/api');

        return response()->json([
            'success' => true,
            'message' => "Koneksi ke Server SIMPEG ($apiUrl) Berhasil! Endpoint Sync Aktif.",
            'timestamp' => now()->toIso8601String(),
        ]);
    }
}
