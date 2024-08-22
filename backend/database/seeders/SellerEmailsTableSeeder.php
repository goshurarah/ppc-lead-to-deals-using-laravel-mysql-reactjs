<?php

namespace Database\Seeders;

use App\Models\Seller;
use App\Models\SellerEmail;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SellerEmailsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sellerIds = Seller::pluck('id');
        $numberOfEmails = [3, 4];
        foreach ($sellerIds as $sellerId) {
            $emailCount = rand($numberOfEmails[0], $numberOfEmails[1]);

            for ($i = 0; $i < $emailCount; $i++) {
                $email = "seller{$sellerId}_email{$i}@example.com";

                SellerEmail::create([
                    'seller_id' => $sellerId,
                    'email' => $email,
                ]);
            }
        }
    }
}
