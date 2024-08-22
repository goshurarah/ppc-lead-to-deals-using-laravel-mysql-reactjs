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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('order_id');
            $table->string('pg_transaction_id')->nullable();    // Payment Gateway Transaction id
            $table->decimal('amount', 8, 2)->nullable();
            $table->string('currency', 5)->nullable();
            $table->string('payment_gateway')->nullable();
            $table->enum('status', ['completed', 'pending', 'failed', 'refunded'])->default('pending');;
            $table->string('stripe_customer_id')->nullable();
            $table->text('receipt_url')->nullable();
            $table->string('failure_reason')->nullable();
            $table->dateTime('created_at')->useCurrent();
            $table->dateTime('updated_at')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
