<?php

namespace App\Filters\Leads;

use Closure;

class SearchCity
{
    public function handle($request, Closure $next)
    {
        if (!request()->has('city')) {
            return $next($request);
        }
        
        $cityName = request()->input('city');
        return $next($request)->whereHas('city', function ($query) use ($cityName) {
            $query->where('name', 'like', '%' . $cityName . '%');
        });
    }
}
