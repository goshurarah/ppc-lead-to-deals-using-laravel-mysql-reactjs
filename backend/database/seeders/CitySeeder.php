<?php

namespace Database\Seeders;

use App\Models\City;
use App\Models\County;
use Illuminate\Database\Seeder;
use Maatwebsite\Excel\Facades\Excel;


class CitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $file = storage_path('app/public/excel_files/states.xlsx');
        $data = Excel::toArray(null, $file)[0];
        array_shift($data); // Remove the header row

        $counties = County::pluck('id', 'name')->toArray();

        foreach ($data as $row) {
            $countyName = $row[5];
            $cityName = $row[3];
            $cityCode = $row[2];
            if (in_array($countyName, array_keys($counties))) {
                $county = County::where('name', $countyName)->first();
                $city = new City();
                $city->name = $cityName;
                $city->code = $cityCode;
                $city->county_id = $county->id;
                $city->save();
            }
        }
    }
}
