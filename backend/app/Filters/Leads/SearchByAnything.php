<?php

namespace App\Filters\Leads;

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
            $q->where('beds', 'like', '%' . $searchTerm . '%')
              ->orWhere('baths', 'like', '%' . $searchTerm . '%')
              ->orWhere('garage', 'like', '%' . $searchTerm . '%')
              ->orWhere('pool', 'like', '%' . $searchTerm . '%')
              ->orWhere('address', 'like', '%' . $searchTerm . '%')
              ->orWhere('zip_code', 'like', '%' . $searchTerm . '%')
              ->orWhere('description', 'like', '%' . $searchTerm . '%')
              ->orWhere('owner_wholesaler', 'like', '%' . $searchTerm . '%')
              ->orWhere('asking_price', 'like', '%' . $searchTerm . '%')
              ->orWhere('price', 'like', '%' . $searchTerm . '%')
              ->orWhere('square_footage', 'like', '%' . $searchTerm . '%')
              ->orWhere('occupancy', 'like', '%' . $searchTerm . '%')
              ->orWhere('ideal_selling_timeframe', 'like', '%' . $searchTerm . '%')
              ->orWhere('motivation', 'like', '%' . $searchTerm . '%')
              ->orWhere('violations', 'like', '%' . $searchTerm . '%')
              ->orWhere('mortgage', 'like', '%' . $searchTerm . '%')
              ->orWhere('listed_with_real_estate_agent', 'like', '%' . $searchTerm . '%')
              ->orWhere('repairs_needed', 'like', '%' . $searchTerm . '%')
              ->orWhere('property_condition', 'like', '%' . $searchTerm . '%')
              ->orWhere('how_long_you_owned', 'like', '%' . $searchTerm . '%')
              ->orWhere('year_of_construction', 'like', '%' . $searchTerm . '%')
              ->orWhere('type_of_house', 'like', '%' . $searchTerm . '%')
              ->orWhere('monthly_rental_amount', 'like', '%' . $searchTerm . '%')
              ->orWhere('status', 'like', '%' . $searchTerm . '%')
              ->orWhereHas('state', function ($stateQuery) use ($searchTerm) {
                $stateQuery->where('name', 'like', '%' . $searchTerm . '%');
            })
            ->orWhereHas('county', function ($stateQuery) use ($searchTerm) {
                $stateQuery->where('name', 'like', '%' . $searchTerm . '%');
            })
            ->orWhereHas('city', function ($stateQuery) use ($searchTerm) {
                $stateQuery->where('name', 'like', '%' . $searchTerm . '%');
            });
        });
    }
}