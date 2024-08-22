<?php

namespace App\Http\Controllers\dashboard;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
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
    public function update(Request $request)
    {
       
        
try{
    $authUser = Auth::user();

    $user = User::find($authUser->id);



    if ($request->has('first_name'))
        $user->first_name = $request->input('first_name');
    if ($request->has('last_name'))
        $user->last_name = $request->input('last_name');
    if ($request->has('email'))
        $user->email = $request->input('email');
    if ($request->has('phone'))
        $user->phone = $request->input('phone');

        if ($request->hasFile('profile_pic')) {
            $image = $request->file('profile_pic');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('uploads'), $imageName);
            $user->profile_pic = $imageName;
        }
    // if ($request->has('state'))
    //     $user->states = $request->input('state');
    // if ($request->has('county'))
    //     $user->counties = $request->input('county');
    // if ($request->has('city'))
    //     $user->cities = $request->input('city');


    $user->save();




    return response()->json(['message' => 'Profile updated successfully', 'user'=> $user]);

}  catch (\Exception $e) {
   return $e->getMessage();
}

       
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}