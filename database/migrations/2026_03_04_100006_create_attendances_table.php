<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('attendances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->date('tanggal');
            $table->string('jenis');
            $table->time('waktu');
            $table->decimal('latitude', 10, 7);
            $table->decimal('longitude', 10, 7);
            $table->string('foto_selfie_path')->nullable();
            $table->string('status')->default('tepat_waktu');
            $table->boolean('in_radius')->default(true);
            $table->text('keterangan')->nullable();
            $table->timestamps();

            // Indexes for common queries
            $table->index(['user_id', 'tanggal']);
            $table->index(['tanggal', 'jenis']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('attendances');
    }
};
