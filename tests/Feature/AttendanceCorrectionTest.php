<?php

namespace Tests\Feature;

use App\Models\AttendanceCorrection;
use App\Models\Office;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AttendanceCorrectionTest extends TestCase
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

    public function test_user_can_submit_attendance_correction(): void
    {
        $user = User::factory()->create([
            'nip' => '199001012020011001',
            'role_id' => 1,
            'office_id' => 1,
        ]);

        $response = $this->actingAs($user)->postJson('/api/attendance-corrections', [
            'tanggal' => now()->toDateString(),
            'jenis' => 'masuk',
            'jam_koreksi' => '07:30',
            'alasan' => 'Baterai HP mati saat tiba di lokasi kantor.',
        ]);

        $response->assertStatus(201)
            ->assertJsonPath('message', 'Pengajuan koreksi presensi berhasil dikirim.');

        $this->assertDatabaseHas('attendance_corrections', [
            'user_id' => $user->id,
            'jenis' => 'masuk',
            'status' => 'menunggu',
        ]);
    }

    public function test_supervisor_can_view_and_approve_attendance_correction(): void
    {
        $supervisor = User::factory()->create([
            'nip' => '198501012020011002',
            'role_id' => 1,
            'office_id' => 1,
        ]);

        $subordinate = User::factory()->create([
            'nip' => '199201012020011003',
            'role_id' => 1,
            'office_id' => 1,
            'supervisor_id' => $supervisor->id,
        ]);

        $correction = AttendanceCorrection::create([
            'user_id' => $subordinate->id,
            'tanggal' => now()->toDateString(),
            'jenis' => 'masuk',
            'jam_koreksi' => '07:45:00',
            'alasan' => 'Kendala aplikasi error saat presensi.',
            'status' => 'menunggu',
        ]);

        // Supervisor views subordinate corrections
        $response = $this->actingAs($supervisor)->getJson('/api/attendance-corrections/subordinates');
        $response->assertStatus(200);

        // Supervisor approves correction
        $approveResponse = $this->actingAs($supervisor)->patchJson("/api/attendance-corrections/{$correction->id}/status", [
            'status' => 'disetujui',
            'catatan_approval' => 'Disetujui, bukti kuat.',
        ]);

        $approveResponse->assertStatus(200);

        $this->assertDatabaseHas('attendance_corrections', [
            'id' => $correction->id,
            'status' => 'disetujui',
            'approved_by' => $supervisor->id,
        ]);

        // Attendance record should be created/updated for subordinate
        $this->assertDatabaseHas('attendances', [
            'user_id' => $subordinate->id,
            'jenis' => 'masuk',
            'status' => 'tepat_waktu',
        ]);
    }
}
