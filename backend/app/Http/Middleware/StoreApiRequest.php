<?php

namespace App\Http\Middleware;

use App\Models\ApiRequest;
use App\Models\ApiRequestLog;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class StoreApiRequest
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $api_request = ApiRequest::create([
            'endpoint' => $request->path(),
            'request_data' => $request->all()
        ]);

        ApiRequestLog::create([
            'api_request_id' => $api_request->id,
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent()
        ]);

        $request['api_request_id'] = $api_request->id;

        return $next($request);
    }
}
