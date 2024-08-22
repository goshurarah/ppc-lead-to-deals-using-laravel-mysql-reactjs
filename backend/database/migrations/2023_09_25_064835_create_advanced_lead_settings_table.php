<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('advanced_lead_settings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->json('motivation')->nullable();
            $table->json('type_of_house')->nullable();
            $table->json('year_of_construction')->nullable();
            $table->json('repairs_needed')->nullable();
            $table->json('ideal_selling_timeframe')->nullable();
            $table->json('how_long_you_owned')->nullable();
            $table->json('occupancy')->nullable();
            $table->json('square_footage')->nullable();
            $table->json('beds')->nullable();
            $table->json('baths')->nullable();
            $table->json('mortgage')->nullable();
            $table->json('owner_wholesaler')->nullable();
            $table->json('listed_with_real_estate_agent')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('advanced_lead_settings');
    }
};