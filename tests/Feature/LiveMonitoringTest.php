<?php

namespace Tests\Feature;

use App\Models\Attendance;
use App\Models\Office;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LiveMonitoringTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        Role::create(['id' => 1, 'name' => 'asn', 'display_name' => 'ASN']);
        Role::create(['id' => 2, 'name' => 'atasan', 'display_name' => 'Atasan']);
        Office::create([
            'id' => 1,
            'name' => 'Kantor Utama',
            'opd_name' => 'Sekretariat',
            'latitude' => '-4.3422000',
            'longitude' => '120.0123000',
            'radius_meters' => 150,
            'alamat' => 'Jl. Utama',
            'is_active' => true,
        ]);
    }

    public function test_supervisor_can_fetch_subordinate_live_locations(): void
    {
        $supervisor = User::factory()->create([
            'nip' => '197001011995011001',
            'office_id' => 1,
            'role_id' => 2,
            'is_active' => true,
        ]);

        $subordinate = User::factory()->create([
            'nip' => '199001012020011011',
            'office_id' => 1,
            'role_id' => 1,
            'supervisor_id' => $supervisor->id,
            'is_active' => true,
        ]);

        Attendance::create([
            'user_id' => $subordinate->id,
            'tanggal' => now()->toDateString(),
            'jenis' => 'masuk',
            'waktu' => '07:30:00',
            'latitude' => -4.3422000,
            'longitude' => 120.0123000,
            'status' => 'tepat_waktu',
            'in_radius' => true,
        ]);

        $token = $supervisor->createToken('test')->plainTextToken;

        $response = $this->withHeader('Authorization', 'Bearer '.$token)
            ->getJson('/api/supervision/live-locations');

        $response->assertStatus(200)
            ->assertJsonStructure(['live_locations']);
    }
}
