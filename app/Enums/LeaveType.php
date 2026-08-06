<?php

namespace App\Enums;

enum LeaveType: string
{
    case CUTI = 'cuti';
    case SAKIT = 'sakit';
    case DINAS_LUAR = 'dinas_luar';
    case DINAS_DALAM = 'dinas_dalam';
    case WFH = 'wfh';
}
