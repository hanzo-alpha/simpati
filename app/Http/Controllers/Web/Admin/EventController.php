<?php

namespace App\Http\Controllers\Web\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreEventRequest;
use App\Models\EventPresensi;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class EventController extends Controller
{
    public function index()
    {
        $events = EventPresensi::with(['participants.user.office:id,opd_name'])
            ->withCount('participants')
            ->latest()
            ->get()
            ->map(function ($event) {
                return [
                    'id' => $event->id,
                    'nama_kegiatan' => $event->nama_kegiatan,
                    'penyelenggara' => $event->penyelenggara,
                    'tanggal' => $event->tanggal ? (is_string($event->tanggal) ? explode('T', $event->tanggal)[0] : $event->tanggal->format('Y-m-d')) : '-',
                    'jam_mulai' => $event->jam_mulai,
                    'jam_selesai' => $event->jam_selesai,
                    'lokasi' => $event->lokasi,
                    'qr_token' => $event->qr_token,
                    'is_active' => (bool) $event->is_active,
                    'is_expired' => $event->is_expired,
                    'status_label' => $event->status_label,
                    'participants_count' => $event->participants_count ?? 0,
                    'participants' => $event->participants->map(function ($p) {
                        return [
                            'id' => $p->id,
                            'user_name' => $p->user?->name ?? 'Pegawai ASN',
                            'nip' => $p->user?->nip ?? '-',
                            'opd' => $p->user?->office?->opd_name ?? 'Pemerintah Kab. Soppeng',
                            'waktu_presensi' => $p->waktu_presensi ? $p->waktu_presensi->format('d M Y, H:i') : '-',
                            'keterangan' => $p->keterangan ?? 'Hadir Tepat Waktu',
                        ];
                    })->values(),
                ];
            });

        return inertia('Admin/Events', [
            'events' => $events,
        ]);
    }

    public function store(StoreEventRequest $request)
    {
        $data = $request->validated();

        $data['qr_token'] = 'SIMPATI-EVT-'.strtoupper(Str::random(8));
        $data['penyelenggara'] = $data['penyelenggara'] ?? 'Pemerintah Kab. Soppeng';
        $data['is_active'] = $data['is_active'] ?? true;

        EventPresensi::create($data);

        return back()->with('success', 'Event presensi / apel baru berhasil diterbitkan dengan QR Token!');
    }

    public function update(Request $request, EventPresensi $eventPresensi)
    {
        $data = $request->validate([
            'nama_kegiatan' => 'required|string|max:255',
            'penyelenggara' => 'required|string|max:255',
            'tanggal' => 'required|date',
            'jam_mulai' => 'required|string',
            'jam_selesai' => 'required|string',
            'lokasi' => 'required|string|max:255',
            'is_active' => 'required|boolean',
        ]);

        $eventPresensi->update($data);

        return back()->with('success', 'Data event / apel presensi berhasil diperbarui!');
    }

    public function destroy(EventPresensi $eventPresensi)
    {
        $eventPresensi->participants()->delete();
        $eventPresensi->delete();

        return back()->with('success', 'Event presensi / apel beserta riwayat peserta berhasil dihapus!');
    }
}
