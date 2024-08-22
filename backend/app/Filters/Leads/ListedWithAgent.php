<?php

namespace App\Filters\Leads;

use Closure;

class ListedWithAgent
{
    public function handle($request, Closure $next)
    {

       
        if (!request()->has('listed_with_real_estate_agent') || request()->input('listed_with_real_estate_agent') == '') {
            return $next($request);
        }

        return $next($request)->where('listed_with_real_estate_agent', request()->input('listed_with_real_estate_agent'));
    }
}