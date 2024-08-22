<?php

namespace App\Filters\Leads;

use Closure;

class SearchState
{
    public function handle($request, Closure $next)
    {
        if (!request()->has('state')) {
            return $next($request);
        }
        
        $stateName = request()->input('state');
        return $next($request)->whereHas('state', function ($query) use ($stateName) {
            $query->where('name', 'like', '%' . $stateName . '%');
        });
    }
}
