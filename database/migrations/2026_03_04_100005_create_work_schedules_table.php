<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('work_schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('office_id')->constrained()->cascadeOnDelete();
            $table->enum('type', ['reguler', 'shift', 'fleksibel'])->default('reguler');
            $table->string('nama_jadwal')->nullable(); // e.g. "Senin-Kamis", "Jumat", "Shift Pagi"
            $table->string('hari')->nullable(); // comma-separated: "senin,selasa,rabu,kamis" or "jumat"
            $table->time('jam_masuk')->nullable();
            $table->time('jam_istirahat')->nullable();
            $table->time('jam_kembali')->nullable();
            $table->time('jam_pulang')->nullable();
            $table->integer('toleransi_menit')->default(15);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('work_schedules');
    }
};
