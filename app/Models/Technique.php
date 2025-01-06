<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Technique extends Model
{
    protected $fillable = [
        // Defines which fields can be mass-assigned when creating a new category
        'user_id',
        'technique_name',
        'technique_description',
        'category_id',
        'class_id',
        'position_id'
    ];

    // Specify that 'technique_id' is the primary key instead of default 'id'
    protected $primaryKey = 'technique_id';
}
