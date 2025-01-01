<?php
/**
 * This file contains the Note model.
 *
 * PHP version 8.4.1
 *
 * @category Models
 * @package  App\Models
 * @author   William Lönnberg <william.lonnberg@gmail.com>
 * @license  MIT License
 * @link     https://grapplingtracker.com
 */
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * The Note model.
 *
 * @category Models
 * @package  App\Models
 * @author   William Lönnberg <william.lonnberg@mail.com>
 * @license  MIT License
 * @link     https://grapplingtracker.com
 */
class Note extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'quick_notes';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'user_id',
        'content'
    ];

    /**
     * Validate quick note content.
     *
     * @param string $content Content
     *
     * @return array
     */
    public static function validateContent($content)
    {
        $errors = [];

        if (empty($content)) {
            $errors['content'] = 'Please insert something.';
        } else if (strlen($content) > 500) {
            $errors['content'] = 'Content can be max. 500 characters.';
        }

        return $errors;
    }

    /**
     * Get the user that owns the note.
     *
     * This relationship indicates that each note belongs to a single user,
     * establishing the inverse of the one-to-many relationship.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
