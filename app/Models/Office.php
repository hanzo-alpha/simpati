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
        'polygon_coordinates',
        'alamat',
        'is_active',
    ];

    protected $casts = [
        'latitude' => 'decimal:7',
        'longitude' => 'decimal:7',
        'polygon_coordinates' => 'array',
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
     * Check if given coordinates are within the office radius or polygon geofence.
     */
    public function isWithinRadius(float $lat, float $lng): bool
    {
        if (! empty($this->polygon_coordinates) && count($this->polygon_coordinates) >= 3) {
            return $this->isPointInPolygon($lat, $lng, $this->polygon_coordinates);
        }

        $distance = $this->calculateDistance($lat, $lng);

        return $distance <= $this->radius_meters;
    }

    /**
     * Ray-casting algorithm to test if point (lat, lng) is inside polygon coordinates.
     */
    public function isPointInPolygon(float $lat, float $lng, array $polygon): bool
    {
        $inside = false;
        $count = count($polygon);

        for ($i = 0, $j = $count - 1; $i < $count; $j = $i++) {
            $pointI = $polygon[$i];
            $pointJ = $polygon[$j];

            $xi = (float) ($pointI['lat'] ?? $pointI['latitude'] ?? $pointI[0] ?? 0);
            $yi = (float) ($pointI['lng'] ?? $pointI['longitude'] ?? $pointI[1] ?? 0);
            $xj = (float) ($pointJ['lat'] ?? $pointJ['latitude'] ?? $pointJ[0] ?? 0);
            $yj = (float) ($pointJ['lng'] ?? $pointJ['longitude'] ?? $pointJ[1] ?? 0);

            $intersect = (($yi > $lng) !== ($yj > $lng))
                && ($lat < ($xj - $xi) * ($lng - $yi) / (($yj - $yi) ?: 0.00000001) + $xi);

            if ($intersect) {
                $inside = ! $inside;
            }
        }

        return $inside;
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
