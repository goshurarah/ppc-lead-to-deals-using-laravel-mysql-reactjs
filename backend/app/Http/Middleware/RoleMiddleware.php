<?php

// namespace App\Http\Middleware;

// use Closure;
// use Illuminate\Support\Facades\Auth;

// class RoleMiddleware
// {
//     public function handle($request, Closure $next, ...$permissions)
//     {
//         if (!Auth::check()) {
//             return redirect('/login');
//         }

//         foreach ($permissions as $permission) {
//             if (Auth::user()->hasPermissionTo($permission)) {
//                 return $next($request);
//             }
//         }

//         return abort(403, 'Unauthorized');
//     }
// }

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware
{
    public function handle($request, Closure $next, $role)
    {

        if (request()->user()->role) {

            if (request()->user()->role->name == $role) {
                return $next($request);

            }
        }
        return abort(403, 'Forbidden');
    }
}