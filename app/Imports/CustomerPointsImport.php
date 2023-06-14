<?php

namespace App\Imports;

use App\Models\Customer;
use App\Models\CustomerPoint;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class CustomerPointsImport implements ToModel, WithHeadingRow
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        $customer = Customer::where('code', $row['code'])->first();

        if ($customer != null) {
            $customer->update([
                'last_point' => $customer->last_point + $row['point']
            ]);

            return new CustomerPoint([
                'customer_id' => $customer->id,
                'description' => $row['description'],
                'point' => $row['point'],
            ]);
        }
    }
}
