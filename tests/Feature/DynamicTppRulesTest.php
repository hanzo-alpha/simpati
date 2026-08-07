<?php

namespace Tests\Feature;

use App\Models\Office;
use App\Models\Role;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DynamicTppRulesTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        Role::create(['id' => 1, 'name' => 'asn', 'display_name' => 'ASN']);
        Office::create([
            'id' => 1,
            'name' => 'Kantor Utama',
            'opd_name' => 'Setda',
            'latitude' => -4.3422,
            'longitude' => 120.0123,
            'radius_meters' => 150,
        ]);
    }

    public function test_dynamic_tpp_deduction_calculates_with_custom_settings(): void
    {
        // Custom Perbup TPP deduction rules
        Setting::set('potongan_terlambat', '2.0', 'attendance');
        Setting::set('potongan_sangat_terlambat', '4.0', 'attendance');
        Setting::set('potongan_tk', '10.0', 'attendance');
        Setting::set('potongan_max_tpp', '80.0', 'attendance');

        $user = User::factory()->create([
            'nip' => '199001012020011088',
            'role_id' => 1,
            'office_id' => 1,
        ]);

        $response = $this->actingAs($user)->getJson('/api/statistics');

        $response->assertStatus(200);
        $this->assertGreaterThan(0, $response->json('tpp_summary.total_deduction_percent'));
    }
}
