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
        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->string('email')->nullable(false);
            $table->string('phone')->nullable(false);
            $table->string('beds')->nullable();
            $table->string('baths')->nullable();
            $table->unsignedSmallInteger('garage')->nullable();
            $table->enum('pool', ['yes', 'no'])->nullable();
            $table->longText('address')->nullable(false);
            $table->string('zip_code', 15)->nullable();
            $table->longText('description')->nullable();
            $table->string('owner_wholesaler')->nullable();
            $table->decimal('asking_price')->nullable();
            $table->decimal('price', 8, 2)->nullable();
            $table->string('square_footage')->nullable();
            $table->string('occupancy')->nullable();
            $table->string('ideal_selling_timeframe')->nullable();
            $table->string('motivation')->nullable();
            $table->enum('negotiable', ['yes', 'no'])->nullable();
            $table->text('violations')->nullable();
            $table->string('mortgage')->nullable();
            $table->string('listed_with_real_estate_agent')->nullable();
            $table->string('repairs_needed')->nullable();
            $table->string('property_condition')->nullable();
            $table->string('how_long_you_owned')->nullable();
            $table->string('year_of_construction')->nullable();
            $table->string('type_of_house')->nullable();
            $table->decimal('monthly_rental_amount', 8, 2)->nullable();
            $table->enum('status', ['available', 'sold', 'on hold'])->nullable();
            $table->string('expiration_time')->nullable();
            $table->string('currently_possessed_by')->nullable(false);
            $table->unsignedBigInteger('seller_id')->nullable();
            $table->longText('conversation')->nullable();
            $table->string('pictures')->nullable();
            $table->dateTime('created_at')->useCurrent();
            $table->dateTime('updated_at')->useCurrent();
            $table->unsignedBigInteger('city_id')->nullable();
            $table->unsignedBigInteger('county_id')->nullable();
            $table->unsignedBigInteger('state_id')->nullable();
            $table->foreign('city_id')->nullable()->references('id')->on('cities');
            $table->foreign('county_id')->nullable()->references('id')->on('counties');
            $table->foreign('state_id')->nullable()->references('id')->on('states');
            $table->foreign('seller_id')->references('id')->on('sellers');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leads');
    }
};