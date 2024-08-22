<?php

namespace App\Libraries;

use Illuminate\Support\Facades\Http;

/**
 * Class Checkout
 * @package App\Library
 */
class Twilio
{
    public static function sendPhoneVerificationMessage($to_number, $otp_code, $api_request_id)
    {
        try {
            $twilioSid = env("TWILIO_SID");
            $twilioToken = env("TWILIO_AUTH_TOKEN");
            $twilioPhoneNumber = env("TWILIO_PHONE_NUMBER");
            $url = env("TWILIO_BASE_URL") . '/' . env("TWILIO_SID") . '/Messages.json';
            $message = $otp_code . ' is your verification code from PPCLeadsToDeal.';
            $payload = [
                'From' => $twilioPhoneNumber,
                'To' => $to_number,
                'Body' => $message,
            ];
            $response = Http::withBasicAuth($twilioSid, $twilioToken)
                ->withHeaders(['Accept' => 'application/json', 'Content-Type' => 'application/json'])
                ->asForm()->post($url, $payload);
            saveThirdPartyLogs($payload, $response, env("TWILIO_SID") . '/Messages.json', 'Twilio', $api_request_id, $response->status());
            return $response;
        } catch (\Exception $e) {
            return response()->error($e->getMessage(), 500);
        }
    }
}
