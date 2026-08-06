<?php

namespace App\Enums;

enum ScheduleType: string
{
    case REGULER = 'reguler';
    case SHIFT = 'shift';
    case FLEKSIBEL = 'fleksibel';
}
