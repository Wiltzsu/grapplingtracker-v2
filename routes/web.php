<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

<<<<<<< HEAD
Route::get(
    '/', function () {
        return Inertia::render(
            'Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
=======
// Define the root route '/'
Route::get(
    '/', function () {
        return Inertia::render(
            // Pass data to the Welcome.jsx component
            'Welcome', [
            'canLogin' => Route::has('login'),             // Check if login route exists
            'canRegister' => Route::has('register'),       // Check if register route exists
>>>>>>> 0647f5df0af276315ebd63588fde73c2214aa67b
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            ]
        );
    }
);

<<<<<<< HEAD
Route::get(
    '/dashboard', function () {
        return Inertia::render('Dashboard');
    }
)->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(
    function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
        Route::get(
            '/add', function () {
                return Inertia::render('Add');
            }
        )->name('add');
        Route::get(
            '/view', function () {
                return Inertia::render('View');
            }
        )->name('view');
        Route::get(
            '/stats', function () {
                return Inertia::render('Stats');
            }
        )->name('stats');
=======
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
>>>>>>> 0647f5df0af276315ebd63588fde73c2214aa67b
    }
);

// Include authentication routes from auth.php
require __DIR__.'/auth.php';
