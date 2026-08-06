<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // super_admin, admin_opd, atasan, asn
            $table->string('display_name');
            $table->text('description')->nullable();
            $table->timestamps();
        });

        // Seed default roles
        DB::table('roles')->insert([
            ['name' => 'super_admin', 'display_name' => 'Super Admin', 'description' => 'Administrator utama sistem', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'admin_opd', 'display_name' => 'Admin OPD', 'description' => 'Administrator per OPD', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'atasan', 'display_name' => 'Atasan', 'description' => 'Atasan langsung untuk approval', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'asn', 'display_name' => 'ASN', 'description' => 'Aparatur Sipil Negara', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('roles');
    }
};
