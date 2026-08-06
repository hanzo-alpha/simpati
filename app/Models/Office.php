<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Office extends Model
{
    protected $fillable = [
        'id',
        'parent_id',
        'unit_code',
        'name',
        'opd_name',
        'latitude',
        'longitude',
        'radius_meters',
        'alamat',
        'is_active',
    ];

    protected $casts = [
        'latitude' => 'decimal:7',
        'longitude' => 'decimal:7',
        'is_active' => 'boolean',
    ];

    /**
     * Parent OPD / Instansi Induk.
     */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Office::class, 'parent_id');
    }

    /**
     * Sub OPD / UPTD / Sub Unit Kerja Children.
     */
    public function subOffices(): HasMany
    {
        return $this->hasMany(Office::class, 'parent_id');
    }

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    public function workSchedules(): HasMany
    {
        return $this->hasMany(WorkSchedule::class);
    }

    /**
     * Check if given coordinates are within the office radius.
     */
    public function isWithinRadius(float $lat, float $lng): bool
    {
        $distance = $this->calculateDistance($lat, $lng);

        return $distance <= $this->radius_meters;
    }

    /**
     * Calculate distance in meters between office and given coordinates using Haversine formula.
     */
    public function calculateDistance(float $lat, float $lng): float
    {
        $earthRadius = 6371000; // meters

        $dLat = deg2rad($lat - $this->latitude);
        $dLng = deg2rad($lng - $this->longitude);

        $a = sin($dLat / 2) * sin($dLat / 2) +
            cos(deg2rad($this->latitude)) * cos(deg2rad($lat)) *
            sin($dLng / 2) * sin($dLng / 2);

        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));

        return $earthRadius * $c;
    }
}
