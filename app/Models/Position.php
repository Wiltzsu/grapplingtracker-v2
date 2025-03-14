<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Position extends Model
{
    protected $fillable = [
        'position_name',
        'position_description',
        'user_id',
    ];

    protected $primaryKey = 'position_id';

    // Relationship that tells a Position can have many Techniques.
    public function techniques(): HasMany
    {
        return $this->hasMany(Technique::class, 'position_id');
    }
}
