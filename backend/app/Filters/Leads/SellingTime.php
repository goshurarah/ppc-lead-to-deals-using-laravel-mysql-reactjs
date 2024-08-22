<?php

namespace App\Filters\Leads;

use Closure;

class SellingTime
{
    public function handle($request, Closure $next)
    {
        if (!request()->has('ideal_selling_timeframe') || request()->input('ideal_selling_timeframe') == '') {
            return $next($request);
        }

        return $next($request)->where('ideal_selling_timeframe', request()->input('ideal_selling_timeframe'));
    }
}