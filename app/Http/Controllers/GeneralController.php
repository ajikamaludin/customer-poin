<?php

namespace App\Http\Controllers;

use App\Models\Customer;

class GeneralController extends Controller
{
    public function index()
    {
        return inertia('Dashboard', [
            'customer_count' => Customer::count()
        ]);
    }

    public function maintance()
    {
        return inertia('Maintance');
    }
}
