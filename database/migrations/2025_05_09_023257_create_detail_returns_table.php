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
        Schema::create('detail_returns', function (Blueprint $table) {
            $table->id('id_detail_return');
            $table->unsignedBigInteger('id_borrowed'); // Pastikan unsignedBigInteger
            $table->enum('status', ['approved', 'not approved', 'pending'])->default('pending');
            $table->string('return_image')->nullable();
            $table->string('description');
            $table->tinyInteger('soft_delete')->default(0);
            $table->dateTime('date_return');
            $table->timestamps();

            $table->foreign('id_borrowed')
                ->references('id_borrowed')
                ->on('borroweds')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_returns');
    }
};
