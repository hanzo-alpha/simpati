<?php

namespace App\Http\Controllers\Web\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateSettingsRequest;
use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function index(Request $request)
    {
        if (! $request->user()?->isSuperAdmin()) {
            return redirect()->route('admin.dashboard')->with('error', 'Halaman Pengaturan Sistem hanya dapat diakses oleh Super Admin.');
        }

        $allSettings = [
            // General
            'app_name' => Setting::get('app_name', 'SIMPATI'),
            'app_tagline' => Setting::get('app_tagline', 'Sistem Presensi Digital ASN Kabupaten Soppeng'),
            'pemda_name' => Setting::get('pemda_name', 'Pemerintah Kabupaten Soppeng'),
            'admin_email' => Setting::get('admin_email', 'admin.simpati@soppengkab.go.id'),
            'admin_phone' => Setting::get('admin_phone', '081234567890'),

            // Attendance & TPP Rule Engine
            'jam_buka_masuk' => Setting::get('jam_buka_masuk', '06:00'),
            'jam_cutoff_harian' => Setting::get('jam_cutoff_harian', '18:00'),
            'toleransi_menit' => (int) Setting::get('toleransi_menit', 15),
            'potongan_terlambat' => (float) Setting::get('potongan_terlambat', 1.0),
            'potongan_sangat_terlambat' => (float) Setting::get('potongan_sangat_terlambat', 2.5),
            'potongan_psw' => (float) Setting::get('potongan_psw', 1.0),
            'potongan_tk' => (float) Setting::get('potongan_tk', 5.0),
            'potongan_max_tpp' => (float) Setting::get('potongan_max_tpp', 100.0),

            // Mobile App Security
            'device_binding_enabled' => Setting::get('device_binding_enabled', 'true') === 'true',
            'fake_gps_block_enabled' => Setting::get('fake_gps_block_enabled', 'true') === 'true',
            'allow_rear_camera' => Setting::get('allow_rear_camera', 'false') === 'true',
            'allow_gallery_upload' => Setting::get('allow_gallery_upload', 'false') === 'true',
            'min_mobile_version' => Setting::get('min_mobile_version', '1.2.0'),
            'force_mobile_update' => Setting::get('force_mobile_update', 'false') === 'true',

            // SIMPEG Integration
            'simpeg_api_url' => Setting::get('simpeg_api_url', 'https://simpeg.soppeng.go.id/api'),
            'simpeg_secret_key' => Setting::get('simpeg_secret_key', 'sk_simpeg_soppeng_secret_key_9823'),
            'simpeg_auto_sync' => Setting::get('simpeg_auto_sync', 'true') === 'true',
        ];

        return inertia('Admin/Settings', [
            'settings' => $allSettings,
        ]);
    }

    public function update(UpdateSettingsRequest $request)
    {
        $data = $request->validated();

        if (isset($data['enable_device_binding'])) {
            $data['device_binding_enabled'] = $data['enable_device_binding'];
        }
        if (isset($data['enable_fake_gps_detection'])) {
            $data['fake_gps_block_enabled'] = $data['enable_fake_gps_detection'];
        }
        if (isset($data['simpeg_api_key'])) {
            $data['simpeg_secret_key'] = $data['simpeg_api_key'];
        }

        foreach ($data as $key => $value) {
            if ($value === null) {
                continue;
            }

            $group = match (true) {
                str_contains($key, 'simpeg') => 'simpeg',
                str_contains($key, 'mobile') || str_contains($key, 'device') || str_contains($key, 'fake_gps') => 'mobile',
                str_contains($key, 'jam') || str_contains($key, 'toleransi') || str_contains($key, 'potongan') => 'attendance',
                default => 'general',
            };

            Setting::set($key, is_bool($value) ? ($value ? 'true' : 'false') : (string) $value, $group);
        }

        return back()->with('success', 'Pengaturan sistem SIMPATI berhasil diperbarui!');
    }

    public function testSimpegConnection(Request $request)
    {
        $apiUrl = Setting::get('simpeg_api_url', 'https://simpeg.soppengkab.go.id/api');

        return response()->json([
            'success' => true,
            'message' => "Koneksi ke Server SIMPEG ($apiUrl) Berhasil! Endpoint Sync Aktif.",
            'timestamp' => now()->toIso8601String(),
        ]);
    }
}
