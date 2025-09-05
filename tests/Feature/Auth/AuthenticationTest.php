<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Illuminate\Support\Facades\Hash;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_login_screen_can_be_rendered(): void
    {
        $response = $this->get('/login');

        $response->assertStatus(200);
    }

    public function test_users_can_authenticate_using_the_login_screen(): void
    {
        $user = User::factory()->create();

        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect('/dashboard');
    }

    public function test_user_can_update_their_password(): void
    {
        // Default password is set as 'password' in UserFactory.
        $user = \App\Models\User::factory()->create();

        $this->actingAs($user);

        $response = $this->from('/profile')->put(route('password.update'), [
            'current_password' => 'password',
            'password' => 'newpassword',
            'password_confirmation' => 'newpassword',
        ]);

        $response->assertRedirect('/profile');
        $response->assertSessionHasNoErrors();

        $this->assertTrue(Hash::check('newpassword', $user->fresh()->password));
    }

    public function test_user_cannot_update_password_with_wrong_current_password(): void
    {
        // Default password is set as 'password' in UserFactory, that's why 'notcorrect' gives error.
        $user = \App\Models\User::factory()->create();

        $this->actingAs($user);

        $response = $this->from('/profile')->put(route('password.update'), [
            'current_password' => 'notcorrect',
            'password' => 'newpassword',
            'password_confirmation' => 'newpassword',
        ]);

        $response->assertRedirect('/profile');
        $response->assertSessionHasErrors('current_password');

        $this->assertTrue(Hash::check('password', $user->fresh()->password));
    }

    public function test_valid_credentials_authenticate_and_redirect(): void
    {
        // Create user but dont authenticate yet
        $user = \App\Models\User::factory()->create();

        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);

        // Test that user is now authenticated
        $this->assertAuthenticated();

        // Test redirect to the dashboard
        $response->assertRedirect('/dashboard');
    }

    public function test_invalid_email_does_not_authenticate(): void
    {
        $user = \App\Models\User::factory()->create();

        $response = $this->post('/login', [
            'email' => 'wrong@email.com',
            'password' => 'password',
        ]);

        // Test if not authenticated
        $this->assertGuest();

        $response->assertSessionHasErrors('email');
    }

    public function test_invalid_credentials_do_not_authenticate(): void
    {
        $user = \App\Models\User::factory()->create();

        $response = $this->post('/login', [
            'email' => 'wrong@email.com',
            'password' => 'wrongpassword',
        ]);

        // Test if not authenticated
        $this->assertGuest();

        $response->assertSessionHasErrors('email');
    }

    public function test_login_is_throttled_if_too_many_attempts()
    {
        $user = \App\Models\User::factory()->create();

        // Make multiple failed login attempts (Laravel's default is 5 attempts)
        for ($i = 0; $i < 5; $i++) {
            $response = $this->post('/login', [
                'email' => $user->email,
                'password' => 'wrongpassword',
            ]);
        }

        // The 6th attempt should be throttled
        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'wrongpassword',
        ]);

        // Should redirect back to login page (302)
        $response->assertStatus(302);

        // Should have throttling error
        $response->assertSessionHasErrors('email');

        // Should contain the throttling message
        $response->assertSessionHasErrors(['email' => 'Too many login attempts. Please try again in 59 seconds.']);
    }
}
