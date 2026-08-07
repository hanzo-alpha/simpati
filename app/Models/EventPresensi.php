<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class EventPresensi extends Model
{
    protected $fillable = [
        'nama_kegiatan',
        'penyelenggara',
        'tanggal',
        'jam_mulai',
        'jam_selesai',
        'lokasi',
        'qr_token',
        'is_active',
    ];

    protected $casts = [
        'tanggal' => 'date',
        'is_active' => 'boolean',
    ];

    public function participants(): HasMany
    {
        return $this->hasMany(EventPresensiParticipant::class);
    }
}
