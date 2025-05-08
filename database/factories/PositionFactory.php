<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Position;
use Illuminate\Database\Eloquent\Factories\Factory;

class PositionFactory extends Factory
{
    protected $model = Position::class;

    public function definition(): array
    {
        return [
            'position_name' => $this->faker->word(),
            'position_description' => $this->faker->sentence(),
            'user_id' => User::factory(),
        ];
    }
}