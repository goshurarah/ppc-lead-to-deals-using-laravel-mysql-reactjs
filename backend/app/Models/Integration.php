<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Integration extends Model
{
    use HasFactory;
    protected $fillable = ['user_id','status', 'webhook_url', 'http_headers'];
    protected $casts = [
        'http_headers' => 'array'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }


}