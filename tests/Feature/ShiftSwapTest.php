<?php

namespace Tests\Feature;

use App\Models\Office;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ShiftSwapTest extends TestCase
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

    public function test_user_can_request_shift_swap(): void
    {
        $user1 = User::factory()->create([
            'nip' => '199001012020011066',
            'password' => bcrypt('password123'),
            'office_id' => 1,
            'role_id' => 1,
            'is_active' => true,
        ]);

        $user2 = User::factory()->create([
            'nip' => '199001012020011055',
            'password' => bcrypt('password123'),
            'office_id' => 1,
            'role_id' => 1,
            'is_active' => true,
        ]);

        $token = $user1->createToken('test')->plainTextToken;

        $response = $this->withHeader('Authorization', 'Bearer '.$token)
            ->postJson('/api/shift-swaps', [
                'target_user_id' => $user2->id,
                'tanggal_shift' => now()->addDays(2)->toDateString(),
                'alasan' => 'Ada keperluan mendadak',
            ]);

        $response->assertStatus(201)
            ->assertJsonFragment(['alasan' => 'Ada keperluan mendadak']);

        $this->assertDatabaseHas('shift_swap_requests', [
            'user_id' => $user1->id,
            'target_user_id' => $user2->id,
            'status' => 'menunggu',
        ]);
    }
}
