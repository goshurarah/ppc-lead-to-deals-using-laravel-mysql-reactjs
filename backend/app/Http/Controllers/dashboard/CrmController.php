<?php

namespace App\Http\Controllers\dashboard;

use App\Models\Lead;
use App\Models\Order;
use Mockery\Undefined;
use App\Mail\ReminderMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class CrmController extends Controller
{
    public function getCrmData(Request $request)
    {
        try {

            $priceMin = $request->input('price_min', 0);
            $priceMax = $request->input('price_max', PHP_INT_MAX);
            $sellerName = $request->input('seller_name');
            $sellerNameSort = $request->input('seller_name_sort');
            $source = $request->input('source_sort');
            $searchTerm = $request->input('search_term');
            $priceSort = $request->input('price_sort');



            $user = request()->user();



            if ($user && $user->subscription && $user->subscription->package) {
                $subscriptionType = $user->subscription->package->name;

                if ($subscriptionType == "Premium" || $subscriptionType == "Professional") {
                    // Fetch data for premium users
                    $orders = Order::with([
                        // ... (your relations)
                    ])->join('leads', 'orders.lead_id', '=', 'leads.id')
                        ->join('sellers', 'sellers.id', '=', 'leads.seller_id')
                        ->where('orders.user_id', $user->id)

                        ->when(function ($query) use ($searchTerm, $user) {
                            $query->where('orders.user_id', $user->id) // User-specific condition
                                ->where(function ($query) use ($searchTerm) {
                                    $query->where('sellers.full_name', 'LIKE', '%' . $searchTerm . '%')
                                        ->orWhere('leads.source', 'LIKE', '%' . $searchTerm . '%')
                                        ->orWhere('orders.price', 'LIKE', '%' . $searchTerm . '%');
                                });
                        })
                        ->when($sellerName, function ($query) use ($sellerName) {
                            $query->where('sellers.full_name', 'LIKE', "%$sellerName%");
                        })
                        ->when($source, function ($query) use ($source) {
                            $query->orderBy('leads.source', request()->input('source_sort'));
                        })
                        ->when($sellerNameSort, function ($query) use ($source) {
                            $query->orderBy('sellers.full_name', request()->input('seller_name_sort'));
                        })
                        ->when($priceSort, function ($query) use ($source) {
                            $query->orderBy('orders.price', request()->input('price_sort'));
                        })

                        ->when($priceMin !== '' && $priceMax !== '', function ($query) use ($priceMin, $priceMax) {
                            $query->whereBetween('orders.price', [$priceMin, $priceMax]);
                        })
                        // ... (other conditions)
                        ->paginate(10);

                    $orders->each(function ($order) {
                        $order->repairs_needed = '';
                        $order->how_long_you_owned = '';
                        $order->baths = '';
                        $order->type_of_house = '';
                        $order->zip_code = '';
                        $order->property_condition = '';
                        $order->year_of_construction = '';
                        $order->beds = '';
                        $order->square_footage = '';
                    });

                    return response()->json(['data' => $orders, 'is_premium_user' => true]);
                }
            }

            // Fetch data for non-premium users
            $orders = Order::with([
                // ... (your relations)
            ])->join('leads', 'orders.lead_id', '=', 'leads.id')
                ->join('sellers', 'sellers.id', '=', 'leads.seller_id')
                ->where('orders.user_id', $user->id)
                // ... (other conditions)
                ->paginate(10);

            $orders->each(function ($order) {
                $order->repairs_needed = '';
                $order->how_long_you_owned = '';
                $order->baths = '';
                $order->type_of_house = '';
                $order->zip_code = '';
                $order->property_condition = '';
                $order->year_of_construction = '';
                $order->beds = '';
                $order->square_footage = '';
            });

            return response()->json(['data' => $orders, 'is_premium_user' => false]);




        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }


    public function updateReminder(Request $request, $leadId)
    {

        try {
            $request->validate([
                'reminder' => 'required',
            ]);

            $order = Order::where('lead_id', $leadId)->firstOrFail();

            $order->update([
                'reminder' => $request->input('reminder'),
            ]);

            $lead = Lead::with('state', 'city', 'county', 'seller')->where('id', $leadId)->firstOrFail();

            $data = [
                "address" => $lead->address,
                "state" => $lead->state->name,
                "city" => $lead->city->name,
                "county" => $lead->county->name,
                "seller" => $lead->seller->full_name,
            ];

            Mail::to($request->user()->email)->send(new ReminderMail($data));

            return response()->json(['message' => 'Reminder updated successfully']);
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }


}