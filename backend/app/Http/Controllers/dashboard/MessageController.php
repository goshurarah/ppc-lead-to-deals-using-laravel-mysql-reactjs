<?php

namespace App\Http\Controllers\dashboard;

use App\Models\Ticket;
use App\Models\Message;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        try {

            $messages = Message::with('user')->get();

            return response()->json([
                'messages' => $messages,

            ]);

        } catch (\Exception $e) {

          return $e->getMessage();
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request, $ticket_id)
    {
        try {
            $data = [
                'message' => $request->message,
                'ticket_id' => $ticket_id,
                'user_id' => $request->user()->id,
                'sender' => $request->user(),
                'last_message' => now(),
            ];
    
            if ($request->hasFile('file')) {
                $uploadedFile = $request->file('file');
                $fileName = $uploadedFile->getClientOriginalName();
                
                $messageUploadPath = 'uploads/messages/ticket_id/' . $ticket_id;
                $request->file('file')->move(public_path($messageUploadPath), $fileName);
    
                $data['file'] = $fileName;
            }
    
            $message = Message::create($data);
    
            // Update the last_message field in the tickets table
            $ticket = Ticket::findOrFail($ticket_id);
            $ticket->update(['last_message' => now()]);
    
            return response()->json([
                'message' => $message,
            ]);
        } catch (\Exception $e) {
            // Handle the exception, log, or report it
            return response()->json(['error' => $e->getMessage()], 500);
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