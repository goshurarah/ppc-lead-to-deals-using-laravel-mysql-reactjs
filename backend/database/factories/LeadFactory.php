<?php

namespace Database\Factories;

use App\Models\City;
use App\Models\County;
use App\Models\Lead;
use App\Models\State;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Lead>
 */
class LeadFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Lead::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $description = [
            'key1' => 'Cash offer option lead from google ads PPC',
            'key2' => 'Phone number verified with sms confimration',
            'key3' => 'Seller identity and address verified via phone'
        ];
        $ownerWholesaler = ['owner', 'wholesaler'];
        $propertyStatus = ['available', 'sold', 'on hold'];
        $houseType = ['flat', 'condo_apartment', 'mansion', 'villa'];
        $mortgageOptions = ['vacant', 'tenant_occupied', 'owner_occupied'];
        $occupancyOptions = ['owner occupied', 'occupied', 'rented', 'squatters', 'vacant', 'occupied by owner'];
        $timeframeOptions = ['asap', '30 days', '60 days', '90 days', '120 days', '120+ days'];
        $motivationOptions = ['hot', 'warm', 'cold', 'dead'];
        $yesNoOptions = ['yes', 'no'];
        $propertyConditionOptions = ['fair condition', 'fully renovated', 'needs full renovation'];
        $randomCityIds = City::inRandomOrder()->pluck('id')->toArray();
        $randomCountyIds = County::inRandomOrder()->pluck('id')->toArray();
        $randomStateIds = State::inRandomOrder()->pluck('id')->toArray();
        $hasPool = ['yes', 'no'];

        return [
            'beds' => $this->faker->numberBetween(1, 5),
            'email' => $this->faker->email(),
            'phone' => $this->faker->numberBetween(1, 11),
            'baths' => $this->faker->numberBetween(1, 3),
            'garage' => $this->faker->numberBetween(0, 2),
            'pool' => $this->faker->randomElement($hasPool),
            'city_id' => $this->faker->randomElement($randomCityIds),
            'county_id' => $this->faker->randomElement($randomCountyIds),
            'state_id' => $this->faker->randomElement($randomStateIds),
            'address' => $this->faker->streetAddress,
            'zip_code' => $this->faker->postcode,
            'description' => $description,
            'owner_wholesaler' => $this->faker->randomElement($ownerWholesaler),
            'asking_price' => $this->faker->randomFloat(2, 1000, 1000000),
            'price' => $this->faker->randomFloat(2, 1000, 1000000),
            'square_footage' => $this->faker->numberBetween(500, 5000),
            'occupancy' => $this->faker->randomElement($occupancyOptions),
            'ideal_selling_timeframe' => $this->faker->randomElement($timeframeOptions),
            'motivation' => $this->faker->randomElement($motivationOptions),
            'negotiable' => $this->faker->randomElement($yesNoOptions),
            'violations' => $this->faker->text,
            'mortgage' => $this->faker->randomElement($mortgageOptions),
            'listed_with_real_estate_agent' => $this->faker->randomElement($yesNoOptions),
            'repairs_needed' => $this->faker->randomElement($yesNoOptions),
            'property_condition' => $this->faker->randomElement($propertyConditionOptions),
            'how_long_you_owned' => $this->faker->sentence,
            'year_of_construction' => $this->faker->year,
            'type_of_house' => $this->faker->randomElement($houseType),
            'monthly_rental_amount' => $this->faker->randomFloat(2, 500, 5000),
            'status' =>  $this->faker->randomElement($propertyStatus),
            'expiration_time' => $this->faker->dateTime,
            'seller_id' => $this->faker->numberBetween(1, 10),
            'currently_possessed_by' => $this->faker->text(),
            'source' => $this->faker->text()
        ];
    }
}
