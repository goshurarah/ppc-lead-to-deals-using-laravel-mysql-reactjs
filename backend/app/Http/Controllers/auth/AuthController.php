<?php

namespace App\Http\Controllers\auth;

use App\Models\City;
use App\Models\County;
use Log;
use Auth;
use Carbon\Carbon;
use App\Models\User;
use App\Models\State;
use Twilio\Rest\Client;
use App\Mail\VerifyEmail;
use App\Models\PushedLead;
use App\Mail\PasswordReset;
use Illuminate\Support\Str;
use App\Models\BusinessType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Http\Requests\auth\LoginRequest;
use Laravel\Socialite\Facades\Socialite;
use GuzzleHttp\Exception\ClientException;
use App\Http\Requests\auth\RegisterRequest;
use Illuminate\Http\Request as HttpRequest;
use App\Http\Requests\auth\SavePhoneRequest;
use App\Http\Requests\auth\VerifyEmailRequest;
use App\Http\Requests\auth\VerifyPhoneRequest;
use App\Http\Requests\auth\AddUserCitiesRequest;
use App\Http\Requests\auth\AddUserStatesRequest;
use App\Http\Requests\auth\ResetPasswordRequest;
use App\Http\Requests\auth\ForgotPasswordRequest;
use App\Http\Requests\auth\AddUserCountiesRequest;
use App\Http\Requests\auth\AddUserBusinessTypesRequest;


class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        try {
            $user = User::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'password' => $request->password,
                'password_confirm' => $request->password_confirm
            ]);
            $email_verification_token = Str::random(100);
            $user->email_verification_token = $email_verification_token;
            $user->save();
            $email_verification_url = env("FRONTEND_BASE_URL") . '/verify-email/' . $email_verification_token . '/' . $request->email;
            $data = [
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'email_verification_url' => $email_verification_url
            ];
            Mail::to($request->email)->send(new VerifyEmail($data));
            storeApiResponse($request->api_request_id, $user, 201, $user->id);
            return response()->success($user, 201);
        } catch (\Exception $e) {
            saveErrorLogs('register', $e->getMessage(), $e->getLine());
            return response()->error($e->getMessage(), 500);
        }
    }

    public function login(LoginRequest $request)
    {
        try {
            $user = User::where('email', $request->email)->first();

            // Check if the user exists
            if (!$user) {
                return response()->error("User not found!", 404);
            }

            // Check if the user's status is 'blocked'
            if ($user->status === 'blocked') {
                return response()->json(['message' => 'Your account is blocked.'], 403);
            }

            // Verify the password
            if (Hash::check($request->password, $user->password)) {
                $token = $user->createToken('Laravel Password Grant Client')->accessToken;
                $response = ['token' => $token];
                storeApiResponse($request->api_request_id, ['message' => 'auth token created!'], 200, $user->id);
                return response()->json(['message' => "Logged In Successfully", 'data' => $response]);
            } else {
                return response()->error("Credentials mismatched!", 422);
            }
        } catch (\Exception $e) {
            saveErrorLogs('login', $e->getMessage(), $e->getLine());
            return response()->error($e->getMessage(), 500);
        }
    }


    public function forgotPassword(ForgotPasswordRequest $request)
    {
        try {
            $user = User::where('email', $request->email)->first();
            $token = Str::random(100);
            DB::table('password_reset_tokens')->insert([
                'email' => $request->email,
                'token' => $token,
                'created_at' => now()
            ]);
            $reset_password_url = env("FRONTEND_BASE_URL") . '/reset-password/' . $token . '/' . $request->email;
            $data = [
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'action_url' => $reset_password_url
            ];
            Mail::to($request->email)->send(new PasswordReset($data));
            $response = ['message' => 'Email sent for password reset!'];
            storeApiResponse($request->api_request_id, $response, 200, $user->id);
            return response()->success($response, 200);
        } catch (\Exception $e) {
            saveErrorLogs('forgotPassword', $e->getMessage(), $e->getLine());
            return response()->error($e->getMessage(), 500);
        }
    }

    public function resetPassword(ResetPasswordRequest $request)
    {
        try {
            $user = User::where('email', $request->email)->first();
            $record = DB::table('password_reset_tokens')->where([
                ['email', '=', $request->email],
                ['token', '=', $request->token]
            ])->first();
            if ($record) {
                // Check if the password reset token is older than 24 hours
                $created_at = Carbon::createFromTimeString($record->created_at);
                $now = Carbon::now();
                $hours_diff = $created_at->diffInRealHours($now);
                if ($hours_diff >= 24) {
                    $error = 'Your password reset token has been expired!';
                    storeApiResponse($request->api_request_id, ['message' => $error], 400, $user->id);
                    return response()->error($error, 400);
                }
                $is_updated = $user->update(['password' => $request->password]);
                if ($is_updated) {
                    DB::table('password_reset_tokens')->where('email', $request->email)->delete();
                    $response = ['message' => 'Your password has been reset!'];
                    storeApiResponse($request->api_request_id, $response, 200, $user->id);
                    return response()->success($response, 200);
                } else {
                    $error = 'Something went wrong while updating the password!';
                    storeApiResponse($request->api_request_id, ['message' => $error], 500, $user->id);
                    return response()->error($error, 500);
                }
            } else {
                $error = 'No such record found. Please try again!';
                storeApiResponse($request->api_request_id, ['message' => $error], 404, $user->id);
                return response()->error($error, 404);
            }
        } catch (\Exception $e) {
            saveErrorLogs('resetPassword', $e->getMessage(), $e->getLine());
            return response()->error($e->getMessage(), 500);
        }
    }

    public function sendPhoneVerificationCode(SavePhoneRequest $request)
    {
        try {
            $user = User::where('email', $request->email)->firstOrFail();
            $opt_code = rand(100000, 999999);
            $user->phone_verification_code = $opt_code;
            $user->phone_verification_code_generated_at = now();
            $user->phone = $request->phone;
            $user->save();

            $curl = curl_init();
            curl_setopt_array(
                $curl,
                array(
                    CURLOPT_URL => env('SMART_PHONE_URL'),
                    CURLOPT_RETURNTRANSFER => true,
                    CURLOPT_ENCODING => '',
                    CURLOPT_MAXREDIRS => 10,
                    CURLOPT_TIMEOUT => 0,
                    CURLOPT_FOLLOWLOCATION => true,
                    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                    CURLOPT_CUSTOMREQUEST => 'POST',
                    CURLOPT_POSTFIELDS => array('to' => $user->phone, 'from' => env('FROM_NUMBER'), 'message' => 'Your OTP code for PPC Leads to Deal is: ' . $user->phone_verification_code),
                    CURLOPT_HTTPHEADER => array(
                        'X-Auth-smrtPhone: V65Ytrrz1NIFHaV6zLOEbbGFsCpYJ00P'
                    ),
                )
            );

            $Spresponse = curl_exec($curl);

            if ($Spresponse != "Error: An unknown error occurred. Please contact your system administrator") {

                $response = 'We have sent you a verification code on your phone!';
                curl_close($curl);
                return response()->success($response, 200);
            }

            $response = 'Something bad happend while sending verification code on your phone!';
            return response()->error($response, 500);
        } catch (\Exception $e) {

            return response()->error($e->getMessage());
        }
    }

    public function verifyPhone(VerifyPhoneRequest $request)
    {
        try {
            $user = User::where('email', $request->email)->first();
            $verification_code = $user->phone_verification_code;
            $generated_at = Carbon::parse($user->phone_verification_code_generated_at);

            if ($verification_code == $request->phone_verification_code) {
                // Check if verification code is expired
                $expiry_time = $generated_at->addMinutes(2);
                if ($expiry_time->isPast()) {
                    $error = 'Your OTP has been expired!';
                    storeApiResponse($request->api_request_id, ['message' => $error], 422, $user->id);
                    return response()->error($error, 422);
                }
                $user->phone_verified_at = now();
                $user->phone_verification_code = null;
                $user->phone_verification_code_generated_at = null;
                $user->save();
                $response = ['message' => 'Your phone number has been verified!'];
                storeApiResponse($request->api_request_id, $response, 200, $user->id);
                return response()->success($response, 200);
            }
            $error = 'You have entered wrong verification code!';
            storeApiResponse($request->api_request_id, ['message' => $error], 422, $user->id);
            return response()->error($error, 422);
        } catch (\Exception $e) {
            saveErrorLogs('resetPassword', $e->getMessage(), $e->getLine());
            return response()->error($e->getMessage(), 500);
        }
    }

    public function verifyEmail(VerifyEmailRequest $request)
    {
        try {
            $user = User::where('email', $request->email)->first();
            if ($user->email_verified_at) {
                $error = ['message' => 'Your email has been verified!'];
                storeApiResponse($request->api_request_id, ['message' => $error], 403, $user->id);
                return response()->error($error, 403);
            }
            $email_verification_token = $user->email_verification_token;
            $generated_at = Carbon::parse($user->created_at);
            if ($email_verification_token == $request->email_verification_token) {
                // Check if token is expired
                $expiry_time = $generated_at->addHours(24);
                if ($expiry_time < Carbon::now()) {
                    $error = 'Your verification token has been expired!';
                    storeApiResponse($request->api_request_id, $error, 400, $user->id);
                    return response()->error($error, 400);
                }
                $user->email_verified_at = now();
                $user->email_verification_token = null;
                $user->save();
                $response = ['message' => 'Your email has been verified!'];
                storeApiResponse($request->api_request_id, $response, 200, $user->id);
                return response()->success($response, 200);
            } else {
                $error = 'Your email verification token is not correct!';
                storeApiResponse($request->api_request_id, $error, 400, $user->id);
                return response()->error($error, 400);
            }
        } catch (\Exception $e) {
            saveErrorLogs('verifyEmail', $e->getMessage(), $e->getLine());
            return response()->error($e->getMessage(), 500);
        }
    }

    public function getBusinessTypes(HttpRequest $request)
    {
        try {
            $business_types = BusinessType::get();
            if ($business_types->isNotEmpty()) {
                storeApiResponse($request->api_request_id, ['message' => 'business types fetched!'], 200, null);
                return response()->success($business_types, 200);
            }
            storeApiResponse($request->api_request_id, ['message' => 'business types not found!'], 404, null);
            return response()->error('business types not found!', 404);
        } catch (\Exception $e) {
            saveErrorLogs('getBusinessTypes', $e->getMessage(), $e->getLine());
            return response()->error($e->getMessage(), 500);
        }
    }

    public function getStates(HttpRequest $request)
    {
        try {
            $states = State::get();
            if ($states->isNotEmpty()) {
                storeApiResponse($request->api_request_id, ['message' => 'states fetched!'], 200, null);
                return response()->success($states, 200);
            }
            storeApiResponse($request->api_request_id, ['message' => 'states not found!'], 404, null);
            return response()->error('states not found!', 404);
        } catch (\Exception $e) {

            saveErrorLogs('getStates', $e->getMessage(), $e->getLine());
            return response()->error($e->getMessage(), 500);
        }

        
    }

    public function getCities(HttpRequest $request)
    {
        try {
            $cities= City::get();
            if ($cities->isNotEmpty()) {
                storeApiResponse($request->api_request_id, ['message' => 'cities fetched!'], 200, null);
                return response()->success($cities, 200);
            }
            storeApiResponse($request->api_request_id, ['message' => 'cities not found!'], 404, null);
            return response()->error('cities not found!', 404);
        } catch (\Exception $e) {

            saveErrorLogs('getCities', $e->getMessage(), $e->getLine());
            return response()->error($e->getMessage(), 500);
        }
    }

    public function getCounties(HttpRequest $request)
    {
        try {
            $counties= County::get();
            if ($counties->isNotEmpty()) {
                storeApiResponse($request->api_request_id, ['message' => 'counties fetched!'], 200, null);
                return response()->success($counties, 200);
            }
            storeApiResponse($request->api_request_id, ['message' => 'counties not found!'], 404, null);
            return response()->error('counties not found!', 404);
        } catch (\Exception $e) {

            saveErrorLogs('getCounties', $e->getMessage(), $e->getLine());
            return response()->error($e->getMessage(), 500);
        }
    }

    public function addUserBusinessTypes(AddUserBusinessTypesRequest $request)
    {
        try {
            $user = User::where('email', $request->email)->first();
            $business_types = $request->business_types;
            $user->businessTypes()->sync($business_types);
            $response = ['message' => 'Your business types has been added!'];
            storeApiResponse($request->api_request_id, $response, 200, $user->id);
            return response()->success($response, 200);
        } catch (\Exception $e) {
            saveErrorLogs('addUserBusinessType', $e->getMessage(), $e->getLine());
            return response()->error($e->getMessage(), 500);
        }
    }

    public function addUserStates(AddUserStatesRequest $request)
    {
        try {
            $user = User::where('email', $request->email)->first();
            $state_ids = $request->state_ids;
            $user->states()->sync($state_ids);
            $response = ['message' => 'Your states has been added!'];
            storeApiResponse($request->api_request_id, $response, 200, $user->id);
            return response()->success($response, 200);
        } catch (\Exception $e) {
            saveErrorLogs('addUserStates', $e->getMessage(), $e->getLine());
            return response()->error($e->getMessage(), 500);
        }
    }

    public function addUserCounties(AddUserCountiesRequest $request)
    {
        try {
            $user = User::where('email', $request->email)->first();
            $counties_ids = $request->counties_ids;
            $user->counties()->sync($counties_ids);
            $response = ['message' => 'Your counties has been added!'];
            // storeApiResponse($request->api_request_id, $response, 200, $user->id);
            return response()->success($response, 200);
        } catch (\Exception $e) {
            dd($e);
            // saveErrorLogs('addUserStates', $e->getMessage(), $e->getLine());
            // return response()->error($e->getMessage(), 500);
        }
    }

    public function addUserCities(AddUserCitiesRequest $request)
    {
        try {
            $user = User::where('email', $request->email)->first();
            $cities_ids = $request->cities_ids;
            $user->cities()->sync($cities_ids);
            $response = ['message' => 'Your cities has been added!'];
            storeApiResponse($request->api_request_id, $response, 200, $user->id);
            return response()->success($response, 200);
        } catch (\Exception $e) {

            return $e->getMessage();
        }
    }

    public function getUserCities()
    {

        try {

            if (request()->user()->cities) {

                $userCites = request()->user()->cities;

                return $userCites;
            }
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function getUserCounties()
    {

        try {

            if (request()->user()->counties) {

                $userCounties = request()->user()->counties;

                return $userCounties;
            }
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function getUserStates()
    {

        try {

            if (request()->user()->states) {

                $userStates = request()->user()->states;

                return $userStates;
            }
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function getUserProfile(HttpRequest $request)
    {
        try {


            $userProfile = $request->user();

            if (request()->user()->role) {

                $userRole = request()->user()->role->name;

            }

            return response()->success($userProfile);


        } catch (\Exception $e) {

            return response()->json(['message' => $e->getMessage()]);
        }
    }



    public function getUserInfo(HttpRequest $request)
    {
        try {

            $perPage = 5;
            $usernameFilter = $request->query('username');
            $sortOrder = in_array(strtolower($request->query('sort')), ['asc', 'desc']) ? strtolower($request->query('sort')) : 'asc';
            $sortField = $request->query('sort_field', 'full_name');
    
            $query = User::query();

            $searchTerm = $request->query('search');
    
            if ($usernameFilter) {
                $query->whereRaw("CONCAT(first_name, ' ', last_name) = ?", [$usernameFilter]);
            }

              // Free text search on user_name, user_role, and total_purchase
              if ($searchTerm) {
                $query->where(function ($query) use ($searchTerm) {
                    $query->whereRaw("CONCAT(first_name, ' ', last_name) LIKE ?", ["%$searchTerm%"])
                        ->orWhereHas('role', function ($subQuery) use ($searchTerm) {
                            $subQuery->where('name', 'like', "%$searchTerm%");
                        });
                });
            }
    
            if (!empty($sortField)) {
                // Use orderByRaw to handle ordering by concatenated first_name and last_name
                $query->orderByRaw("CONCAT(first_name, ' ', last_name) $sortOrder");
            }
    
            $users = $query->paginate($perPage);

            $responseData = [];

            foreach ($users as $user) {

                if ($usernameFilter && $user->first_name . " " . $user->last_name !== $usernameFilter) {
                    continue;
                }

                $totalPurchase = 0;

                $firstName = $user->first_name;
                $lastName = $user->last_name;

                $fullName = $firstName . " " . $lastName;

                $profile_pic = "";

                $requestCountToday = $user->requestCount()
                    ->whereDate('created_at', Carbon::today())
                    ->value('count');

                $startOfWeek = Carbon::now()->startOfWeek();
                $endOfWeek = Carbon::now()->endOfWeek();

                $requestCountWeek = $user->requestCount()
                    ->whereBetween('created_at', [$startOfWeek, $endOfWeek])
                    ->sum('count');

                $startOfMonth = Carbon::now()->startOfMonth();
                $endOfMonth = Carbon::now()->endOfMonth();

                $requestCountMonth = $user->requestCount()
                    ->whereBetween('created_at', [$startOfMonth, $endOfMonth])
                    ->sum('count');

                if ($user->profile_pic) {
                    $profile_pic = $user->profile_pic;
                }

                $pendingTickets = 0;
                $resolvedTickets = 0;

                $successfulLeads = 0;
                $failedLeads = 0;

                $pushLeads = PushedLead::get();

                foreach ($pushLeads as $pushLead) {

                    $status = $pushLead->status;

                    if ($status === 'successful') {
                        $successfulLeads++;
                    } elseif ($status === 'failed') {
                        $failedLeads++;
                    }

                }

                $userTickets = $user->tickets;

                foreach ($userTickets as $ticket) {

                    $status = $ticket->status;

                    if ($status === 'pending') {
                        $pendingTickets++;
                    } elseif ($status === 'resolved') {
                        $resolvedTickets++;
                    }

                }

                $purchasedLeads = $user->purchasedLeads;

                foreach ($purchasedLeads as $purchasedLead) {
                    // Assuming lead_data is an array with a 'price' key
                    if (isset($purchasedLead->lead_data['price'])) {
                        $totalPurchase += $purchasedLead->lead_data['price'];
                    }
                }

                $userRole = "";

                if ($user->role) {

                    $userRole = $user->role->name;
                }

                if ($usernameFilter && $user->first_name . " " . $user->last_name === $usernameFilter) {

                    $userResponse = [
                        'user_id' => $user->id,
                        'user_integration' => $user->integration,
                        'user_role' => $userRole,
                        'user_name' => $fullName,
                        'profile_pic' => $profile_pic,
                        'total_purchase' => $totalPurchase,
                        'pending_tickets' => $pendingTickets,
                        'resolved_tickets' => $resolvedTickets,
                        'requests_count_today' => $requestCountToday,
                        'requests_count_week' => $requestCountWeek,
                        'requests_count_month' => $requestCountMonth,
                        'successful_leads' => $successfulLeads,
                        'failed_leads' => $failedLeads,
                        'user_status' => $user->status
                    ];

                    $responseData[] = $userResponse;

                    break;
                }

                $userResponse = [
                    'user_id' => $user->id,
                    'user_integration' => $user->integration,
                    'user_role' => $userRole,
                    'user_name' => $fullName,
                    'profile_pic' => $profile_pic,
                    'total_purchase' => $totalPurchase,
                    'pending_tickets' => $pendingTickets,
                    'resolved_tickets' => $resolvedTickets,
                    'requests_count_today' => $requestCountToday,
                    'requests_count_week' => $requestCountWeek,
                    'requests_count_month' => $requestCountMonth,
                    'successful_leads' => $successfulLeads,
                    'failed_leads' => $failedLeads,
                    'user_status' => $user->status
                ];

                $responseData[] = $userResponse;
            }

            return response()->json([
                'current_page' => $users->currentPage(),
                'data' => $responseData,
                'first_page_url' => $users->url(1),
                'from' => $users->firstItem(),
                'last_page' => $users->lastPage(),
                'last_page_url' => $users->url($users->lastPage()),
                'links' => $users->render(),
                'next_page_url' => $users->nextPageUrl(),
                'path' => $users->path(),
                'per_page' => $users->perPage(),
                'prev_page_url' => $users->previousPageUrl(),
                'to' => $users->lastItem(),
                'total' => $users->total(),
            ]);

        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
        }
    }

    public function changePassword(Request $request)
    {
        try {
            $user = request()->user();

            $currentPassword = $request->input('current_password');

            $newPassword = $request->input('new_password');

            if ($currentPassword == $newPassword) {

                return response()->error(['message' => "please choose different password other than your current password"]);

            }

            if (Hash::check($currentPassword, $user->password)) {

                $newPassword = $request->input('new_password');

                $this->validate($request, [
                    'new_password' => 'required|string|min:8',
                ]);

                $is_updated = $user->update(['password' => $newPassword]);

                if ($is_updated) {
                    DB::table('password_reset_tokens')->where('email', $user->email)->delete();
                    $response = ['message' => 'Your password has been changed!'];
                    storeApiResponse($request->api_request_id, $response, 200, $user->id);
                    return response()->success($response, 200);
                } else {
                    $error = 'Something went wrong while updating the password!';
                    storeApiResponse($request->api_request_id, ['message' => $error], 500, $user->id);
                    return response()->error($error, 500);
                }

            } else {
                return response()->error(['message' => "your current password is incorrect!"]);
            }


        } catch (\Exception $e) {
            saveErrorLogs('changePassword', $e->getMessage(), $e->getLine());
            return response()->error($e->getMessage(), 500);
        }
    }


    public function redirectToGoogle()
    {
        //    response()->json([
        //         'url' => Socialite::driver('google')->stateless()->redirect()
        //     ]);

        return response()->json([
            'url' => Socialite::driver('google')
                ->stateless()
                ->redirect()
                ->getTargetUrl(),
        ]);

    }

    public function handleGoogleCallback()
    {
        try {

            $user = Socialite::driver('google')->stateless()->user();

            $user = User::query()
                ->firstOrCreate(
                    [
                        'email' => $user->email
                    ],
                    [
                        'email_verified_at' => now(),
                        'first_name' => $user->user["given_name"],
                        'last_name' => $user->user["family_name"],
                        'profile_pic' => $user->avatar,
                        'password' => 'Password12@'
                    ]
                );

            return response()->json([
                'user' => $user,
                'access_token' => $user->createToken('google-token'),
                'token_type' => 'Bearer',
            ]);

        } catch (ClientException $e) {
            return response()->json(['error' => 'Invalid credentials provided.'], 422);
        }


    }



    public function getUserResidence(Request $request)
    {
        try {

            $user = request()->user();

            $userBusinessTypes = $user->businessTypes;
            $userStates = $user->states;
            $userCounties = $user->counties;
            $userCities = $user->cities;

            $response = ['user_business_types' => $userBusinessTypes, 'user_states' => $userStates, 'user_counties' => $userCounties, 'user_cities' => $userCities];

            return response()->success($response, 200);

        } catch (\Exception $e) {
            $e->getMessage();
        }
    }


    public function updateUserStatus(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $newStatus = $request->input('status');

        if ($newStatus === 'blocked' && $user->status === 'active') {
            $user->status = $newStatus;
            $user->save();
            return response()->json(['message' => 'User status updated to blocked'], 200);
        } elseif ($newStatus === 'active' && $user->status === 'blocked') {
            $user->status = $newStatus;
            $user->save();

            return response()->json(['message' => 'User status updated to active'], 200);
        }

        return response()->json(['message' => 'Invalid status transition'], 400);
    }

    public function updateUserIntegrationStatus(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $newStatus = $request->input('status'); // Assuming the frontend sends the new status

        if ($newStatus === 'active' && $user->integration->status === 'inactive') {
            $user->integration->status = $newStatus;
            $user->integration->save();
            return response()->json(['message' => 'User Integration status updated to active'], 200);
        } elseif ($newStatus === 'inactive' && $user->integration->status === 'active') {
            $user->integration->status = $newStatus;
            $user->integration->save();
            return response()->json(['message' => 'User Integration status updated to inactive'], 200);
        }

        return response()->json(['message' => 'Invalid status transition'], 400);
    }
    public function getUserCount()
    {
        $userCount = User::count();

        return response()->json(['user_count' => $userCount]);
    }

    public function isPremiumUser(){

        // $user=request()->user();

        // dd($user);
        if (request()->user()->subscription) {

            $subscriptionType = request()->user()->subscription->package->name;

            if ($subscriptionType == "Premium" || $subscriptionType == "Professional") {

                return "subscribed";
            }

            else{ 
                
                return "not_subscribed";
            
            }
        
        }
    }


}