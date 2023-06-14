<?php

namespace App\Http\Controllers;

use App\Imports\CustomerPointsImport;
use App\Models\Customer;
use App\Models\CustomerPoint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;

class CustomerPointController extends Controller
{
    public function index(Request $request)
    {
        $query = CustomerPoint::with(['customer'])->orderBy('created_at', 'desc');

        if ($request->customer_id != '') {
            $query->where('customer_id', $request->customer_id);
        }

        if ($request->q != '') {
            $query->whereHas('customer', function ($query) use ($request) {
                $query->where('name', 'like', "%{$request->q}%")
                    ->orWhere('code', 'like', "%{$request->q}%");
            });
        }

        return inertia('CustomerPoint/Index', [
            'query' => $query->paginate()
        ]);
    }

    public function create(Request $request)
    {
        $customer = Customer::query()->orderBy('updated_at', 'desc');

        if ($request->q != '') {
            $customer->where('name', 'like', "%{$request->q}%")
                ->orWhere('code', 'like', "%{$request->q}%");
        }

        return inertia('CustomerPoint/Form', [
            'customers' => $customer->paginate(10)
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'items' => 'required|array',
            'items.*.customer_id' => 'required|exists:customers,id',
            'items.*.point' => 'required|numeric',
            'items.*.description' => 'nullable|string'
        ]);

        DB::beginTransaction();
        foreach ($request->items as $item) {
            $customer = Customer::find($item['customer_id']);
            $customer->update([
                'last_point' => $customer->last_point + $item['point']
            ]);
            $customer->points()->create([
                'point' => $item['point'],
                'description' => $item['description']
            ]);
        }

        DB::commit();

        return redirect()->route('customer-point.index')
            ->with('message', ['type' => 'success', 'message' => 'Create item success']);
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|file'
        ]);

        Excel::import(new CustomerPointsImport, $request->file('file'));

        return redirect()->route('customer-point.index')
            ->with('message', ['type' => 'success', 'message' => 'Import Success']);
    }
}
