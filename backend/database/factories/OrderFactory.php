<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Generator as Faker;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $status = ['completed', 'failed', 'refunded'];
        return [
            'lead_id' => $this->faker->numberBetween(1, 10),
            'user_id' => $this->faker->numberBetween(1, 10),
            'price' => $this->faker->numberBetween(100, 1000),
            'discount_in_percentage' => $this->faker->numberBetween(10, 50),
            'coupon_code' => $this->faker->numberBetween(100000, 999999),
            'status' => $this->faker->randomElement($status),
        ];
    }
}
