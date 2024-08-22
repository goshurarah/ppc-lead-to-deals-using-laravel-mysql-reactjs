<?php

namespace App\Http\Middleware;

use Illuminate\Support\Facades\Auth;
use App\Models\RequestCount;
use Closure;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;


class CountRequests
{
    public function handle($request, Closure $next)
    {
        $user = Auth::user();

        if ($user) {
            $requestCount = RequestCount::where('user_id', $user->id)->first();
            if ($requestCount) {
                $requestCount->count++;
                $requestCount->save();
            } else {
                RequestCount::create([
                    'user_id' => $user->id,
                    'count' => 1,
                ]);
            }
        }

        // Continue processing the request and get the response
        $response = $next($request);

        // If the response is a JSON response, return it directly
        if ($response instanceof JsonResponse) {
            return $response;
        }

        // Return the original response object
        return $response;
    }
}