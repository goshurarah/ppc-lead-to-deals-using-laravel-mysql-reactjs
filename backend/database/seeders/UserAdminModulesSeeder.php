<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserAdminModulesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('user_admin_modules')->insert([
            'name' => 'Users',
            'component' => 'usersModule',
            'icon_path_white' => env('APP_URL') . '/storage/menu_icons/Vector10.png',
            'icon_path_gray' => env('APP_URL') . '/storage/menu_icons/Vector11.png',
        ]);


    }
}