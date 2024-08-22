<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Spatie\Permission\Models\Role;

class HasPermissions implements ValidationRule
{
    protected $role_id;

    public function __construct($role_id)
    {
        $this->role_id = $role_id;
    }

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $role = Role::find($this->role_id);
        $role_permission_ids = $role->permissions->pluck('id')->toArray();
        $matching_permissions = array_intersect($value, $role_permission_ids);
        if (!empty($matching_permissions)) {
            $fail('Some permissions are already assigned to this role!');
        }
    }
}
