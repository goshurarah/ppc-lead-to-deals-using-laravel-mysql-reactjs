<?php

namespace App\Filters\Leads;

use Closure;

class HowLongOwned
{
    public function handle($request, Closure $next)
    {
        if (!request()->has('how_long_you_owned') || request()->input('how_long_you_owned') == '') {
            return $next($request);
        }

        return $next($request)->where('how_long_you_owned', request()->input('how_long_you_owned'));
    }
}