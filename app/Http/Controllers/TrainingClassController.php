<?php

namespace App\Http\Controllers;

use App\Models\TrainingClass;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Database\QueryException;

class TrainingClassController extends Controller
{
    /**
     * Display a listing of training classes.
     *
     * - 'training_classes' is a prop that is passed to the TrainingClass Index component
     * - latest() orders the results by creation date
     * - get() executes the query and retrieves all records
     */
    public function index()
    {
        return Inertia::render('TrainingClasses/Index', [
            'training_classes' => TrainingClass::latest()->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('TrainingClasses/CreateTrainingClass');
    }

    /**
     * Store a newly created training class.
     *
     * - Occurs when a user submits the form for creating a training class
     * - Validates the data
     * - Creates a new TrainingClass model instance
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
     *
     * 'training_class' is the prop passed to EditTrainingClass.jsx
     */
    public function edit(TrainingClass $trainingClass)
    {
        return Inertia::render('TrainingClasses/EditTrainingClass', [
            'training_class' => $trainingClass
        ]);
    }

    /**
     * Update the specified training class.
     */
    public function update(Request $request, TrainingClass $trainingClass)
    {
        // Validate the request
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

        // Update the database record
        $trainingClass->update($validated);

        return back()->with('success', true);
    }

    /**
     * Remove the specified training class.
     */
    public function destroy(TrainingClass $trainingClass)
    {
        try {
            $trainingClass->delete();
            return redirect(route('trainingclasses.index'));
        } catch (QueryException $e) {
            return back()->withErrors([
                'error' => 'An unexpected error occurred while deleting the class.'
            ]);
        }
    }
}
