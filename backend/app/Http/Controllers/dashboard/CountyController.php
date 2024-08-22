<?php

namespace App\Http\Controllers\dashboard;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class CountyController extends Controller
{
    public function index()
    {
        $users = DB::select('SELECT * FROM counties');
        return response()->json($users);
    }
}