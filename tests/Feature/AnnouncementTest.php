<?php

namespace Tests\Feature;

use App\Models\Announcement;
use App\Models\Office;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AnnouncementTest extends TestCase
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

    public function test_user_can_fetch_active_announcements(): void
    {
        $user = User::factory()->create([
            'nip' => '199001012020011077',
            'password' => bcrypt('password123'),
            'office_id' => 1,
            'role_id' => 1,
            'is_active' => true,
        ]);

        Announcement::create([
            'office_id' => null,
            'judul' => 'Pengumuman Penting Apel',
            'konten' => 'Wajib apel pagi.',
            'kategori' => 'penting',
            'is_active' => true,
        ]);

        $token = $user->createToken('test')->plainTextToken;

        $response = $this->withHeader('Authorization', 'Bearer '.$token)
            ->getJson('/api/announcements');

        $response->assertStatus(200)
            ->assertJsonFragment(['judul' => 'Pengumuman Penting Apel']);
    }
}
