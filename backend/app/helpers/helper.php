<?php

use App\Models\ApiRequest;
use App\Models\ApiRequestLog;
use App\Models\ErrorLog;
use App\Models\Order;
use App\Models\ThirdPartyLog;
use App\Models\Transaction;
use Illuminate\Support\Facades\Http;

function storeApiResponse($api_request_id, $response_data, $status_code, $user_id)
{
    ApiRequest::where('id', $api_request_id)->update(['response_data' => $response_data, 'status_code' => $status_code]);
    ApiRequestLog::where('api_request_id', $api_request_id)->update(['user_id' => $user_id]);
}

function saveErrorLogs($function_name, $error, $line_number)
{
    ErrorLog::create([
        'function_name' => $function_name,
        'error' => $error,
        'line_number' => $line_number
    ]);
}

function throwException($function_name, $exception)
{
    saveErrorLogs($function_name, $exception->getMessage(), $exception->getLine());
    return response()->error('Something went wrong!', 500);
}

function httpRequest($method, $data, $url, $headers, $isJsonEncoded)
{
    try {
        $response = Http::withHeaders($headers)->$method($url, $data);
        if ($isJsonEncoded)
            return json_decode($response);
        return $response;
    } catch (Exception $e) {
        return response()->error($e->getMessage(), 500);
    }
}

function curlRequest($is_post, $data, $url, $headers, $isJsonEncoded)
{
    try {
        $url = $url;

        // Initialize cURL
        $ch = curl_init();

        // Set cURL options
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, $is_post);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        // Execute cURL request
        $response = curl_exec($ch);

        // Get status code
        $status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        // Check for errors
        if ($response === false) {
            return 'cURL Error: ' . curl_error($ch);
        }

        // Close cURL session
        curl_close($ch);

        // Process response
        if ($isJsonEncoded)
            return json_decode($response);
        return ['response' => $response, 'status_code' => $status_code];
    } catch (Exception $e) {
        return response()->error($e->getMessage(), 500);
    }
}

function saveThirdPartyLogs($request_data, $response_data, $endpoint, $third_party_name, $api_request_id, $status_code)
{
    try {
        ThirdPartyLog::create([
            'request_data' => $request_data,
            'response_data' => $response_data,
            'endpoint' => $endpoint,
            'third_party_name' => $third_party_name,
            'api_request_id' => $api_request_id,
            'status_code' => $status_code
        ]);
    } catch (Exception $e) {
        return response()->error($e->getMessage(), 500);
    }
}

function createOrder($order_data)
{
    try {
        $order = new Order();
        $order->lead_id = $order_data['lead_id'];
        $order->user_id = $order_data['user_id'];
        $order->price = $order_data['price'];
        $order->discount_in_percentage = $order_data['discount'];
        $order->coupon_code = $order_data['coupon_code'];
        $order->status = $order_data['status'];
        $order->save();
        return $order;
    } catch (Exception $e) {
        return response()->error($e->getMessage(), 500);
    }
}

function createTransaction($transaction_data)
{
    try {
        $transaction = new Transaction();
        $transaction->user_id = $transaction_data['user_id'];
        $transaction->order_id = $transaction_data['order_id'];
        $transaction->pg_transaction_id = $transaction_data['pg_transaction_id'];
        $transaction->amount = $transaction_data["amount"];
        $transaction->currency = $transaction_data["currency"];
        $transaction->payment_gateway = $transaction_data["payment_gateway"];
        $transaction->status = $transaction_data["status"];
        $transaction->stripe_customer_id = $transaction_data["stripe_customer_id"];
        $transaction->receipt_url =  $transaction_data["receipt_url"];
        $transaction->failure_reason = $transaction_data["failure_reason"];
        $transaction->save();
        return $transaction;
    } catch (Exception $e) {
        return response()->error($e->getMessage(), 500);
    }
}
