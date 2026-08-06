<?php

namespace App\Models;

use App\Enums\AttendanceStatus;
use App\Enums\AttendanceType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Attendance extends Model
{
    protected $fillable = [
        'user_id',
        'tanggal',
        'jenis',
        'waktu',
        'latitude',
        'longitude',
        'foto_selfie_path',
        'status',
        'in_radius',
        'keterangan',
    ];

    protected $casts = [
        'tanggal' => 'date',
        'waktu' => 'datetime:H:i:s',
        'latitude' => 'decimal:7',
        'longitude' => 'decimal:7',
        'in_radius' => 'boolean',
        'jenis' => AttendanceType::class,
        'status' => AttendanceStatus::class,
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope: get attendances for a specific date.
     */
    public function scopeForDate($query, $date)
    {
        return $query->where('tanggal', $date);
    }

    /**
     * Scope: get attendances for a specific user on a date.
     */
    public function scopeForUserOnDate($query, int $userId, $date)
    {
        return $query->where('user_id', $userId)->where('tanggal', $date);
    }

    /**
     * Scope: get attendances for a specific month.
     */
    public function scopeForMonth($query, int $year, int $month)
    {
        return $query->whereYear('tanggal', $year)->whereMonth('tanggal', $month);
    }

    /**
     * Check if attendance is on time.
     */
    public function isOnTime(): bool
    {
        return $this->status === AttendanceStatus::TEPAT_WAKTU;
    }
}
