<?php

namespace App\Filters\Leads;

use Closure;

class HouseType
{
    public function handle($request, Closure $next)
    {
        if (!request()->has('type_of_house') || request()->input('type_of_house') == '') {
            return $next($request);
        }

        return $next($request)->where('type_of_house', request()->input('type_of_house'));
    }
}