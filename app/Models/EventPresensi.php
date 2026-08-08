<?php

namespace App\Models;

use App\Enums\EventStatus;
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

    /**
     * Check if the event has expired based on date and jam_selesai.
     */
    public function getIsExpiredAttribute(): bool
    {
        return $this->status === EventStatus::SELESAI;
    }

    /**
     * Get computed EventStatus Enum: EventStatus::AKTIF, EventStatus::MENDATANG, EventStatus::SELESAI.
     */
    public function getStatusAttribute(): EventStatus
    {
        if (! $this->is_active) {
            return EventStatus::SELESAI;
        }

        if (! $this->tanggal) {
            return EventStatus::AKTIF;
        }

        $today = now()->toDateString();
        $eventDate = is_string($this->tanggal) ? explode('T', $this->tanggal)[0] : $this->tanggal->format('Y-m-d');
        $currentTime = now()->format('H:i');

        if ($eventDate < $today) {
            return EventStatus::SELESAI;
        }

        if ($eventDate > $today) {
            return EventStatus::MENDATANG;
        }

        // Today
        if ($this->jam_selesai && $currentTime > $this->jam_selesai) {
            return EventStatus::SELESAI;
        }

        if ($this->jam_mulai && $currentTime < $this->jam_mulai) {
            return EventStatus::MENDATANG;
        }

        return EventStatus::AKTIF;
    }

    /**
     * Get computed status label: 'AKTIF', 'MENDATANG', 'SELESAI'.
     */
    public function getStatusLabelAttribute(): string
    {
        return $this->status->label();
    }
}
