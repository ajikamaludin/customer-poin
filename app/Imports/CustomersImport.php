<?php

namespace App\Imports;

use App\Models\Customer;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\WithUpsertColumns;
use Maatwebsite\Excel\Concerns\WithUpserts;

class CustomersImport implements ToModel, WithValidation, WithUpserts, WithHeadingRow
{
    use Importable;

    public function model(array $row)
    {
        return new Customer([
            'code' => $row['code'],
            'name' => $row['name'],
            'start_point' => $row['point'],
            'last_point' => $row['point'],
        ]);
    }

    public function rules(): array
    {
        return [
            'code' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'point' => 'required|numeric',
        ];
    }

    public function uniqueBy()
    {
        return 'code';
    }
}
