<?php

namespace App\Enums;

enum AttendanceType: string
{
    case MASUK = 'masuk';
    case ISTIRAHAT = 'istirahat';
    case KEMBALI = 'kembali';
    case PULANG = 'pulang';
    case DINAS_LUAR = 'dinas_luar';
    case WFH = 'wfh';
}
