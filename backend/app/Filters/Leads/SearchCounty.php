<?php

namespace App\Filters\Leads;

use Closure;

class SearchCounty
{
    public function handle($request, Closure $next)
    {
        if (!request()->has('county')) {
            return $next($request);
        }

        $countyName = request()->input('county');
        return $next($request)->whereHas('county', function ($query) use ($countyName) {
            $query->where('name', 'like', '%' . $countyName . '%');
        });
    }
}
