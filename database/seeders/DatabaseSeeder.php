<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Chirp;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    private function createTrainingClassesForUser(User $user, int $count = 5): void
    {
        if ($user->trainingClasses()->count() === 0) {
            \App\Models\TrainingClass::factory()
                ->count($count)
                ->for($user)
                ->create();
        }
    }

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

        // Create default positions and categories for test user
        $user->createDefaultData();

        // Create 250 training classes for test user
        $this->createTrainingClassesForUser($user, 250);

        // Create 5 additional users with only default data
        User::factory(5)
            ->create()
            ->each(function ($user) {
                $user->createDefaultData();
                // No training classes created for these users
            });
    }
}
