<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seller extends Model
{
    use HasFactory;

    public $timestamps = false;

    public function sellerPhones()
    {
        return $this->hasMany(SellerPhone::class);
    }

    public function sellerEmails()
    {
        return $this->hasMany(SellerEmail::class);
    }

    public function leads()
    {
        return $this->hasMany(Lead::class);
    }
}
