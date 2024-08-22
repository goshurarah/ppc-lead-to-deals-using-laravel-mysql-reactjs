<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class BlogAdminModuleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('blog_admin_module')->insert([
            'name' => 'Blogs',
            'component' => 'blogs',
            'icon_path_white' => env('APP_URL') . '/storage/menu_icons/Vector14.png',
            'icon_path_gray' => env('APP_URL') . '/storage/menu_icons/Vector15.png',
        ]);
    }
}
