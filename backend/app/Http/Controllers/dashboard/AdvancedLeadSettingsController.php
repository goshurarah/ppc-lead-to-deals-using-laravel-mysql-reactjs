<?php

namespace App\Http\Controllers\dashboard;

use App\Models\AdvancedLeadSetting;
use App\Models\AdvancedLeadSettingStateCounties;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AdvancedLeadSettingsController extends Controller
{


    public function createAdvancedLead(Request $request)
    {
        try {
            $user = request()->user();
            $sellerMotivation = request()->input('motivation');
            $typeOfHouse = request()->input('type_of_house');
            $squareFootage = request()->input('square_footage');
            $yearOfConstruction = request()->input('year_of_construction');
            $repairsNeeded = request()->input('repairs_needed');
            $idealSellingTimeFrame = request()->input('ideal_selling_timeframe');
            $howLongyouOwned = request()->input('how_long_you_owned');
            $occupancy = request()->input('occupancy');
            $beds = request()->input('beds');
            $baths = request()->input('baths');
            $mortgage = request()->input('mortgage');
            $ownerOrWholeSaler = request()->input('owner_wholesaler');
            $listedWithAgent = request()->input('listed_with_real_estate_agent');

            $advancedLeadSetting = AdvancedLeadSetting::where('user_id', $user->id)->first();

            if (!$advancedLeadSetting) {

                $advancedLeadSetting = new AdvancedLeadSetting();
                $advancedLeadSetting->user_id = $user->id;
                $advancedLeadSetting->motivation = $sellerMotivation;
                $advancedLeadSetting->type_of_house = $typeOfHouse;
                $advancedLeadSetting->square_footage = $squareFootage;
                $advancedLeadSetting->year_of_construction = $yearOfConstruction;
                $advancedLeadSetting->repairs_needed = $repairsNeeded;
                $advancedLeadSetting->ideal_selling_timeframe = $idealSellingTimeFrame;
                $advancedLeadSetting->how_long_you_owned = $howLongyouOwned;
                $advancedLeadSetting->occupancy = $occupancy;
                $advancedLeadSetting->beds = $beds;
                $advancedLeadSetting->baths = $baths;
                $advancedLeadSetting->mortgage = $mortgage;
                $advancedLeadSetting->owner_wholesaler = $ownerOrWholeSaler;
                $advancedLeadSetting->listed_with_real_estate_agent = $listedWithAgent;

            }
            if ($sellerMotivation)
                $advancedLeadSetting->motivation = $sellerMotivation;
            if ($typeOfHouse)
                $advancedLeadSetting->type_of_house = $typeOfHouse;
            if ($squareFootage)
                $advancedLeadSetting->square_footage = $squareFootage;
            if ($yearOfConstruction)
                $advancedLeadSetting->year_of_construction = $yearOfConstruction;
            if ($repairsNeeded)
                $advancedLeadSetting->repairs_needed = $repairsNeeded;
            if ($idealSellingTimeFrame)
                $advancedLeadSetting->ideal_selling_timeframe = $idealSellingTimeFrame;
            if ($howLongyouOwned)
                $advancedLeadSetting->how_long_you_owned = $howLongyouOwned;
            if ($occupancy)
                $advancedLeadSetting->occupancy = $occupancy;
            if ($beds)
                $advancedLeadSetting->beds = $beds;
            if ($baths)
                $advancedLeadSetting->baths = $baths;
            if ($mortgage)
                $advancedLeadSetting->mortgage = $mortgage;
            if ($ownerOrWholeSaler)
                $advancedLeadSetting->owner_wholesaler = $ownerOrWholeSaler;
            if ($listedWithAgent)
                $advancedLeadSetting->listed_with_real_estate_agent = $listedWithAgent;


            $advancedLeadSetting->save();


            return response()->json(['message' => 'Settings updated successfully']);
        } catch (\Exception $e) {

            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function getAdvancedLeadSettings(Request $request)
    {
        try {

            $user = $request->user();
            $advancedLeadSettings = AdvancedLeadSetting::where('user_id', $user->id)->first();

            return response()->success($advancedLeadSettings, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function addStateCounties(Request $request)
    {
        try {

            $data = [
                'user_id' => request()->user()->id,
                'state_id' => request()->input('state_id'),
                'counties_ids' => request()->input('counties_ids')
            ];

            $addedStateCounties = AdvancedLeadSettingStateCounties::create($data);

            return response()->json(['message'=> "Successfully Added!"], 201);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function updateStateCounties($stateId)
    {
        try {

            $data = [
                'user_id' => request()->user()->id,
                'state_id' => $stateId,
                'counties_ids' => request()->input('counties_ids')
            ];

            $StateCounties = AdvancedLeadSettingStateCounties::where('id', $data['state_id']);

            $StateCounties->update(['counties_ids' => $data['counties_ids']]);


            return response()->json(['message'=> "Counties updated successfully!"], 200);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function getStateCounties(Request $request)
    {
        try {
            $user = $request->user();

            $advancedLeadSettings = AdvancedLeadSettingStateCounties::with('state')
                ->where('user_id', $user->id)
                ->get();

            return response()->success($advancedLeadSettings, 200);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function deleteStateCounties($id)
    {
        try {

            $advancedLeadSettingStateCounties = AdvancedLeadSettingStateCounties::find($id);

            if (!$advancedLeadSettingStateCounties) {
                return response()->json(['message' => 'Settings not found'], 404);
            }

            $advancedLeadSettingStateCounties->delete();

            return response()->json(['message' => 'State deleted successfully'], 200);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }

    }

    public function deleteAllStateCounties()
    {

        try {

            AdvancedLeadSettingStateCounties::truncate();

            return response()->json(['message' => 'All states deleted successfully'], 200);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
       

    }



}