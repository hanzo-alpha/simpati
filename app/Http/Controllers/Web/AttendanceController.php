<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\LeaveRequest;
use App\Models\User;
use App\Services\RankingService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AttendanceController extends Controller
{
    /**
     * Riwayat Kehadiran page.
     */
    public function riwayat(Request $request): Response
    {
        $user = $request->user();
        $year = $request->input('year', now()->year);
        $month = $request->input('month', now()->month);

        $attendances = Attendance::where('user_id', $user->id)
            ->forMonth($year, $month)
            ->orderBy('tanggal', 'desc')
            ->orderBy('waktu')
            ->get()
            ->groupBy(fn ($a) => $a->tanggal->toDateString());

        // Summary
        $masukRecords = Attendance::where('user_id', $user->id)
            ->forMonth($year, $month)
            ->where('jenis', 'masuk')
            ->get();

        $leaveCount = LeaveRequest::where('user_id', $user->id)
            ->where('status', 'disetujui')
            ->where(function ($q) use ($year, $month) {
                $q->whereYear('tanggal_mulai', $year)->whereMonth('tanggal_mulai', $month);
            })->count();

        $totalDays = $this->getWorkDaysInMonth($year, $month);

        return Inertia::render('Attendance/Riwayat', [
            'attendances' => $attendances,
            'year' => (int) $year,
            'month' => (int) $month,
            'summary' => [
                'totalDays' => $totalDays,
                'hadir' => $masukRecords->count(),
                'terlambat' => $masukRecords->where('status', '!=', 'tepat_waktu')->count(),
                'izin' => $leaveCount,
            ],
        ]);
    }

    /**
     * Statistik Bulanan page.
     */
    public function statistik(Request $request): Response
    {
        $user = $request->user();
        $year = $request->input('year', now()->year);
        $month = $request->input('month', now()->month);

        $masukRecords = Attendance::where('user_id', $user->id)
            ->forMonth($year, $month)
            ->where('jenis', 'masuk')
            ->get();

        $pulangRecords = Attendance::where('user_id', $user->id)
            ->forMonth($year, $month)
            ->where('jenis', 'pulang')
            ->get();

        $leaveCount = LeaveRequest::where('user_id', $user->id)
            ->where('status', 'disetujui')
            ->where(function ($q) use ($year, $month) {
                $q->whereYear('tanggal_mulai', $year)->whereMonth('tanggal_mulai', $month);
            })->count();

        $totalDays = $this->getWorkDaysInMonth($year, $month);
        $hadir = $masukRecords->where('status', 'tepat_waktu')->count();
        $terlambat = $masukRecords->where('status', '!=', 'tepat_waktu')->count();
        $alpha = max(0, $totalDays - $hadir - $terlambat - $leaveCount);

        // Calculate total work hours
        $totalMinutes = 0;
        foreach ($masukRecords as $masuk) {
            $pulang = $pulangRecords->firstWhere('tanggal', $masuk->tanggal);
            if ($pulang) {
                $totalMinutes += $this->minutesBetween($masuk->waktu, $pulang->waktu);
            }
        }

        // Average times
        $avgMasuk = $masukRecords->count() > 0
            ? $this->averageTime($masukRecords->pluck('waktu'))
            : '--:--';
        $avgPulang = $pulangRecords->count() > 0
            ? $this->averageTime($pulangRecords->pluck('waktu'))
            : '--:--';

        $tppDeductionPercent = ($terlambat * 1.0) + ($alpha * 5.0);
        $tppSummary = [
            'total_deduction_percent' => round($tppDeductionPercent, 2),
            'performance_score_percent' => max(0, round(100.0 - $tppDeductionPercent, 2)),
            'breakdown' => [
                'terlambat_sedang' => $terlambat,
                'sangat_terlambat' => 0,
                'alpha' => $alpha,
            ],
        ];

        return Inertia::render('Attendance/Statistik', [
            'year' => (int) $year,
            'month' => (int) $month,
            'tppSummary' => $tppSummary,
            'stats' => [
                'hadir' => $hadir,
                'terlambat' => $terlambat,
                'izin' => $leaveCount,
                'alpha' => $alpha,
                'totalJam' => round($totalMinutes / 60),
                'targetJam' => $totalDays * 8,
                'avgMasuk' => $avgMasuk,
                'avgPulang' => $avgPulang,
            ],
        ]);
    }

    /**
     * Peringkat Kehadiran page.
     */
    public function peringkat(Request $request): Response
    {
        $period = $request->input('period', 'month');

        $now = now();
        if ($period === 'last_month') {
            $lastMonth = $now->copy()->subMonth();
            $year = (int) $lastMonth->year;
            $month = (int) $lastMonth->month;
        } elseif ($period === 'year') {
            $year = (int) $request->input('year', $now->year);
            $month = (int) $now->month;
        } else {
            $year = (int) $request->input('year', $now->year);
            $month = (int) $request->input('month', $now->month);
        }

        // Get all active ASN users for ranking leaderboard
        $users = User::where('is_active', true)
            ->with('office:id,opd_name')
            ->get();

        $rankingService = new RankingService;
        $rankings = [];

        foreach ($users as $u) {
            $result = $rankingService->calculateScore($u->id, $month, $year);
            $rankings[] = [
                'id' => $u->id,
                'name' => $u->name,
                'opd' => $u->office?->opd_name ?? '-',
                'score' => $result['score'],
                'hadir' => $result['details']['hadir_count'] ?? 0,
                'terlambat' => $result['details']['terlambat_count'] ?? 0,
                'is_zero_alpha' => $result['is_zero_alpha'],
                'details' => $result['details'],
                'badge' => $rankingService->getBadge($result['score'], $result['is_zero_alpha']),
                'isMe' => $u->id === auth()->id(),
            ];
        }

        // Sort collection by score descending
        $rankings = collect($rankings)->sortByDesc('score')->values();

        // Calculate rank index
        $myIndex = $rankings->search(fn ($r) => $r['id'] === auth()->id());
        $myRank = $myIndex !== false ? $rankings[$myIndex] : null;

        $isAdmin = in_array($request->user()->role?->name, ['super_admin', 'admin_opd']);

        return Inertia::render('Attendance/Peringkat', [
            'rankings' => $rankings->take(50),
            'myRank' => [
                'rank' => $myIndex !== false ? $myIndex + 1 : 0,
                'score' => $myRank['score'] ?? 0,
                'totalAsn' => $rankings->count(),
                'badge' => $myRank['badge'] ?? 'Baik',
            ],
            'filters' => [
                'period' => $period,
                'month' => $month,
                'year' => $year,
            ],
            'isAdmin' => $isAdmin,
        ]);
    }

    /**
     * Presensi Harian Form page.
     */
    public function presensi(Request $request): Response
    {
        $todayAttendances = Attendance::where('user_id', $request->user()->id)
            ->where('tanggal', now()->toDateString())
            ->orderBy('waktu')
            ->get();

        return Inertia::render('Attendance/Presensi', [
            'todayAttendances' => $todayAttendances,
            'office' => $request->user()->office,
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

    private function minutesBetween($start, $end): int
    {
        $s = Carbon::parse($start);
        $e = Carbon::parse($end);

        return max(0, $e->diffInMinutes($s));
    }

    private function averageTime($times): string
    {
        if ($times->isEmpty()) {
            return '--:--';
        }
        $totalMinutes = $times->sum(fn ($t) => Carbon::parse($t)->hour * 60 + Carbon::parse($t)->minute);
        $avg = $totalMinutes / $times->count();

        return sprintf('%02d:%02d', floor($avg / 60), $avg % 60);
    }
}
