<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TrainingClass extends Model
{
    protected $fillable = [
        'user_id',
        'instructor',
        'location',
        'class_date',
        'class_description',
        'class_duration',
        'rounds',
        'round_duration'
    ];

    protected $primaryKey = 'class_id';
}
