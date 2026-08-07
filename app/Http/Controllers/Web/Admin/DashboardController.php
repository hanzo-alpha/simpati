<?php

namespace App\Http\Controllers\Web\Admin;

use App\Enums\AttendanceStatus;
use App\Enums\AttendanceType;
use App\Enums\LeaveStatus;
use App\Enums\LeaveType;
use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\LeaveRequest;
use App\Models\User;

class DashboardController extends Controller
{
    public function index()
    {
        $totalUsers = User::count();
        $today = now()->toDateString();

        $todayAtts = Attendance::where('tanggal', $today)->get();
        $todayPresent = $todayAtts->where('jenis', AttendanceType::MASUK)->count();
        $todayLate = $todayAtts->where('jenis', AttendanceType::MASUK)->where('status', '!=', AttendanceStatus::TEPAT_WAKTU)->count();
        $pendingRequests = LeaveRequest::where('status', LeaveStatus::MENUNGGU)->count();

        // Month stats
        $monthAtts = Attendance::whereMonth('tanggal', now()->month)->whereYear('tanggal', now()->year)->get();
        $totalMonth = max($monthAtts->where('jenis', AttendanceType::MASUK)->count(), 1);
        $tepat = $monthAtts->where('jenis', AttendanceType::MASUK)->where('status', AttendanceStatus::TEPAT_WAKTU)->count();
        $terlambat = $monthAtts->where('jenis', AttendanceType::MASUK)->where('status', '!=', AttendanceStatus::TEPAT_WAKTU)->count();
        $psw = $monthAtts->where('jenis', AttendanceType::PULANG)->where('status', AttendanceStatus::PULANG_CEPAT)->count();
        $wfhAtts = $monthAtts->where('jenis', AttendanceType::WFH)->count();
        $leaveRequests = LeaveRequest::where('status', LeaveStatus::DISETUJUI)->whereMonth('tanggal_mulai', now()->month)->get();
        $izin = $leaveRequests->whereIn('type', [LeaveType::CUTI, LeaveType::SAKIT])->count();

        $stats = [
            'totalUsers' => $totalUsers,
            'todayPresent' => $todayPresent,
            'todayLate' => $todayLate,
            'pendingRequests' => $pendingRequests,
            'attendance_rate' => round(($todayPresent / max($totalUsers, 1)) * 100, 1),
            'monthly_on_time_pct' => round(($tepat / $totalMonth) * 100, 1),
            'monthly_late_pct' => round(($terlambat / $totalMonth) * 100, 1),
            'monthly_psw_pct' => round(($psw / $totalMonth) * 100, 1),
            'monthly_wfh_pct' => round(($wfhAtts / $totalMonth) * 100, 1),
            'monthly_izin_pct' => round(($izin / $totalMonth) * 100, 1),
        ];

        $todayAttendances = Attendance::with(['user.office', 'user.profile'])
            ->latest('waktu')
            ->take(10)
            ->get()
            ->map(function ($att) {
                return [
                    'user_id' => $att->user_id,
                    'name' => $att->user->name ?? '-',
                    'opd' => $att->user->office->opd_name ?? '-',
                    'masuk' => $att->waktu ? $att->waktu->format('H:i') : '-',
                    'status' => $att->status->value ?? $att->status,
                ];
            });

        $recentRequests = LeaveRequest::with(['user.office', 'user.profile'])
            ->where('status', LeaveStatus::MENUNGGU)
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($req) {
                return [
                    'id' => $req->id,
                    'user' => ['name' => $req->user->name ?? '-'],
                    'jenis' => $req->type->value ?? $req->type,
                    'tanggal_mulai' => $req->tanggal_mulai ? $req->tanggal_mulai->format('d/m/Y') : '-',
                    'status' => $req->status->value ?? $req->status,
                ];
            });

        $liveLocations = Attendance::with(['user.office'])
            ->whereNotNull('latitude')
            ->whereNotNull('longitude')
            ->latest('waktu')
            ->take(15)
            ->get()
            ->map(function ($att) {
                return [
                    'name' => $att->user->name ?? '-',
                    'opd' => $att->user->office->opd_name ?? '-',
                    'waktu' => $att->waktu ? $att->waktu->format('H:i') : '-',
                    'status' => $att->status->value ?? $att->status,
                    'latitude' => (float) $att->latitude,
                    'longitude' => (float) $att->longitude,
                ];
            });

        $chartBars = [
            ['label' => 'Hadir Tepat Waktu', 'value' => $tepat, 'pct' => round(($tepat / $totalMonth) * 100, 1), 'color' => 'bg-emerald-500'],
            ['label' => 'Terlambat / PSW', 'value' => $terlambat + $psw, 'pct' => round((($terlambat + $psw) / $totalMonth) * 100, 1), 'color' => 'bg-amber-500'],
            ['label' => 'Dinas Outside / WFH', 'value' => $wfhAtts, 'pct' => round(($wfhAtts / $totalMonth) * 100, 1), 'color' => 'bg-blue-500'],
            ['label' => 'Izin / Cuti / Sakit', 'value' => $izin, 'pct' => round(($izin / $totalMonth) * 100, 1), 'color' => 'bg-purple-500'],
        ];

        return inertia('Admin/Dashboard', [
            'stats' => $stats,
            'todayAttendances' => $todayAttendances,
            'recentRequests' => $recentRequests,
            'liveLocations' => $liveLocations,
            'chartBars' => $chartBars,
        ]);
    }
}
