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
            // 1. Sekretariat Daerah
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

            // 2. Dinas Kesehatan (Menaungi RSUD Latemmamala, PSC 119, Labkesda, dan 17 Puskesmas)
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
                    ['name' => 'RSUD Latemmamala Soppeng', 'opd_name' => 'RSUD Latemmamala Kabupaten Soppeng', 'unit_code' => 'RSUD-LATEMMAMALA', 'latitude' => -4.3510, 'longitude' => 120.0210, 'radius_meters' => 200, 'alamat' => 'Jl. Malaka Raya, Watansoppeng'],
                    ['name' => 'PSC 119 Soppeng', 'opd_name' => 'PSC 119 Soppeng (Public Safety Center)', 'unit_code' => 'PSC-119', 'latitude' => -4.3452, 'longitude' => 120.0156, 'radius_meters' => 80, 'alamat' => 'Komp. Dinas Kesehatan Soppeng, Jl. Salotungo'],
                    ['name' => 'UPTD Labkesda Soppeng', 'opd_name' => 'UPTD Laboratorium Kesehatan Daerah', 'unit_code' => 'LABKESDA', 'latitude' => -4.3452, 'longitude' => 120.0158, 'radius_meters' => 80, 'alamat' => 'Komp. Dinas Kesehatan Soppeng'],
                    
                    // 17 Puskesmas Kabupaten Soppeng
                    ['name' => 'UPTD Puskesmas Salotungo', 'opd_name' => 'UPTD Puskesmas Salotungo', 'unit_code' => 'PKM-SALOTUNGO', 'latitude' => -4.3461, 'longitude' => 120.0170, 'radius_meters' => 100, 'alamat' => 'Jl. Keselamatan No. 12, Salotungo, Watansoppeng'],
                    ['name' => 'UPTD Puskesmas Sewo', 'opd_name' => 'UPTD Puskesmas Sewo', 'unit_code' => 'PKM-SEWO', 'latitude' => -4.3620, 'longitude' => 120.0050, 'radius_meters' => 100, 'alamat' => 'Kelurahan Sewo, Kec. Lalabata'],
                    ['name' => 'UPTD Puskesmas Malaka', 'opd_name' => 'UPTD Puskesmas Malaka', 'unit_code' => 'PKM-MALAKA', 'latitude' => -4.3480, 'longitude' => 120.0250, 'radius_meters' => 100, 'alamat' => 'Jl. Malaka Raya, Kec. Lalabata'],
                    ['name' => 'UPTD Puskesmas Takalala', 'opd_name' => 'UPTD Puskesmas Takalala', 'unit_code' => 'PKM-TAKALALA', 'latitude' => -4.4210, 'longitude' => 119.9850, 'radius_meters' => 100, 'alamat' => 'Jl. Pasar Baru, Takalala, Kec. Marioriwawo'],
                    ['name' => 'UPTD Puskesmas Tanjonge', 'opd_name' => 'UPTD Puskesmas Tanjonge', 'unit_code' => 'PKM-TANJONGE', 'latitude' => -4.4500, 'longitude' => 119.9600, 'radius_meters' => 100, 'alamat' => 'Desa Tanjonge, Kec. Marioriwawo'],
                    ['name' => 'UPTD Puskesmas Goarie', 'opd_name' => 'UPTD Puskesmas Goarie', 'unit_code' => 'PKM-GOARIE', 'latitude' => -4.4100, 'longitude' => 120.0100, 'radius_meters' => 100, 'alamat' => 'Desa Goarie, Kec. Marioriwawo'],
                    ['name' => 'UPTD Puskesmas Cangadi', 'opd_name' => 'UPTD Puskesmas Cangadi', 'unit_code' => 'PKM-CANGADI', 'latitude' => -4.3780, 'longitude' => 120.0820, 'radius_meters' => 100, 'alamat' => 'Jl. Poros Soppeng-Sidrap, Cangadi, Kec. Liliriaja'],
                    ['name' => 'UPTD Puskesmas Pacongkang', 'opd_name' => 'UPTD Puskesmas Pacongkang', 'unit_code' => 'PKM-PACONGKANG', 'latitude' => -4.3850, 'longitude' => 120.0950, 'radius_meters' => 100, 'alamat' => 'Desa Pacongkang, Kec. Liliriaja'],
                    ['name' => 'UPTD Puskesmas Cabenge', 'opd_name' => 'UPTD Puskesmas Cabenge', 'unit_code' => 'PKM-CABENGE', 'latitude' => -4.3310, 'longitude' => 120.1450, 'radius_meters' => 100, 'alamat' => 'Kel. Cabenge, Kec. Lilirilau'],
                    ['name' => 'UPTD Puskesmas Baringeng', 'opd_name' => 'UPTD Puskesmas Baringeng', 'unit_code' => 'PKM-BARINGENG', 'latitude' => -4.3100, 'longitude' => 120.1800, 'radius_meters' => 100, 'alamat' => 'Desa Baringeng, Kec. Lilirilau'],
                    ['name' => 'UPTD Puskesmas Cakkuridi', 'opd_name' => 'UPTD Puskesmas Cakkuridi', 'unit_code' => 'PKM-CAKKURIDI', 'latitude' => -4.3400, 'longitude' => 120.1200, 'radius_meters' => 100, 'alamat' => 'Desa Cakkuridi, Kec. Lilirilau'],
                    ['name' => 'UPTD Puskesmas Tajuncu', 'opd_name' => 'UPTD Puskesmas Tajuncu', 'unit_code' => 'PKM-TAJUNCU', 'latitude' => -4.2950, 'longitude' => 119.9700, 'radius_meters' => 100, 'alamat' => 'Jl. Tajuncu, Kec. Donri-Donri'],
                    ['name' => 'UPTD Puskesmas Batu-Batu', 'opd_name' => 'UPTD Puskesmas Batu-Batu', 'unit_code' => 'PKM-BATUBATU', 'latitude' => -4.2300, 'longitude' => 119.9300, 'radius_meters' => 100, 'alamat' => 'Kel. Batu-Batu, Kec. Marioriawa'],
                    ['name' => 'UPTD Puskesmas Leworeng', 'opd_name' => 'UPTD Puskesmas Leworeng', 'unit_code' => 'PKM-LEWORENG', 'latitude' => -4.2100, 'longitude' => 119.9100, 'radius_meters' => 100, 'alamat' => 'Desa Leworeng, Kec. Marioriawa'],
                    ['name' => 'UPTD Puskesmas Panincong', 'opd_name' => 'UPTD Puskesmas Panincong', 'unit_code' => 'PKM-PANINCONG', 'latitude' => -4.2500, 'longitude' => 119.9500, 'radius_meters' => 100, 'alamat' => 'Desa Panincong, Kec. Marioriawa'],
                    ['name' => 'UPTD Puskesmas Citta', 'opd_name' => 'UPTD Puskesmas Citta', 'unit_code' => 'PKM-CITTA', 'latitude' => -4.4300, 'longitude' => 120.0600, 'radius_meters' => 100, 'alamat' => 'Desa Citta, Kec. Citta'],
                    ['name' => 'UPTD Puskesmas Ganra', 'opd_name' => 'UPTD Puskesmas Ganra', 'unit_code' => 'PKM-GANRA', 'latitude' => -4.3150, 'longitude' => 120.0400, 'radius_meters' => 100, 'alamat' => 'Desa Ganra, Kec. Ganra'],
                ],
            ],

            // 3. Dinas Pendidikan dan Kebudayaan
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

            // 4. Badan Kepegawaian dan Pengembangan SDM (BKPSDM)
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

            // 5. Badan Pengelola Keuangan dan Aset Daerah (BPKAD)
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

            // 6. Bappelitbangda
            [
                'parent' => [
                    'name' => 'Kantor Bappelitbangda',
                    'opd_name' => 'Badan Perencanaan Pembangunan, Penelitian dan Pengembangan Daerah',
                    'unit_code' => 'BAPPELITBANGDA',
                    'latitude' => -4.3425,
                    'longitude' => 120.0128,
                    'radius_meters' => 100,
                    'alamat' => 'Jl. Pemuda No. 5, Watansoppeng',
                ],
                'subs' => [],
            ],

            // 7. Disdukcapil
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

            // 8. Satpol PP & Damkar
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

            // 9. Dinas Perhubungan
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

            // 10. Dinas Pekerjaan Umum dan Penataan Ruang (PUPR)
            [
                'parent' => [
                    'name' => 'Kantor Dinas PUPR',
                    'opd_name' => 'Dinas Pekerjaan Umum dan Penataan Ruang',
                    'unit_code' => 'PUPR',
                    'latitude' => -4.3460,
                    'longitude' => 120.0165,
                    'radius_meters' => 100,
                    'alamat' => 'Jl. Merdeka No. 20, Watansoppeng',
                ],
                'subs' => [],
            ],

            // 11. Dinas Sosial
            [
                'parent' => [
                    'name' => 'Kantor Dinas Sosial',
                    'opd_name' => 'Dinas Sosial',
                    'unit_code' => 'DINSOS',
                    'latitude' => -4.3430,
                    'longitude' => 120.0135,
                    'radius_meters' => 100,
                    'alamat' => 'Jl. Pengayoman No. 10, Watansoppeng',
                ],
                'subs' => [],
            ],

            // 12. 8 KECAMATAN DAN 21 KELURAHAN KABUPATEN SOPPENG
            // (1) Kecamatan Lalabata + 7 Kelurahan
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
                'subs' => [
                    ['name' => 'Kantor Kelurahan Bila', 'opd_name' => 'Kelurahan Bila', 'unit_code' => 'KEL-BILA', 'latitude' => -4.3410, 'longitude' => 120.0120, 'radius_meters' => 80, 'alamat' => 'Kelurahan Bila, Kec. Lalabata'],
                    ['name' => 'Kantor Kelurahan Botto', 'opd_name' => 'Kelurahan Botto', 'unit_code' => 'KEL-BOTTO', 'latitude' => -4.3430, 'longitude' => 120.0100, 'radius_meters' => 80, 'alamat' => 'Kelurahan Botto, Kec. Lalabata'],
                    ['name' => 'Kantor Kelurahan Lalabata Rilau', 'opd_name' => 'Kelurahan Lalabata Rilau', 'unit_code' => 'KEL-LALABATARILAU', 'latitude' => -4.3390, 'longitude' => 120.0080, 'radius_meters' => 80, 'alamat' => 'Kelurahan Lalabata Rilau, Kec. Lalabata'],
                    ['name' => 'Kantor Kelurahan Lapajung', 'opd_name' => 'Kelurahan Lapajung', 'unit_code' => 'KEL-LAPAJUNG', 'latitude' => -4.3450, 'longitude' => 120.0140, 'radius_meters' => 80, 'alamat' => 'Kelurahan Lapajung, Kec. Lalabata'],
                    ['name' => 'Kantor Kelurahan Lemba', 'opd_name' => 'Kelurahan Lemba', 'unit_code' => 'KEL-LEMBA', 'latitude' => -4.3380, 'longitude' => 120.0150, 'radius_meters' => 80, 'alamat' => 'Kelurahan Lemba, Kec. Lalabata'],
                    ['name' => 'Kantor Kelurahan Ompo', 'opd_name' => 'Kelurahan Ompo', 'unit_code' => 'KEL-OMPO', 'latitude' => -4.3320, 'longitude' => 120.0200, 'radius_meters' => 80, 'alamat' => 'Kelurahan Ompo, Kec. Lalabata'],
                    ['name' => 'Kantor Kelurahan Salokaraja', 'opd_name' => 'Kelurahan Salokaraja', 'unit_code' => 'KEL-SALOKARAJA', 'latitude' => -4.3470, 'longitude' => 120.0030, 'radius_meters' => 80, 'alamat' => 'Kelurahan Salokaraja, Kec. Lalabata'],
                ],
            ],

            // (2) Kecamatan Marioriwawo + 2 Kelurahan
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
                'subs' => [
                    ['name' => 'Kantor Kelurahan Labessi', 'opd_name' => 'Kelurahan Labessi', 'unit_code' => 'KEL-LABESSI', 'latitude' => -4.4215, 'longitude' => 119.9860, 'radius_meters' => 80, 'alamat' => 'Kelurahan Labessi, Kec. Marioriwawo'],
                    ['name' => 'Kantor Kelurahan Tettikenrarae', 'opd_name' => 'Kelurahan Tettikenrarae', 'unit_code' => 'KEL-TETTIKENRARAE', 'latitude' => -4.4250, 'longitude' => 119.9890, 'radius_meters' => 80, 'alamat' => 'Kelurahan Tettikenrarae, Kec. Marioriwawo'],
                ],
            ],

            // (3) Kecamatan Liliriaja + 3 Kelurahan
            [
                'parent' => [
                    'name' => 'Kantor Camat Liliriaja',
                    'opd_name' => 'Kecamatan Liliriaja',
                    'unit_code' => 'KEC-LILIRIAJA',
                    'latitude' => -4.3770,
                    'longitude' => 120.0810,
                    'radius_meters' => 100,
                    'alamat' => 'Cangadi, Kec. Liliriaja',
                ],
                'subs' => [
                    ['name' => 'Kantor Kelurahan Appanang', 'opd_name' => 'Kelurahan Appanang', 'unit_code' => 'KEL-APPANANG', 'latitude' => -4.3750, 'longitude' => 120.0780, 'radius_meters' => 80, 'alamat' => 'Kelurahan Appanang, Kec. Liliriaja'],
                    ['name' => 'Kantor Kelurahan Galung', 'opd_name' => 'Kelurahan Galung', 'unit_code' => 'KEL-GALUNG', 'latitude' => -4.3790, 'longitude' => 120.0840, 'radius_meters' => 80, 'alamat' => 'Kelurahan Galung, Kec. Liliriaja'],
                    ['name' => 'Kantor Kelurahan Jennae', 'opd_name' => 'Kelurahan Jennae', 'unit_code' => 'KEL-JENNAE', 'latitude' => -4.3820, 'longitude' => 120.0860, 'radius_meters' => 80, 'alamat' => 'Kelurahan Jennae, Kec. Liliriaja'],
                ],
            ],

            // (4) Kecamatan Lilirilau + 4 Kelurahan
            [
                'parent' => [
                    'name' => 'Kantor Camat Lilirilau',
                    'opd_name' => 'Kecamatan Lilirilau',
                    'unit_code' => 'KEC-LILIRILAU',
                    'latitude' => -4.3300,
                    'longitude' => 120.1440,
                    'radius_meters' => 100,
                    'alamat' => 'Cabenge, Kec. Lilirilau',
                ],
                'subs' => [
                    ['name' => 'Kantor Kelurahan Cabenge', 'opd_name' => 'Kelurahan Cabenge', 'unit_code' => 'KEL-CABENGE', 'latitude' => -4.3310, 'longitude' => 120.1450, 'radius_meters' => 80, 'alamat' => 'Kelurahan Cabenge, Kec. Lilirilau'],
                    ['name' => 'Kantor Kelurahan Macanre', 'opd_name' => 'Kelurahan Macanre', 'unit_code' => 'KEL-MACANRE', 'latitude' => -4.3350, 'longitude' => 120.1480, 'radius_meters' => 80, 'alamat' => 'Kelurahan Macanre, Kec. Lilirilau'],
                    ['name' => 'Kantor Kelurahan Pajalesang', 'opd_name' => 'Kelurahan Pajalesang', 'unit_code' => 'KEL-PAJALESANG', 'latitude' => -4.3280, 'longitude' => 120.1420, 'radius_meters' => 80, 'alamat' => 'Kelurahan Pajalesang, Kec. Lilirilau'],
                    ['name' => 'Kantor Kelurahan Ujung', 'opd_name' => 'Kelurahan Ujung', 'unit_code' => 'KEL-UJUNG', 'latitude' => -4.3250, 'longitude' => 120.1400, 'radius_meters' => 80, 'alamat' => 'Kelurahan Ujung, Kec. Lilirilau'],
                ],
            ],

            // (5) Kecamatan Marioriawa + 5 Kelurahan
            [
                'parent' => [
                    'name' => 'Kantor Camat Marioriawa',
                    'opd_name' => 'Kecamatan Marioriawa',
                    'unit_code' => 'KEC-MARIORIAWA',
                    'latitude' => -4.2280,
                    'longitude' => 119.9280,
                    'radius_meters' => 100,
                    'alamat' => 'Batu-Batu, Kec. Marioriawa',
                ],
                'subs' => [
                    ['name' => 'Kantor Kelurahan Attang Salo', 'opd_name' => 'Kelurahan Attang Salo', 'unit_code' => 'KEL-ATTANGSALO', 'latitude' => -4.2260, 'longitude' => 119.9250, 'radius_meters' => 80, 'alamat' => 'Kelurahan Attang Salo, Kec. Marioriawa'],
                    ['name' => 'Kantor Kelurahan Batu-Batu', 'opd_name' => 'Kelurahan Batu-Batu', 'unit_code' => 'KEL-BATUBATU', 'latitude' => -4.2300, 'longitude' => 119.9300, 'radius_meters' => 80, 'alamat' => 'Kelurahan Batu-Batu, Kec. Marioriawa'],
                    ['name' => 'Kantor Kelurahan Kaca', 'opd_name' => 'Kelurahan Kaca', 'unit_code' => 'KEL-KACA', 'latitude' => -4.2350, 'longitude' => 119.9350, 'radius_meters' => 80, 'alamat' => 'Kelurahan Kaca, Kec. Marioriawa'],
                    ['name' => 'Kantor Kelurahan Limpomajang', 'opd_name' => 'Kelurahan Limpomajang', 'unit_code' => 'KEL-LIMPOMAJANG', 'latitude' => -4.2200, 'longitude' => 119.9200, 'radius_meters' => 80, 'alamat' => 'Kelurahan Limpomajang, Kec. Marioriawa'],
                    ['name' => 'Kantor Kelurahan Manorang Salo', 'opd_name' => 'Kelurahan Manorang Salo', 'unit_code' => 'KEL-MANORANGSALO', 'latitude' => -4.2230, 'longitude' => 119.9220, 'radius_meters' => 80, 'alamat' => 'Kelurahan Manorang Salo, Kec. Marioriawa'],
                ],
            ],

            // (6) Kecamatan Donri-Donri
            [
                'parent' => [
                    'name' => 'Kantor Camat Donri-Donri',
                    'opd_name' => 'Kecamatan Donri-Donri',
                    'unit_code' => 'KEC-DONRIDONRI',
                    'latitude' => -4.2940,
                    'longitude' => 119.9680,
                    'radius_meters' => 100,
                    'alamat' => 'Tajuncu, Kec. Donri-Donri',
                ],
                'subs' => [],
            ],

            // (7) Kecamatan Ganra
            [
                'parent' => [
                    'name' => 'Kantor Camat Ganra',
                    'opd_name' => 'Kecamatan Ganra',
                    'unit_code' => 'KEC-GANRA',
                    'latitude' => -4.3140,
                    'longitude' => 120.0380,
                    'radius_meters' => 100,
                    'alamat' => 'Ganra, Kec. Ganra',
                ],
                'subs' => [],
            ],

            // (8) Kecamatan Citta
            [
                'parent' => [
                    'name' => 'Kantor Camat Citta',
                    'opd_name' => 'Kecamatan Citta',
                    'unit_code' => 'KEC-CITTA',
                    'latitude' => -4.4280,
                    'longitude' => 120.0580,
                    'radius_meters' => 100,
                    'alamat' => 'Citta, Kec. Citta',
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
