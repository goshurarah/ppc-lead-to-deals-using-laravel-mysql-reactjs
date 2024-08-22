<?php

namespace App\Http\Controllers\dashboard;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Permission;
use Symfony\Component\HttpFoundation\JsonResponse;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Http\Requests\dashboard\permissions\ShowPermissionRequest;
use App\Http\Requests\dashboard\permissions\StorePermissionRequest;
use App\Http\Requests\dashboard\permissions\UpdatePermissionRequest;
use App\Http\Requests\dashboard\permissions\AssignPermissionsToRoleRequest;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {

            // $inventoryPermissions = DB::table('permissions')->where('module', 'Inventory')->get();
            $usersPermissions = DB::table('permissions')->where('module', 'Users')->get();
            $ticketsPermissions = DB::table('permissions')->where('module', 'Tickets')->get();

            return response()->json(['Users' => $usersPermissions, 'Tickets' => $ticketsPermissions]);
        } catch (\Exception $e) {
            return throwException('PermissionController/store', $e);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePermissionRequest $request)
    {
        try {
            $permission = Permission::create(['name' => $request->name]);
            storeApiResponse($request->api_request_id, $permission, 201, Auth::id());
            return response()->success($permission, 201);
        } catch (\Exception $e) {
            return throwException('PermissionController/store', $e);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(ShowPermissionRequest $request, string $id)
    {
        try {
            $permission = Permission::find($id);
            storeApiResponse($request->api_request_id, $permission, 200, Auth::id());
            return response()->success($permission, 200);
        } catch (\Exception $e) {
            return throwException('PermissionController/show', $e);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            Permission::find($id)->update(['status' => $request->status]);
            $response = ['message' => 'Permission with id ' . $id . ' successfully updated!'];
            storeApiResponse($request->api_request_id, $response, 200, Auth::id());
            return response()->success($response, 200);
        } catch (\Exception $e) {
            return throwException('PermissionController/update', $e);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ShowPermissionRequest $request, string $id)
    {
        try {
            Permission::find($id)->delete();
            $response = ['message' => 'Permission with id ' . $id . ' successfully deleted!'];
            storeApiResponse($request->api_request_id, $response, 200, Auth::id());
            return response()->success($response, 200);
        } catch (\Exception $e) {
            return throwException('PermissionController/destroy', $e);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function assignPermissionsToRole(AssignPermissionsToRoleRequest $request)
    {
        try {
            $role = Role::find($request->role_id);
            $permissions = Permission::whereIn('id', $request->permission_ids)->get();
            $role->givePermissionTo($permissions);

            $response = ['message' => 'Permissions has been given to ' . $role->name . ' successfully!'];
            storeApiResponse($request->api_request_id, $response, 200, Auth::id());
            return response()->success($response, 200);
        } catch (\Exception $e) {
            return throwException('PermissionController/assignPermissionsToRole', $e);
        }
    }


    public function getRolePermissions(Request $request): JsonResponse
    {

        try {
            $roleId = $request->input('role_id');

            if ($roleId == 1) {

                $role = Role::find($roleId);

                if ($role) {
                    $permissions = $role->permissions;
                    return response()->json(['Users' => $permissions]);
                }

            } elseif ($roleId == 2) {

                $role = Role::find($roleId);

                if ($role) {
                    $permissions = $role->permissions;
                    return response()->json(['Tickets' => $permissions]);
                }

            } elseif ($roleId == 3) {

                $role = Role::find($roleId);

                if ($role) {
                    $permissions = $role->permissions;
                    return response()->json(['Super Admin' => $permissions]);
                }

            }


            return response()->json(['message' => 'Role not found'], 404);

        } catch (\Exception $e) {
            return response()->json(['message' => 'Role not found'], 404);
        }
    }



}