<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class InventoryAdminModulesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('inventory_admin_modules')->insert([
            'name' => 'Inventory',
            'component' => 'inventoryModule',
            'icon_path_white' => env('APP_URL') . '/storage/menu_icons/Group4.png',
            'icon_path_gray' => env('APP_URL') . '/storage/menu_icons/Group5.png',
        ]);


    }
}