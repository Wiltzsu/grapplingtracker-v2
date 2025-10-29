<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    use HasFactory;

    // Defines which fields can be mass-assigned when creating a new category
    protected $fillable = [
        'category_name',
        'category_description',
        'user_id',
    ];

    // Specify that 'category_id' is the primary key instead of default 'id'
    protected $primaryKey = 'category_id';

    /**
     * Get the techniques that belong to this category
     */
    public function techniques(): HasMany
    {
        return $this->hasMany(Technique::class, 'category_id', 'category_id');
    }
}
