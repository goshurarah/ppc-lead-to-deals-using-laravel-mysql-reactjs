<?php

namespace App\Models;

use App\Models\State;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AdvancedLeadSettingStateCounties extends Model
{
    use HasFactory;

    protected $table = 'advanced_lead_settings_state_counties';

    protected $fillable = [
        'user_id',
        'state_id',
        'counties_ids'
    ];

    protected $casts = [
        'counties_ids' => 'array'
    ];

    public function state()
    {
        return $this->belongsTo(State::class, 'state_id');
    }
}