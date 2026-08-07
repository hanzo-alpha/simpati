<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('attendance_corrections', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->date('tanggal');
            $table->string('jenis'); // masuk, istirahat, kembali, pulang
            $table->time('jam_koreksi');
            $table->text('alasan');
            $table->string('lampiran_path')->nullable();
            $table->string('status')->default('menunggu'); // menunggu, disetujui, ditolak
            $table->foreignId('approved_by')->nullable()->constrained('users')->nullOnDelete();
            $table->text('catatan_approval')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendance_corrections');
    }
};
