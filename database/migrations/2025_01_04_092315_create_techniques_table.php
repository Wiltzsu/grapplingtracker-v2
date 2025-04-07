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
        Schema::create('techniques', function (Blueprint $table) {
            $table->id('technique_id');
            $table->unsignedBigInteger('user_id')->index();
            $table->string('technique_name');
            $table->text('technique_description');
            $table->unsignedBigInteger('category_id')->index();
            $table->unsignedBigInteger('position_id')->index();
            $table->unsignedBigInteger('class_id')->nullable();
            $table->timestamps();

            // Foreign key constraints
            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            $table->foreign('category_id')
                ->references('category_id')
                ->on('categories')
                ->onDelete('cascade');

            $table->foreign('position_id')
                ->references('position_id')
                ->on('positions')
                ->onDelete('cascade');

            $table->foreign('class_id')
                ->references('class_id')
                ->on('training_classes')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('techniques');
    }
};
