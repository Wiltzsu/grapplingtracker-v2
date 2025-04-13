<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TrainingClass extends Model
{
    use HasFactory;

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

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Relationship that tells a Position can have many Techniques.
    public function techniques(): HasMany
    {
        return $this->hasMany(Technique::class, 'class_id');
    }
}
