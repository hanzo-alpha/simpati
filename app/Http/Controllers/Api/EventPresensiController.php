<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\EventPresensi;
use App\Models\EventPresensiParticipant;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EventPresensiController extends Controller
{
    /**
     * Get active events for today and user attendance status.
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        $today = now()->toDateString();

        $events = EventPresensi::with(['participants' => function ($q) use ($user) {
            $q->where('user_id', $user->id);
        }])
            ->where('tanggal', $today)
            ->where('is_active', true)
            ->get()
            ->reject(fn ($event) => $event->is_expired)
            ->map(function ($event) {
                $participant = $event->participants->first();

                return [
                    'id' => $event->id,
                    'nama_kegiatan' => $event->nama_kegiatan,
                    'penyelenggara' => $event->penyelenggara,
                    'tanggal' => $event->tanggal->toDateString(),
                    'jam_mulai' => $event->jam_mulai,
                    'jam_selesai' => $event->jam_selesai,
                    'lokasi' => $event->lokasi,
                    'qr_token' => $event->qr_token,
                    'status' => $event->status->value,
                    'status_label' => $event->status_label,
                    'is_expired' => $event->is_expired,
                    'is_attended' => $participant !== null,
                    'waktu_presensi' => $participant ? $participant->waktu_presensi->format('H:i:s') : null,
                ];
            })
            ->values();

        return response()->json([
            'success' => true,
            'events' => $events,
        ]);
    }

    /**
     * Submit event presensi via QR token / event token.
     */
    public function scan(Request $request): JsonResponse
    {
        $data = $request->validate([
            'qr_token' => 'required|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
        ]);

        $token = trim($data['qr_token']);
        $event = EventPresensi::where('qr_token', $token)
            ->where('is_active', true)
            ->first();

        if (! $event || $event->is_expired) {
            return response()->json([
                'success' => false,
                'message' => 'Kode QR / Token Event Kegiatan tidak valid, belum dimulai, atau telah berakhir.',
            ], 404);
        }

        $user = $request->user();

        $existing = EventPresensiParticipant::where('event_presensi_id', $event->id)
            ->where('user_id', $user->id)
            ->first();

        if ($existing) {
            return response()->json([
                'success' => true,
                'message' => "Anda sudah melakukan presensi pada event '{$event->nama_kegiatan}'.",
                'participant' => $existing,
            ]);
        }

        $participant = EventPresensiParticipant::create([
            'event_presensi_id' => $event->id,
            'user_id' => $user->id,
            'waktu_presensi' => now(),
            'latitude' => $data['latitude'] ?? null,
            'longitude' => $data['longitude'] ?? null,
            'keterangan' => 'Presensi QR Event via SIMPATI Mobile',
        ]);

        return response()->json([
            'success' => true,
            'message' => "Berhasil presensi pada kegiatan '{$event->nama_kegiatan}'!",
            'event' => $event,
            'participant' => $participant,
        ]);
    }
}
