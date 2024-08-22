<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PermissionAdminModulesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('permission_admin_modules')->insert([
            'name' => 'Permissions',
            'component' => 'permissionModule',
            'icon_path_white' => env('APP_URL') . '/storage/menu_icons/Vector12.png',
            'icon_path_gray' => env('APP_URL') . '/storage/menu_icons/Vector13.png',
        ]);


    }
}