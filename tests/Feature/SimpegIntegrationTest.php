<?php

namespace Tests\Feature;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SimpegIntegrationTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Role::create(['id' => 1, 'name' => 'asn', 'display_name' => 'ASN']);
        Role::create(['id' => 2, 'name' => 'super_admin', 'display_name' => 'Super Admin']);
    }

    public function test_simpeg_can_sync_master_data_to_simpati(): void
    {
        $admin = User::factory()->create(['nip' => '198001012010011001', 'role_id' => 2]);

        $payload = [
            'offices' => [
                [
                    'id' => 10,
                    'name' => 'Dinas Kominfo',
                    'opd_name' => 'Dinas Komunikasi dan Informatika',
                    'latitude' => -4.3500,
                    'longitude' => 120.0200,
                    'radius_meters' => 100,
                ],
            ],
            'users' => [
                [
                    'nip' => '199201012022011005',
                    'name' => 'Pegawai SIMPEG Test',
                    'email' => 'simpeg_user@soppengkab.go.id',
                    'office_id' => 10,
                    'jabatan' => 'Pranata Komputer',
                    'unit_kerja' => 'Bidang Layanan E-Government',
                    'pangkat_golongan' => 'Penata Muda / IIIa',
                ],
            ],
        ];

        $response = $this->actingAs($admin)
            ->postJson('/api/v1/simpeg/sync-master', $payload);

        $response->assertStatus(200)
            ->assertJsonPath('success', true)
            ->assertJsonPath('synced.users', 1);

        $this->assertDatabaseHas('offices', ['id' => 10, 'opd_name' => 'Dinas Komunikasi dan Informatika']);
        $this->assertDatabaseHas('users', ['nip' => '199201012022011005']);
        $this->assertDatabaseHas('user_profiles', ['unit_kerja' => 'Bidang Layanan E-Government']);
    }

    public function test_simpeg_can_get_attendance_recap(): void
    {
        $admin = User::factory()->create(['nip' => '198001012010011002', 'role_id' => 2]);

        $response = $this->actingAs($admin)
            ->getJson('/api/v1/simpeg/recap?year=2026&month=8');

        $response->assertStatus(200)
            ->assertJsonPath('success', true);
    }
}
