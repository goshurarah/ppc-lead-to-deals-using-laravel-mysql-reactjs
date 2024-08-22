<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TicketAdminModulesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('ticket_admin_modules')->insert([
            'name' => 'Admin Support Ticket',
            'component' => 'adminsupporticket',
            'icon_path_white' => env('APP_URL') . '/storage/menu_icons/Group105.png',
            'icon_path_gray' => env('APP_URL') . '/storage/menu_icons/Group106.png',
        ]);


    }
}