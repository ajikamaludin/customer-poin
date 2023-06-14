<?php

namespace App\Models;

class CustomerPoint extends Model
{
    protected $fillable = [
        'customer_id',
        'description',
        'point',
    ];
}
