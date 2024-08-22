<?php

namespace App\Rules;

use App\Models\User;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class HasRoles implements ValidationRule
{
    protected $user_id;

    public function __construct($user_id)
    {
        $this->user_id = $user_id;
    }

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $user = User::find($this->user_id);
        $user_role_ids = $user->roles->pluck('id')->toArray();
        $matching_roles = array_intersect($value, $user_role_ids);
        if (!empty($matching_roles)) {
            $fail('Some roles are already assigned to this user!');
        }
    }
}
