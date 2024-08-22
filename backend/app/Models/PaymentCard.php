<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PaymentCard extends Model
{
    use HasFactory;

    protected $fillable = ['user_id','card_number', 'card_holder', 'cvc_code','expiry_date'];

    protected $table = 'payment_cards';

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}