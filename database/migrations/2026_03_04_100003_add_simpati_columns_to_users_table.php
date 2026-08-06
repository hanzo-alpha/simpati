<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Add SIMPATI-specific columns to the users table
        Schema::table('users', function (Blueprint $table) {
            $table->string('nip')->unique()->after('id');
            $table->foreignId('office_id')->nullable()->after('password')->constrained('offices')->nullOnDelete();
            $table->foreignId('role_id')->nullable()->after('office_id')->constrained('roles')->nullOnDelete();
            $table->foreignId('supervisor_id')->nullable()->after('role_id')->constrained('users')->nullOnDelete();
            $table->boolean('is_active')->default(true)->after('supervisor_id');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['office_id']);
            $table->dropForeign(['role_id']);
            $table->dropForeign(['supervisor_id']);
            $table->dropColumn(['nip', 'office_id', 'role_id', 'supervisor_id', 'is_active']);
        });
    }
};
