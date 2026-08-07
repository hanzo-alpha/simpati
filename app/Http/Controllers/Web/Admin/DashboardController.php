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

        // Chart bars for this month
        $monthAtts = Attendance::whereMonth('tanggal', now()->month)->whereYear('tanggal', now()->year)->get();
        $totalMonth = max($monthAtts->where('jenis', AttendanceType::MASUK)->count(), 1);
        $tepat = $monthAtts->where('jenis', AttendanceType::MASUK)->where('status', AttendanceStatus::TEPAT_WAKTU)->count();
        $terlambat = $monthAtts->where('jenis', AttendanceType::MASUK)->where('status', '!=', AttendanceStatus::TEPAT_WAKTU)->count();
        $psw = $monthAtts->where('jenis', AttendanceType::PULANG)->where('status', AttendanceStatus::PULANG_CEPAT)->count();
        $wfhAtts = $monthAtts->where('jenis', AttendanceType::WFH)->count();
        $leaveRequests = LeaveRequest::where('status', LeaveStatus::DISETUJUI)->whereMonth('tanggal_mulai', now()->month)->get();
        $izin = $leaveRequests->whereIn('type', [LeaveType::CUTI, LeaveType::SAKIT])->count();

        $stats = [
            'total_users' => $totalUsers,
            'today_present' => $todayPresent,
            'today_late' => $todayLate,
            'pending_requests' => $pendingRequests,
            'attendance_rate' => round(($todayPresent / max($totalUsers, 1)) * 100, 1),
            'monthly_on_time_pct' => round(($tepat / $totalMonth) * 100, 1),
            'monthly_late_pct' => round(($terlambat / $totalMonth) * 100, 1),
            'monthly_psw_pct' => round(($psw / $totalMonth) * 100, 1),
            'monthly_wfh_pct' => round(($wfhAtts / $totalMonth) * 100, 1),
            'monthly_izin_pct' => round(($izin / $totalMonth) * 100, 1),
        ];

        $recentAtts = Attendance::with(['user.office', 'user.profile'])->latest('waktu')->take(10)->get();
        $recentLeaves = LeaveRequest::with(['user.office', 'user.profile'])->where('status', LeaveStatus::MENUNGGU)->latest()->take(5)->get();

        return inertia('Admin/Dashboard', [
            'stats' => $stats,
            'recentAttendances' => $recentAtts,
            'pendingLeaveRequests' => $recentLeaves,
        ]);
    }
}
