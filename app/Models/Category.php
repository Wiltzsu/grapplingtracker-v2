<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    // Defines which fields can be mass-assigned when creating a new category
    protected $fillable = [
        'category_name',
        'category_description',
        'user_id',
    ];

    // Specify that 'category_id' is the primary key instead of default 'id'
    protected $primaryKey = 'category_id';
}
