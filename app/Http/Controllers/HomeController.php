<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        return inertia('Home', [
            'app_name' => Setting::where('key', 'app_name')->value('value'),
        ]);
    }

    public function check(Request $request)
    {
        $request->validate([
            'customer_code' => 'required|string|exists:customers,code'
        ]);
    }
}
