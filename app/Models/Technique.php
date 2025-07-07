<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

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
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'category_id');
    }

    /**
     * Get the position that owns the technique.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function position()
    {
        return $this->belongsTo(Position::class, 'position_id', 'position_id');
    }

    /**
     * Get the training class that owns the technique.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function trainingClass()
    {
        return $this->belongsTo(TrainingClass::class, 'class_id', 'class_id');
    }

    /**
     * Get the indexable data array for the model.
     * This method is used by Laravel Scout to determine what data should be indexed.
     *
     * @return array<string, mixed>
     */
    public function toSearchableArray()
    {
        return [
            'user_id' => (int) $this->user_id,
            'technique_name' => $this->technique_name,
            'technique_description' => $this->technique_description,
            'category_name' => $this->category->category_name,
            'position_name' => $this->position->position_name,
            'location' => $this->trainingClass->location,
        ];
    }

    /**
     * Get the searchable options for the model.
     * This method is used by Laravel Scout to configure search settings.
     *
     * @return array<string, array<string>>
     */
    public function searchableOptions()
    {
        return [
            'filterableAttributes' => ['user_id'],
        ];
    }
}
