<?php

namespace App\Filters\SupportTicket;

use Closure;

class SearchByAnything
{
    public function handle($request, Closure $next)
    {
        if (!request()->has('search') || request()->input('search') == '') {
            return $next($request);
        }

        $searchTerm = request()->input('search');

        return $next($request)->where(function ($q) use ($searchTerm) {
            $q->where('subject', 'like', '%' . $searchTerm . '%')
              ->orWhere('product_category', 'like', '%' . $searchTerm . '%')
              ->orWhere('request_details', 'like', '%' . $searchTerm . '%')
              ->orWhere('status', 'like', '%' . $searchTerm . '%');
        });
    }
}