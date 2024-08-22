<?php

namespace Database\Seeders;

use App\Models\County;
use Illuminate\Database\Seeder;
use Maatwebsite\Excel\Facades\Excel;
use App\Models\State;

class CountySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $file = storage_path('app/public/excel_files/states.xlsx');
        $data = Excel::toArray(null, $file)[0];
        array_shift($data); // Remove the header row
        $stateNames = State::pluck('id', 'name')->toArray();

        $uniqueCounties = [];

        foreach ($data as $row) {
            $stateName = $row[0];
            $countyCode = $row[4];
            $countyName = $row[5];

            if (isset($stateNames[$stateName])) {
                $stateId = $stateNames[$stateName];

                // Create a unique key for each county using state ID and county name
                $countyKey = $stateId . '_' . $countyName;

                if (!isset($uniqueCounties[$countyKey])) {
                    $uniqueCounties[$countyKey] = [
                        'name' => $countyName,
                        'code' => $countyCode,
                        'state_id' => $stateId,
                    ];
                }
            }
        }

        foreach ($uniqueCounties as $countyData) {
            $county = new County();
            $county->name = $countyData['name'];
            $county->code = $countyData['code'];
            $county->state_id = $countyData['state_id'];
            $county->save();
        }
    }
}
