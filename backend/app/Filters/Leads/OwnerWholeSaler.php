<?php

namespace App\Filters\Leads;

use Closure;

class OwnerWholeSaler
{
    public function handle($request, Closure $next)
    {
        if (!request()->has('owner_wholesaler') || request()->input('owner_wholesaler') == '') {
            return $next($request);
        }

        return $next($request)->where('owner_wholesaler', request()->input('owner_wholesaler'));
    }
}