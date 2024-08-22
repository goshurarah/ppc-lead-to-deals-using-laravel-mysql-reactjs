<?php

namespace App\Http\Requests\dashboard\permissions;

use App\Rules\HasPermissions;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Auth;

class AssignPermissionsToRoleRequest extends FormRequest
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
        $role_id = $this->request->get('role_id');
        return [
            'role_id' => 'required|integer|exists:roles,id',
            'permission_ids' => ['required', 'array', new HasPermissions($role_id)],
            'permission_ids.*' => 'numeric|exists:permissions,id'
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
