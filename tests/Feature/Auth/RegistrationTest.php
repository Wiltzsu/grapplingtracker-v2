<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Laravel\Socialite\Facades\Socialite;
use Mockery;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_registration_screen_can_be_rendered(): void
    {
        $response = $this->get('/register');

        $response->assertStatus(200);
    }

    public function test_new_users_can_register(): void
    {
        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(route('verification.notice', absolute: false));
    }

    public function test_oauth_users_can_register(): void
    {
        $googleUser = (object)[
            'name' => 'Test User',
            'email' => 'test@example.com',
        ];

        // Mock the Socialite facade
        Socialite::shouldReceive('driver')
            ->with('google')
            ->andReturn(Mockery::mock([
                'user' => $googleUser
            ]));

        $response = $this->get('/auth/google/callback');

        $this->assertAuthenticated();
        $response->assertRedirect(route('dashboard', absolute: false));

        // Assert user was created with correct attributes
        $this->assertDatabaseHas('users', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'is_oauth_user' => true,
        ]);
    }
}
