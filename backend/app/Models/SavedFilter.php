<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SavedFilter extends Model
{
    use HasFactory;



    protected $fillable = ['user_id', 'filter_name', 'filter_data'];

    protected $casts = [
        'filter_data' => 'array',
    ];


    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
