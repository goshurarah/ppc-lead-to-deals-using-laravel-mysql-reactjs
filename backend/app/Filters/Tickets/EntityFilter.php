<?php

namespace App\Filters\Tickets;

use Closure;

class EntityFilter
{
    public function handle($request, Closure $next)
    {
        if (!request()->has('product_category') || request()->input('product_category') == '') {
            return $next($request);
        }

        return $next($request)->where('product_category', request()->input('product_category'));
    }
}