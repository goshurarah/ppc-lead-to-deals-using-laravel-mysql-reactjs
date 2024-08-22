<?php

namespace App\Filters\Leads;

use Closure;

class PropertyCondition
{
    public function handle($request, Closure $next)
    {
        if (!request()->has('property_condition') || request()->input('property_condition') == '') {
            return $next($request);
        }

        return $next($request)->where('property_condition', request()->input('property_condition'));
    }
}