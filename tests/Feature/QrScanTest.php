<?php

namespace Tests\Feature;

use App\Models\Office;
use App\Models\Role;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class QrScanTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Carbon::setTestNow('2026-08-05 08:00:00');

        Role::create(['id' => 1, 'name' => 'asn', 'display_name' => 'ASN']);
        Role::create(['id' => 2, 'name' => 'super_admin', 'display_name' => 'Super Admin']);

        Office::create([
            'id' => 1,
            'name' => 'Kantor Utama',
            'opd_name' => 'Sekretariat Daerah',
            'latitude' => '-4.3422000',
            'longitude' => '120.0123000',
            'radius_meters' => 150,
            'alamat' => 'Jl. Utama',
            'is_active' => true,
        ]);
    }

    public function test_can_verify_qr_code_for_valid_asn(): void
    {
        $admin = User::factory()->create([
            'nip' => '198001012010011001',
            'role_id' => 2,
            'office_id' => 1,
        ]);

        $asn = User::factory()->create([
            'nip' => '198507092011012013',
            'name' => 'Andi Mappasara',
            'role_id' => 1,
            'office_id' => 1,
        ]);

        $response = $this->actingAs($admin)
            ->postJson('/admin/attendances/verify-qr', [
                'qr_code' => 'NIP:198507092011012013',
                'acara' => 'Apel Pagi',
            ]);

        $response->assertStatus(200)
            ->assertJsonFragment(['success' => true])
            ->assertJsonPath('user.name', 'Andi Mappasara');

        $this->assertDatabaseHas('attendances', [
            'user_id' => $asn->id,
            'status' => 'tepat_waktu',
        ]);
    }

    public function test_qr_verification_returns_404_for_unknown_nip(): void
    {
        $admin = User::factory()->create(['nip' => '198001012010011002', 'role_id' => 2]);

        $response = $this->actingAs($admin)
            ->postJson('/admin/attendances/verify-qr', [
                'qr_code' => 'NIP:999999999999999999',
            ]);

        $response->assertStatus(404);
    }
}
