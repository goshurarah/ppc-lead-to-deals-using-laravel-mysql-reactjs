<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    use HasFactory;

    protected $fillable= ['seller_id','source','price','email','phone','address', 'city_id', 'county_id', 'state_id', 'asking_price', 'baths', 'beds', 'conversation', 'currently_possessed_by', 'description', 'expiration_time', 'garage', 'how_long_you_owned', 'ideal_selling_timeframe', 'listed_with_real_estate_agent', 'monthly_rental_amount', 'mortgage', 'motivation', 'negotiatiable', 'occupancy', 'owner_wholesaler', 'pictures', 'pool', 'price', 'property_condition', 'repairs_needed', 'square_footage', 'status', 'type_of_house', 'violations', 'year_of_construction', 'zip_code'];

    public function setDescriptionAttribute($value)
    {
        return $this->attributes['description'] = json_encode($value);
    }

    public function getDescriptionAttribute($value)
    {
        return json_decode($value);
    }

    public function getcreatedAtAttribute($value)
    {
        return Carbon::parse($value)->format('d F Y, h:i A');
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function seller()
    {
        return $this->belongsTo(Seller::class);
    }

    public function state()
    {
        return $this->belongsTo(State::class);
    }

    public function county()
    {
        return $this->belongsTo(County::class);
    }

    public function city()
    {
        return $this->belongsTo(City::class);
    }
}
