<?php

namespace App\Enums;

enum AttendanceStatus: string
{
    case TEPAT_WAKTU = 'tepat_waktu';
    case TERLAMBAT = 'terlambat';
    case SANGAT_TERLAMBAT = 'sangat_terlambat';
    case PULANG_CEPAT = 'pulang_cepat';
    case MENUNGGU_PERSETUJUAN = 'menunggu_persetujuan';
}
