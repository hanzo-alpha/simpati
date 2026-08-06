<?php

use App\Models\Attendance;
use Illuminate\Contracts\Console\Kernel;

require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';

$kernel = $app->make(Kernel::class);
$kernel->bootstrap();

$recent = Attendance::with('user')->orderBy('id', 'desc')->take(5)->get();

echo "RECENT_5_ATTENDANCES:\n";
foreach ($recent as $att) {
    $jenis = is_object($att->jenis) ? $att->jenis->value : $att->jenis;
    echo "ID: {$att->id} | User: {$att->user?->name} ({$att->user?->nip}) | Jenis: {$jenis} | Tanggal: {$att->tanggal} | Waktu: {$att->waktu} | Created: {$att->created_at}\n";
}
