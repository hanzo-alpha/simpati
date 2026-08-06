<?php

namespace Tests\Feature;

use App\Models\Attendance;
use App\Models\Office;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OfflineAndExportTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        Role::create(['id' => 1, 'name' => 'asn', 'display_name' => 'ASN']);
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

    public function test_user_can_export_monthly_attendance_recap(): void
    {
        $user = User::factory()->create([
            'nip' => '199001012020011099',
            'password' => bcrypt('password123'),
            'office_id' => 1,
            'role_id' => 1,
            'is_active' => true,
        ]);

        Attendance::create([
            'user_id' => $user->id,
            'tanggal' => now()->toDateString(),
            'jenis' => 'masuk',
            'waktu' => '07:30:00',
            'latitude' => -4.3422000,
            'longitude' => 120.0123000,
            'status' => 'tepat_waktu',
            'in_radius' => true,
        ]);

        $token = $user->createToken('test')->plainTextToken;

        $response = $this->withHeader('Authorization', 'Bearer '.$token)
            ->getJson('/api/attendance/export-pdf?year='.now()->year.'&month='.now()->month);

        $response->assertStatus(200)
            ->assertJsonFragment(['total_hadir' => 1]);
    }
}
