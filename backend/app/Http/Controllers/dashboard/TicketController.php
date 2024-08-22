<?php

namespace App\Http\Controllers\dashboard;

use App\Models\User;
use App\Models\Ticket;
use Illuminate\Http\Request;
use App\Models\SideMenuModule;
use Illuminate\Pipeline\Pipeline;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Filters\Tickets\EntityFilter;
use App\Filters\Tickets\StatusFilter;
use App\Filters\AdminSupportTicket\SearchByAnything;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $userId = request()->user()->id;
    
            $query = Ticket::where('user_id', $userId);
    
            // Sorting parameters
            $sortBy = request()->input('sort_by', 'created_at');
            $sortOrder = request()->input('sort_order', 'desc');
    
            $tickets = app(Pipeline::class)
                ->send($query)
                ->through([
                    EntityFilter::class,
                    StatusFilter::class,
                    SearchByAnything::class
                ])
                ->thenReturn()
                ->with(['messages' => function ($query) {
                    $query->select('messages.*', \DB::raw("CONCAT('uploads/tickets/user_id_', tickets.user_id, '/', messages.file) AS file_url"));
                    $query->join('tickets', 'messages.ticket_id', '=', 'tickets.id');
                }, 'user'])
                ->select('tickets.*', \DB::raw("CONCAT('uploads/tickets/user_id_', tickets.user_id, '/', tickets.file) AS file_url"))
                ->orderBy($sortBy, $sortOrder)
                ->paginate(10);
    
            $tickets->getCollection()->each(function ($ticket) {
                $ticket->messages->each(function ($message) use ($ticket) {
                    $message->append('file_url');
                });
                $ticket->append('file_url');
            });
    
            return response()->json($tickets, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    public function getAdminTickets(Request $request)
{
    try {
        $query = Ticket::query();

        $tickets = app(Pipeline::class)
            ->send($query)
            ->through([
                EntityFilter::class,
                StatusFilter::class,
                SearchByAnything::class
            ])
            ->thenReturn()
            ->with(['messages' => function ($query) {
                $query->select('messages.*', \DB::raw("CONCAT('uploads/tickets/user_id_', tickets.user_id, '/', messages.file) AS file_url"));
                $query->join('tickets', 'messages.ticket_id', '=', 'tickets.id');
            }, 'user']);

        // Sorting parameters
        $sortBy = $request->input('sort_by', 'created_at');
        $sortOrder = $request->input('sort_order', 'desc');

        // Validate sort_order
        if (!in_array(strtolower($sortOrder), ['asc', 'desc'])) {
            return response()->json(['error' => 'Order direction must be "asc" or "desc"'], 400);
        }

        $tickets = $tickets
            ->when($sortBy, function ($query) use ($sortBy, $sortOrder) {
                $query->orderBy($sortBy, $sortOrder);
            });

        if ($request->has('username')) {
            $username = $request->input('username');
            $usernameWithWildcards = '%' . str_replace(' ', '%', $username) . '%';

            $tickets = $tickets->whereHas('user', function ($query) use ($usernameWithWildcards) {
                $query->whereRaw("CONCAT(first_name, ' ', last_name) LIKE ?", [$usernameWithWildcards]);
            });
        }

        $tickets = $tickets->select('tickets.*')
            ->addSelect(\DB::raw("CONCAT('uploads/tickets/user_id_', tickets.user_id, '/', tickets.file) AS file_url"))
            ->paginate(10);

        $tickets->getCollection()->each(function ($ticket) {
            $ticket->append('file_url');
        });

        $tickets->getCollection()->each(function ($ticket) {
            $ticket->messages->each(function ($message) {
                $message->append('file_url');
            });
        });

        return response()->json($tickets, 200);
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

            $data = [
                'user_id' => request()->user()->id,
                'subject' => $request->subject,
                'product_category' => $request->product_category,
                'request_details' => $request->request_details,
            ];

            if ($request->hasFile('file')) {

                $fileName = $request['file']->getClientOriginalName();

                $ticketUploadPath = 'uploads/tickets/user_id/' . $request->user()->id;
                $request->file('file')->move(public_path($ticketUploadPath), $fileName);
                $data['file'] = $fileName;
            }

            $ticket = Ticket::create($data);

            return response()->json(['message' => 'Ticket created successfully.', 'ticket' => $ticket]);

        } catch (\Exception $e) {

            return $e->getMessage();
        }
    }




    public function getAllUserNames(Request $request)
    {
        try {
            $users = User::get();
            $userNames = []; // Create an array to store user names as objects

            foreach ($users as $user) {
                $fullName = $user->first_name . " " . $user->last_name;
                $userNames[] = ['full_name' => $fullName]; // Add each user name as an object
            }

            return response()->json([$userNames], 200); // Return JSON response with user names

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500); // Return JSON response with error message
        }
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:resolved,pending', // Add other valid status values as needed
        ]);
    
        $ticket = Ticket::findOrFail($id);
    
        // Check if the status is 'resolved' and update the 'solved' field
        if ($request->input('status') === 'resolved') {
            $ticket->update([
                'status' => 'resolved',
                'solved' => now(), // Use the now() function to get the current date and time
            ]);
        } else {
            // If the status is not 'resolved', update only the 'status' field
            $ticket->update(['status' => $request->input('status')]);
        }
    
        return response()->json(['message' => 'Status updated successfully', 'ticket' => $ticket]);
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