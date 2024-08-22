<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Maatwebsite\Excel\Facades\Excel;

class StatesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $file = storage_path('app/public/excel_files/states.xlsx');
        $data = Excel::toArray(null, $file)[0];
        // dump($data);
        // exit;
        array_shift($data); // Remove the header row

        $states = [];
        $numericCodes = [];

        foreach ($data as $row) {
            $name = trim($row[0]);
            $code = $row[1]; // Assuming the code column is at index 1

            if (!isset($states[$name])) {
                $states[$name] = [
                    'numeric_code' => $code,
                ];
            }
        }

        foreach ($states as $name => $stateData) {
            $state = new \App\Models\State();
            $state->name = $name;
            $state->numeric_code = $stateData['numeric_code'];
            $state->save();
        }

        foreach ($data as $row) {
            if (isset($row[7])) {
                $numericCode = $row[7];
                $numericCodes[] = $numericCode;
            }
        }

        $states = \App\Models\State::all();

        foreach ($states as $index => $state) {
            if (isset($numericCodes[$index])) {
                $state->code = $numericCodes[$index];
                $state->save();
            }
        }
        // $states = [
        //     ['name' => 'Alabama', 'code' => 'AL'],
        //     ['name' => 'Alaska', 'code' => 'AK'],
        //     ['name' => 'Arizona', 'code' => 'AZ'],
        //     ['name' => 'Arkansas', 'code' => 'AR'],
        //     ['name' => 'California', 'code' => 'CA'],
        //     ['name' => 'Colorado', 'code' => 'CO'],
        //     ['name' => 'Connecticut', 'code' => 'CT'],
        //     ['name' => 'Delaware', 'code' => 'DE'],
        //     ['name' => 'Florida', 'code' => 'FL'],
        //     ['name' => 'Georgia', 'code' => 'GA'],
        //     ['name' => 'Hawaii', 'code' => 'HI'],
        //     ['name' => 'Idaho', 'code' => 'ID'],
        //     ['name' => 'Illinois', 'code' => 'IL'],
        //     ['name' => 'Indiana', 'code' => 'IN'],
        //     ['name' => 'Iowa', 'code' => 'IA'],
        //     ['name' => 'Kansas', 'code' => 'KS'],
        //     ['name' => 'Kentucky', 'code' => 'KY'],
        //     ['name' => 'Louisiana', 'code' => 'LA'],
        //     ['name' => 'Maine', 'code' => 'ME'],
        //     ['name' => 'Maryland', 'code' => 'MD'],
        //     ['name' => 'Massachusetts', 'code' => 'MA'],
        //     ['name' => 'Michigan', 'code' => 'MI'],
        //     ['name' => 'Minnesota', 'code' => 'MN'],
        //     ['name' => 'Mississippi', 'code' => 'MS'],
        //     ['name' => 'Missouri', 'code' => 'MO'],
        //     ['name' => 'Montana', 'code' => 'MT'],
        //     ['name' => 'Nebraska', 'code' => 'NE'],
        //     ['name' => 'Nevada', 'code' => 'NV'],
        //     ['name' => 'New Hampshire', 'code' => 'NH'],
        //     ['name' => 'New Jersey', 'code' => 'NJ'],
        //     ['name' => 'New Mexico', 'code' => 'NM'],
        //     ['name' => 'New York', 'code' => 'NY'],
        //     ['name' => 'North Carolina', 'code' => 'NC'],
        //     ['name' => 'North Dakota', 'code' => 'ND'],
        //     ['name' => 'Ohio', 'code' => 'OH'],
        //     ['name' => 'Oklahoma', 'code' => 'OK'],
        //     ['name' => 'Oregon', 'code' => 'OR'],
        //     ['name' => 'Pennsylvania', 'code' => 'PA'],
        //     ['name' => 'Rhode Island', 'code' => 'RI'],
        //     ['name' => 'South Carolina', 'code' => 'SC'],
        //     ['name' => 'South Dakota', 'code' => 'SD'],
        //     ['name' => 'Tennessee', 'code' => 'TN'],
        //     ['name' => 'Texas', 'code' => 'TX'],
        //     ['name' => 'Utah', 'code' => 'UT'],
        //     ['name' => 'Vermont', 'code' => 'VT'],
        //     ['name' => 'Virginia', 'code' => 'VA'],
        //     ['name' => 'Washington', 'code' => 'WA'],
        //     ['name' => 'West Virginia', 'code' => 'WV'],
        //     ['name' => 'Wisconsin', 'code' => 'WI'],
        //     ['name' => 'Wyoming', 'code' => 'WY']
        // ];
        // State::insert($states);
    }
}
