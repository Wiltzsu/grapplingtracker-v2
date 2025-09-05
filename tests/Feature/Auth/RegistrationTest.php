<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Illuminate\Support\Facades\Hash;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_register_screen_can_be_rendered(): void
    {
        $response = $this->get('/register');

        $response->assertStatus(200);
    }

    public function test_users_can_register_using_the_login_screen(): void
    {
        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => 'test@user.com',
            'password' => 'password',
            'password_confirmation' => 'password'
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect('/verify-email');
    }

    public function test_user_gets_created_with_expected_results() {
        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password'
        ]);

        // Check that the user was created in database with expected attributes
        $this->assertDatabaseHas('users', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'is_oauth_user' => 0,
            'email_verified_at' => null,
        ]);

        // Verify password was hashed
        $user = User::where('email', 'test@example.com')->first();
        $this->assertNotEquals('password', $user->password);
        $this->assertTrue(Hash::check('password', $user->password));
    }


    public function test_redirect_after_register_goes_to_verification_for_non_auth_users() {
        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password'
        ]);

        // Assert user is authenticated
        $this->assertAuthenticated();

        // Assert redirect to email verification page
        $response->assertRedirect('/verify-email');

        // Assert user was created with is_oauth_user = false (default)
        $user = \App\Models\User::where('email', 'test@example.com')->first();
        $this->assertEquals(0, $user->is_oauth_user);
    }


    public function test_duplicate_email_is_rejected() {
        // Create user with an email
        \App\Models\User::factory()->create(['email' => 'test@email.com']);

        // Then try to register another user with the same email
        $response = $this->from('/register')->post('/register', [
            'name' => 'Another User',
            'email' => 'test@email.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $response->assertRedirect('/register');
        $response->assertSessionHasErrors(['email']);
        $this->assertDatabaseCount('users', 1); // Only the first user exists
    }

    /**
     * Send a POST with an empty payload to /register
     * Hits RegisteredUserController@store, which runs validation
     * Because fields are missing, validation fails
     */
    public function test_user_must_enter_valid_fields_when_registering() {
        $response = $this->from('/register')->post('/register', []);
        $response->assertRedirect('/register');
        $response->assertSessionHasErrors(['name', 'email', 'password']);
        $this->assertDatabaseCount('users', 0);
    }
}
