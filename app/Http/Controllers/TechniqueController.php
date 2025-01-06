<?php

namespace App\Http\Controllers;

use App\Models\Technique;
use App\Models\Category;
use App\Models\Position;
use App\Models\TrainingClass;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TechniqueController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Techniques/CreateTechnique', [
            'categories'       => Category::all(),
            'positions'        => Position::all(),
            'training_classes' => TrainingClass::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate incoming request data
        $validated = $request->validate([
            'technique_name' => [
                'required',
                'string',
                'max:255',
                'regex:/^[\p{L}\p{N}\s\-_]+$/u'  // Letters, numbers, spaces, hyphens, underscores
            ],
            'technique_description' => [
                'required',
                'string',
                'max:255',
                'regex:/^[\p{L}\p{N}\s\-_]+$/u'  // Letters, numbers, spaces, hyphens, underscores
            ],
            'category_id' => [
                'required',
                'integer'
            ],
            'class_id' => [
                'required',
                'integer'
            ],
            'position_id' => [
                'required',
                'integer'
            ],
        ]);

        // Add user_id to the validated data
        $validated['user_id'] = auth()->id();

        // Create the technique
        Technique::create($validated);

        return back()->with('success', true);
    }

    /**
     * Display the specified resource.
     */
    public function show(Technique $technique)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Technique $technique)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Technique $technique)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Technique $technique)
    {
        //
    }
}
