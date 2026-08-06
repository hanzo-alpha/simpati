<?php

namespace App\Http\Controllers\Api;

use App\Enums\AttendanceStatus;
use App\Enums\AttendanceType;
use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\Setting;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Enum;

class AttendanceController extends Controller
{
    /**
     * Submit a new attendance record.
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'jenis' => ['required', new Enum(AttendanceType::class)],
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'foto_selfie' => 'required|image|max:5120', // 5MB max
            'is_mocked' => 'nullable|boolean',
            'is_live_photo' => 'nullable|boolean',
            'device_id' => 'nullable|string',
        ]);

        // Fake GPS / Mock Location validation
        if ($request->boolean('is_mocked')) {
            return response()->json([
                'message' => 'Presensi ditolak! Terdeteksi penggunaan Fake GPS / Lokasi Palsu.',
            ], 422);
        }

        $user = $request->user();

        // Single Device Binding validation
        if ($user->device_id && $request->filled('device_id') && $user->device_id !== $request->device_id) {
            return response()->json([
                'message' => 'Presensi ditolak! Akun Anda terikat pada perangkat HP lain.',
            ], 422);
        }
        $office = $user->office;

        // Strict Cutoff Check (18:00 Wita)
        $nowWita = Carbon::now('Asia/Makassar');
        if ($nowWita->hour >= 18) {
            return response()->json([
                'message' => 'Batas waktu presensi hari ini telah ditutup (18:00 WITA).',
            ], 422);
        }

        if (! $office) {
            return response()->json([
                'message' => 'Kantor belum dikonfigurasi. Hubungi admin.',
            ], 422);
        }

        // Validate GPS radius
        $inRadius = $office->isWithinRadius($request->latitude, $request->longitude);
        $distance = $office->calculateDistance($request->latitude, $request->longitude);

        $isOutOfOfficeType = in_array($request->jenis, [
            AttendanceType::DINAS_LUAR->value,
            AttendanceType::WFH->value,
            'dinas_luar',
            'wfh',
        ]);

        if (! $inRadius && ! $isOutOfOfficeType) {
            return response()->json([
                'message' => 'Anda berada di luar radius kantor.',
                'distance' => round($distance),
                'radius' => $office->radius_meters,
            ], 422);
        }

        // Check for duplicate attendance on same date and type
        $existing = Attendance::where('user_id', $user->id)
            ->where('tanggal', now()->toDateString())
            ->where('jenis', $request->jenis)
            ->first();

        if ($existing) {
            return response()->json([
                'message' => "Anda sudah melakukan presensi {$request->jenis} hari ini.",
            ], 422);
        }

        // Store selfie photo
        $fotoPath = $request->file('foto_selfie')
            ->store("presensi/{$user->id}/".now()->format('Y/m'), 'public');

        // Determine status based on work schedule or out-of-office type
        $status = $isOutOfOfficeType
            ? AttendanceStatus::MENUNGGU_PERSETUJUAN
            : $this->determineStatus($user, $request->jenis);

        $attendance = Attendance::create([
            'user_id' => $user->id,
            'tanggal' => now()->toDateString(),
            'jenis' => $request->jenis,
            'waktu' => now()->format('H:i:s'),
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'foto_selfie_path' => $fotoPath,
            'status' => $status,
            'in_radius' => $inRadius,
        ]);

        return response()->json([
            'message' => 'Presensi berhasil dicatat.',
            'attendance' => $attendance,
            'distance' => round($distance),
        ], 201);
    }

    /**
     * Get today's attendance for the authenticated user.
     */
    public function today(Request $request): JsonResponse
    {
        $user = $request->user();
        $attendances = Attendance::forUserOnDate($user->id, now()->toDateString())
            ->orderBy('waktu')
            ->get();

        $stats = [
            'hadir' => Attendance::where('user_id', $user->id)
                ->where('tanggal', 'like', now()->format('Y-m').'%')
                ->where('jenis', 'masuk')
                ->whereIn('status', [AttendanceStatus::TEPAT_WAKTU, AttendanceStatus::TERLAMBAT])
                ->count(),
            'terlambat' => Attendance::where('user_id', $user->id)
                ->where('tanggal', 'like', now()->format('Y-m').'%')
                ->where('status', AttendanceStatus::TERLAMBAT)
                ->count(),
            'alpha' => 0, // Simplified for now, or use complex logic if available
        ];

        return response()->json([
            'attendances' => $attendances,
            'office' => $user->office,
            'stats' => $stats,
            'camera_settings' => [
                'allow_rear_camera' => Setting::get('allow_rear_camera', 'false') === 'true',
                'allow_gallery_upload' => Setting::get('allow_gallery_upload', 'false') === 'true',
            ],
        ]);
    }

    /**
     * Get attendance history for a specific month.
     */
    public function history(Request $request): JsonResponse
    {
        $request->validate([
            'year' => 'nullable|integer|min:2020',
            'month' => 'nullable|integer|min:1|max:12',
        ]);

        $year = $request->input('year', now()->year);
        $month = $request->input('month', now()->month);

        $attendances = Attendance::where('user_id', $request->user()->id)
            ->forMonth($year, $month)
            ->orderBy('tanggal', 'desc')
            ->orderBy('waktu')
            ->get()
            ->groupBy('tanggal');

        return response()->json(['attendances' => $attendances]);
    }

    /**
     * Get work schedules for the user's office.
     */
    public function getSchedule(Request $request): JsonResponse
    {
        $office = $request->user()->office;
        if (! $office) {
            return response()->json(['schedule' => []]);
        }

        $schedules = $office->workSchedules()
            ->where('is_active', true)
            ->get();

        return response()->json(['schedules' => $schedules]);
    }

    /**
     * Export monthly attendance summary for the authenticated user as PDF/JSON data.
     */
    public function exportPdf(Request $request): JsonResponse
    {
        $user = $request->user();
        $year = $request->input('year', now()->year);
        $month = $request->input('month', now()->month);

        $attendances = Attendance::where('user_id', $user->id)
            ->forMonth($year, $month)
            ->orderBy('tanggal', 'asc')
            ->orderBy('waktu', 'asc')
            ->get();

        $stats = [
            'total_hadir' => $attendances->where('jenis', 'masuk')->count(),
            'tepat_waktu' => $attendances->where('status', AttendanceStatus::TEPAT_WAKTU->value ?? 'tepat_waktu')->count(),
            'terlambat' => $attendances->where('status', AttendanceStatus::TERLAMBAT->value ?? 'terlambat')->count(),
            'dinas_luar' => $attendances->where('jenis', 'dinas_luar')->count(),
        ];

        return response()->json([
            'title' => "REKAPITULASI PRESENSI ASN - PERIODE {$month}/{$year}",
            'user' => $user->load(['office', 'profile']),
            'period' => sprintf('%02d-%d', $month, $year),
            'stats' => $stats,
            'attendances' => $attendances,
        ]);
    }

    /**
     * Get live locations of subordinates for supervisor real-time monitoring map.
     */
    public function liveLocations(Request $request): JsonResponse
    {
        $user = $request->user();
        $subordinateIds = User::where('supervisor_id', $user->id)
            ->orWhere('office_id', $user->office_id)
            ->pluck('id');

        $todayAttendances = Attendance::with(['user.profile', 'user.office'])
            ->whereIn('user_id', $subordinateIds)
            ->whereDate('tanggal', now()->toDateString())
            ->get();

        return response()->json([
            'live_locations' => $todayAttendances,
        ]);
    }

    /**
     * Determine attendance status based on work schedule.
     */
    private function determineStatus($user, string $jenis): AttendanceStatus
    {
        $statusJenis = AttendanceType::tryFrom($jenis) ?? $jenis;

        $schedule = WorkSchedule::getScheduleForOffice($user->office_id);

        if (! $schedule || $statusJenis !== AttendanceType::MASUK) {
            return AttendanceStatus::TEPAT_WAKTU;
        }

        $jamMasuk = $schedule->jam_masuk;
        if (! $jamMasuk) {
            return AttendanceStatus::TEPAT_WAKTU;
        }

        $now = now();
        $batasWaktu = Carbon::parse($jamMasuk);
        $batasToleransi = $batasWaktu->copy()->addMinutes($schedule->toleransi_menit ?? 15);
        $batasSangatTerlambat = $batasWaktu->copy()->addMinutes(60);

        if ($now->lte($batasToleransi)) {
            return AttendanceStatus::TEPAT_WAKTU;
        } elseif ($now->lte($batasSangatTerlambat)) {
            return AttendanceStatus::TERLAMBAT;
        }

        return AttendanceStatus::SANGAT_TERLAMBAT;
    }

    /**
     * Scan QR Code NIP for physical attendance / event check-in.
     */
    public function scanQr(Request $request): JsonResponse
    {
        $data = $request->validate([
            'qr_code' => 'required|string',
            'acara' => 'nullable|string',
        ]);

        // Clean NIP string (extract NIP:196801011990011001 or raw NIP)
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
                'message' => "Pegawai dengan NIP '$nip' tidak ditemukan dalam database SIMPATI.",
            ], 404);
        }

        $today = now()->toDateString();
        $acaraName = $data['acara'] ?? 'Acara Kedinasan / Apel';

        // Check if attendance already exists for today
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
                'status' => $attendance->status->value ?? 'tepat_waktu',
                'keterangan' => $attendance->keterangan,
            ],
        ]);
    }
}
