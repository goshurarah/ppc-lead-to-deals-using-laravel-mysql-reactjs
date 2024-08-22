<?php

namespace App\Http\Controllers\dashboard;

use App\Models\User;
use Illuminate\Http\Request;
use App\Models\PurchasedLead;
use App\Http\Controllers\Controller;

class PurchasedLeadsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        try {

            $user = User::find(request()->user()->id);

            $puchasedLeads = $user->purchasedLeads;

            return response()->json([
                'purchased_leads' => $puchasedLeads,

            ]);

        } catch (\Exception $e) {

           return $e->getMessage();
        }
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {

            $purchasedLead = PurchasedLead::create([
                'user_id' =>request()->user()->id,
                'status_code' => $request->status_code,
                'message' => $request->message,
                'lead_data' => $request->lead_data

            ]);

            $purchasedLead->save();


            return response()->success($purchasedLead, 201);

        } catch (\Exception $e) {

           return $e->getMessage();
        }
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
    }
}
