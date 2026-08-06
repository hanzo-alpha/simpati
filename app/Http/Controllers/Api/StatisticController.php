<?php

namespace App\Http\Controllers\Api;

use App\Enums\AttendanceStatus;
use App\Enums\AttendanceType;
use App\Enums\LeaveStatus;
use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\LeaveRequest;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StatisticController extends Controller
{
    /**
     * Get monthly statistics for the authenticated user.
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        $month = $request->input('month', now()->month);
        $year = $request->input('year', now()->year);

        $startDate = Carbon::createFromDate($year, $month, 1)->startOfMonth();
        $endDate = $startDate->copy()->endOfMonth();
        $today = now();
        if ($endDate->gt($today)) {
            $endDate = $today;
        }

        // 1. Attendance Stats
        $attendances = Attendance::where('user_id', $user->id)
            ->whereYear('tanggal', $year)
            ->whereMonth('tanggal', $month)
            ->where('jenis', AttendanceType::MASUK)
            ->get();

        $tepatWaktu = $attendances->where('status', AttendanceStatus::TEPAT_WAKTU)->count();
        $terlambat = $attendances->where('status', '!=', AttendanceStatus::TEPAT_WAKTU)->count();

        // 2. Leave Stats
        $leaves = LeaveRequest::where('user_id', $user->id)
            ->where('status', LeaveStatus::DISETUJUI)
            ->where(function ($q) use ($startDate, $endDate) {
                $q->whereBetween('tanggal_mulai', [$startDate, $endDate])
                    ->orWhereBetween('tanggal_selesai', [$startDate, $endDate]);
            })
            ->get();

        $izinCount = 0;
        $currDate = $startDate->copy();
        while ($currDate->lte($endDate)) {
            if (! $currDate->isWeekend()) {
                $dateStr = $currDate->toDateString();
                $isLeave = $leaves->filter(function ($l) use ($dateStr) {
                    return $dateStr >= $l->tanggal_mulai && $dateStr <= $l->tanggal_selesai;
                })->isNotEmpty();

                if ($isLeave) {
                    $izinCount++;
                }
            }
            $currDate->addDay();
        }

        // 3. Work Days & Alpha
        $totalWorkDays = 0;
        $currDate = $startDate->copy();
        while ($currDate->lte($endDate)) {
            if (! $currDate->isWeekend()) {
                $totalWorkDays++;
            }
            $currDate->addDay();
        }

        $hadirCount = $attendances->count();
        $alphaCount = max(0, $totalWorkDays - $hadirCount - $izinCount);

        // 4. Monthly Trend (Daily status for chart)
        $trend = [];
        $currDate = $startDate->copy();
        while ($currDate->lte($endDate)) {
            if (! $currDate->isWeekend()) {
                $dateStr = $currDate->toDateString();
                $att = $attendances->firstWhere('tanggal', $dateStr);
                $status = 'alpha';
                if ($att) {
                    $status = $att->status === AttendanceStatus::TEPAT_WAKTU ? 'hadir' : 'terlambat';
                } else {
                    $isLeave = $leaves->filter(function ($l) use ($dateStr) {
                        return $dateStr >= $l->tanggal_mulai && $dateStr <= $l->tanggal_selesai;
                    })->isNotEmpty();
                    if ($isLeave) {
                        $status = 'izin';
                    }
                }
                $trend[] = [
                    'date' => $currDate->format('d/m'),
                    'status' => $status,
                ];
            }
            $currDate->addDay();
        }

        // 5. TPP Deduction Calculation (Regulasi Pemda)
        $tppDeductionPercent = 0.0;
        $tppBreakdown = [
            'terlambat_sedang' => 0, // 1.0%
            'sangat_terlambat' => 0, // 2.5%
            'alpha' => $alphaCount,  // 5.0% per day
        ];

        foreach ($attendances as $att) {
            $statusVal = is_string($att->status) ? $att->status : ($att->status->value ?? $att->status);
            if ($statusVal === 'terlambat') {
                $tppDeductionPercent += 1.0;
                $tppBreakdown['terlambat_sedang']++;
            } elseif ($statusVal === 'sangat_terlambat') {
                $tppDeductionPercent += 2.5;
                $tppBreakdown['sangat_terlambat']++;
            }
        }

        $tppDeductionPercent += ($alphaCount * 5.0);

        $tppSummary = [
            'total_deduction_percent' => round($tppDeductionPercent, 2),
            'performance_score_percent' => max(0, round(100.0 - $tppDeductionPercent, 2)),
            'breakdown' => $tppBreakdown,
        ];

        return response()->json([
            'stats' => [
                'hadir' => $hadirCount,
                'tepat_waktu' => $tepatWaktu,
                'terlambat' => $terlambat,
                'izin' => $izinCount,
                'alpha' => $alphaCount,
                'total_work_days' => $totalWorkDays,
            ],
            'tpp_summary' => $tppSummary,
            'trend' => $trend,
            'month_name' => $startDate->translatedFormat('F Y'),
        ]);
    }
}
