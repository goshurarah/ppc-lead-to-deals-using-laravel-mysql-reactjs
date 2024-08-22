<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Package>
 */
class PackageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => 'Basic',
            'description' => ['(one time package, non-subscription)', 'Entry level package that will last you 2-3 motivated, off market guaranteed, successful-contact-guaranteed leads.'],
            "price_desc" => null,
            'price' => '500',
            'detail' => ['Off Market Money Back Guarantee on every lead', 'Successful Contact Guarantee on every lead', 'Motivation Guarantee on every lead - if they changed their mind about selling - it’s your money back.']
        ];


    }

    public function premium()
    {
        return $this->state(function (array $attributes) {
            return [
                'name' => 'Premium',
                'description' => ['(one time package, non-subscription)', 'With our customer reported average ratio of 6-12 leads per closed deal - this is a package that has the highest probability of 1-2 successful transactions.'],
                "price_desc" => 'You get $999 +9% bonus $90 on your balance = $1089 you can spend on leads',
                'price' => '999',
                'detail' => ['Nationwide Cash Buyers List (10000 records)', '50,000 top US real estate agents by volume w contact info', '2023 Wholesaling contract pack', 'Special discount coupons that are sent twice a month only to package buyers']
            ];
        });
    }


    public function professional()
    {
        return $this->state(function (array $attributes) {
            return [
                'name' => 'Professional',
                'description' => ['one time package, non-subscription)', 'Ideal for ballers and teams that want more deals and get maximum leads on their investment.'],
                "price_desc" => "You get $4499 +7% bonus $300 on your balance = $4799 you can spend on leads",
                'price' => '4499',
                'detail' => ['PPC Leads to Deal Youtube Closers Show Invitation (close free leads for an hour with a large live and replay audience - promote your business, personal brand or product during the show)', 'Verified Closer badge for you and your team on our discord server that also allows you to freedom to JV with anyone within the discord community']
            ];
        });
    }
}