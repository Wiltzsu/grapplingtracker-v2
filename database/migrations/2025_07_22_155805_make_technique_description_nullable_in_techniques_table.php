<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('techniques', function (Blueprint $table) {
            $table->string('technique_description', 1000)->nullable()->change();
            // or use ->text('technique_description')->nullable()->change(); if it's a text column
        });
    }

    public function down(): void
    {
        Schema::table('techniques', function (Blueprint $table) {
            $table->string('technique_description', 1000)->nullable(false)->change();
            // or ->text('technique_description')->nullable(false)->change();
        });
    }
};
