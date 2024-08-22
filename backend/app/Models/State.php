<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class State extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = ['name', 'code', 'numeric_code'];

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_states');
    }
}
