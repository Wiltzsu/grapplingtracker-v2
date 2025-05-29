<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class WelcomeController extends Controller
{
    /**
     * Display the welcome page.
     * Renders the welcome view using Inertia.js.
     *
     * @return The rendered welcome page.
     */
    public function index(): Response
    {
        // Tells Inertia to render the component at resources/js/Pages/Welcome.jsx
        return Inertia::render('Welcome', [
            'auth' => [
                'user' => auth()->user(),
            ],
            'canLogin' => Route::has('login'),          // Checks if login route exists
            'canRegister' => Route::has('register'),    // Checks if register route exists
            'laravelVersion' => Application::VERSION,   // Gets Laravel version
            'phpVersion' => PHP_VERSION,                // Gets PHP version
        ]);
    }
}
