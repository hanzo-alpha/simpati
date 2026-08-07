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
        Schema::create('event_presensis', function (Blueprint $table) {
            $table->id();
            $table->string('nama_kegiatan');
            $table->string('penyelenggara')->default('Pemerintah Kab. Soppeng');
            $table->date('tanggal');
            $table->time('jam_mulai')->default('07:00:00');
            $table->time('jam_selesai')->default('09:00:00');
            $table->string('lokasi')->default('Halaman Kantor Bupati Soppeng');
            $table->string('qr_token')->unique();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('event_presensi_participants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_presensi_id')->constrained('event_presensis')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->timestamp('waktu_presensi');
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->string('keterangan')->nullable();
            $table->timestamps();

            $table->unique(['event_presensi_id', 'user_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_presensi_participants');
        Schema::dropIfExists('event_presensis');
    }
};
