<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

class CategoryFactory extends Factory
{
    protected $model = Category::class;

    public function definition(): array
    {
        return [
            'category_name' => $this->faker->word(),
            'category_description' => $this->faker->sentence(),
            'user_id' => User::factory(),
        ];
    }
}