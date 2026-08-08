<?php

namespace App\Enums;

enum EventStatus: string
{
    case AKTIF = 'aktif';
    case MENDATANG = 'mendatang';
    case SELESAI = 'selesai';

    public function label(): string
    {
        return match ($this) {
            self::AKTIF => 'AKTIF',
            self::MENDATANG => 'MENDATANG',
            self::SELESAI => 'SELESAI',
        };
    }
}
