<?php

namespace App\Models;

use App\Models\User;
use App\Models\State;
use App\Models\County;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AdvancedLeadSetting extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'motivation', 'type_of_house', 'square_footage', 'year_of_construction', 'repairs_needed', 'ideal_selling_timeframe', 'how_long_you_owned', 'occupancy', 'beds', 'baths', 'mortgage', 'owner_wholesaler', 'listed_with_real_estate_agent'];
    protected $casts = [
        'motivation' => 'array',
        'type_of_house' => 'array',
        'square_footage' => 'array',
        'year_of_construction' => 'array',
        'repairs_needed' => 'array',
        'ideal_selling_timeframe' => 'array',
        'how_long_you_owned' => 'array',
        'occupancy' => 'array',
        'beds' => 'array',
        'baths' => 'array',
        'mortgage' => 'array',
        'owner_wholesaler' => 'array',
        'listed_with_real_estate_agent' => 'array'
    ];

    public function county()
    {
        return $this->belongsTo(County::class, 'county_id');
    }

    public function state()
    {
        return $this->belongsTo(State::class, 'state_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}