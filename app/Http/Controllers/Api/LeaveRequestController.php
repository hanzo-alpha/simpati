<?php

namespace App\Http\Controllers\Api;

use App\Enums\LeaveStatus;
use App\Enums\LeaveType;
use App\Http\Controllers\Controller;
use App\Models\LeaveRequest;
use App\Models\User;
use App\Services\FcmService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rules\Enum;

class LeaveRequestController extends Controller
{
    /**
     * List leave requests for the authenticated user.
     */
    public function index(Request $request): JsonResponse
    {
        $query = LeaveRequest::where('user_id', $request->user()->id)
            ->with('approver:id,name')
            ->orderBy('created_at', 'desc');

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $requests = $query->paginate(15);

        return response()->json($requests);
    }

    /**
     * List leave requests from subordinates for approval.
     */
    public function subordinatesIndex(Request $request): JsonResponse
    {
        $user = $request->user();

        $query = LeaveRequest::with(['user.profile', 'user.office', 'approver:id,name'])
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

        $requests = $query->paginate(20);

        return response()->json($requests);
    }

    /**
     * Store a new leave request.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'type' => ['required', new Enum(LeaveType::class)],
            'tanggal_mulai' => 'required|date|after_or_equal:today',
            'tanggal_selesai' => 'required|date|after_or_equal:tanggal_mulai',
            'alasan' => 'required|string|max:1000',
            'lampiran' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:10240', // 10MB
        ]);

        $user = $request->user();

        // Check cuti balance if type is cuti
        if ($validated['type'] === LeaveType::CUTI->value || $validated['type'] === LeaveType::CUTI) {
            $sisaCuti = $user->profile?->sisa_cuti_tahunan ?? 0;
            $duration = now()->parse($validated['tanggal_mulai'])
                ->diffInDays(now()->parse($validated['tanggal_selesai'])) + 1;

            if ($duration > $sisaCuti) {
                return response()->json([
                    'message' => "Sisa cuti Anda tidak mencukupi. Sisa: {$sisaCuti} hari.",
                ], 422);
            }
        }

        // Upload attachment
        $lampiranPath = null;
        if ($request->hasFile('lampiran')) {
            $lampiranPath = $request->file('lampiran')
                ->store("pengajuan/{$user->id}/".now()->format('Y/m'), 'public');
        }

        $leaveRequest = LeaveRequest::create([
            'user_id' => $user->id,
            'type' => $validated['type'],
            'tanggal_mulai' => $validated['tanggal_mulai'],
            'tanggal_selesai' => $validated['tanggal_selesai'],
            'alasan' => $validated['alasan'],
            'lampiran_path' => $lampiranPath,
            'status' => LeaveStatus::MENUNGGU->value,
        ]);

        // Send Real-time Push Notification to Atasan & Admin OPD
        try {
            $typeLabel = $leaveRequest->type_label;
            $title = "Pengajuan {$typeLabel} Baru";
            $body = "Pegawai {$user->name} (NIP: {$user->nip}) mengajukan {$typeLabel} mulai tanggal ".now()->parse($validated['tanggal_mulai'])->format('d/m/Y').'.';

            // 1. Notify Direct Supervisor
            if ($user->supervisor) {
                FcmService::sendToUser(
                    $user->supervisor,
                    $title,
                    $body,
                    ['type' => 'leave_request', 'id' => $leaveRequest->id]
                );
            }

            // 2. Notify OPD Admins & Super Admins
            $adminTokens = User::where(function ($q) use ($user) {
                $q->where('office_id', $user->office_id)
                    ->whereHas('role', fn ($r) => $r->where('name', 'admin_opd'));
            })
                ->orWhereHas('role', fn ($r) => $r->where('name', 'super_admin'))
                ->whereNotNull('fcm_token')
                ->pluck('fcm_token')
                ->filter()
                ->toArray();

            if (! empty($adminTokens)) {
                FcmService::send(
                    $adminTokens,
                    $title,
                    $body,
                    ['type' => 'leave_request', 'id' => $leaveRequest->id]
                );
            }
        } catch (\Throwable $e) {
            Log::error('Notification error on leave request creation: '.$e->getMessage());
        }

        return response()->json([
            'message' => 'Pengajuan berhasil diajukan.',
            'leave_request' => $leaveRequest->load('user'),
        ], 201);
    }

    /**
     * View a specific leave request.
     */
    public function show(Request $request, LeaveRequest $leaveRequest): JsonResponse
    {
        // Ensure user can only see their own requests
        if ($leaveRequest->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Tidak diizinkan.'], 403);
        }

        return response()->json([
            'leave_request' => $leaveRequest->load('approver:id,name'),
        ]);
    }

    /**
     * Approve or reject a leave request (for supervisors/admins).
     */
    public function updateStatus(Request $request, LeaveRequest $leaveRequest): JsonResponse
    {
        $request->validate([
            'status' => ['required', new Enum(LeaveStatus::class)],
            'catatan_approval' => 'nullable|string|max:500',
        ]);

        if (! $leaveRequest->isPending()) {
            return response()->json([
                'message' => 'Pengajuan ini sudah diproses.',
            ], 422);
        }

        $leaveRequest->update([
            'status' => $request->status,
            'approved_by' => $request->user()->id,
            'catatan_approval' => $request->catatan_approval,
            'approved_at' => now(),
        ]);

        // Deduct cuti balance if approved and type is cuti
        if (($request->status === LeaveStatus::DISETUJUI->value || $request->status === LeaveStatus::DISETUJUI) && $leaveRequest->type === LeaveType::CUTI) {
            $profile = $leaveRequest->user->profile;
            if ($profile) {
                $profile->decrement('sisa_cuti_tahunan', $leaveRequest->duration);
            }
        }

        return response()->json([
            'message' => 'Pengajuan berhasil '.(($request->status === LeaveStatus::DISETUJUI->value || $request->status === LeaveStatus::DISETUJUI) ? 'disetujui' : 'ditolak').'.',
            'leave_request' => $leaveRequest->fresh()->load('approver:id,name'),
        ]);
    }
}
