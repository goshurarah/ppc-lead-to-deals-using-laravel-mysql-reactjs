<?php

namespace App\Http\Controllers\dashboard;

use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class   ModuleController extends Controller
{

    public function getUserAdminModule(Request $request)
    {

        try {
            $userAdminModule = DB::table('user_admin_modules')->get();

            return response()->json($userAdminModule);

        } catch (\Exception $e) {

            return $e->getMessage();
        }
    }

    public function getTicketAdminModule(Request $request)
    {

        try {
            $ticketAdminModule = DB::table('ticket_admin_modules')->get();

            return response()->success($ticketAdminModule, 200);

        } catch (\Exception $e) {

            return $e->getMessage();
        }
    }

    public function getInventoryAdminModule(Request $request)
    {

        try {
            $inventoryAdminModule = DB::table('inventory_admin_modules')->get();

            return response()->success($inventoryAdminModule, 200);

        } catch (\Exception $e) {

            return $e->getMessage();
        }
    }

    public function getBlogAdminModule(Request $request)
    {

        try {
            $blogAdminModule = DB::table('blog_admin_module')->get();

            return response()->success($blogAdminModule, 200);

        } catch (\Exception $e) {

            return $e->getMessage();
        }
    }


    public function getPermissionAdminModule(Request $request)
{
    try {
        $permissionAdminModule = DB::table('permission_admin_modules')->get();
        $userAdminModule = DB::table('user_admin_modules')->get();
        $ticketAdminModule = DB::table('ticket_admin_modules')->get();
        $inventoryAdminModule = DB::table('inventory_admin_modules')->get();

        // Create objects for each module's data
        $permissionData = $permissionAdminModule->toArray();
        $userData = $userAdminModule->toArray();
        $ticketData = $ticketAdminModule->toArray();
        $inventoryData = $inventoryAdminModule->toArray();

        // Combine the module data objects into a single response array
        $responseData = array_merge($permissionData, $userData, $ticketData, $inventoryData);

        // Return the response array
        return response()->json($responseData);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()]);
    }
}

}