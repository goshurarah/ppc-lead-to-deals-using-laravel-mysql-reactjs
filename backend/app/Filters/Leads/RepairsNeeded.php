<?php

namespace App\Filters\Leads;

use Closure;

class RepairsNeeded
{
    public function handle($request, Closure $next)
    {
        if (!request()->has('repairs_needed') || request()->input('repairs_needed') == '') {
            return $next($request);
        }

        return $next($request)->where('repairs_needed', request()->input('repairs_needed'));
    }
}