<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Seller>
 */
class IntegrationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        return [
            'active_status' => $this->faker->boolean(),
            'webhook_url' => $this->faker->text(),
            'http_headers' => $this->faker->randomElements([
                ['key' => $this->faker->text(), 'value' => $this->faker->text()],
                ['key' => $this->faker->text(), 'value' => $this->faker->text()],
                ['key' => $this->faker->text(), 'value' => $this->faker->text()],
            ], $this->faker->numberBetween(1, 5)),



        ];
    }
}