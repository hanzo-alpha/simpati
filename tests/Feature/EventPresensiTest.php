<?php

namespace Tests\Feature;

use App\Models\EventPresensi;
use App\Models\Office;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class EventPresensiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        Role::create(['id' => 1, 'name' => 'asn', 'display_name' => 'ASN']);
        Role::create(['id' => 2, 'name' => 'super_admin', 'display_name' => 'Super Admin']);

        Office::create([
            'id' => 1,
            'name' => 'Kantor Utama',
            'opd_name' => 'Setda',
            'latitude' => -4.3422,
            'longitude' => 120.0123,
            'radius_meters' => 150,
        ]);
    }

    public function test_admin_can_create_event_presensi(): void
    {
        $admin = User::factory()->create(['nip' => '198001012010011001', 'role_id' => 2]);

        $response = $this->actingAs($admin)->post('/admin/events', [
            'nama_kegiatan' => 'Apel Kesadaran Nasional',
            'penyelenggara' => 'BKPSDM Kab. Soppeng',
            'tanggal' => now()->toDateString(),
            'jam_mulai' => '07:30',
            'jam_selesai' => '09:00',
            'lokasi' => 'Halaman Kantor Bupati Soppeng',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('event_presensis', [
            'nama_kegiatan' => 'Apel Kesadaran Nasional',
        ]);
    }

    public function test_user_can_scan_event_qr_token(): void
    {
        $user = User::factory()->create([
            'nip' => '199001012020011099',
            'role_id' => 1,
            'office_id' => 1,
        ]);

        $event = EventPresensi::create([
            'nama_kegiatan' => 'Upacara Hari Kesehatan Nasional',
            'penyelenggara' => 'Dinkes Soppeng',
            'tanggal' => now()->toDateString(),
            'jam_mulai' => '07:00:00',
            'jam_selesai' => '09:00:00',
            'lokasi' => 'Lapangan Gasis Soppeng',
            'qr_token' => 'SIMPATI-EVT-TEST1234',
            'is_active' => true,
        ]);

        $response = $this->actingAs($user)->postJson('/api/events/scan', [
            'qr_token' => 'SIMPATI-EVT-TEST1234',
            'latitude' => -4.3422,
            'longitude' => 120.0123,
        ]);

        $response->assertStatus(200)
            ->assertJsonPath('success', true);

        $this->assertDatabaseHas('event_presensi_participants', [
            'event_presensi_id' => $event->id,
            'user_id' => $user->id,
        ]);
    }
}
