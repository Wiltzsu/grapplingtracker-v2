<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Technique Model
 *
 * Represents a grappling technique in the system.
 * Uses Laravel Scout for search functionality.
 */
class Technique extends Model
{
    use Searchable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        // Defines which fields can be mass-assigned when creating a new category
        'user_id',
        'technique_name',
        'technique_description',
        'category_id',
        'class_id',
        'position_id'
    ];

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'technique_id';

    /**
     * Get the category that owns the technique.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id', 'category_id');
    }

    /**
     * Get the position that owns the technique.
     */
    public function position(): BelongsTo
    {
        return $this->belongsTo(Position::class, 'position_id', 'position_id');
    }

    /**
     * Get the training class that owns the technique.
     */
    public function trainingClass(): BelongsTo
    {
        return $this->belongsTo(TrainingClass::class, 'class_id', 'class_id');
    }

    /**
     * Get the indexable data array for the model.
     */
    public function toSearchableArray(): array
    {
        return [
            'user_id' => (int) $this->user_id,
            'technique_name' => $this->technique_name,
            'technique_description' => $this->technique_description,
            'category_name' => $this->category->category_name,
            'position_name' => $this->position->position_name,
            'location' => $this->trainingClass?->location,
        ];
    }

    /**
     * Get the searchable options for the model.
     */
    public function searchableOptions(): array
    {
        return [
            'filterableAttributes' => ['user_id'],
        ];
    }
}
