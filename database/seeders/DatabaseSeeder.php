<?php

namespace Database\Seeders;

use App\Enums\AttendanceStatus;
use App\Enums\AttendanceType;
use App\Enums\LeaveStatus;
use App\Enums\LeaveType;
use App\Enums\ScheduleType;
use App\Models\Announcement;
use App\Models\Attendance;
use App\Models\LeaveRequest;
use App\Models\Office;
use App\Models\Role;
use App\Models\User;
use App\Models\UserProfile;
use App\Models\WorkSchedule;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // ─── 1. Roles (already seeded via migration, verify) ─────
        $this->ensureRoles();

        $superAdmin = Role::where('name', 'super_admin')->first();
        $adminOpd = Role::where('name', 'admin_opd')->first();
        $atasan = Role::where('name', 'atasan')->first();
        $asn = Role::where('name', 'asn')->first();

        // ─── 2. Offices / OPD ────────────────────────────────────
        $offices = $this->seedOffices();

        // ─── 3. Work Schedules ───────────────────────────────────
        $this->seedWorkSchedules($offices);

        // ─── 4. Users ────────────────────────────────────────────
        $users = $this->seedUsers($offices, $superAdmin, $adminOpd, $atasan, $asn);

        // ─── 5. Attendance Records ───────────────────────────────
        $this->seedAttendances($users);

        // ─── 6. Leave Requests ───────────────────────────────────
        $this->seedLeaveRequests($users, $atasan);

        // ─── 7. Announcements ────────────────────────────────────
        $this->seedAnnouncements($offices);

        $this->command->info('✅ Seeder SIMPATI selesai!');
        $this->command->info("   📊 {$offices->count()} Kantor OPD");
        $this->command->info('   👤 '.User::count().' Users');
        $this->command->info('   📋 '.Attendance::count().' Records Presensi');
        $this->command->info('   📝 '.LeaveRequest::count().' Pengajuan');
    }

    private function ensureRoles(): void
    {
        $roles = [
            ['name' => 'super_admin', 'display_name' => 'Super Admin', 'description' => 'Administrator utama sistem'],
            ['name' => 'admin_opd', 'display_name' => 'Admin OPD', 'description' => 'Administrator per OPD'],
            ['name' => 'atasan', 'display_name' => 'Atasan', 'description' => 'Atasan langsung untuk approval'],
            ['name' => 'asn', 'display_name' => 'ASN', 'description' => 'Aparatur Sipil Negara'],
        ];

        foreach ($roles as $role) {
            Role::firstOrCreate(['name' => $role['name']], $role);
        }
    }

    private function seedOffices()
    {
        $opdHierarchies = [
            [
                'parent' => [
                    'name' => 'Kantor Bupati Soppeng',
                    'opd_name' => 'Sekretariat Daerah',
                    'unit_code' => 'SETDA',
                    'latitude' => -4.3422,
                    'longitude' => 120.0123,
                    'radius_meters' => 150,
                    'alamat' => 'Jl. Pemuda No. 1, Watansoppeng',
                ],
                'subs' => [
                    ['name' => 'Bagian Tata Pemerintahan', 'opd_name' => 'Bagian Tata Pemerintahan & Kerjasama', 'unit_code' => 'SETDA-PEM', 'latitude' => -4.3422, 'longitude' => 120.0123, 'radius_meters' => 150, 'alamat' => 'Gedung A Lantai 2 Kantor Bupati Soppeng'],
                    ['name' => 'Bagian Hukum', 'opd_name' => 'Bagian Hukum & Perundang-Undangan', 'unit_code' => 'SETDA-HUKUM', 'latitude' => -4.3422, 'longitude' => 120.0123, 'radius_meters' => 150, 'alamat' => 'Gedung B Lantai 1 Kantor Bupati Soppeng'],
                    ['name' => 'Bagian Organisasi', 'opd_name' => 'Bagian Organisasi & Laksana', 'unit_code' => 'SETDA-ORGBAG', 'latitude' => -4.3422, 'longitude' => 120.0123, 'radius_meters' => 150, 'alamat' => 'Gedung B Lantai 2 Kantor Bupati Soppeng'],
                    ['name' => 'Bagian Prokopim', 'opd_name' => 'Bagian Protokol & Komunikasi Pimpinan', 'unit_code' => 'SETDA-PROKOPIM', 'latitude' => -4.3422, 'longitude' => 120.0123, 'radius_meters' => 150, 'alamat' => 'Gedung Utama Kantor Bupati Soppeng'],
                ],
            ],
            [
                'parent' => [
                    'name' => 'Kantor Dinas Kesehatan',
                    'opd_name' => 'Dinas Kesehatan',
                    'unit_code' => 'DINKES',
                    'latitude' => -4.3450,
                    'longitude' => 120.0155,
                    'radius_meters' => 100,
                    'alamat' => 'Jl. Salotungo No. 3, Watansoppeng',
                ],
                'subs' => [
                    ['name' => 'UPTD Puskesmas Salotungo', 'opd_name' => 'UPTD Puskesmas Salotungo', 'unit_code' => 'PKM-SALOTUNGO', 'latitude' => -4.3461, 'longitude' => 120.0170, 'radius_meters' => 100, 'alamat' => 'Jl. Keselamatan No. 12, Salotungo, Watansoppeng'],
                    ['name' => 'UPTD Puskesmas Lalabata Rilau', 'opd_name' => 'UPTD Puskesmas Lalabata Rilau', 'unit_code' => 'PKM-LALABATA', 'latitude' => -4.3390, 'longitude' => 120.0080, 'radius_meters' => 100, 'alamat' => 'Jl. Kemuning No. 5, Lalabata'],
                    ['name' => 'UPTD Puskesmas Marioriwawo', 'opd_name' => 'UPTD Puskesmas Marioriwawo (Takalala)', 'unit_code' => 'PKM-TAKALALA', 'latitude' => -4.4210, 'longitude' => 119.9850, 'radius_meters' => 100, 'alamat' => 'Jl. Pasar Baru, Takalala, Marioriwawo'],
                    ['name' => 'UPTD Puskesmas Liliriaja', 'opd_name' => 'UPTD Puskesmas Liliriaja (Cangadi)', 'unit_code' => 'PKM-CANGADI', 'latitude' => -4.3780, 'longitude' => 120.0820, 'radius_meters' => 100, 'alamat' => 'Jl. Poros Soppeng-Sidrap, Cangadi'],
                    ['name' => 'UPTD Puskesmas Donri-Donri', 'opd_name' => 'UPTD Puskesmas Donri-Donri (Tajuncu)', 'unit_code' => 'PKM-TAJUNCU', 'latitude' => -4.2950, 'longitude' => 119.9700, 'radius_meters' => 100, 'alamat' => 'Jl. Tajuncu, Donri-Donri'],
                    ['name' => 'UPTD Labkesda Soppeng', 'opd_name' => 'UPTD Laboratorium Kesehatan Daerah', 'unit_code' => 'LABKESDA', 'latitude' => -4.3452, 'longitude' => 120.0158, 'radius_meters' => 80, 'alamat' => 'Komp. Dinkes Soppeng'],
                ],
            ],
            [
                'parent' => [
                    'name' => 'RSUD Latemmamala Soppeng',
                    'opd_name' => 'RSUD Latemmamala Kabupaten Soppeng',
                    'unit_code' => 'RSUD-LATEMMAMALA',
                    'latitude' => -4.3510,
                    'longitude' => 120.0210,
                    'radius_meters' => 200,
                    'alamat' => 'Jl. Malaka Raya, Watansoppeng',
                ],
                'subs' => [
                    ['name' => 'Bidang Pelayanan Medis', 'opd_name' => 'Bidang Pelayanan Medis & Keperawatan RSUD', 'unit_code' => 'RSUD-YANMED', 'latitude' => -4.3510, 'longitude' => 120.0210, 'radius_meters' => 200, 'alamat' => 'Gedung Utama RSUD Latemmamala'],
                    ['name' => 'Bagian Tata Usaha RSUD', 'opd_name' => 'Bagian Tata Usaha RSUD Latemmamala', 'unit_code' => 'RSUD-TU', 'latitude' => -4.3510, 'longitude' => 120.0210, 'radius_meters' => 200, 'alamat' => 'Gedung Administrasi RSUD Latemmamala'],
                ],
            ],
            [
                'parent' => [
                    'name' => 'Kantor Dinas Pendidikan',
                    'opd_name' => 'Dinas Pendidikan dan Kebudayaan',
                    'unit_code' => 'DISDIKBUD',
                    'latitude' => -4.3401,
                    'longitude' => 120.0098,
                    'radius_meters' => 120,
                    'alamat' => 'Jl. Satria No. 10, Watansoppeng',
                ],
                'subs' => [
                    ['name' => 'UPTD SPF SMPN 1 Watansoppeng', 'opd_name' => 'UPTD SPF SMP Negeri 1 Watansoppeng', 'unit_code' => 'SMPN1-SOPPENG', 'latitude' => -4.3412, 'longitude' => 120.0105, 'radius_meters' => 120, 'alamat' => 'Jl. SMP No. 2, Watansoppeng'],
                    ['name' => 'UPTD SPF SMPN 2 Watansoppeng', 'opd_name' => 'UPTD SPF SMP Negeri 2 Watansoppeng', 'unit_code' => 'SMPN2-SOPPENG', 'latitude' => -4.3440, 'longitude' => 120.0130, 'radius_meters' => 120, 'alamat' => 'Jl. Lapangan Sewo, Watansoppeng'],
                    ['name' => 'UPTD SKB Soppeng', 'opd_name' => 'UPTD Sanggar Kegiatan Belajar (SKB)', 'unit_code' => 'SKB-SOPPENG', 'latitude' => -4.3395, 'longitude' => 120.0090, 'radius_meters' => 100, 'alamat' => 'Jl. Pendidikan No. 8, Watansoppeng'],
                ],
            ],
            [
                'parent' => [
                    'name' => 'Kantor BKPSDM',
                    'opd_name' => 'Badan Kepegawaian dan Pengembangan SDM',
                    'unit_code' => 'BKPSDM',
                    'latitude' => -4.3435,
                    'longitude' => 120.0141,
                    'radius_meters' => 100,
                    'alamat' => 'Jl. Salotungo No. 5, Watansoppeng',
                ],
                'subs' => [],
            ],
            [
                'parent' => [
                    'name' => 'Kantor BPKAD',
                    'opd_name' => 'Badan Pengelola Keuangan dan Aset Daerah',
                    'unit_code' => 'BPKAD',
                    'latitude' => -4.3428,
                    'longitude' => 120.0132,
                    'radius_meters' => 100,
                    'alamat' => 'Jl. Pemuda No. 3, Watansoppeng',
                ],
                'subs' => [],
            ],
            [
                'parent' => [
                    'name' => 'Kantor Disdukcapil',
                    'opd_name' => 'Dinas Kependudukan dan Pencatatan Sipil',
                    'unit_code' => 'DISDUKCAPIL',
                    'latitude' => -4.3410,
                    'longitude' => 120.0110,
                    'radius_meters' => 80,
                    'alamat' => 'Jl. Attang Salo No. 7, Watansoppeng',
                ],
                'subs' => [],
            ],
            [
                'parent' => [
                    'name' => 'Kantor Satpol PP & Damkar',
                    'opd_name' => 'Dinas Satpol PP dan Pemadam Kebakaran',
                    'unit_code' => 'SATPOLPP',
                    'latitude' => -4.3445,
                    'longitude' => 120.0150,
                    'radius_meters' => 100,
                    'alamat' => 'Jl. Merdeka No. 15, Watansoppeng',
                ],
                'subs' => [],
            ],
            [
                'parent' => [
                    'name' => 'Kantor Dinas Perhubungan',
                    'opd_name' => 'Dinas Perhubungan',
                    'unit_code' => 'DISHUB',
                    'latitude' => -4.3470,
                    'longitude' => 120.0180,
                    'radius_meters' => 100,
                    'alamat' => 'Jl. Terminal Watansoppeng',
                ],
                'subs' => [
                    ['name' => 'UPTD Pengujian Kendaraan (PKB)', 'opd_name' => 'UPTD Pengujian Kendaraan Bermotor (Kir)', 'unit_code' => 'PKB-DISHUB', 'latitude' => -4.3470, 'longitude' => 120.0180, 'radius_meters' => 100, 'alamat' => 'Komp. Terminal Watansoppeng'],
                ],
            ],
            [
                'parent' => [
                    'name' => 'Kantor Camat Lalabata',
                    'opd_name' => 'Kecamatan Lalabata',
                    'unit_code' => 'KEC-LALABATA',
                    'latitude' => -4.3418,
                    'longitude' => 120.0115,
                    'radius_meters' => 100,
                    'alamat' => 'Jl. Bila No. 4, Watansoppeng',
                ],
                'subs' => [],
            ],
            [
                'parent' => [
                    'name' => 'Kantor Camat Marioriwawo',
                    'opd_name' => 'Kecamatan Marioriwawo',
                    'unit_code' => 'KEC-MARIORIWAWO',
                    'latitude' => -4.4200,
                    'longitude' => 119.9840,
                    'radius_meters' => 100,
                    'alamat' => 'Jl. Poros Takalala, Marioriwawo',
                ],
                'subs' => [],
            ],
        ];

        $offices = collect();
        foreach ($opdHierarchies as $item) {
            $parentOffice = Office::create(array_merge($item['parent'], ['parent_id' => null]));
            $offices->push($parentOffice);

            foreach ($item['subs'] as $sub) {
                $subOffice = Office::create(array_merge($sub, ['parent_id' => $parentOffice->id]));
                $offices->push($subOffice);
            }
        }

        return $offices;
    }

    private function seedWorkSchedules($offices): void
    {
        foreach ($offices as $office) {
            // Regular weekday schedule (Mon-Thu)
            WorkSchedule::create([
                'office_id' => $office->id,
                'type' => ScheduleType::REGULER,
                'nama_jadwal' => 'Senin - Kamis',
                'hari' => 'senin,selasa,rabu,kamis',
                'jam_masuk' => '07:30',
                'jam_istirahat' => '12:00',
                'jam_kembali' => '13:00',
                'jam_pulang' => '16:00',
                'toleransi_menit' => 15,
            ]);

            // Friday schedule
            WorkSchedule::create([
                'office_id' => $office->id,
                'type' => ScheduleType::REGULER,
                'nama_jadwal' => 'Jumat',
                'hari' => 'jumat',
                'jam_masuk' => '07:30',
                'jam_istirahat' => '11:30',
                'jam_kembali' => '13:30',
                'jam_pulang' => '16:30',
                'toleransi_menit' => 15,
            ]);
        }

        // Shift schedule for Dinas Kesehatan
        $dinkes = $offices->firstWhere('opd_name', 'Dinas Kesehatan');
        WorkSchedule::create([
            'office_id' => $dinkes->id,
            'type' => ScheduleType::SHIFT,
            'nama_jadwal' => 'Shift Pagi',
            'hari' => 'senin,selasa,rabu,kamis,jumat',
            'jam_masuk' => '06:00',
            'jam_istirahat' => '11:00',
            'jam_kembali' => '12:00',
            'jam_pulang' => '14:00',
            'toleransi_menit' => 10,
        ]);
    }

    private function seedUsers($offices, $superAdmin, $adminOpd, $atasan, $asn)
    {
        $password = Hash::make('password123');

        $usersData = [
            // Super Admin
            [
                'name' => 'Andi Mappasara',
                'nip' => '196801011990011001',
                'email' => 'admin@simpati.soppengkab.go.id',
                'password' => $password,
                'office_id' => $offices[0]->id,
                'role_id' => $superAdmin->id,
                'profile' => ['jabatan' => 'Sekretaris Daerah', 'pangkat_golongan' => 'IV/d', 'sisa_cuti_tahunan' => 12],
            ],
            // Admin OPD - BKPSDM
            [
                'name' => 'Sitti Rahmawati',
                'nip' => '198505152010012005',
                'email' => 'rahma@simpati.soppengkab.go.id',
                'password' => $password,
                'office_id' => $offices[1]->id,
                'role_id' => $adminOpd->id,
                'profile' => ['jabatan' => 'Kepala BKPSDM', 'pangkat_golongan' => 'IV/b', 'sisa_cuti_tahunan' => 10],
            ],
            // Atasan - Dinas Pendidikan
            [
                'name' => 'Muhammad Arif Budiman',
                'nip' => '197003201995031003',
                'email' => 'arif.budiman@simpati.soppengkab.go.id',
                'password' => $password,
                'office_id' => $offices[2]->id,
                'role_id' => $atasan->id,
                'profile' => ['jabatan' => 'Kepala Dinas Pendidikan', 'pangkat_golongan' => 'IV/c', 'sisa_cuti_tahunan' => 8],
            ],
            // Atasan - Dinas Kesehatan
            [
                'name' => 'Dr. Hj. Nurhayati',
                'nip' => '197508101999032004',
                'email' => 'nurhayati@simpati.soppengkab.go.id',
                'password' => $password,
                'office_id' => $offices[3]->id,
                'role_id' => $atasan->id,
                'profile' => ['jabatan' => 'Kepala Dinas Kesehatan', 'pangkat_golongan' => 'IV/b', 'sisa_cuti_tahunan' => 11],
            ],
        ];

        // ASN Staff
        $asnList = [
            ['name' => 'Andi Tenri Abeng', 'nip' => '199001052015041002', 'office_idx' => 0, 'jabatan' => 'Analis Kebijakan', 'pangkat' => 'III/c'],
            ['name' => 'Fatimah Zahra', 'nip' => '199203152017042001', 'office_idx' => 1, 'jabatan' => 'Analis Kepegawaian', 'pangkat' => 'III/b'],
            ['name' => 'Muh. Fadli Rahman', 'nip' => '199105202018011003', 'office_idx' => 2, 'jabatan' => 'Guru SMA', 'pangkat' => 'III/c'],
            ['name' => 'Nur Aini Syamsuddin', 'nip' => '199308252019042004', 'office_idx' => 2, 'jabatan' => 'Guru SMP', 'pangkat' => 'III/a'],
            ['name' => 'Andi Baso Mappangara', 'nip' => '198812121016031005', 'office_idx' => 3, 'jabatan' => 'Perawat', 'pangkat' => 'III/b'],
            ['name' => 'Dewi Sartika Bone', 'nip' => '199407232020042006', 'office_idx' => 3, 'jabatan' => 'Bidan', 'pangkat' => 'III/a'],
            ['name' => 'Irfan Hidayat', 'nip' => '199510082021011007', 'office_idx' => 4, 'jabatan' => 'Operator Dukcapil', 'pangkat' => 'II/c'],
            ['name' => 'Hasnawati Rahim', 'nip' => '199206142019042008', 'office_idx' => 0, 'jabatan' => 'Staf Administrasi', 'pangkat' => 'III/a'],
            ['name' => 'Andi Panca Surya', 'nip' => '198901032015041009', 'office_idx' => 1, 'jabatan' => 'Pranata Komputer', 'pangkat' => 'III/d'],
            ['name' => 'Sukmawati Dg. Mattola', 'nip' => '199112192018012010', 'office_idx' => 4, 'jabatan' => 'Petugas Registrasi', 'pangkat' => 'III/b'],
        ];

        foreach ($asnList as $a) {
            $usersData[] = [
                'name' => $a['name'],
                'nip' => $a['nip'],
                'email' => strtolower(str_replace([' ', '.'], ['', ''], $a['name'])).'@simpati.soppengkab.go.id',
                'password' => $password,
                'office_id' => $offices[$a['office_idx']]->id,
                'role_id' => $asn->id,
                'profile' => ['jabatan' => $a['jabatan'], 'pangkat_golongan' => $a['pangkat'], 'sisa_cuti_tahunan' => rand(6, 12)],
            ];
        }

        $users = collect();
        // Map atasan per office for supervisor assignment
        $atasanMap = [];

        foreach ($usersData as $data) {
            $profileData = $data['profile'];
            unset($data['profile']);

            $user = User::create($data);
            UserProfile::create([...$profileData, 'user_id' => $user->id]);

            // Track atasan for supervisor
            if ($user->role_id === $atasan->id || $user->role_id === $superAdmin->id || $user->role_id === $adminOpd->id) {
                $atasanMap[$user->office_id] = $user->id;
            }

            $users->push($user);
        }

        // Assign supervisors to ASN
        foreach ($users->where('role_id', $asn->id) as $asnUser) {
            $supervisorId = $atasanMap[$asnUser->office_id] ?? $users->first()->id;
            $asnUser->update(['supervisor_id' => $supervisorId]);
        }

        return $users;
    }

    private function seedAttendances($users): void
    {
        $months = [
            Carbon::now()->subMonth()->startOfMonth(), // Previous month
            Carbon::now()->startOfMonth(),           // Current month
        ];

        foreach ($users as $index => $user) {
            $isPerfect = $index < 3; // First 3 users have perfect attendance (Zero Alpha)

            foreach ($months as $startDate) {
                $date = $startDate->copy();
                $today = Carbon::now();
                $endOfMonth = $startDate->copy()->endOfMonth();

                while ($date->lte($endOfMonth) && $date->lte($today)) {
                    if ($date->isWeekend()) {
                        $date->addDay();

                        continue;
                    }

                    // Check for leave requests on this date
                    $hasLeave = LeaveRequest::where('user_id', $user->id)
                        ->where('status', LeaveStatus::DISETUJUI)
                        ->whereDate('tanggal_mulai', '<=', $date)
                        ->whereDate('tanggal_selesai', '>=', $date)
                        ->exists();

                    if ($hasLeave) {
                        $date->addDay();

                        continue;
                    }

                    // 92% chance present, unless perfect
                    if (! $isPerfect && rand(1, 100) > 92) {
                        $date->addDay();

                        continue; // alpha
                    }

                    $isLate = ! $isPerfect && rand(1, 100) <= 12; // 12% late chance
                    $isFriday = $date->isFriday();

                    $jamMasuk = '07:30';
                    $jamIstirahat = $isFriday ? '11:30' : '12:00';
                    $jamKembali = $isFriday ? '13:30' : '13:00';
                    $jamPulang = $isFriday ? '16:30' : '16:00';

                    $office = $user->office;
                    $lat = $office ? $office->latitude + (rand(-10, 10) / 100000) : -4.3422;
                    $lng = $office ? $office->longitude + (rand(-10, 10) / 100000) : 120.0123;

                    // Masuk
                    $masukTime = $isLate
                        ? Carbon::parse($jamMasuk)->addMinutes(rand(16, 60))->format('H:i:s')
                        : Carbon::parse($jamMasuk)->subMinutes(rand(0, 30))->format('H:i:s');

                    Attendance::create([
                        'user_id' => $user->id,
                        'tanggal' => $date->toDateString(),
                        'jenis' => AttendanceType::MASUK,
                        'waktu' => $masukTime,
                        'latitude' => $lat,
                        'longitude' => $lng,
                        'status' => $isLate ? AttendanceStatus::TERLAMBAT : AttendanceStatus::TEPAT_WAKTU,
                        'in_radius' => true,
                    ]);

                    // Seed Istirahat and Kembali for today to demonstrate the UI features
                    if ($date->isSameDay($today)) {
                        $tookBreak = rand(1, 100) > 10; // 90% chance to have break records for today
                        if ($tookBreak) {
                            Attendance::create([
                                'user_id' => $user->id,
                                'tanggal' => $date->toDateString(),
                                'jenis' => AttendanceType::ISTIRAHAT,
                                'waktu' => Carbon::parse($jamIstirahat)->addMinutes(rand(0, 15))->format('H:i:s'),
                                'latitude' => $lat,
                                'longitude' => $lng,
                                'status' => AttendanceStatus::TEPAT_WAKTU,
                                'in_radius' => true,
                            ]);

                            // 95% they return from break
                            if (rand(1, 100) > 5) {
                                Attendance::create([
                                    'user_id' => $user->id,
                                    'tanggal' => $date->toDateString(),
                                    'jenis' => AttendanceType::KEMBALI,
                                    'waktu' => Carbon::parse($jamKembali)->addMinutes(rand(0, 10))->format('H:i:s'),
                                    'latitude' => $lat,
                                    'longitude' => $lng,
                                    'status' => AttendanceStatus::TEPAT_WAKTU,
                                    'in_radius' => true,
                                ]);
                            }
                        }
                    }

                    // Pulang - 95% chance unless perfect
                    $forgotPulang = ! $isPerfect && rand(1, 100) > 95;

                    if (! $forgotPulang) {
                        $pulangDiff = $isPerfect ? rand(0, 30) : rand(-60, 60);
                        Attendance::create([
                            'user_id' => $user->id,
                            'tanggal' => $date->toDateString(),
                            'jenis' => AttendanceType::PULANG,
                            'waktu' => Carbon::parse($jamPulang)->addMinutes($pulangDiff)->format('H:i:s'),
                            'latitude' => $lat,
                            'longitude' => $lng,
                            'status' => AttendanceStatus::TEPAT_WAKTU,
                            'in_radius' => true,
                        ]);
                    }

                    $date->addDay();
                }
            }
        }
    }

    private function seedLeaveRequests($users, $atasanRole): void
    {
        $asnUsers = $users->where('role_id', '!=', $atasanRole->id)->shuffle();
        $approvers = $users->whereIn('role_id', [
            Role::where('name', 'atasan')->first()->id,
            Role::where('name', 'super_admin')->first()->id,
        ]);

        $types = [LeaveType::CUTI, LeaveType::SAKIT, LeaveType::DINAS_LUAR, LeaveType::DINAS_DALAM];
        $statuses = [LeaveStatus::MENUNGGU, LeaveStatus::DISETUJUI, LeaveStatus::DITOLAK];
        $alasanList = [
            LeaveType::CUTI->value => ['Cuti tahunan ke kampung halaman', 'Menghadiri pernikahan keluarga', 'Urusan keluarga mendesak'],
            LeaveType::SAKIT->value => ['Demam dan flu berat', 'Opname di RS', 'Sakit gigi perawatan'],
            LeaveType::DINAS_LUAR->value => ['Pelatihan di Makassar', 'Bimtek di Jakarta', 'Koordinasi antar daerah'],
            LeaveType::DINAS_DALAM->value => ['Rapat koordinasi OPD', 'Monitoring ke kecamatan', 'Pengawasan proyek pembangunan'],
        ];

        foreach ($asnUsers as $user) {
            $type = $types[array_rand($types)];
            $status = $statuses[array_rand($statuses)];
            $start = Carbon::now()->subDays(rand(1, 20));
            $end = $start->copy()->addDays(rand(1, 5));
            $approver = $approvers->random();

            LeaveRequest::create([
                'user_id' => $user->id,
                'type' => $type,
                'tanggal_mulai' => $start->toDateString(),
                'tanggal_selesai' => $end->toDateString(),
                'alasan' => $alasanList[$type->value][array_rand($alasanList[$type->value])],
                'status' => $status,
                'approved_by' => $status !== LeaveStatus::MENUNGGU ? $approver->id : null,
                'catatan_approval' => $status === LeaveStatus::DITOLAK ? 'Jadwal sudah penuh, silakan ajukan di waktu lain.' : ($status === LeaveStatus::DISETUJUI ? 'Disetujui.' : null),
                'approved_at' => $status !== LeaveStatus::MENUNGGU ? now()->subDays(rand(0, 5)) : null,
            ]);
        }
    }

    private function seedAnnouncements($offices): void
    {
        Announcement::create([
            'office_id' => null,
            'judul' => '📢 Apel Kesadaran Nasional Bulan Ini',
            'konten' => 'Diberitahukan kepada seluruh ASN Kabupaten Soppeng wajib mengikuti Apel Kesadaran Nasional di Halaman Kantor Bupati pada hari Senin mendatang pukul 07.15 WITA.',
            'kategori' => 'penting',
            'published_at' => now(),
            'is_active' => true,
        ]);

        Announcement::create([
            'office_id' => null,
            'judul' => 'ℹ️ Pemutakhiran Data Mandiri Kepegawaian',
            'konten' => 'Seluruh ASN diimbau segera melakukan pemutakhiran data keluarga dan riwayat diklat melalui portal SIMPATI paling lambat akhir bulan.',
            'kategori' => 'informasi',
            'published_at' => now()->subDay(),
            'is_active' => true,
        ]);
    }
}
