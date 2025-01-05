<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Position extends Model
{
    protected $fillable = [
        'position_name',
        'position_description',
    ];

    protected $primaryKey = 'position_id';
}
