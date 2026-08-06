<?php

namespace App\Services;

use App\Enums\AttendanceStatus;
use App\Enums\AttendanceType;
use App\Enums\LeaveStatus;
use App\Models\Attendance;
use App\Models\LeaveRequest;
use App\Models\User;
use Carbon\Carbon;

class RankingService
{
    /**
     * Calculate score and zero-alpha status for a user.
     * Weights:
     * Kehadiran (40%)
     * Ketepatan Waktu (30%)
     * Kelengkapan Masuk & Pulang (15%)
     * Durasi Jam Kerja (15%)
     */
    public function calculateScore(int $userId, ?int $month, int $year): array
    {
        if ($month) {
            $startDate = Carbon::createFromDate($year, $month, 1)->startOfMonth();
            $endDate = $startDate->copy()->endOfMonth();
        } else {
            $startDate = Carbon::createFromDate($year, 1, 1)->startOfYear();
            $endDate = $startDate->copy()->endOfYear();
        }

        $today = now();
        if ($endDate->gt($today)) {
            $endDate = $today;
        }

        // 1. Calculate Total Work Days
        $workDays = 0;
        $currDate = $startDate->copy();
        while ($currDate->lte($endDate)) {
            if (! $currDate->isWeekend()) {
                $workDays++;
            }
            $currDate->addDay();
        }

        if ($workDays === 0) {
            return [
                'score' => 0,
                'is_zero_alpha' => true,
                'details' => [
                    'kehadiran' => 0,
                    'ketepatan' => 0,
                    'kelengkapan' => 0,
                    'durasi' => 0,
                ],
            ];
        }

        // Fetch user context for schedules
        $user = User::with([
            'office.workSchedules' => function ($q) {
                $q->where('is_active', true);
            },
        ])->find($userId);

        $targetHoursPerDay = 8; // Default 8 hours
        if ($user && $user->office && $user->office->workSchedules->isNotEmpty()) {
            $schedule = $user->office->workSchedules->first();
            if ($schedule->jam_masuk && $schedule->jam_pulang) {
                // Approximate target hours
                $start = Carbon::parse($schedule->jam_masuk);
                $end = Carbon::parse($schedule->jam_pulang);
                $targetHoursPerDay = max(1, $end->diffInHours($start));
            }
        }
        $targetTotalHours = $workDays * $targetHoursPerDay;

        // Fetch Attendances
        $masukRecords = Attendance::where('user_id', $userId)
            ->whereYear('tanggal', $year)
            ->when($month, function ($q) use ($month) {
                return $q->whereMonth('tanggal', $month);
            })
            ->where('jenis', AttendanceType::MASUK)
            ->get();

        $pulangRecords = Attendance::where('user_id', $userId)
            ->whereYear('tanggal', $year)
            ->when($month, function ($q) use ($month) {
                return $q->whereMonth('tanggal', $month);
            })
            ->where('jenis', AttendanceType::PULANG)
            ->get();

        // Fetch Leaves
        $leaves = LeaveRequest::where('user_id', $userId)
            ->where('status', LeaveStatus::DISETUJUI)
            ->where(function ($q) use ($startDate, $endDate) {
                $q->whereBetween('tanggal_mulai', [$startDate, $endDate])
                    ->orWhereBetween('tanggal_selesai', [$startDate, $endDate]);
            })
            ->get();

        $totalHadirDanCuti = 0;
        $tepatWaktuCount = 0;
        $kelengkapanCount = 0;
        $actualTotalMinutes = 0;
        $alphaCount = 0;

        $currDate = $startDate->copy();
        while ($currDate->lte($endDate)) {
            if ($currDate->isWeekend()) {
                $currDate->addDay();

                continue;
            }

            $dateStr = $currDate->toDateString();
            $masuk = $masukRecords->first(fn ($r) => $r->tanggal->toDateString() === $dateStr);
            $pulang = $pulangRecords->first(fn ($r) => $r->tanggal->toDateString() === $dateStr);

            $onLeave = $leaves->filter(function ($l) use ($dateStr) {
                return $dateStr >= $l->tanggal_mulai && $dateStr <= $l->tanggal_selesai;
            })->isNotEmpty();

            if ($masuk) {
                $totalHadirDanCuti++;
                if ($masuk->status === AttendanceStatus::TEPAT_WAKTU) {
                    $tepatWaktuCount++;
                }

                if ($pulang) {
                    $kelengkapanCount++;
                    // Calculate duration
                    $tMasuk = Carbon::parse($masuk->waktu);
                    $tPulang = Carbon::parse($pulang->waktu);
                    $actualTotalMinutes += max(0, $tPulang->diffInMinutes($tMasuk));
                }
            } elseif ($onLeave) {
                $totalHadirDanCuti++;
                // If on leave, assume perfect stats for that day so it doesn't penalize
                $tepatWaktuCount++;
                $kelengkapanCount++;
                $actualTotalMinutes += ($targetHoursPerDay * 60);
            } else {
                $alphaCount++;
            }

            $currDate->addDay();
        }

        // Calculate Component Scores
        // 1. Kehadiran (40%): (Days Attended + Leaves) / Work Days
        $scoreKehadiranRaw = ($totalHadirDanCuti / $workDays) * 100;
        $scoreKehadiran = $scoreKehadiranRaw * 0.40;

        // 2. Ketepatan Waktu (30%): Tepat Waktu / Total Days Suppose to Attend
        $scoreKetepatanRaw = ($totalHadirDanCuti > 0) ? ($tepatWaktuCount / $workDays) * 100 : 0;
        $scoreKetepatan = $scoreKetepatanRaw * 0.30;

        // 3. Kelengkapan (15%): Days with both Masuk & Pulang / Work Days
        $scoreKelengkapanRaw = ($kelengkapanCount / $workDays) * 100;
        $scoreKelengkapan = $scoreKelengkapanRaw * 0.15;

        // 4. Durasi Jam Kerja (15%): Actual Hours / Target Total Hours (Cap at 100%)
        $actualHours = $actualTotalMinutes / 60;
        $scoreDurasiRaw = min(100, ($targetTotalHours > 0 ? ($actualHours / $targetTotalHours) * 100 : 0));
        $scoreDurasi = $scoreDurasiRaw * 0.15;

        $totalScore = $scoreKehadiran + $scoreKetepatan + $scoreKelengkapan + $scoreDurasi;
        $isZeroAlpha = ($alphaCount === 0);

        return [
            'score' => round($totalScore, 2),
            'is_zero_alpha' => $isZeroAlpha,
            'details' => [
                'kehadiran' => round($scoreKehadiran, 2),
                'ketepatan' => round($scoreKetepatan, 2),
                'kelengkapan' => round($scoreKelengkapan, 2),
                'durasi' => round($scoreDurasi, 2),
            ],
        ];
    }

    public function getBadge(float $score, bool $isZeroAlpha = false): string
    {
        // Bonus badge naming or modifier could happen here
        // For now, keeping original logic + marking "Zero Alpha" modifier implicitly in UI
        if ($score >= 95) {
            return 'Teladan';
        }
        if ($score >= 80) {
            return 'Baik';
        }

        return 'Perlu Peningkatan';
    }
}
