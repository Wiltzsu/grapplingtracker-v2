<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Note;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run(): void
    {
        // Create or update test user (test@example.com)
        $user = User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
            ]
        );

        // Create notes for test user if they don't have any
        if ($user->notes()->count() === 0) {
            Note::factory()
                ->count(3)
                ->for($user)
                ->create();
        }

        // Create 5 additional users with 2-5 notes each
        User::factory(5)
            ->has(
                Note::factory()
                    ->count(fake()->numberBetween(2, 5))
            )
            ->create();
    }
}
