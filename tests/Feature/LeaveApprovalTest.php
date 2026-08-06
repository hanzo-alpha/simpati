<?php

namespace Tests\Feature;

use App\Models\LeaveRequest;
use App\Models\Office;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LeaveApprovalTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        Role::create(['id' => 1, 'name' => 'super_admin', 'display_name' => 'Super Admin']);
        Role::create(['id' => 2, 'name' => 'atasan', 'display_name' => 'Atasan']);
        Role::create(['id' => 3, 'name' => 'asn', 'display_name' => 'ASN']);

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

    public function test_supervisor_can_list_and_approve_subordinate_leave_request(): void
    {
        $atasan = User::factory()->create([
            'name' => 'Pak Atasan',
            'nip' => '197001011995011001',
            'password' => bcrypt('password123'),
            'role_id' => 2,
            'office_id' => 1,
            'is_active' => true,
        ]);

        $subordinate = User::factory()->create([
            'name' => 'Bawahan ASN',
            'nip' => '199501012020011001',
            'password' => bcrypt('password123'),
            'role_id' => 3,
            'office_id' => 1,
            'supervisor_id' => $atasan->id,
            'is_active' => true,
        ]);

        $leaveRequest = LeaveRequest::create([
            'user_id' => $subordinate->id,
            'type' => 'sakit',
            'tanggal_mulai' => now()->addDay()->toDateString(),
            'tanggal_selesai' => now()->addDays(2)->toDateString(),
            'alasan' => 'Demam tinggi',
            'status' => 'menunggu',
        ]);

        $token = $atasan->createToken('test')->plainTextToken;

        // 1. List subordinate requests
        $response = $this->withHeader('Authorization', 'Bearer '.$token)
            ->getJson('/api/leave-requests/subordinates');

        $response->assertStatus(200)
            ->assertJsonFragment(['alasan' => 'Demam tinggi']);

        // 2. Approve request
        $approveResponse = $this->withHeader('Authorization', 'Bearer '.$token)
            ->patchJson("/api/leave-requests/{$leaveRequest->id}/status", [
                'status' => 'disetujui',
                'catatan_approval' => 'Disetujui, jaga kesehatan.',
            ]);

        $approveResponse->assertStatus(200)
            ->assertJsonFragment(['status' => 'disetujui']);

        $this->assertDatabaseHas('leave_requests', [
            'id' => $leaveRequest->id,
            'status' => 'disetujui',
            'approved_by' => $atasan->id,
            'catatan_approval' => 'Disetujui, jaga kesehatan.',
        ]);
    }
}
