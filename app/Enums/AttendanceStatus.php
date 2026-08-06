<?php

namespace App\Enums;

enum AttendanceStatus: string
{
    case TEPAT_WAKTU = 'tepat_waktu';
    case TERLAMBAT = 'terlambat'; // TL
    case SANGAT_TERLAMBAT = 'sangat_terlambat'; // TL Sangat Terlambat
    case PULANG_CEPAT = 'pulang_cepat'; // PSW
    case ALPHA = 'alpha'; // TK (Tanpa Keterangan)
    case DINAS_DALAM = 'dinas_dalam'; // DD
    case DINAS_LUAR = 'dinas_luar'; // DL
    case SAKIT = 'sakit'; // Izin Sakit
    case CUTI = 'cuti'; // Cuti
    case MENUNGGU_PERSETUJUAN = 'menunggu_persetujuan';

    public function code(): string
    {
        return match ($this) {
            self::TEPAT_WAKTU => 'Hadir',
            self::TERLAMBAT, self::SANGAT_TERLAMBAT => 'TL',
            self::PULANG_CEPAT => 'PSW',
            self::ALPHA => 'TK',
            self::DINAS_DALAM => 'DD',
            self::DINAS_LUAR => 'DL',
            self::SAKIT => 'Sakit',
            self::CUTI => 'Cuti',
            self::MENUNGGU_PERSETUJUAN => 'Pending',
        };
    }
}
