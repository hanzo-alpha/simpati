<?php

namespace App\Http\Controllers\Api;

use App\Enums\AttendanceStatus;
use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\AttendanceCorrection;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AttendanceCorrectionController extends Controller
{
    /**
     * List user's attendance correction requests.
     */
    public function index(Request $request): JsonResponse
    {
        $corrections = AttendanceCorrection::with('approver:id,name')
            ->where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json(['corrections' => $corrections]);
    }

    /**
     * List subordinates' attendance correction requests for supervisor approval.
     */
    public function subordinatesIndex(Request $request): JsonResponse
    {
        $user = $request->user();

        $query = AttendanceCorrection::with(['user.profile', 'user.office', 'approver:id,name'])
            ->orderBy('created_at', 'desc');

        if ($user->isSuperAdmin()) {
            // Super Admin can see all
        } elseif ($user->isAdminOpd()) {
            $query->whereHas('user', function ($q) use ($user) {
                $q->where('office_id', $user->office_id);
            });
        } else {
            $query->whereHas('user', function ($q) use ($user) {
                $q->where('supervisor_id', $user->id)
                    ->orWhere('office_id', $user->office_id);
            })->where('user_id', '!=', $user->id);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        return response()->json(['corrections' => $query->get()]);
    }

    /**
     * Store a new attendance correction request.
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'tanggal' => 'required|date',
            'jenis' => 'required|string|in:masuk,istirahat,kembali,pulang',
            'jam_koreksi' => 'required|date_format:H:i',
            'alasan' => 'required|string',
            'lampiran' => 'nullable|file|mimes:jpeg,png,jpg,pdf|max:5120',
        ]);

        $lampiranPath = null;
        if ($request->hasFile('lampiran')) {
            $lampiranPath = $request->file('lampiran')->store('koreksi_presensi', 'public');
        }

        $correction = AttendanceCorrection::create([
            'user_id' => $request->user()->id,
            'tanggal' => $data['tanggal'],
            'jenis' => $data['jenis'],
            'jam_koreksi' => $data['jam_koreksi'].':00',
            'alasan' => $data['alasan'],
            'lampiran_path' => $lampiranPath,
            'status' => 'menunggu',
        ]);

        return response()->json([
            'message' => 'Pengajuan koreksi presensi berhasil dikirim.',
            'correction' => $correction,
        ], 201);
    }

    /**
     * Approve or reject an attendance correction request.
     */
    public function updateStatus(Request $request, AttendanceCorrection $attendanceCorrection): JsonResponse
    {
        $data = $request->validate([
            'status' => 'required|in:disetujui,ditolak',
            'catatan_approval' => 'nullable|string',
        ]);

        $attendanceCorrection->update([
            'status' => $data['status'],
            'approved_by' => $request->user()->id,
            'catatan_approval' => $data['catatan_approval'] ?? null,
        ]);

        if ($data['status'] === 'disetujui') {
            $targetUser = $attendanceCorrection->user;
            $office = $targetUser?->office;
            $tanggalStr = Carbon::parse($attendanceCorrection->tanggal)->toDateString();

            // Create or update attendance record
            Attendance::updateOrCreate(
                [
                    'user_id' => $attendanceCorrection->user_id,
                    'tanggal' => $tanggalStr,
                    'jenis' => $attendanceCorrection->jenis,
                ],
                [
                    'waktu' => $attendanceCorrection->jam_koreksi,
                    'latitude' => $office?->latitude ?? 0,
                    'longitude' => $office?->longitude ?? 0,
                    'status' => AttendanceStatus::TEPAT_WAKTU->value,
                    'in_radius' => true,
                    'keterangan' => "Koreksi Presensi Disetujui (Ref #{$attendanceCorrection->id})",
                ]
            );
        }

        return response()->json([
            'message' => 'Status pengajuan koreksi presensi berhasil diperbarui.',
            'correction' => $attendanceCorrection,
        ]);
    }
}
