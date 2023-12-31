<?php

namespace App\Http\Controllers;

use App\Imports\CustomersImport;
use App\Models\Customer;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class CustomerController extends Controller
{
    public function index(Request $request)
    {
        $query = Customer::query();

        if ($request->q) {
            $query->where('name', 'like', "%{$request->q}%")
                ->orWhere('code', 'like', "%{$request->q}%");
        }

        $query->orderBy('updated_at', 'desc');

        return inertia('Customer/Index', [
            'query' => $query->paginate(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'code' => 'required|string|max:255|unique:customers,code',
            'name' => 'required|string|max:255',
            'point' => 'required|numeric',
        ]);

        Customer::create([
            'code' => $request->code,
            'name' => $request->name,
            'start_point' => $request->point,
            'last_point' => $request->point,
        ]);

        return redirect()->route('customer.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed saved']);
    }

    public function update(Request $request, Customer $customer)
    {
        $request->validate([
            'code' => 'required|string|max:255|unique:customers,code,' . $customer->id,
            'name' => 'required|string|max:255',
            'point' => 'required|numeric',
        ]);

        $customer->update([
            'code' => $request->code,
            'name' => $request->name,
            'last_point' => $request->point,
        ]);

        return redirect()->route('customer.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed updated']);
    }

    public function destroy(Customer $customer)
    {
        $customer->delete();

        return redirect()->route('customer.index')
            ->with('message', ['type' => 'success', 'message' => 'Item has beed deleted']);
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|file'
        ]);

        Excel::import(new CustomersImport, $request->file('file'));

        return redirect()->route('customer.index')
            ->with('message', ['type' => 'success', 'message' => 'Import Success']);
    }
}
