<?php

namespace Database\Seeders;

use App\Models\Seller;
use App\Models\SellerPhone;
use Illuminate\Database\Seeder;

class SellerPhonesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sellerIds = Seller::pluck('id');
        $phoneTypes = ['primary', 'mobile', 'work', 'other'];
        foreach ($sellerIds as $sellerId) {
            $phoneNumbers = [];

            for ($i = 0; $i < 4; $i++) {
                $phone = '123-456-789' . $i;

                $phoneNumbers[] = [
                    'seller_id' => $sellerId,
                    'phone' => $phone,
                    'type' => $phoneTypes[$i],
                ];
            }
            SellerPhone::insert($phoneNumbers);
        }
    }
}
