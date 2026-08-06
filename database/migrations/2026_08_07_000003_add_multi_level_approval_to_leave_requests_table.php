<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('leave_requests', function (Blueprint $table) {
            $table->foreignId('atasan_approved_by')->nullable()->after('status')->constrained('users')->nullOnDelete();
            $table->enum('atasan_status', ['menunggu', 'disetujui', 'ditolak'])->default('menunggu')->after('atasan_approved_by');
            $table->text('catatan_atasan')->nullable()->after('atasan_status');
            $table->timestamp('atasan_approved_at')->nullable()->after('catatan_atasan');
        });
    }

    public function down(): void
    {
        Schema::table('leave_requests', function (Blueprint $table) {
            $table->dropForeign(['atasan_approved_by']);
            $table->dropColumn(['atasan_approved_by', 'atasan_status', 'catatan_atasan', 'atasan_approved_at']);
        });
    }
};
