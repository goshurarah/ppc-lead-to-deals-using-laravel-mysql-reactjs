<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchasedLead extends Model
{
    use HasFactory;

    protected $fillable = ['user_id','status_code', 'message','lead_data'];

    protected $casts = [
        'lead_data' => 'array',
    ];


}
