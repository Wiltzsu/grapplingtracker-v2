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
        Schema::create('training_classes', function (Blueprint $table) {
            $table->id('class_id');
            $table->unsignedBigInteger('user_id')->index();
            $table->string('instructor')->nullable();
            $table->string('location');
            $table->date('class_date');
            $table->string('class_description')->nullable();
            $table->integer('class_duration');
            $table->integer('rounds')->nullable();
            $table->integer('round_duration')->nullable();
            $table->timestamps();

            // Foreign key constraint
            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('training_classes');
    }
};
