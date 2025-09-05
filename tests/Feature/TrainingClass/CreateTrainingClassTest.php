<?php

namespace Tests\Feature\TrainingClass;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CreateTrainingClassTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_create_training_class(): void
    {
        $user = User::factory()->create();

        $payload = [
            'instructor' => 'Instructor',
            'location' => 'Gym',
            'class_date' => now()->addDay()->toDateString(),
            'class_description' => 'Nogi class',
            'class_duration' => 56,
            'rounds' => 5,
            'round_duration' => 5,
        ];

        $response = $this->actingAs($user)->post(route('trainingclasses.store'), $payload);

        $this->assertDatabaseHas('training_classes', [
            'instructor' => 'Instructor',
            'user_id' => $user->id,
        ]);
    }

    public function test_requires_class_date_and_class_duration(): void
    {
        $user = \App\Models\User::factory()->create();

        $response = $this
            ->from(route('trainingclasses.create'))
            ->actingAs($user)
            ->post(route('trainingclasses.store'), []);

        $response->assertRedirect(route('trainingclasses.create'));
        $response->assertSessionHasErrors(['class_date', 'class_duration']);
        $this->assertDatabaseCount('training_classes', 0);
    }
}
