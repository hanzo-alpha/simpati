<?php

namespace App\Enums;

enum LeaveStatus: string
{
    case MENUNGGU = 'menunggu';
    case DISETUJUI = 'disetujui';
    case DITOLAK = 'ditolak';

    // In some queries, 'pending', 'approved', 'rejected' were used.
    // Ensure we stick to the Indonesian ones used in DB migrations.
}
