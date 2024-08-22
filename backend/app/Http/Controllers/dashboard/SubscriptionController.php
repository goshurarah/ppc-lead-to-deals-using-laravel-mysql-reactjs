<?php

namespace App\Http\Controllers\dashboard;


use Carbon\Carbon;
use Stripe\Charge;
use Stripe\Stripe;
use Stripe\Product;
use App\Models\User;
use Stripe\Customer;
use Stripe\Subscription;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use App\Models\Subscription as SubscriptionModel;

class SubscriptionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        try {
        } catch (\Exception $e) {

            dd($e);

            return throwException('TicketController/index', $e);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request, Response $response)
    {

        try {

            Stripe::setApiKey(env("STRIPE_SECRET_KEY"));

            $products = Product::all();

            $start_date = Carbon::now()->toDateString(); 
            $end_date = Carbon::parse($start_date)->addMonth()->toDateString();
            $fullName = $request->user()->first_name . " " . $request->user()->last_name;

            $existingCustomer = Customer::all([
                'email' => $request->user()->email,
                'limit' => 1, // Limit the number of results to 1
            ])->data[0] ?? null;
    
            if (!$existingCustomer) {
                // Create a new customer in Stripe
                $customer = Customer::create([
                    'email' => $request->user()->email,
                    'name' => $fullName,
                    'source' => $request->stripe_token
                ]);
            } else {
                // Use the existing customer
                $customer = $existingCustomer;
            }

            Charge::create([
                'amount' => $this->calculateSubscriptionAmount('basic'),
                'currency' => 'usd',
                'customer' => $customer->id,
                'description' => 'Subscription',
            ]);


            $subscriptionToProductMap = [
                'basic' => 'basic',     
                'premium' => 'premium',
                'professional' => 'professional',
            ];

            $selectedProductType = 'basic';
            $selectedProduct = null;

            foreach ($products->data as $product) {
                if ($product->name === $subscriptionToProductMap[$selectedProductType]) {
                    $selectedProduct = $product;
                    break;
                }
            }

            if (!$selectedProduct) {
                
                return response()->json(['error' => 'Invalid subscription type.'], 400);
            }

            Subscription::create([
                'customer' => $customer->id,
                'items' => [
                    ['price' => $selectedProduct->default_price],
                ],
            ]);

            $subscription = new SubscriptionModel([
                'user_id' => $request->user()->id,
                'package_id' => request()->input('package_id'),
                'start_date' => $start_date,
                'end_date' => $end_date,
            ]);

            $subscription->save();

            $user = User::where('email', $request->user()->email)->firstOrFail();
            $user->stripe_id = $customer->id;
            $user->save();

            return response()->json([
                'subscription' => $subscription,
                'message' => 'Subscription created successfully.',
            ]);
        } catch (\Exception $e) {

            return $e->getMessage();
        }
    }

    private function calculateSubscriptionAmount($subscriptionType)
    {
        // Define your own mapping of subscription types to amounts
        $amounts = [
            'basic' => 1000,
            // $10.00
            'premium' => 2000,
            // $20.00
            'professional' => 3000, // $30.00
        ];

        return $amounts[$subscriptionType];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
