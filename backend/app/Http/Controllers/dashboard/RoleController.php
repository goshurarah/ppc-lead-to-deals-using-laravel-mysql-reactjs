<?php

namespace App\Http\Controllers\dashboard;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\dashboard\roles\ShowRoleRequest;
use App\Http\Requests\dashboard\roles\StoreRoleRequest;
use App\Http\Requests\dashboard\roles\UpdateRoleRequest;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {


        $role = Role::find(1); // Retrieve the user instance, replace $userId with the actual user ID

        // $role = $user->roles->first(); // Retrieve the user's assigned role

        $permissions = $role->permissions; // Get all permissions associated with the role

        // Access the permissions
        foreach ($permissions as $permission) {
            echo $permission->name; // Or perform any other actions with the permission
        }





        // try {
        //     $roles = Role::get();
        //     if ($roles->isEmpty()) {
        //         $response = 'No roles found!';
        //         storeApiResponse($request->api_request_id, ['message' => $response], 404, Auth::id());
        //         return response()->error($response, 404);
        //     }
        //     storeApiResponse($request->api_request_id, ['message' => 'All roles fetched!'], 200, Auth::id());
        //     return response()->success($roles, 200);
        // } catch (\Exception $e) {
        //     return throwException('RoleController/store', $e);
        // }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRoleRequest $request)
    {
        try {
            $role = Role::create(['name' => $request->name, 'description' => $request->description]);
            storeApiResponse($request->api_request_id, $role, 201, Auth::id());
            return response()->json(['message' => "Role added successfully", 'role' => $role]);
        } catch (\Exception $e) {
            return throwException('RoleController/store', $e);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(ShowRoleRequest $request, string $id)
    {
        try {
            $role = Role::find($id);
            storeApiResponse($request->api_request_id, $role, 200, Auth::id());
            return response()->success($role, 200);
        } catch (\Exception $e) {
            return throwException('RoleController/show', $e);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRoleRequest $request, string $id)
    {
        try {
            Role::find($id)->update(['name' => $request->name]);
            $response = ['message' => 'Role with id ' . $id . ' successfully updated!'];
            storeApiResponse($request->api_request_id, $response, 200, Auth::id());
            return response()->success($response, 200);
        } catch (\Exception $e) {
            return throwException('RoleController/update', $e);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ShowRoleRequest $request, string $id)
    {
        try {
            Role::find($id)->delete();
            $response = ['message' => 'Role with id ' . $id . ' successfully deleted!'];
            storeApiResponse($request->api_request_id, $response, 200, Auth::id());
            return response()->success($response, 200);
        } catch (\Exception $e) {
            return throwException('RoleController/destroy', $e);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function assignRoleToUser(Request $request)
    {
        try {
            $user = User::find($request->user_id);
            $role = Role::find($request->role_id); // Assuming role_id is the ID of the selected role

            if (!$role) {
                return response()->error('Role not found', 404); // Handle the case where the role doesn't exist
            }

            $user->role_id = $role->id; // Set the role_id on the user
            $user->save();

            $response = ['message' => 'Role assigned successfully!'];
            storeApiResponse($request->api_request_id, $response, 200, Auth::id());
            return response()->success($response, 200);
        } catch (\Exception $e) {
            return throwException('RoleController/assignRolesToUser', $e);
        }
    }


    public function getUserRoles(Request $request)
    {
        try {

            $user = User::find(request()->user()->id);

            $roles = $user->getRoleNames();

            return response()->success($roles, 200);

        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function getAllRoles(Request $request)
{
    try {
        $roles = DB::table('roles')->get();
        return response()->json(['roles' => $roles], 200);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}
}