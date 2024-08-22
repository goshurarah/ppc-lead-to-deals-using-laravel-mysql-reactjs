<?php

namespace Database\Seeders;

use App\Models\SideMenuModule;
use Illuminate\Database\Seeder;

class SideMenuModulesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $side_menu_modules = [
            [
                'name' => 'Main Menu',
                'component' => 'mainMenu',
                'icon_path_white' => env('APP_URL') . '/storage/menu_icons/Vector.png',
                'icon_path_gray' => env('APP_URL') . '/storage/menu_icons/Vector1.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'CRM',
                'component' => 'crm',
                'icon_path_white' => env('APP_URL') . '/storage/menu_icons/Group97.png',
                'icon_path_gray' => env('APP_URL') . '/storage/menu_icons/Group100.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // [
            //     'name' => 'SMS Messenger',
            //     'component' => 'smsMessenger',
            //     'icon_path_white' => env('APP_URL') . '/storage/menu_icons/Group108.png',
            //     'icon_path_gray' => env('APP_URL') . '/storage/menu_icons/Group107.png',
            //     'created_at' => now(),
            //     'updated_at' => now(),
            // ],
            [
                'name' => 'Fixed Price Mode',
                'component' => 'fixedPriceMode',
                'icon_path_white' => env('APP_URL') . '/storage/menu_icons/Vector2.png',
                'icon_path_gray' => env('APP_URL') . '/storage/menu_icons/Vector3.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // [
            //     'name' => 'Premium Mode',
            //     'component' => 'premiumMode',
            //     'icon_path_white' => env('APP_URL') . '/storage/menu_icons/Group.png',
            //     'icon_path_gray' => env('APP_URL') . '/storage/menu_icons/Group1.png',
            //     'created_at' => now(),
            //     'updated_at' => now(),
            // ],
            [
                'name' => 'Packages',
                'component' => 'packages',
                'icon_path_white' => env('APP_URL') . '/storage/menu_icons/Vector4.png',
                'icon_path_gray' => env('APP_URL') . '/storage/menu_icons/Vector5.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Profile',
                'component' => 'profile',
                'icon_path_white' => env('APP_URL') . '/storage/menu_icons/Group2.png',
                'icon_path_gray' => env('APP_URL') . '/storage/menu_icons/Group3.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Integrations',
                'component' => 'integrations',
                'icon_path_white' => env('APP_URL') . '/storage/menu_icons/Vector6.png',
                'icon_path_gray' => env('APP_URL') . '/storage/menu_icons/Vector7.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'FAQ',
                'component' => 'faq',
                'icon_path_white' => env('APP_URL') . '/storage/menu_icons/Group98.png',
                'icon_path_gray' => env('APP_URL') . '/storage/menu_icons/Group101.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Support Ticket',
                'component' => 'supportTicket',
                'icon_path_white' => env('APP_URL') . '/storage/menu_icons/Group103.png',
                'icon_path_gray' => env('APP_URL') . '/storage/menu_icons/Group104.png',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ];
        SideMenuModule::insert($side_menu_modules);
    }
}
