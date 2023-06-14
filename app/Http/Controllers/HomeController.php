<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class HomeController extends Controller
{
    public function index()
    {
        return inertia('Home', [
            'app_name' => Setting::where('key', 'app_name')->value('value'),
            'customer' => null,
            'point' => 0,
        ]);
    }

    public function check(Request $request)
    {
        $request->validate([
            'customer_code' => 'required|string|exists:customers,code'
        ]);

        $name = "";
        $customer = Customer::where('code', $request->customer_code)->first();
        $names = explode(' ', $customer->name);
        foreach ($names as $n) {
            $name .= Str::mask($n, '*', 3) . ' ';
        }
        return inertia('Home', [
            'app_name' => Setting::where('key', 'app_name')->value('value'),
            'customer' => $name,
            'point' => $customer->last_point,
            'names' => $names
        ]);
    }
}
