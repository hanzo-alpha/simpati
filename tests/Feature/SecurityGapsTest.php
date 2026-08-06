<?php

namespace Tests\Feature;

use App\Models\Office;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class SecurityGapsTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Seed roles & offices
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

    public function test_fake_gps_is_rejected_on_attendance_store(): void
    {
        Storage::fake('public');

        $user = User::factory()->create([
            'nip' => '199001012020011001',
            'password' => bcrypt('password123'),
            'office_id' => 1,
            'role_id' => 1,
            'is_active' => true,
        ]);

        $token = $user->createToken('test')->plainTextToken;

        $response = $this->withHeader('Authorization', 'Bearer '.$token)
            ->postJson('/api/attendance', [
                'jenis' => 'masuk',
                'latitude' => -4.3422000,
                'longitude' => 120.0123000,
                'is_mocked' => true,
                'foto_selfie' => UploadedFile::fake()->image('selfie.jpg'),
            ]);

        $response->assertStatus(422)
            ->assertJsonFragment([
                'message' => 'Presensi ditolak! Terdeteksi penggunaan Fake GPS / Lokasi Palsu.',
            ]);
    }

    public function test_single_device_binding_prevents_login_from_different_device(): void
    {
        $user = User::factory()->create([
            'nip' => '199001012020011002',
            'password' => bcrypt('password123'),
            'device_id' => 'DEV-HP-UTAMA-12345',
            'is_active' => true,
        ]);

        // Attempt login from different device ID
        $response = $this->postJson('/api/login', [
            'nip' => '199001012020011002',
            'password' => 'password123',
            'device_id' => 'DEV-HP-LAIN-67890',
        ]);

        $response->assertStatus(422)
            ->assertJsonFragment([
                'nip' => ['Akun NIP ini terikat pada HP lain. Hubungi Admin OPD untuk reset HP.'],
            ]);
    }
}
