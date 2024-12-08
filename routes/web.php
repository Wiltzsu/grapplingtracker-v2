<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Define the root route '/'
Route::get(
    '/', function () {
        return Inertia::render(
            // Pass data to the Welcome.jsx component
            'Welcome', [
            'canLogin' => Route::has('login'),             // Check if login route exists
            'canRegister' => Route::has('register'),       // Check if register route exists
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            ]
        );
    }
);

// Define the dashboard route '/dashboard'
Route::get(
    '/dashboard', function () {
        return Inertia::render('Dashboard');                // Renders Dashboard.jsx component
    }
)->middleware(['auth', 'verified'])->name('dashboard');     // Requires authenticated and verified user, names route 'dashbord'

// Group of routes that require authentication
Route::middleware('auth')->group(
    function () {
        // Profile routes, all use ProfileController
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    }
);

// Include authentication routes from auth.php
require __DIR__.'/auth.php';
