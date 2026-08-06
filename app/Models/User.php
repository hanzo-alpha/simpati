<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'nip',
        'email',
        'password',
        'fcm_token',
        'device_id',
        'office_id',
        'role_id',
        'supervisor_id',
        'is_active',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_active' => 'boolean',
        ];
    }

    // ─── Relationships ───────────────────────────────

    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

    public function office(): BelongsTo
    {
        return $this->belongsTo(Office::class);
    }

    public function supervisor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'supervisor_id');
    }

    public function subordinates(): HasMany
    {
        return $this->hasMany(User::class, 'supervisor_id');
    }

    public function profile(): HasOne
    {
        return $this->hasOne(UserProfile::class);
    }

    public function attendances(): HasMany
    {
        return $this->hasMany(Attendance::class);
    }

    public function leaveRequests(): HasMany
    {
        return $this->hasMany(LeaveRequest::class);
    }

    public function approvedLeaveRequests(): HasMany
    {
        return $this->hasMany(LeaveRequest::class, 'approved_by');
    }

    // ─── Role Helpers ────────────────────────────────

    public function isSuperAdmin(): bool
    {
        return $this->role?->name === 'super_admin';
    }

    public function isAdminOpd(): bool
    {
        return $this->role?->name === 'admin_opd';
    }

    public function isAtasan(): bool
    {
        return $this->role?->name === 'atasan';
    }

    public function isAsn(): bool
    {
        return $this->role?->name === 'asn';
    }

    // ─── Attendance Helpers ──────────────────────────

    public function getTodayAttendances()
    {
        return $this->attendances()->forDate(now()->toDateString())->get();
    }

    public function getMonthlyAttendances(int $year, int $month)
    {
        return $this->attendances()->forMonth($year, $month)->get();
    }
}
