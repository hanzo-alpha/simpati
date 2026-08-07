<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EventPresensiParticipant extends Model
{
    protected $fillable = [
        'event_presensi_id',
        'user_id',
        'waktu_presensi',
        'latitude',
        'longitude',
        'keterangan',
    ];

    protected $casts = [
        'waktu_presensi' => 'datetime',
        'latitude' => 'decimal:7',
        'longitude' => 'decimal:7',
    ];

    public function event(): BelongsTo
    {
        return $this->belongsTo(EventPresensi::class, 'event_presensi_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
