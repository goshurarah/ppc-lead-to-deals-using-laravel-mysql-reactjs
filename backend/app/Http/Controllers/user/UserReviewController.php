<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use App\Models\UserReview;
use Illuminate\Http\Request;

class UserReviewController extends Controller
{
    public function getReviews(Request $request)
    {
        try {
            $reviews = UserReview::get();
            if ($reviews->isNotEmpty()) {
                storeApiResponse($request->api_request_id, ['message' => 'reviews fetched!'], 200, null);
                return response()->success($reviews, 200);
            }
            storeApiResponse($request->api_request_id, ['message' => 'reviews not found!'], 404, null);
            return response()->error('reviews not found!', 404);
        } catch (\Exception $e) {
            saveErrorLogs('getReviews', $e->getMessage(), $e->getLine());
            return response()->error($e->getMessage(), 500);
        }
    }
}
