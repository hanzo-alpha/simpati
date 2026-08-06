<?php

namespace App\Models;

use App\Enums\LeaveStatus;
use App\Enums\LeaveType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LeaveRequest extends Model
{
    protected $fillable = [
        'user_id',
        'type',
        'tanggal_mulai',
        'tanggal_selesai',
        'alasan',
        'lampiran_path',
        'status',
        'approved_by',
        'catatan_approval',
        'approved_at',
        'atasan_approved_by',
        'atasan_status',
        'catatan_atasan',
        'atasan_approved_at',
    ];

    protected $appends = [
        'duration',
        'type_label',
        'status_label',
        'lampiran_url',
    ];

    protected $casts = [
        'tanggal_mulai' => 'date',
        'tanggal_selesai' => 'date',
        'approved_at' => 'datetime',
        'atasan_approved_at' => 'datetime',
        'type' => LeaveType::class,
        'status' => LeaveStatus::class,
    ];

    public function getLampiranUrlAttribute(): ?string
    {
        if (! $this->lampiran_path) {
            return null;
        }

        return asset('storage/'.$this->lampiran_path);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function approver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function atasanApprover(): BelongsTo
    {
        return $this->belongsTo(User::class, 'atasan_approved_by');
    }

    /**
     * Get the duration in days.
     */
    public function getDurationAttribute(): int
    {
        return $this->tanggal_mulai->diffInDays($this->tanggal_selesai) + 1;
    }

    /**
     * Get the type label in Indonesian.
     */
    public function getTypeLabelAttribute(): string
    {
        return match ($this->type) {
            LeaveType::CUTI => 'Cuti',
            LeaveType::SAKIT => 'Sakit',
            LeaveType::DINAS_LUAR => 'Dinas Luar',
            LeaveType::DINAS_DALAM => 'Dinas Dalam',
            default => $this->type instanceof LeaveType ? $this->type->value : (string) $this->type,
        };
    }

    /**
     * Get the status label in Indonesian.
     */
    public function getStatusLabelAttribute(): string
    {
        return match ($this->status) {
            LeaveStatus::MENUNGGU => 'Menunggu Persetujuan',
            LeaveStatus::DISETUJUI => 'Disetujui',
            LeaveStatus::DITOLAK => 'Ditolak',
            default => $this->status instanceof LeaveStatus ? $this->status->value : (string) $this->status,
        };
    }

    /**
     * Scope: pending requests.
     */
    public function scopePending($query)
    {
        return $query->where('status', LeaveStatus::MENUNGGU->value);
    }

    /**
     * Scope: approved requests.
     */
    public function scopeApproved($query)
    {
        return $query->where('status', LeaveStatus::DISETUJUI->value);
    }

    /**
     * Check if the request is still pending.
     */
    public function isPending(): bool
    {
        return $this->status === LeaveStatus::MENUNGGU;
    }
}
