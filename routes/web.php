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
    AddController,
    CategoryController,
    ChirpController,
    DashboardController,
    PositionController,
    ProfileController,
    StatsController,
    TechniqueController,
    TrainingClassController,
    ViewController,
    WelcomeController,
    LegalController,
};
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Log;

/**
 * Public routes.
 */
Route::get('/', [WelcomeController::class, 'index'])->name('welcome');
Route::get('/policy', [LegalController::class, 'Policy'])->name('policy');
Route::get('/terms-of-service', [LegalController::class, 'TermsOfService'])->name('terms-of-service');

// All authenticated routes
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

    // Instead of using Route::resource, let's explicitly define the destroy route
    // Route::delete('/trainingclasses/{trainingclass}', [TrainingClassController::class, 'destroy'])
    //     ->name('trainingclasses.destroy');

    // // Keep other resource routes
    // Route::resource('trainingclasses', TrainingClassController::class);

    // Add this temporary debug route to verify the route definition
    // Route::get('/debug/training-class-route', function() {
    //     $route = Route::getRoutes()->getByName('trainingclasses.destroy');
    //     Log::info('Training class destroy route:', [
    //         'uri' => $route->uri,
    //         'parameters' => $route->parameterNames,
    //         'methods' => $route->methods
    //     ]);
    // });

    // Add this inside the authenticated routes group
    Route::post('/log-error', function (\Illuminate\Http\Request $request) {
        \Illuminate\Support\Facades\Log::info('Frontend Error:', [
            'errors' => $request->all(),
            'url' => $request->header('referer'),
            'user' => auth()->user()?->id,
            'timestamp' => now()->toIso8601String()
        ]);
        return response()->json(['status' => 'logged']);
    })->name('log.error');
});

require __DIR__ . '/auth.php';
