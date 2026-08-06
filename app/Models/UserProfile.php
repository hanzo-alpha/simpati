<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserProfile extends Model
{
    protected $fillable = [
        'user_id',
        'jabatan',
        'unit_kerja',
        'pangkat_golongan',
        'foto_profil',
        'sisa_cuti_tahunan',
        'no_hp',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
