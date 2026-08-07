<?php

namespace App\Http\Controllers\Web\Admin;

use App\Enums\AttendanceStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateCorrectionStatusRequest;
use App\Models\Attendance;
use App\Models\AttendanceCorrection;
use Carbon\Carbon;

class CorrectionController extends Controller
{
    public function index()
    {
        $corrections = AttendanceCorrection::with(['user.office', 'user.profile', 'approver'])->latest()->get();

        return inertia('Admin/AttendanceCorrections', [
            'corrections' => $corrections,
        ]);
    }

    public function updateStatus(UpdateCorrectionStatusRequest $request, AttendanceCorrection $attendanceCorrection)
    {
        $data = $request->validated();

        $attendanceCorrection->update([
            'status' => $data['status'],
            'approved_by' => $request->user()->id,
            'catatan_approval' => $data['catatan_admin'] ?? $data['catatan_approval'] ?? null,
        ]);

        if ($data['status'] === 'disetujui') {
            $targetUser = $attendanceCorrection->user;
            $office = $targetUser?->office;
            $tanggalStr = Carbon::parse($attendanceCorrection->tanggal)->toDateString();

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

        return back()->with('success', 'Status pengajuan koreksi presensi berhasil diperbarui.');
    }
}
