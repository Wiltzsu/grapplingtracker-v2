<?php

/**
 * Web Routes Configuration
 *
 * This file contains all the web routes for the Grappling Tracker application.
 * It defines both public and authenticated routes using Laravel's routing system
 * and Inertia.js for server-side rendering.
 *
 * @category Routes
 * @package  GrapplingTracker
 * @author   William Lönnberg <william.lonnberg@gmail.com>
 * @license  MIT License
 * @link     https://grapplingtracker.com
 */

use App\Http\Controllers\{
    CategoryController,
    ChirpController,
    DashboardController,
    LegalController,
    PositionController,
    ProfileController,
    StatsController,
    TechniqueController,
    TrainingClassController,
    ViewController,
    WelcomeController,
};
use Illuminate\Support\Facades\Route;

/**
 * Public routes.
 */
Route::get('/', [WelcomeController::class, 'index'])->name('welcome');
Route::get('/policy', [LegalController::class, 'Policy'])->name('policy');
Route::get('/terms-of-service', [LegalController::class, 'termsOfService'])->name('terms-of-service');

// Authenticated routes
Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard, Add, View, Stats routes
    Route::get('/view', [ViewController::class, 'index'])->name('view');
    Route::get('/stats', [StatsController::class, 'index'])->name('stats');
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Profile routes
    Route::controller(ProfileController::class)->group(function () {
        Route::get('/profile', 'edit')->name('profile.edit');
        Route::patch('/profile', 'update')->name('profile.update');
        Route::delete('/profile', 'destroy')->name('profile.destroy');
    });

    // Resource routes
    Route::resources([
        'categories' => CategoryController::class,
        'positions' => PositionController::class,
        'techniques' => TechniqueController::class,
        'trainingclasses' => TrainingClassController::class,
        'chirps' => ChirpController::class,
    ], ['only' => ['index', 'create', 'store', 'edit', 'update', 'destroy']]);
});

require __DIR__ . '/auth.php';
