<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();
        $today = now()->toDateString();

        // Today's attendances
        $todayAttendances = Attendance::forUserOnDate($user->id, $today)
            ->orderBy('waktu')
            ->get();

        // Monthly stats
        $monthlyAttendances = Attendance::where('user_id', $user->id)
            ->forMonth(now()->year, now()->month)
            ->where('jenis', 'masuk')
            ->get();

        $totalWorkDays = $this->getWorkDaysInMonth(now()->year, now()->month);
        $hadir = $monthlyAttendances->count();
        $terlambat = $monthlyAttendances->where('status', '!=', 'tepat_waktu')->count();

        // Work schedule
        $workSchedule = $user->office?->workSchedules()
            ->where('is_active', true)
            ->first();

        return Inertia::render('Dashboard', [
            'todayAttendances' => $todayAttendances,
            'monthlyStats' => [
                'hadir' => $hadir,
                'terlambat' => $terlambat,
                'alpha' => max(0, $totalWorkDays - $hadir),
            ],
            'workSchedule' => $workSchedule,
            'office' => $user->office,
        ]);
    }

    private function getWorkDaysInMonth(int $year, int $month): int
    {
        $days = 0;
        $date = now()->setDate($year, $month, 1);
        $lastDay = $date->copy()->endOfMonth()->day;

        for ($day = 1; $day <= $lastDay; $day++) {
            $current = $date->copy()->setDay($day);
            if ($current->isWeekday() && $current->lte(now())) {
                $days++;
            }
        }

        return $days;
    }
}
