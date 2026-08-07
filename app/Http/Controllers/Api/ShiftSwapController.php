<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ShiftSwapRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ShiftSwapController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        $requests = ShiftSwapRequest::with(['requester.profile', 'targetUser.profile', 'approver:id,name'])
            ->where('user_id', $user->id)
            ->orWhere('target_user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json(['shift_swaps' => $requests]);
    }

    public function subordinatesIndex(Request $request): JsonResponse
    {
        $user = $request->user();

        $query = ShiftSwapRequest::with(['requester.profile', 'requester.office', 'targetUser.profile', 'approver:id,name'])
            ->orderBy('created_at', 'desc');

        if ($user->isSuperAdmin()) {
            // Super Admin can see all
        } elseif ($user->isAdminOpd()) {
            $query->whereHas('requester', function ($q) use ($user) {
                $q->where('office_id', $user->office_id);
            });
        } else {
            $query->whereHas('requester', function ($q) use ($user) {
                $q->where('supervisor_id', $user->id)
                    ->orWhere('office_id', $user->office_id);
            })->where('user_id', '!=', $user->id);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        return response()->json(['shift_swaps' => $query->get()]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'target_user_id' => ['required', 'exists:users,id'],
            'tanggal_shift' => ['required', 'date'],
            'alasan' => ['required', 'string'],
        ]);

        $swap = ShiftSwapRequest::create([
            'user_id' => $request->user()->id,
            'target_user_id' => $validated['target_user_id'],
            'tanggal_shift' => $validated['tanggal_shift'],
            'alasan' => $validated['alasan'],
            'status' => 'menunggu',
        ]);

        return response()->json([
            'message' => 'Pengajuan tukar shift berhasil dikirim',
            'shift_swap' => $swap->load(['requester', 'targetUser']),
        ], 201);
    }

    public function updateStatus(Request $request, ShiftSwapRequest $shiftSwap): JsonResponse
    {
        $validated = $request->validate([
            'status' => ['required', 'in:disetujui,ditolak'],
        ]);

        $shiftSwap->update([
            'status' => $validated['status'],
            'approved_by' => $request->user()->id,
        ]);

        return response()->json([
            'message' => 'Status tukar shift berhasil diperbarui',
            'shift_swap' => $shiftSwap,
        ]);
    }
}
