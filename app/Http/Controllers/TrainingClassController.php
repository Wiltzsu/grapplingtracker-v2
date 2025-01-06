<?php

namespace App\Http\Controllers;

use App\Models\TrainingClass;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TrainingClassController extends Controller
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
        return Inertia::render('TrainingClasses/CreateTrainingClass');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the incoming request data
        $validated = $request->validate([
            'instructor' => [
                'nullable',
                'string',
                'max:255',
                'regex:/^[\p{L}\p{N}\s\-_]+$/u'  // Letters, numbers, spaces, hyphens, underscores
            ],
            'location' => [
                'required',
                'string',
                'max:255',
                'regex:/^[\p{L}\p{N}\s\-_]+$/u'
            ],
            'class_date' => [
                'required',
                'date'
            ],
            'class_description' => [
                'nullable',
                'string',
                'max:255',
                'regex:/^[\p{L}\p{N}\s\-_]+$/u'
            ],
            'class_duration' => [
                'required',
                'integer',
                'min:1'
            ],
            'rounds' => [
                'nullable',
                'integer',
                'min:1'
            ],
        ]);

        // Add user_id to the validated data
        $validated['user_id'] = auth()->id();

        // Create the training class
        TrainingClass::create($validated);

        return back()->with('success', true);
    }

    /**
     * Display the specified resource.
     */
    public function show(TrainingClass $trainingClass)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TrainingClass $trainingClass)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TrainingClass $trainingClass)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TrainingClass $trainingClass)
    {
        //
    }
}
