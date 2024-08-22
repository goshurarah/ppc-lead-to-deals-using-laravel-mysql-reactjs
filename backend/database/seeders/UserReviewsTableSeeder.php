<?php

namespace Database\Seeders;

use App\Models\UserReview;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserReviewsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $reviews = [
            [
                'name' => 'John Doe',
                'email' => 'john@example.com',
                'message' => 'Great product, highly recommended!'
            ],
            [
                'name' => 'Jane Smith',
                'email' => 'jane@example.com',
                'message' => 'Excellent service, quick delivery.'
            ],
            [
                'name' => 'Michael Johnson',
                'email' => 'michael@example.com',
                'message' => 'The quality surpassed my expectations.'
            ],
            [
                'name' => 'Sarah Thompson',
                'email' => 'sarah@example.com',
                'message' => 'Impressive customer support, they resolved my issue promptly.'
            ],
            [
                'name' => 'David Wilson',
                'email' => 'david@example.com',
                'message' => 'I love the design, it\'s sleek and modern.'
            ]
        ];

        UserReview::insert($reviews);
    }
}
