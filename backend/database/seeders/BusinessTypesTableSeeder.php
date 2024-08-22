<?php

namespace Database\Seeders;

use App\Models\BusinessType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BusinessTypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $business_types = [
            [
                'title' => 'Wholesaler/Flipper',
                'description' => 'Description',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'Mover',
                'description' => 'Description',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'Real Estate Agent',
                'description' => 'Description',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'End Cash Buyer',
                'description' => 'Description',
                'created_at' => now(),
                'updated_at' => now()
            ]
        ];
        BusinessType::insert($business_types);
    }
}
