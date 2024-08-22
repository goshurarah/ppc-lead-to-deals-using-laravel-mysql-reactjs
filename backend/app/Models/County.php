<?php

namespace App\Models;

use App\Models\State;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class County extends Model
{
    use HasFactory;

    public $timestamps = false;

    public function state()
    {
        return $this->belongsTo(State::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_counties');
    }
}