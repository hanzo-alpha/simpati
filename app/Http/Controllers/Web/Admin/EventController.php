<?php

namespace App\Http\Controllers\Web\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreEventRequest;
use App\Models\EventPresensi;
use Illuminate\Support\Str;

class EventController extends Controller
{
    public function index()
    {
        $events = EventPresensi::withCount('participants')->latest()->get()->map(function ($event) {
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
                'participants_count' => $event->participants_count ?? 0,
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
        $data['is_active'] = true;

        EventPresensi::create($data);

        return back()->with('success', 'Event presensi / apel baru berhasil diterbitkan dengan QR Token!');
    }
}
