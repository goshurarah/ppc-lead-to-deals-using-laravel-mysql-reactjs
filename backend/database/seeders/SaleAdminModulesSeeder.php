<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SaleAdminModulesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('sale_admin_modules')->insert([
            'name' => 'Sale',
            'component' => 'saleModule',
            'icon_path_white' => env('APP_URL') . '/storage/menu_icons/FAQ_white.png',
            'icon_path_gray' => env('APP_URL') . '/storage/menu_icons/FAQ_gray.png',
        ]);


    }
}