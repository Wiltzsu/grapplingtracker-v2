<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Scout\Searchable;

class TrainingClass extends Model
{
    use HasFactory, Searchable;

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

    public function techniques(): HasMany
    {
        return $this->hasMany(Technique::class, 'class_id');
    }

    public function toSearchableArray(): array
    {
        return [
            'user_id' => (int) $this->user_id,
            'instructor' => $this->instructor,
            'location' => $this->location,
            'class_date' => $this->class_date,
            'class_description' => $this->class_description,
            'techniques' => $this->techniques->map(function ($technique) {
                return [
                    'name' => $technique->technique_name,
                    'description' => $technique->technique_description,
                ];
            })->toArray(),
        ];
    }

    public function searchableOptions(): array
    {
        return [
            'filterableAttributes' => ['user_id'],
        ];
    }
}
