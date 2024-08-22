<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\County;
use App\Models\Ticket;
use App\Models\Integration;
use App\Models\PaymentCard;
use App\Models\RequestCount;
use App\Models\Subscription;
use App\Models\PurchasedLead;
use Laravel\Passport\HasApiTokens;
use Spatie\Permission\Models\Role;
use App\Models\AdvancedLeadSetting;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Notifications\Notifiable;
use App\Models\AdvancedLeadSettingStateCounties;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'password_confirm'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function setEmailAttribute($value)
    {
        $this->attributes['email'] = strtolower($value);
    }

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Hash::make($value);
    }

     public function setPasswordConfirmAttribute($value)
    {
        $this->attributes['password_confirm'] = Hash::make($value);
    }

    public function businessTypes()
    {
        return $this->belongsToMany(BusinessType::class, 'user_business_types');
    }

    public function states()
    {
        return $this->belongsToMany(State::class, 'user_states');
    }

    public function counties()
    {
        return $this->belongsToMany(County::class, 'user_counties');
    }

    public function cities()
    {
        return $this->belongsToMany(City::class, 'user_cities');
    }



    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function subscription()
    {
        return $this->hasOne(Subscription::class);
    }

    public function integration()
    {
        return $this->hasOne(Integration::class);
    }

    public function purchasedLeads()
    {
        return $this->hasMany(PurchasedLead::class);
    }

    public function paymentCards()
    {
        return $this->hasMany(PaymentCard::class);
    }

    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }
    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function requestCount()
    {
        return $this->hasOne(RequestCount::class);
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    public function advancedLeadSettings()
    {
        return $this->hasOne(AdvancedLeadSetting::class);
    }

    public function advancedLeadSettingsStateCounties()
    {
        return $this->hasMany(AdvancedLeadSettingStateCounties::class);
    }

    public function savedFilters()
    {
        return $this->hasMany(SavedFilter::class);
    }

}