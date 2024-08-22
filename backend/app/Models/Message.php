<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'message', 'ticket_id', 'sender', 'file'];

    protected $casts = [
        'sender' => 'json',
    ];





    public function ticket()
    {
        return $this->belongsTo(Ticket::class);
    }



    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getFileUrlAttribute()
    {
        if ($this->attributes['file']) {
            return asset('uploads/messages/ticket_id/' . $this->ticket_id . '/' . $this->attributes['file']);
        }
    
        return null;
    }
    
}