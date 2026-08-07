<?php

namespace App\Http\Controllers\Api;

use App\Enums\AttendanceStatus;
use App\Enums\AttendanceType;
use App\Enums\LeaveStatus;
use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\LeaveRequest;
use App\Models\Setting;
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

        // 5. TPP Deduction Calculation (Dynamic Perbup Config)
        $rateTerlambat = (float) Setting::get('potongan_terlambat', 1.0);
        $rateSangatTerlambat = (float) Setting::get('potongan_sangat_terlambat', 2.5);
        $rateTk = (float) Setting::get('potongan_tk', 5.0);
        $maxPotongan = (float) Setting::get('potongan_max_tpp', 100.0);

        $tppDeductionPercent = 0.0;
        $tppBreakdown = [
            'terlambat_sedang' => 0,
            'sangat_terlambat' => 0,
            'alpha' => $alphaCount,
        ];

        foreach ($attendances as $att) {
            $statusVal = is_string($att->status) ? $att->status : ($att->status->value ?? $att->status);
            if ($statusVal === 'terlambat') {
                $tppDeductionPercent += $rateTerlambat;
                $tppBreakdown['terlambat_sedang']++;
            } elseif ($statusVal === 'sangat_terlambat') {
                $tppDeductionPercent += $rateSangatTerlambat;
                $tppBreakdown['sangat_terlambat']++;
            }
        }

        $tppDeductionPercent += ($alphaCount * $rateTk);
        $tppDeductionPercent = min($maxPotongan, $tppDeductionPercent);

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

    /**
     * Generate HTML/PDF report preview for monthly attendance recap.
     */
    public function pdf(Request $request)
    {
        $user = $request->user();
        $month = $request->input('month', now()->month);
        $year = $request->input('year', now()->year);

        $startDate = Carbon::createFromDate($year, $month, 1)->startOfMonth();
        $endDate = $startDate->copy()->endOfMonth();

        $attendances = Attendance::where('user_id', $user->id)
            ->whereYear('tanggal', $year)
            ->whereMonth('tanggal', $month)
            ->orderBy('tanggal')
            ->orderBy('waktu')
            ->get();

        $pemdaName = Setting::get('pemda_name', 'PEMERINTAH KABUPATEN SOPPENG');
        $appName = Setting::get('app_name', 'SIMPATI');
        $opdName = $user->office?->opd_name ?? 'Pemerintah Kabupaten Soppeng';
        $nip = $user->profile?->nip ?? $user->nip ?? '-';
        $jabatan = $user->profile?->jabatan ?? 'Aparatur Sipil Negara';
        $monthName = strtoupper($startDate->translatedFormat('F Y'));

        $rows = '';
        foreach ($attendances as $idx => $att) {
            $no = $idx + 1;
            $tgl = $att->tanggal ? Carbon::parse($att->tanggal)->format('d/m/Y') : '-';
            $jam = $att->waktu ? Carbon::parse($att->waktu)->format('H:i:s') : '-';
            $jenis = strtoupper($att->jenis instanceof AttendanceType ? $att->jenis->value : (string)$att->jenis);
            $status = strtoupper($att->status instanceof AttendanceStatus ? $att->status->value : (string)$att->status);
            $ket = htmlspecialchars($att->keterangan ?? 'Hadir Presensi Digital Mobile');

            $rows .= "<tr>
                <td style='text-align:center;'>{$no}</td>
                <td style='text-align:center;'>{$tgl}</td>
                <td style='text-align:center;'>{$jam}</td>
                <td style='text-align:center;'>{$jenis}</td>
                <td style='text-align:center; font-weight:bold;'>{$status}</td>
                <td>{$ket}</td>
            </tr>";
        }

        $html = "<!DOCTYPE html>
        <html>
        <head>
            <meta charset='utf-8'>
            <title>Rekap Presensi - {$user->name} ({$monthName})</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 30px; color: #1e293b; }
                .header { text-align: center; border-bottom: 3px double #0f172a; padding-bottom: 15px; margin-bottom: 20px; }
                .header h3 { margin: 2px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; }
                .header h2 { margin: 4px; font-size: 18px; text-transform: uppercase; font-weight: bold; }
                .header p { margin: 2px; font-size: 11px; color: #64748b; }
                .info-table { width: 100%; margin-bottom: 20px; font-size: 12px; }
                .info-table td { padding: 4px 8px; vertical-align: top; }
                .data-table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 11px; }
                .data-table th, .data-table td { border: 1px solid #cbd5e1; padding: 8px; }
                .data-table th { background-color: #f1f5f9; text-transform: uppercase; font-weight: bold; }
                .footer { margin-top: 40px; float: right; text-align: center; font-size: 12px; width: 220px; }
            </style>
        </head>
        <body>
            <div class='header'>
                <h3>{$pemdaName}</h3>
                <h2>{$opdName}</h2>
                <p>SISTEM INFORMASI MANAJEMEN PRESENSI TERINTEGRASI ({$appName})</p>
            </div>

            <h4 style='text-align:center; text-transform:uppercase; margin-bottom:15px;'>
                LAPORAN REKAPITULASI PRESENSI BULANAN<br><span style='font-size:12px; color:#475569;'>PERIODE: {$monthName}</span>
            </h4>

            <table class='info-table'>
                <tr>
                    <td width='15%'><strong>Nama Pegawai</strong></td>
                    <td width='2%'>:</td>
                    <td width='33%'>{$user->name}</td>
                    <td width='15%'><strong>OPD / Instansi</strong></td>
                    <td width='2%'>:</td>
                    <td width='33%'>{$opdName}</td>
                </tr>
                <tr>
                    <td><strong>NIP</strong></td>
                    <td>:</td>
                    <td>{$nip}</td>
                    <td><strong>Jabatan</strong></td>
                    <td>:</td>
                    <td>{$jabatan}</td>
                </tr>
            </table>

            <table class='data-table'>
                <thead>
                    <tr>
                        <th width='5%'>NO</th>
                        <th width='15%'>TANGGAL</th>
                        <th width='12%'>WAKTU</th>
                        <th width='15%'>JENIS PRESENSI</th>
                        <th width='18%'>STATUS</th>
                        <th>KETERANGAN / CATATAN</th>
                    </tr>
                </thead>
                <tbody>
                    {$rows}
                </tbody>
            </table>

            <div class='footer'>
                <p>Soppeng, " . now()->translatedFormat('d F Y') . "</p>
                <p style='margin-top:50px;'><strong>{$user->name}</strong><br>NIP. {$nip}</p>
            </div>
        </body>
        </html>";

        return response($html, 200)->header('Content-Type', 'text/html');
    }
}
