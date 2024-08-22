<?php

namespace App\Models;

use App\Models\County;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class City extends Model
{
    use HasFactory;

    public $timestamps = false;

    public function county()
    {
        return $this->belongsTo(County::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_cities');
    }
}