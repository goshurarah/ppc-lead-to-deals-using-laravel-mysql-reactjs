<?php

namespace App\Libraries;

use Stripe\Charge;
use Stripe\Customer;
use App\Models\Subscription;
use Illuminate\Http\Request;
use Stripe\Stripe as StripeStripe;

/**
 * Class Checkout
 * @package App\Library
 */
class Stripe
{
    public static function makePayment($data)
    {
        try {
            StripeStripe::setApiKey(env("STRIPE_SECRET_KEY"));
            // Check if customer already exists in Stripe
            $customerExists = Stripe::checkCustomerExists($data);
            if ($customerExists) {
                // Customer already exists, retrieve the customer
                $customer = Customer::all(['email' => $data['user_email']])->data[0];
                saveThirdPartyLogs(['email' => $data['user_email']], $customer, '/v1/customers(get customer)', 'stripe', $data['api_request_id'], 200);
            } else {
                // Customer does not exist, create a new customer in Stripe
                $customer_data = [
                    'email' => $data['user_email'],
                    'name' => $data['user_first_name'] . ' ' . $data['user_last_name'],
                    'source' => $data['stripe_token']
                ];
                $customer = Customer::create($customer_data);
                saveThirdPartyLogs($customer_data, $customer, '/v1/customers(create customer)', 'stripe', $data['api_request_id'], 200);
            }
            $charge_data = [
                "amount" => $data['amount'] * 100,
                "currency" => env("STRIPE_CURRENCY"),
                "description" => "Payment from " . $data['user_email'],
                'customer' => $customer->id,
            ];
            $charge = Charge::create($charge_data);
            saveThirdPartyLogs($charge_data, $customer, '/v1/charges(charge customer)', 'stripe', $data['api_request_id'], 200);
            return ['charge' => $charge, 'customer' => $customer];
        } catch (\Exception $e) {
            return throwException('StripeLibrary/makePayment', $e);
        }
    }

    public static function checkCustomerExists($data)
    {
        try {
            // Retrieve customers from Stripe with the given email
            $customers = Customer::all(['email' => $data['user_email']]);
            saveThirdPartyLogs(['email' => $data['user_email']], $customers, '/v1/customers(find customer)', 'stripe', $data['api_request_id'], 200);
            // Check if any customers were returned
            if (!empty($customers->data)) {
                // Customer with the given email exists
                return true;
            } else {
                // Customer with the given email does not exist
                return false;
            }
        } catch (\Exception $e) {
            return throwException('StripeLibrary/checkCustomerExists', $e);
        }
    }



  


}
