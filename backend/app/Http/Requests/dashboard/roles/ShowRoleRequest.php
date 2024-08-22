<?php

namespace App\Http\Requests\dashboard\roles;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Auth;

class ShowRoleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation()
    {
        $role_id = $this->route('role');
        $this->merge(['role_id' => $role_id]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'role_id' => 'required|numeric|exists:roles,id'
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        $errorMessage = $validator->errors()->first();
        $response = response()->error($errorMessage, 422);
        $apiRequestId = $this->request->get('api_request_id');
        storeApiResponse($apiRequestId, $response->getContent(), 422, Auth::id());
        throw new HttpResponseException($response);
    }
}
