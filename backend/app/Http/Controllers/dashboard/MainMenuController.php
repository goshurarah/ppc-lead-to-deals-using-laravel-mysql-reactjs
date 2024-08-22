<?php

namespace App\Http\Controllers\dashboard;

use Stripe\Token;
use Stripe\Charge;
use Stripe\Stripe;
use App\Models\City;
use App\Models\Lead;
use App\Models\User;
use Stripe\Customer;
use App\Models\County;
use App\Models\Seller;
use App\Filters\Leads\Beds;
use App\Models\SavedFilter;
use App\Filters\Leads\Baths;
use Illuminate\Http\Request;
use App\Filters\Leads\Mortgage;
use App\Filters\Leads\HouseType;
use App\Filters\Leads\SearchCity;
use Illuminate\Pipeline\Pipeline;
use App\Filters\Leads\SearchState;
use App\Filters\Leads\SellingTime;
use Illuminate\Support\Facades\DB;
use App\Filters\Leads\HowLongOwned;
use App\Filters\Leads\SearchCounty;
use App\Models\AdvancedLeadSetting;
use App\Filters\Leads\RepairsNeeded;
use App\Http\Controllers\Controller;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Auth;
use App\Filters\Leads\AvailableLeads;
use App\Filters\Leads\ListedWithAgent;
use App\Filters\Leads\OwnerWholeSaler;
use App\Filters\Leads\SearchByAnything;
use App\Filters\Leads\PropertyCondition;

class MainMenuController extends Controller
{

    public function createLead(Request $request)
    {

        try {

            $request->validate([
                'seller_id' => 'required',
                'email' => 'required|email',
                'phone' => 'required|string',
                'address' => 'required',
                'currently_possessed_by' => 'required|string',
                'city_id' => 'required',
                'state_id' => 'required',
                'county_id' => 'required',
                'price' => 'required',
            ], [
                'city_id.required' => 'Enter valid city.',
                'state_id.required' => 'Enter valid state.',
                'county_id.required' => 'Enter valid county.',
            ]);

            $data = [
                'address' => request()->input('address'),
                'email' => request()->input('email'),
                'phone' => request()->input('phone'),
                'seller_id' => request()->input('seller_id'),
                'asking_price' => request()->input('asking_price'),
                'baths' => request()->input('baths'),
                'beds' => request()->input('beds'),
                'conversation' => request()->input('conversation'),
                'currently_possessed_by' => request()->input('currently_possessed_by'),
                'description' => request()->input('description'),
                'expiration_time' => request()->input('expiration_time'),
                'garage' => request()->input('garage'),
                'how_long_you_owned' => request()->input('how_long_you_owned'),
                'ideal_selling_timeframe' => request()->input('ideal_selling_timeframe'),
                'listed_with_real_estate_agent' => request()->input('listed_with_real_estate_agent'),
                'monthly_rental_amount' => request()->input('monthly_rental_amount'),
                'mortgage' => request()->input('mortgage'),
                'motivation' => request()->input('motivation'),
                'negotiable' => request()->input('negotiatiable'),
                'occupancy' => request()->input('occupancy'),
                'owner_wholesaler' => request()->input('owner_wholesaler'),
                'pictures' => request()->file('pictures'),
                'pool' => request()->input('pool'),
                'price' => request()->input('price'),
                'property_condition' => request()->input('property_condition'),
                'repairs_needed' => request()->input('repairs_needed'),
                'square_footage' => request()->input('square_footage'),
                'status' => request()->input('status'),
                'type_of_house' => request()->input('type_of_house'),
                'violations' => request()->input('violations'),
                'year_of_construction' => request()->input('year_of_construction'),
                'zip_code' => request()->input('zip_code'),
                'city_id' => request()->input('city_id'),
                'county_id' => request()->input('county_id'),
                'state_id' => request()->input('state_id'),
                'source' => request()->input('source'),
            ];

            $lead = Lead::create($data);

            if ($request->user()->advancedLeadSettings) {

                $usersWithAdvancedLeadSettings = User::has('advancedLeadSettings')->get();

                $matchingUsers = [];

                foreach ($usersWithAdvancedLeadSettings as $user) {

                    $sellerMotivation = $user->advancedLeadSettings->motivation;
                    $typeOfHouse = $user->advancedLeadSettings->type_of_house;
                    $squareFootage = $user->advancedLeadSettings->square_footage;
                    $yearOfConstruction = $user->advancedLeadSettings->year_of_construction;
                    $repairsNeeded = $user->advancedLeadSettings->repairs_needed;
                    $idealSellingTimeFrame = $user->advancedLeadSettings->ideal_selling_timeframe;
                    $howLongyouOwned = $user->advancedLeadSettings->how_long_you_owned;
                    $occupancy = $user->advancedLeadSettings->occupancy;
                    $beds = $user->advancedLeadSettings->beds;
                    $baths = $user->advancedLeadSettings->baths;
                    $mortgage = $user->advancedLeadSettings->mortgage;
                    $ownerOrWholeSaler = $user->advancedLeadSettings->owner_wholesaler;
                    $listedWithAgent = $user->advancedLeadSettings->listed_with_real_estate_agent;

                    if (in_array($lead->motivation, $sellerMotivation) && in_array($lead->type_of_house, $typeOfHouse) && in_array($lead->square_footage, $squareFootage) && in_array($lead->year_of_construction, $yearOfConstruction) && in_array($lead->repairs_needed, $repairsNeeded) && in_array($lead->ideal_selling_timeframe, $idealSellingTimeFrame) && in_array($lead->how_long_you_owned, $howLongyouOwned) && in_array($lead->occupancy, $occupancy) && in_array($lead->beds, $beds) && in_array($lead->baths, $baths) && in_array($lead->baths, $baths) && in_array($lead->mortgage, $mortgage) && in_array($lead->owner_wholesaler, $ownerOrWholeSaler) && in_array($lead->listed_with_real_estate_agent, $listedWithAgent)) {


                        $matchingUsers[] = $user;

                    }
                }

                foreach ($matchingUsers as $user) {
                    Stripe::setApiKey(env("STRIPE_SECRET_KEY"));
                    $customer = Customer::retrieve($user->stripe_id);

                    $charge = [
                        "amount" => $lead->price * 100,
                        "currency" => env("STRIPE_CURRENCY"),
                        "description" => "Payment from " . $user->email,
                        'customer' => $customer->id,
                    ];

                    $charge = Charge::create($charge);
                }
            }

            return ['message' => 'Lead created successfully!'];

        } catch (\Exception $e) {

            return response()->error($e->getMessage());
        }
    }

    public function getLeads(Request $request)
    {
        try {

            $user = Auth::user();

            $userCounties = $user->counties->pluck('id')->toArray();
            $userStates = $user->states->pluck('id')->toArray();
            $userCities = $user->cities->pluck('id')->toArray();



            // Create a pipeline to filter leads
            $leads = app(Pipeline::class)
                ->send(Lead::query())
                ->through([
                    AvailableLeads::class,
                    ListedWithAgent::class,
                    SellingTime::class,
                    OwnerWholeSaler::class,
                    RepairsNeeded::class,
                    HowLongOwned::class,
                    Baths::class,
                    Beds::class,
                    PropertyCondition::class,
                    HouseType::class,
                    Mortgage::class,
                    SearchState::class,
                    SearchCity::class,
                    SearchCounty::class,
                    SearchByAnything::class,
                ])
                ->thenReturn()
                ->select('id', 'beds', 'baths', 'city_id', 'county_id', 'state_id', 'address', 'zip_code', 'description', 'owner_wholesaler', 'price', 'square_footage', 'occupancy', 'ideal_selling_timeframe', 'motivation', 'mortgage', 'listed_with_real_estate_agent', 'repairs_needed', 'property_condition', 'how_long_you_owned', 'year_of_construction', 'type_of_house', 'status', 'seller_id', 'created_at')
                ->where('status', '!=', 'sold')
                ->orwhereIn('county_id', $userCounties)
                ->orwhereIn('state_id', $userStates)
                ->orwhereIn('city_id', $userCities)
                ->addSelect(DB::raw('1 as priority'))
                ->paginate(10);

            foreach ($leads as $lead) {

                if ($lead->status == 'on hold') {

                    $lead->owner_wholesaler == '';
                    $lead->zip_code = '';
                    $lead->square_footage = '';
                    $lead->type_of_house = '';
                    $lead->year_of_construction = '';
                    $lead->beds = '';
                    $lead->baths = '';
                    $lead->property_condition = '';
                    $lead->repairs_needed = '';
                    $lead->repairs_needed = '';
                    $lead->listed_with_real_estate_agent = '';
                    $lead->mortgage = '';
                    $lead->owner_wholesaler = '';
                    $lead->ideal_selling_timeframe = '';
                    $lead->occupancy = '';
                    $lead->motivation = '';
                    $lead->price = '';
                }
                $user = request()->user();

                if ($user && $user->subscription && $user->subscription->package) {
                    $subscriptionType = $user->subscription->package->name;

                    if ($subscriptionType != "Premium" && $subscriptionType != "Professional") {

                        foreach ($leads as $lead) {
                            $lead->repairs_needed = '';
                            $lead->property_condition = '';
                            $lead->how_long_you_owned = '';
                            $lead->baths = '';
                            $lead->beds = '';
                            $lead->year_of_construction = '';
                            $lead->type_of_house = '';
                            $lead->square_footage = '';
                            $lead->zip_code = '';

                        }
                    }
                } else {
                    foreach ($leads as $lead) {
                        $lead->repairs_needed = '';
                        $lead->property_condition = '';
                        $lead->how_long_you_owned = '';
                        $lead->baths = '';
                        $lead->beds = '';
                        $lead->year_of_construction = '';
                        $lead->type_of_house = '';
                        $lead->square_footage = '';
                        $lead->zip_code = '';

                    }
                }

            }

            $leads->load(['seller:id,full_name', 'state', 'county', 'city']);
            $leads->loadCount(['orders']);

            if ($leads->isNotEmpty()) {
                foreach ($leads as $key => $lead) {
                    $lead['div_id'] = 'div' . ($key + 1);
                    $additional_data = [
                        'hide' => 'Hide Details',
                        'more_details' => 'More Details',
                        'more_details_icon' => env('APP_URL') . '/storage/other_icons/more_detail_icon.png',
                        'hide_icon' => env('APP_URL') . '/storage/other_icons/hide_icon.png',
                    ];
                    $lead['additional_data'] = $additional_data;
                }
                storeApiResponse($request->api_request_id, ['message' => 'Leads fetched!'], 200, Auth::id());
                return response()->json(['leads' => $leads]);
            }
            storeApiResponse($request->api_request_id, ['message' => 'Leads not found!'], 404, Auth::id());
            return response()->json(['leads' => $leads]);
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function getCountiesDropdownMainMenu(Request $request)
    {
        try {
            $user_id = Auth::id() ?? null;
            $stateName = $request->input('state_name');
            $counties = County::when($stateName, function ($query) use ($stateName) {
                $query->whereHas('state', function ($subQuery) use ($stateName) {
                    $subQuery->where('name', $stateName);
                });
            })
                ->get();
            if ($counties->isNotEmpty()) {
                storeApiResponse($request->api_request_id, ['message' => 'Counties fetched!'], 200, $user_id);
                return response()->success($counties, 200);
            }
            storeApiResponse($request->api_request_id, ['message' => 'Counties not found!'], 404, $user_id);
            return response()->error('Counties not found!', 404);
        } catch (\Exception $e) {

            return response()->json(['error' => $e->getMessage()]);
            // return throwException('MainMenuController/getCountiesDropdown', $e);
        }
    }

    public function getCitiesDropdownMainMenu(Request $request)
    {
        try {
            $user_id = Auth::id() ?? null;
            $countyName = $request->input('county_name');
            $cities = City::when($countyName, function ($query) use ($countyName) {
                $query->whereHas('county', function ($subQuery) use ($countyName) {
                    $subQuery->where('name', $countyName);
                });
            })
                ->get();
            if ($cities->isNotEmpty()) {
                storeApiResponse($request->api_request_id, ['message' => 'Counties fetched!'], 200, $user_id);
                return response()->success($cities, 200);
            }
            storeApiResponse($request->api_request_id, ['message' => 'Counties not found!'], 404, $user_id);
            return response()->error('Counties not found!', 404);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function getCountiesDropdown(Request $request)
    {
        try {
            $user_id = Auth::id() ?? null;
            $stateIds = $request->input('state_ids', []);

            if (!$stateIds || count($stateIds) === 0) {

                $counties = County::all();

                return response()->json($counties);
            }

            $counties = County::when(count($stateIds) > 0, function ($query) use ($stateIds) {
                $query->whereHas('state', function ($subQuery) use ($stateIds) {
                    $subQuery->whereIn('id', $stateIds);
                });
            })
                ->get();

            if ($counties->isNotEmpty()) {
                storeApiResponse($request->api_request_id, ['message' => 'Counties fetched!'], 200, $user_id);
                return response()->success($counties, 200);
            }

            storeApiResponse($request->api_request_id, ['message' => 'Counties not found!'], 404, $user_id);
            return response()->error('Counties not found!', 404);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }


    public function getCitiesDropdown(Request $request)
    {
        try {
            $user_id = Auth::id() ?? null;
            $countiesIds = $request->input('counties_ids', []);

            if (!$countiesIds || count($countiesIds) === 0) {

                $cities = City::all();

                return response()->json($cities);
            }

            $cities = City::when(count($countiesIds) > 0, function ($query) use ($countiesIds) {
                $query->whereHas('county', function ($subQuery) use ($countiesIds) {
                    $subQuery->whereIn('id', $countiesIds);
                });
            })
                ->get();

            if ($cities->isNotEmpty()) {
                storeApiResponse($request->api_request_id, ['message' => 'Cities fetched!'], 200, $user_id);
                return response()->success($cities, 200);
            }

            storeApiResponse($request->api_request_id, ['message' => 'Cities not found!'], 404, $user_id);
            return response()->error('Cities not found!', 404);
        } catch (\Exception $e) {
            return $e;
        }
    }

    public function getAllSellers(Request $request)
    {
        try {
            $sellers = Seller::all();
            return response()->success($sellers, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function getLeadCount()
    {
        $leadCount = Lead::count();

        return response()->json(['lead_count' => $leadCount]);
    }


    public function saveFilter(Request $request)
    {
        try {
            $user = $request->user();
            $data = $request->only(['filter_name', 'filter_data']);

            // Validate filter name presence
            if (empty($data['filter_name'])) {
                return response()->json(['error' => 'Filter name is required'], 400);
            }

            // Validate filter data presence
            if ($this->areAllFilterValuesEmpty($data['filter_data'])) {
                return response()->json(['error' => 'At least one filter must be provided'], 400);
            }

            $filter = SavedFilter::create([
                'user_id' => $user->id,
                'filter_name' => $data['filter_name'],
                'filter_data' => $data['filter_data'],
            ]);

            return response()->json(['message' => 'Filter saved successfully', 'filter' => $filter]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to save filter', 'message' => $e->getMessage()], 500);
        }
    }

    private function areAllFilterValuesEmpty(array $filterData): bool
    {
        foreach ($filterData as $value) {
            if (!empty($value)) {
                return false; // At least one value is not empty
            }
        }

        return true; // All values are empty
    }

    public function getSavedFilters(Request $request)
    {
        try {
            $user = $request->user();

            $filters = $user->savedFilters;

            return response()->json(['filters' => $filters]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to get saved filters', 'message' => $e->getMessage()], 500);
        }
    }


    public function deleteSavedFilter(Request $request, $filterId)
    {
        try {
            $user = $request->user();

            // Ensure that the filter belongs to the current user
            $filter = SavedFilter::where('id', $filterId)->where('user_id', $user->id)->first();

            if ($filter) {
                $filter->delete();

                return response()->json(['message' => 'Filter deleted successfully']);
            } else {
                return response()->json(['error' => 'Filter not found or does not belong to the user'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete filter', 'message' => $e->getMessage()], 500);
        }
    }


}