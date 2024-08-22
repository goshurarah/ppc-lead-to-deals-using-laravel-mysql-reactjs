<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('reset-password', function () {
    return view('mails.forgot-password')->with(['name' => 'Asif Masood', 'action_url' => 'https://google.com']);
});

Route::get('email-verification', function () {
    return view('mails.email-verification')->with([
        'first_name' => 'Asif',
        'last_name' => 'Masood',
        'email_verification_url' => '12234567ygccghjkjggggggbgkdbqddoddohjodjnnnh8333'
    ]);
});
