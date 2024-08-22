<?php

namespace App\Http\Controllers\dashboard;

use Stripe\Stripe;
use Stripe\Customer;
use App\Models\PaymentCard;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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

        try {
            $pCard = PaymentCard::find($id);

            $pCard->delete();

            return response()->json(['message' => 'Card deleted successfully!', 'deletedCard' => $pCard]);

        } catch (\Exception $e) {
            return $e->getMessage();
        }



    }

    public function addCard(Request $request)
    {

        Stripe::setApiKey(env('STRIPE_SECRET_KEY'));

        $user = $request->user();

        if (!$user->stripe_id) {
            $customer = Customer::create([
                'name' => $user->first_name . ' ' . $user->last_name,
                'email' => $user->email,
            ]);

            $user->stripe_id = $customer->id;
            $user->save();
        }

        $customer = Customer::retrieve($user->stripe_id);

        $card = Customer::createSource($customer->id, ['source' => $request->stripe_token]);

        $paymentCard = new PaymentCard();
        $paymentCard->user_id = $user->id;
        $paymentCard->card_number = '**** **** **** ' . substr($card->last4, -4);
        $paymentCard->card_holder = $card->brand;
        $paymentCard->cvc_code = $card->cvc_check;
        $paymentCard->expiry_date = $card->exp_month . '/' . $card->exp_year;
        $paymentCard->stripe_card_id = $card->id;
        $paymentCard->save();

        return response()->json(['message' => 'Card added successfully']);
    }

    public function getCards(Request $request)
    {
        $user = request()->user();

        return $user->paymentCards;
    }
}