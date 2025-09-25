<?php

/**
 * API Routes Configuration
 *
 * This file contains all the API routes for the Grappling Tracker application.
 * All routes are automatically prefixed with '/api' and use the 'api' middleware group.
 *
 * @category Routes
 * @package  GrapplingTracker
 * @author   William Lönnberg <william.lonnberg@gmail.com>
 * @license  MIT License
 * @link     https://grapplingtracker.com
 */

use App\Http\Controllers\Api\{
    CategoryController,
    ChirpController,
    PositionController,
    TechniqueController,
    TrainingClassController,
    StatsController,
    UserController,
};
use Illuminate\Support\Facades\Route;

/**
 * Public API routes (no authentication required)
 */
Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now(),
        'version' => '1.0.0'
    ]);
});

/**
 * Authenticated API routes
 */
Route::middleware(['auth:sanctum'])->group(function () {

    // User profile routes
    Route::get('/user', [UserController::class, 'show']);
    Route::put('/user', [UserController::class, 'update']);

    // Stats endpoint
    Route::get('/stats', [StatsController::class, 'index']);

    // Resource routes for main entities
    Route::apiResources([
        'categories' => CategoryController::class,
        'positions' => PositionController::class,
        'techniques' => TechniqueController::class,
        'training-classes' => TrainingClassController::class,
        'chirps' => ChirpController::class,
    ]);

    // Additional technique routes
    Route::get('/techniques/search', [TechniqueController::class, 'search']);
    Route::get('/techniques/by-category/{category}', [TechniqueController::class, 'byCategory']);
    Route::get('/techniques/by-position/{position}', [TechniqueController::class, 'byPosition']);

    // Additional training class routes
    Route::get('/training-classes/recent', [TrainingClassController::class, 'recent']);
    Route::get('/training-classes/by-instructor/{instructor}', [TrainingClassController::class, 'byInstructor']);
});
