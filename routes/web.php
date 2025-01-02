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
 *
 * @see \App\Http\Controllers\ProfileController
 * @see \Inertia\Inertia
 */

use App\Http\Controllers\ChirpController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\AddController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/**
 * Defines a route that responds to GET requests at the root URL.
 * The Inertia render method connects the backend with the frontend.
 */
Route::get('/', [WelcomeController::class, 'index']);

Route::get(
    '/dashboard', function () {
        return Inertia::render('Dashboard');
    }
)->middleware(['auth', 'verified'])->name('dashboard');

/**
 * Wraps all routes inside the 'auth' middleware, meaning all users must be logged in
 * to access any of these routes. If not logged in, they will be redirected to the
 * login page.
 */
Route::middleware('auth')->group(
    function () {
        /**
         * Profile routes.
         *
         * Uses ProfileController to handle edits, updates and deletes of a profile.
         */
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

        /**
         * Add new item route.
         *
         * Uses AddController to render the page.
         */
        Route::get('/add', [AddController::class, 'index'])->name('add');

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
        Route::get(
            '/categories/create', function () {
                return Inertia::render('Categories/Create');
            }
        )->name('categories.create');
    }
);

Route::resource('chirps', ChirpController::class)
    ->only(['index', 'store', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);

Route::resource('categories', CategoryController::class)
    ->only(['index', 'store', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);

// Include authentication routes from auth.php
require __DIR__.'/auth.php';
