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
        Schema::create('orders', function (Blueprint $table) {
            $table->uuid('id');
            $table->uuid('user_id');
            $table->uuid('product_id');
            $table->string('status');
            $table->decimal('total', 10, 2);
            $table->string('payment_method');
            $table->string('payment_status');
            $table->string('delivery_method');
            $table->string('delivery_status');
            $table->string('delivery_address');
            $table->string('delivery_city');
            $table->string('delivery_postal_code');
            $table->string('delivery_country');
            $table->string('client_name');
            $table->string('client_surname');
            $table->string('client_email');
            $table->string('client_phone');
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
