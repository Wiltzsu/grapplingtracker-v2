<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class WelcomeController extends Controller
{
    /**
     * Defines a route that responds to GET requests at the root URL.
     * The Inertia render method connects the backend with the frontend.
     */
    public function index(): Response
    {
        // Tells Inertia to render the component at resources/js/Pages/Welcome.jsx
        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),          // Checks if login route exists
            'canRegister' => Route::has('register'),    // Checks if register route exists
            'laravelVersion' => Application::VERSION,   // Gets Laravel version
            'phpVersion' => PHP_VERSION,                // Gets PHP version
        ]);
    }
}
