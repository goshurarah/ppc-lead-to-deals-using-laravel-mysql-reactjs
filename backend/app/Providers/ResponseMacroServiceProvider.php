<?php

namespace App\Providers;

use Illuminate\Support\Facades\Response;
use Illuminate\Support\ServiceProvider;

class ResponseMacroServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        Response::macro('success', function ($data, $status = 200) {
            return Response::json([
                'errors'  => false,
                'data' => $data,
            ], $status);
        });

        Response::macro('error', function ($message, $status = 400) {
            return Response::json([
                'errors'  => true,
                'message' => $message,
            ], $status);
        });
    }
}
