<?php

namespace App\Http\Controllers\dashboard;

use App\Models\Integration;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;

class IntegrationController extends Controller
{
    //

    public function index()
    {
        try {
            // Assuming you have a logged-in user, you can retrieve their latest integration
            $user = auth()->user(); // Assuming you are using Laravel's authentication system
    
            // Retrieve the latest integration for the user
            $latestIntegration = $user->integration()->latest()->first();
    
            if (!$latestIntegration) {
                return response()->json(['message' => 'No integration found for the user'], 404);
            }
    
            return response()->json(['integration' => $latestIntegration], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {

        try {
            
            $integration = Integration::create([
                'status' => $request->status,
                'webhook_url' => $request->webhook_url,
                'http_headers' => $request->http_headers,
                'user_id' => request()->user()->id


            ]);

            $integration->save();

            return response()->json(['message' => 'Integration created successfully', 'integration'=> $integration] );


        } catch (\Exception $e) {

            dd($e);

            return throwException('IntegrationController/create', $e);
        }
    }




    public function integrationTest(Request $request)
    {

        try {

            $data = [
                'name' => 'John Doe',
                'email' => 'john@example.com',
                'age' => 30,
                'address' => [
                    'street' => '123 Main St',
                    'city' => 'Anytown',
                    'zipcode' => '12345',
                ],
                'interests' => ['reading', 'gaming', 'traveling'],
            ];
            
            $integrationResponse=Http::withHeaders(request()->input('http_headers'))->withoutVerifying()->post(request()->input('webhook_url'), $data);
                  
            if ($integrationResponse->failed()) {
               return response()->error("Inttegration test failed!");
            } else {
                return response()->success("Inttegration test successful!");
            }

        } catch (\Exception $e) {

            return throwException('IntegrationController/create', $e);
        }
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