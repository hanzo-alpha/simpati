<?php

namespace App\Http\Controllers\Web\Admin;

use App\Enums\LeaveStatus;
use App\Enums\LeaveType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateLeaveStatusRequest;
use App\Models\LeaveRequest;
use App\Services\FcmService;

class LeaveRequestController extends Controller
{
    public function index()
    {
        $requests = LeaveRequest::with(['user.office', 'user.profile'])->latest()->get()->map(function ($req) {
            return [
                'id' => $req->id,
                'user' => [
                    'name' => $req->user->name ?? '-',
                    'nip' => $req->user->profile?->nip ?? $req->user->nip ?? '-',
                    'opd' => $req->user->office->opd_name ?? '-',
                ],
                'type' => $req->type->value ?? $req->type,
                'type_label' => $req->type_label,
                'tanggal_mulai' => $req->tanggal_mulai ? $req->tanggal_mulai->translatedFormat('d F Y') : '-',
                'tanggal_selesai' => $req->tanggal_selesai ? $req->tanggal_selesai->translatedFormat('d F Y') : '-',
                'duration' => $req->duration,
                'alasan' => $req->alasan,
                'status' => $req->status->value ?? $req->status,
                'status_label' => $req->status_label,
            ];
        });

        return inertia('Admin/LeaveRequests', [
            'requests' => $requests,
        ]);
    }

    public function update(UpdateLeaveStatusRequest $request, LeaveRequest $leaveRequest)
    {
        $data = $request->validated();
        $leaveRequest->update([
            'status' => $data['status'],
            'approved_by' => $request->user()->id,
            'approved_at' => now(),
        ]);

        $statusStr = $data['status'] instanceof LeaveStatus ? $data['status']->value : (string) $data['status'];
        $isApproved = ($statusStr === LeaveStatus::DISETUJUI->value);

        if ($isApproved && $leaveRequest->type === LeaveType::CUTI) {
            $profile = $leaveRequest->user->profile;
            if ($profile) {
                $profile->decrement('sisa_cuti_tahunan', $leaveRequest->duration);
            }
        }

        if ($leaveRequest->user) {
            $statusLabel = $isApproved ? 'DISETUJUI' : 'DITOLAK';
            FcmService::sendToUser(
                $leaveRequest->user,
                "Status Pengajuan Izin: $statusLabel",
                "Permohonan {$leaveRequest->type_label} Anda pada tanggal {$leaveRequest->tanggal_mulai->format('d/m/Y')} telah $statusLabel oleh Atasan/Admin.",
                ['type' => 'leave_request_status', 'id' => $leaveRequest->id]
            );
        }

        return back()->with('success', 'Pengajuan izin/cuti berhasil diperbarui.');
    }
}
