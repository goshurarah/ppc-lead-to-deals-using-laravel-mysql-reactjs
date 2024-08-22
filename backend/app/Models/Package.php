<?php

namespace App\Models;

use App\Models\Subscription;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Package extends Model
{
    use HasFactory;


    protected $fillable = [
        'name',
        'description',
        'detail',
        'price',
    ];

    protected $casts = [
        'description' => 'array',
        'detail' => 'array'
    ];

    // Define a relationship with the Subscription model
    public function subscriptions()
    {
        return $this->hasMany(Subscription::class);
    }
}
