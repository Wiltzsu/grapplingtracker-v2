<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class TrainingClassFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'instructor' => fake()->name(),
            'location' => fake()->randomElement(['Main Academy', 'Downtown Branch', 'Competition Center', 'Park Training', 'Community Center']),
            'class_date' => fake()->dateTimeBetween('-24 months', '+1 week'),
            'class_description' => fake()->sentence(),
            'class_duration' => fake()->randomElement([60, 90, 120]),
            'rounds' => fake()->numberBetween(1, 10),
            'round_duration' => fake()->randomElement([3, 5, 6, 7, 8, 10]),
        ];
    }
}