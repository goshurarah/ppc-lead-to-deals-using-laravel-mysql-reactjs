<?php

namespace App\Filters\Leads;

use Closure;

class Baths
{
    public function handle($request, Closure $next)
    {
        if (!request()->has('baths') || request()->input('baths') == '') {
            return $next($request);
        }

        return $next($request)->where('baths', request()->input('baths'));
    }
}