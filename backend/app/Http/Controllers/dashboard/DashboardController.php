<?php

namespace App\Http\Controllers\dashboard;

use App\Http\Controllers\Controller;
use App\Models\SideMenuModule;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function getSideMenuModules(Request $request)
    {
        try {
            $side_menu_modules = SideMenuModule::get(['id', 'name', 'component', 'icon_path_white', 'icon_path_gray']);
            if ($side_menu_modules->isNotEmpty()) {
                storeApiResponse($request->api_request_id, ['message' => 'Side menu modules fetched!'], 200, null);
                return response()->success($side_menu_modules, 200);
            }
            storeApiResponse($request->api_request_id, ['message' => 'Side menu modules not found!'], 404, null);
            return response()->error('Side menu modules not found!', 404);
        } catch (\Exception $e) {
            return throwException('DashboardController/getSideBarMenuModules', $e);
        }
    }
}
