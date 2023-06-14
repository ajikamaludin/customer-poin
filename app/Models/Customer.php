<?php

namespace App\Models;


class Customer extends Model
{
    protected $fillable = [
        'name',
        'code',
        'start_point',
        'last_point',
    ];
}
