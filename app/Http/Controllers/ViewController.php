<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Category;
use App\Models\TrainingClass;
use App\Models\Technique;
use App\Models\Position;
use Illuminate\Support\Carbon;

class ViewController extends Controller
{
    /**
     * Display the view items page.
     *
     * @return \Inertia\Response Returns Inertia response with View component
     */
    public function index(): Response
    {
        $stats = [
            'categories' => Category::where('user_id', auth()->id())->count(),
            'training_classes' => TrainingClass::where('user_id', auth()->id())->count(),
            'techniques' => Technique::where('user_id', auth()->id())->count(),
            'positions' => Position::where('user_id', auth()->id())->count(),
        ];

        $recentActivity = [
            'categories' => Category::where('user_id', auth()->id())
                ->latest()
                ->take(3)
                ->get(['category_name', 'created_at']),
            'training_classes' => TrainingClass::where('user_id', auth()->id())
                ->latest()
                ->take(3)
                ->get(['instructor', 'created_at']),
            'techniques' => Technique::where('user_id', auth()->id())
                ->latest()
                ->take(3)
                ->get(['technique_name', 'created_at']),
            'positions' => Position::where('user_id', auth()->id())
                ->latest()
                ->take(3)
                ->get(['position_name', 'created_at']),
        ];

        return Inertia::render('View', [
            'stats' => $stats,
            'recentActivity' => $recentActivity
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
