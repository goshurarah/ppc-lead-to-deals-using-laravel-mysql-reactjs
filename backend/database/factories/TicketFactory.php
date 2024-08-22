<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Seller>
 */
class TicketFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $product_categories = [

            'sample1',
            'sample2',
            'sample3'
        ];

        $status = [

            'pending',
            'resolved'
        ];
        return [
            'user_id'=> $this->faker->randomNumber(),
            'subject' => $this->faker->text(),
            'product_category' => $this->faker->randomElement($product_categories),
            'request_details' => $this->faker->text(),
            'file' => $this->faker->imageUrl(),
            'status' =>  $this->faker->randomElement($status),
        ];
    }
}