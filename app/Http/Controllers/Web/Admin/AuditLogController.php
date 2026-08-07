<?php

namespace App\Http\Controllers\Web\Admin;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\User;

class AuditLogController extends Controller
{
    public function index()
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
}
