<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class GoogleController extends Controller
{
    /**
     * Initiates the Google OAuth authentication flow
     *
     * First step in the OAuth flow. Method is called when user clicks "Login with Google".
     * Socialite is Laravel's facade for handling OAuth authentication.
     * driver('google') specifies we are using Google's OAuth service.
     * redirect() initiates the OAuth flow by redirecting to Google's login page.
     *
     * @return Illuminate\Http\RedirectResponse
     * @throws \Laravel\Socialite\Two\InvalidStateException when OAuth state validation fails.
     */
    public function redirect(): RedirectResponse
    {
        return Socialite::driver('google')->redirect();
    }

    /**
     * Handles the OAuth callback from Google and creates/updates the user.
     *
     * This method processes the callback after successful Google authentication:
     * 1. Retrieves the authenticated Google user data via Socialite
     * 2. Creates or updates user in database using email as unique identifier
     * 3. Sets up default data for new users
     * 4. Establishes authenticated session
     *
     * @see https://laravel.com/docs/10.x/socialite#handling-callback
     * @see https://developers.google.com/identity/protocols/oauth2
     * @see https://laravel.com/docs/10.x/authentication#authenticating-users
     *
     * @return \Illuminate\Http\RedirectResponse Redirects to dashboard on success, login on failure
     * @throws \Laravel\Socialite\Two\InvalidStateException When OAuth state validation fails
     */
    public function callback(): RedirectResponse
    {
        try {
            $googleUser = Socialite::driver('google')->user();

            $user = User::updateOrCreate(
                ['email' => $googleUser->email],
                [
                    'name' => $googleUser->name,
                    'password' => Hash::make(Str::random(24)),
                    'is_oauth_user' => true,
                ]
            );

            // Create default data for new users
            if ($user->wasRecentlyCreated) {
                $user->createDefaultData();
            }

            Auth::login($user);

            return redirect()->intended(route('dashboard', absolute: false));
        } catch (\Exception $e) {
            \Log::error( $e->getMessage(), [
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString()
            ]);

            return redirect()->route('login')->withErrors([
                'email' => $e->getMessage(),
            ]);
        }
    }
}