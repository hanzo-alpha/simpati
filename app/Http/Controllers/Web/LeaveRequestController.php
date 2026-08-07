<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreLeaveRequestRequest;
use App\Models\LeaveRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LeaveRequestController extends Controller
{
    /**
     * Riwayat Pengajuan page.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();

        $leaveRequests = LeaveRequest::where('user_id', $user->id)
            ->with('approver:id,name')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(fn ($lr) => [
                ...$lr->toArray(),
                'duration' => $lr->duration,
                'type_label' => $lr->type_label,
                'status_label' => $lr->status_label,
            ]);

        $summary = [
            'total' => $leaveRequests->count(),
            'menunggu' => $leaveRequests->where('status', 'menunggu')->count(),
            'disetujui' => $leaveRequests->where('status', 'disetujui')->count(),
            'ditolak' => $leaveRequests->where('status', 'ditolak')->count(),
        ];

        return Inertia::render('LeaveRequests/Index', [
            'leaveRequests' => $leaveRequests,
            'summary' => $summary,
        ]);
    }

    /**
     * Form Pengajuan Baru page.
     */
    public function create(Request $request): Response
    {
        $sisaCuti = $request->user()->profile?->sisa_cuti_tahunan ?? 12;

        return Inertia::render('LeaveRequests/Create', [
            'sisaCuti' => $sisaCuti,
        ]);
    }

    /**
     * Store a new leave request.
     */
    public function store(StoreLeaveRequestRequest $request)
    {
        $validated = $request->validated();

        $user = $request->user();

        // Validate cuti balance
        if ($validated['type'] === 'cuti') {
            $sisaCuti = $user->profile?->sisa_cuti_tahunan ?? 0;
            $duration = now()->parse($validated['tanggal_mulai'])
                ->diffInDays(now()->parse($validated['tanggal_selesai'])) + 1;
            if ($duration > $sisaCuti) {
                return back()->withErrors(['tanggal_selesai' => "Sisa cuti tidak mencukupi. Sisa: {$sisaCuti} hari."]);
            }
        }

        $lampiranPath = null;
        if ($request->hasFile('lampiran')) {
            $lampiranPath = $request->file('lampiran')
                ->store("pengajuan/{$user->id}/".now()->format('Y/m'), 'public');
        }

        LeaveRequest::create([
            'user_id' => $user->id,
            'type' => $validated['type'],
            'tanggal_mulai' => $validated['tanggal_mulai'],
            'tanggal_selesai' => $validated['tanggal_selesai'],
            'alasan' => $validated['alasan'],
            'lampiran_path' => $lampiranPath,
        ]);

        return redirect('/pengajuan')->with('success', 'Pengajuan berhasil diajukan.');
    }
}
