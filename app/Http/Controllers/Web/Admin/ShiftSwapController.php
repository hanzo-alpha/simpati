<?php

namespace App\Http\Controllers\Web\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateShiftSwapStatusRequest;
use App\Models\ShiftSwapRequest;

class ShiftSwapController extends Controller
{
    public function index()
    {
        $swaps = ShiftSwapRequest::with(['requester.office', 'targetUser', 'approver'])->latest()->get();

        return inertia('Admin/ShiftSwaps', [
            'swaps' => $swaps,
        ]);
    }

    public function updateStatus(UpdateShiftSwapStatusRequest $request, ShiftSwapRequest $shiftSwap)
    {
        $data = $request->validated();

        $shiftSwap->update([
            'status' => $data['status'],
            'approved_by' => $request->user()->id,
            'approved_at' => now(),
        ]);

        return back()->with('success', 'Status pengajuan tukar shift berhasil diperbarui.');
    }
}
