<?php

namespace Tests\Feature;

use App\Models\Role;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SettingsTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Role::create(['id' => 1, 'name' => 'asn', 'display_name' => 'ASN']);
        Role::create(['id' => 2, 'name' => 'super_admin', 'display_name' => 'Super Admin']);
    }

    public function test_admin_can_view_settings_page(): void
    {
        $admin = User::factory()->create(['nip' => '198001012010011001', 'role_id' => 2]);

        $response = $this->actingAs($admin)->get('/admin/settings');

        $response->assertStatus(200);
    }

    public function test_admin_can_update_settings(): void
    {
        $admin = User::factory()->create(['nip' => '198001012010011002', 'role_id' => 2]);

        $payload = [
            'app_name' => 'SIMPATI Premium',
            'app_tagline' => 'Portal Presensi Digital Terintegrasi',
            'pemda_name' => 'Pemerintah Kab. Soppeng',
            'admin_email' => 'admin@soppengkab.go.id',
            'admin_phone' => '081122334455',

            'jam_buka_masuk' => '06:00',
            'jam_cutoff_harian' => '18:00',
            'toleransi_menit' => 15,
            'potongan_terlambat' => 1.5,
            'potongan_tk' => 5.0,

            'device_binding_enabled' => true,
            'fake_gps_block_enabled' => true,
            'allow_rear_camera' => false,
            'allow_gallery_upload' => false,
            'min_mobile_version' => '1.2.0',
            'force_mobile_update' => false,

            'simpeg_api_url' => 'https://simpeg.soppengkab.go.id/api',
            'simpeg_secret_key' => 'sk_test_key_123',
            'simpeg_auto_sync' => true,
        ];

        $response = $this->actingAs($admin)
            ->post('/admin/settings', $payload);

        $response->assertRedirect();
        $this->assertEquals('SIMPATI Premium', Setting::get('app_name'));
        $this->assertEquals('sk_test_key_123', Setting::get('simpeg_secret_key'));
    }
}
