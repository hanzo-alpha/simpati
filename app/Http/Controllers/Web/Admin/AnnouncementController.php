<?php

namespace App\Http\Controllers\Web\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreAnnouncementRequest;
use App\Http\Requests\Admin\UpdateAnnouncementRequest;
use App\Models\Announcement;
use App\Models\Office;
use App\Services\FcmService;

class AnnouncementController extends Controller
{
    public function index()
    {
        $announcements = Announcement::with('office')->latest()->get()->map(function ($ann) {
            return [
                'id' => $ann->id,
                'judul' => $ann->judul,
                'isi' => $ann->konten ?? '',
                'konten' => $ann->konten ?? '',
                'pinned' => (bool) ($ann->is_active ?? true),
                'kategori' => $ann->kategori ?? 'informasi',
                'office_id' => $ann->office_id,
                'created_at' => $ann->created_at ? $ann->created_at->translatedFormat('d M Y, H:i') : '-',
            ];
        });
        $offices = Office::all();

        return inertia('Admin/Announcements', [
            'announcements' => $announcements,
            'offices' => $offices,
        ]);
    }

    public function store(StoreAnnouncementRequest $request)
    {
        $data = $request->validated();
        $kontenText = $data['konten'] ?? $data['isi'] ?? '';

        $announcement = Announcement::create([
            'office_id' => $data['office_id'] ?? null,
            'judul' => $data['judul'],
            'konten' => $kontenText,
            'kategori' => $data['kategori'] ?? 'informasi',
            'is_active' => $data['pinned'] ?? true,
        ]);

        FcmService::broadcast(
            '📢 Broadcast Edaran Pemda: '.$data['judul'],
            mb_strimwidth(strip_tags($kontenText), 0, 100, '...'),
            $data['office_id'] ?? null,
            ['type' => 'announcement', 'id' => $announcement->id]
        );

        return back()->with('success', 'Pengumuman edaran berhasil dipublikasikan.');
    }

    public function update(UpdateAnnouncementRequest $request, Announcement $announcement)
    {
        $data = $request->validated();
        $kontenText = $data['konten'] ?? $data['isi'] ?? $announcement->konten;

        $announcement->update([
            'office_id' => array_key_exists('office_id', $data) ? $data['office_id'] : $announcement->office_id,
            'judul' => $data['judul'],
            'konten' => $kontenText,
            'kategori' => $data['kategori'] ?? $announcement->kategori ?? 'informasi',
            'is_active' => $data['pinned'] ?? $announcement->is_active ?? true,
        ]);

        return back()->with('success', 'Pengumuman edaran berhasil diperbarui.');
    }

    public function destroy(Announcement $announcement)
    {
        $announcement->delete();

        return back()->with('success', 'Pengumuman edaran berhasil dihapus.');
    }
}
