<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\CustomerPoint;
use Illuminate\Support\Facades\DB;

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

    public function reset()
    {
        DB::beginTransaction();
        CustomerPoint::truncate();
        Customer::truncate();
        DB::commit();


        return redirect()->route('setting.index')
            ->with('message', ['type' => 'success', 'message' => 'All data has been reset']);
    }
}
