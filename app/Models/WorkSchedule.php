<?php

namespace App\Models;

use App\Enums\ScheduleType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WorkSchedule extends Model
{
    protected $fillable = [
        'office_id',
        'type',
        'nama_jadwal',
        'hari',
        'jam_masuk',
        'jam_istirahat',
        'jam_kembali',
        'jam_pulang',
        'toleransi_menit',
        'is_active',
    ];

    protected $casts = [
        'jam_masuk' => 'datetime:H:i',
        'jam_istirahat' => 'datetime:H:i',
        'jam_kembali' => 'datetime:H:i',
        'jam_pulang' => 'datetime:H:i',
        'is_active' => 'boolean',
        'type' => ScheduleType::class,
    ];

    public function office(): BelongsTo
    {
        return $this->belongsTo(Office::class);
    }

    /**
     * Get the schedule days as an array.
     */
    public function getDaysArray(): array
    {
        return $this->hari ? explode(',', $this->hari) : [];
    }

    /**
     * Check if this schedule applies to a given day.
     */
    public function appliesOnDay(string $day): bool
    {
        return in_array(strtolower($day), $this->getDaysArray());
    }
}
