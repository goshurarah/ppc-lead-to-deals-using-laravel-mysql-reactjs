<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ThirdPartyLog extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'request_data',
        'response_data',
        'endpoint',
        'third_party_name',
        'api_request_id',
        'status_code'
    ];

    public function setRequestDataAttribute($value)
    {
        $this->attributes['request_data'] = json_encode($value);
    }

    public function setResponseDataAttribute($value)
    {
        $this->attributes['response_data'] = json_encode($value);
    }
}
