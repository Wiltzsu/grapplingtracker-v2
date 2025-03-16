<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\Position;
use App\Models\Category;

class User extends Authenticatable
{
    /**
 * @use HasFactory<\Database\Factories\UserFactory>
*/
    use HasFactory;
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Get all notes associated with the user.
     *
     * This relationship indicates that a user can have multiple notes,
     * establishing a one-to-many relationship between users and notes.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function notes()
    {
        return $this->hasMany(Note::class);
    }

    /**
     * Define a has many relationship on the user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany<\App\Models\Chirp>
     */
    public function chirps(): HasMany
    {
        return $this->hasMany(Chirp::class);
    }

    public function createDefaultData()
    {
        // Default positions
        $defaultPositions = [
            ['position_name' => 'Mount', 'position_description' => 'Top position sitting on opponent', 'user_id' => $this->id],
            ['position_name' => 'Side Control', 'position_description' => 'Top position perpendicular to opponent', 'user_id' => $this->id],
            ['position_name' => 'Back', 'position_description' => 'Controlling opponent from behind', 'user_id' => $this->id],
            ['position_name' => 'Guard', 'position_description' => 'Bottom position controlling with legs', 'user_id' => $this->id],
        ];

        // Default categories
        $defaultCategories = [
            ['category_name' => 'Submissions', 'category_description' => 'Techniques to finish the fight', 'user_id' => $this->id],
            ['category_name' => 'Sweeps', 'category_description' => 'Techniques to reverse position', 'user_id' => $this->id],
            ['category_name' => 'Escapes', 'category_description' => 'Techniques to escape bad positions', 'user_id' => $this->id],
        ];

        // Create the default positions
        foreach ($defaultPositions as $position) {
            Position::create($position);
        }

        // Create the default categories
        foreach ($defaultCategories as $category) {
            Category::create($category);
        }
    }
}
