<?php

namespace Tests\Feature;

use App\Models\Office;
use App\Models\Role;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class OutOfOfficeAttendanceTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Carbon::setTestNow('2026-08-05 08:00:00');

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

    public function test_dinas_luar_attendance_outside_radius_is_allowed_with_pending_approval_status(): void
    {
        Storage::fake('public');

        $user = User::factory()->create([
            'nip' => '199001012020011010',
            'password' => bcrypt('password123'),
            'office_id' => 1,
            'role_id' => 1,
            'is_active' => true,
        ]);

        $token = $user->createToken('test')->plainTextToken;

        // Position far outside office radius (-5.0, 121.0)
        $response = $this->withHeader('Authorization', 'Bearer '.$token)
            ->postJson('/api/attendance', [
                'jenis' => 'dinas_luar',
                'latitude' => -5.000000,
                'longitude' => 121.000000,
                'foto_selfie' => UploadedFile::fake()->image('selfie_dinas.jpg'),
            ]);

        $response->assertStatus(201)
            ->assertJsonFragment(['status' => 'menunggu_persetujuan']);

        $this->assertDatabaseHas('attendances', [
            'user_id' => $user->id,
            'jenis' => 'dinas_luar',
            'status' => 'menunggu_persetujuan',
        ]);
    }

    public function test_regular_masuk_attendance_outside_radius_is_rejected(): void
    {
        Storage::fake('public');

        $user = User::factory()->create([
            'nip' => '199001012020011011',
            'password' => bcrypt('password123'),
            'office_id' => 1,
            'role_id' => 1,
            'is_active' => true,
        ]);

        $token = $user->createToken('test')->plainTextToken;

        // Position far outside office radius
        $response = $this->withHeader('Authorization', 'Bearer '.$token)
            ->postJson('/api/attendance', [
                'jenis' => 'masuk',
                'latitude' => -5.000000,
                'longitude' => 121.000000,
                'foto_selfie' => UploadedFile::fake()->image('selfie.jpg'),
            ]);

        $response->assertStatus(422)
            ->assertJsonFragment(['message' => 'Anda berada di luar radius kantor.']);
    }
}
