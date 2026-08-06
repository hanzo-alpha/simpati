<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('announcements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('office_id')->nullable()->constrained()->nullOnDelete(); // null means broadcast to all offices
            $table->string('judul');
            $table->text('konten');
            $table->enum('kategori', ['informasi', 'penting', 'darurat'])->default('informasi');
            $table->timestamp('published_at')->useCurrent();
            $table->timestamp('expires_at')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('announcements');
    }
};
