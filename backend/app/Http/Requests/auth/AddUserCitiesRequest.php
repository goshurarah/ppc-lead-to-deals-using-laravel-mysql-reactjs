<?php

namespace App\Http\Requests\auth;

use App\Models\User;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class AddUserCitiesRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'email' => 'required|email|max:100|exists:users,email',
            'cities_ids' => 'required|array',
            // 'cities_ids.*' => 'numeric|exists:states,id'
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        $user = User::where('email', $this->request->get('email'))->first();
        $user_id = $user->id ?? null;
        $errorMessage = $validator->errors()->first();
        $response = response()->error($errorMessage, 422);
        $apiRequestId = $this->request->get('api_request_id');
        storeApiResponse($apiRequestId, $response->getContent(), 422, $user_id);
        throw new HttpResponseException($response);
    }
}
