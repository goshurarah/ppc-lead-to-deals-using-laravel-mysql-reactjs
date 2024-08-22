<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Ticket extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'subject','status','solved','last_message', 'product_category', 'request_details', 'file'];
    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function getFileUrlAttribute()
{
    if ($this->attributes['file']) {
        return asset('uploads/tickets/user_id/' . $this->user_id . '/' . $this->attributes['file']);
    }

    return null;
}

}