<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use Illuminate\Http\Request;

class FaqController extends Controller
{
    public function getFaqs(Request $request)
    {
        try {
            $faqs = Faq::get();
            if ($faqs->isNotEmpty()) {
                storeApiResponse($request->api_request_id, ['message' => 'faqs fetched!'], 200, null);
                return response()->success($faqs, 200);
            }
            storeApiResponse($request->api_request_id, ['message' => 'faqs not found!'], 404, null);
            return response()->error('faqs not found!', 404);
        } catch (\Exception $e) {
            saveErrorLogs('getFaqs', $e->getMessage(), $e->getLine());
            return response()->error($e->getMessage(), 500);
        }
    }
}
