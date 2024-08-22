<?php

namespace App\Http\Controllers;

use App\Mail\ContactUs;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
   
    public function contactUs(Request $request)
    {
        try {
            $data = [
                'first_name' => request()->input('first_name'),
                'last_name' => request()->input('last_name'),
                'email' => request()->input('email'),
                'phone' => request()->input('phone'),
                'your_message' => request()->input('your_message'),
            ];

            $contact = Contact::create($data);

            Mail::to($request->email)->send(new ContactUs($data));

            return response()->json(['message' => "Thank you for contacting us. we'll get back to you ASAP.", 'contact' => $contact]);

          

        } catch (\Exception $e) {

            return response()->json(['error' => $e->getMessage()]);
        }
    }
}
