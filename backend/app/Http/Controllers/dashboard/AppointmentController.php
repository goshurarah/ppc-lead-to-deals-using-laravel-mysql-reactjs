<?php

namespace App\Http\Controllers\dashboard;

use App\Mail\AppointmentMail;
use App\Models\Appointment;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class AppointmentController extends Controller
{
    public function createAppointment(Request $request)
    {
        try {
            $data = [
                'user_id' => request()->user()->id,
                'name' => request()->input('name'),
                'email' => request()->input('email'),
                'phone' => request()->input('phone'),
                'address' => request()->input('address'),
            ];

            $appointment = Appointment::create($data);

            Mail::to($request->email)->send(new AppointmentMail($data));

            return response()->json(['message' => "Appointment created successfully", 'appointment' => $appointment]);

          

        } catch (\Exception $e) {

            return response()->json(['error' => $e->getMessage()]);
        }
    }
}