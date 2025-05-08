<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Category;
use App\Models\Position;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DynamicListTest extends TestCase
{
    use RefreshDatabase;

    public function test_list_example_component_is_displayed(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create(['user_id' => $user->id]);
        $position = Position::factory()->create(['user_id' => $user->id]);

        $response = $this
            ->actingAs($user)
            ->get('/trainingclasses/create');

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('TrainingClasses/CreateTrainingClass')
            ->has('categories')
            ->has('positions')
        );
    }

    public function test_techniques_can_be_added_to_training_class(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create(['user_id' => $user->id]);
        $position = Position::factory()->create(['user_id' => $user->id]);

        $response = $this
            ->actingAs($user)
            ->post('trainingclasses', [
                'instructor' => 'Test instructor',
                'location' => 'Test location',
                'class_date' => '2024-03-20',
                'class_description' => 'Test description',
                'class_duration' => 60,
                'techniques' => [
                    [
                        'technique_name' => 'Test technique',
                        'technique_description' => 'Test description',
                        'category_id' => $category->category_id,
                        'position_id' => $position->position_id,
                    ],
                ],
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect();

        $this->assertDatabaseHas('techniques', [
            'technique_name' => 'Test technique',
            'category_id' => $category->category_id,
            'position_id' => $position->position_id,
        ]);
    }

    public function test_multiple_techniques_can_be_added(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create(['user_id' => $user->id]);
        $position = Position::factory()->create(['user_id' => $user->id]);

        $response = $this
            ->actingAs($user)
            ->post('/trainingclasses', [
                'instructor' => 'Test Instructor',
                'location' => 'Test Location',
                'class_date' => '2024-03-20',
                'class_description' => 'Test Description',
                'class_duration' => 60,
                'techniques' => [
                    [
                        'technique_name' => 'Technique 1',
                        'technique_description' => 'Description 1',
                        'category_id' => $category->category_id,
                        'position_id' => $position->position_id,
                    ],
                    [
                        'technique_name' => 'Technique 2',
                        'technique_description' => 'Description 2',
                        'category_id' => $category->category_id,
                        'position_id' => $position->position_id,
                    ]
                ]
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect();

        $this->assertDatabaseHas('techniques', ['technique_name' => 'Technique 1']);
        $this->assertDatabaseHas('techniques', ['technique_name' => 'Technique 2']);
    }
}