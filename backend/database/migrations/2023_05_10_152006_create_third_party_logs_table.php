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
        Schema::create('third_party_logs', function (Blueprint $table) {
            $table->id();
            $table->json('request_data');
            $table->json('response_data');
            $table->string('endpoint');
            $table->string('third_party_name');
            $table->unsignedSmallInteger('status_code')->nullable();
            $table->unsignedBigInteger('api_request_id');
            $table->dateTime('created_at')->useCurrent();
            $table->dateTime('updated_at')->useCurrent();
            $table->foreign('api_request_id')->references('id')->on('api_requests');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('third_party_logs');
    }
};
