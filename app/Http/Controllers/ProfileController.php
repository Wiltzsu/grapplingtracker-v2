<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     *
     * @param \Illuminate\Http\Request $request The incoming HTTP request
     *
     * @return \Inertia\Response Returns Inertia response with profile edit component
     *
     * @throws \Illuminate\Auth\Access\AuthorizationException If user is not authenticated
     */
    public function edit(Request $request): Response
    {
        $user = $request->user();
        return Inertia::render(
            'Profile/Edit',
            [
                'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
                'status' => session('status'),
                'isOAuthUser' => $user->is_oauth_user,
            ]
        );
    }

    /**
     * Update the user's profile information.
     *
     * @param \App\Http\Requests\ProfileUpdateRequest $request The validated profile update request
     *
     * @return \Illuminate\Http\RedirectResponse Returns the redirect to profile edit page
     *
     * @throws \Illuminate\Validation\ValidationException If validation fails
     * @throws \Illuminate\Auth\Access\AuthorizationException If user is not authenticated
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     *
     * @param \Illuminate\Http\Request $request The incoming HTTP request with password confirmation
     *
     * @return \Illuminate\Http\RedirectResponse Returns redirect to homepage
     *
     * @throws \Illuminate\Auth\Validation\ValidationException If password validation fails
     * @throws \Illuminate\Auth\Access\AuthorizationException If user is not authenticated
     */
    public function destroy(Request $request): RedirectResponse
    {
        $user = $request->user();

        if ($user->is_oauth_user) {
            $request->validate([
                'confirmation' => ['required', 'string', function ($attribute, $value, $fail) {
                    if ($value !== 'DELETE') {
                        $fail('Please type DELETE to confirm.');
                    }
                }],
            ]);
        } else {
            $request->validate([
                'password' => ['required', 'current_password'],
            ]);
        }

        Auth::logout();
        $user->delete();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
