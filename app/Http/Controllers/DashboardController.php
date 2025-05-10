<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\TrainingClass;

class DashboardController extends Controller
{
    /**
     * Display the dashboard page.
     *
     * @return \Inertia\Response Returns Inertia response with Stats component
     */
    public function index(): Response
    {
        return Inertia::render('Dashboard', [
            'recent_classes' => TrainingClass::where('user_id', auth()->id())
                ->with('techniques')
                ->orderBy('class_date', 'desc')
                ->take(5)
                ->get()
        ]);
    }

    /**
     * Store a newly created entry in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
    }
}
