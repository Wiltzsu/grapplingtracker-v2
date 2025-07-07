<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\Position;
use App\Models\Category;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Traits\ConditionallyVerifiesEmail;

class User extends Authenticatable implements MustVerifyEmail
{
    /**
 * @use HasFactory<\Database\Factories\UserFactory>
*/
    use HasFactory;
    use Notifiable;
    use ConditionallyVerifiesEmail;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'is_oauth_user',
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

    public function trainingClasses(): HasMany
{
    return $this->hasMany(TrainingClass::class);
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
            ['position_name' => 'Full Mount', 'position_description' => "The top grappler sits on the opponent's chest, controlling them with their weight.", 'user_id' => $this->id],
            ['position_name' => 'Side Control', 'position_description' => "The top grappler pins the opponent to the ground from the side of their torso.", 'user_id' => $this->id],
            ['position_name' => 'Closed Guard', 'position_description' => "The bottom grappler has their legs wrapped around the opponent's waist with ankles locked.", 'user_id' => $this->id],
            ['position_name' => 'Back Control', 'position_description' => "The grappler controls their opponent from behind, with hooks inserted using their feet or legs.", 'user_id' => $this->id],
            ['position_name' => 'Open Guard', 'position_description' => "The bottom grappler uses their legs to control the opponent without locking the ankles.", 'user_id' => $this->id],
            ['position_name' => 'Half Guard', 'position_description' => "The bottom grappler controls one of the opponent's legs between their own legs.", 'user_id' => $this->id],
            ['position_name' => 'Butterfly Guard', 'position_description' => "Both of the bottom grappler's feet are placed between the opponent's legs.", 'user_id' => $this->id],
            ['position_name' => 'North-South', 'position_description' => "The top grappler controls the opponent with their body aligned perpendicular to the opponent's, over their chest area.", 'user_id' => $this->id],
            ['position_name' => 'Standing', 'position_description' => "Techniques applied from a standing position, often involving throws or takedowns.", 'user_id' => $this->id],
            ['position_name' => '50-50', 'position_description' => "Grapplers are seated facing each other with their legs entangled, creating a neutral position. Each practitioner has one leg inside and one leg outside of the opponent's legs, offering mutual control over each other's movement", 'user_id' => $this->id],
        ];

        // Default categories
        $defaultCategories = [
            ['category_name' => 'Submissions', 'category_description' => 'Techniques that force the opponent to submit due to a choke or joint lock, including arm bars, chokes, leg locks, etc.', 'user_id' => $this->id],
            ['category_name' => 'Sweeps', 'category_description' => 'Movements that reverse positions, often moving from a bottom position to a top position.', 'user_id' => $this->id],
            ['category_name' => 'Escapes', 'category_description' => 'Techniques used to escape from a disadvantaged position, such as escaping from mount or guard.', 'user_id' => $this->id],
            ['category_name' => 'Control', 'category_description' => 'Techniques focused on maintaining and controlling a position to set up submissions or strikes.', 'user_id' => $this->id],
            ['category_name' => 'Takedowns', 'category_description' => 'Techniques used to bring an opponent from standing to the ground, such as single leg, double leg takedowns, or judo throws.', 'user_id' => $this->id],
            ['category_name' => 'Backtake', 'category_description' => 'Techniques for taking the opponent\'s back, including entries, control methods, and finishing submissions from back control.', 'user_id' => $this->id],
            ['category_name' => 'Entries', 'category_description' => 'Techniques and movements used to enter into various positions or submissions, such as guard passes, takedowns, or submission setups.', 'user_id' => $this->id],
            ['category_name' => 'Passing', 'category_description' => 'Techniques used to pass an opponent\'s guard, moving from a neutral or disadvantaged position to a more dominant position like side control or mount.', 'user_id' => $this->id],
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

    public function isOAuthUser(): bool
    {
        // OAuth users have their password set to a random string during creation
        return strlen($this->password) === 60 &&
               $this->created_at !== null;
    }
}
