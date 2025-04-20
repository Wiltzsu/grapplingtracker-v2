<?php

namespace App\Http\Controllers;

use App\Models\TrainingClass;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Log;

class TrainingClassController extends Controller
{
    /**
     * Display a listing of training classes.
     *
     * - 'training_classes' is a prop that is passed to the TrainingClass Index component
     * - 'where' gets only the classes belonging to the currently logged in user id
     * - latest() orders the results by creation date
     * - get() executes the query and retrieves all records
     */
    public function index()
    {
        return Inertia::render('TrainingClasses/Index', [
            'training_classes' => TrainingClass::where('user_id', auth()->id())
                ->latest()
                ->get()
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
            ],
            'location' => [
                'nullable',
                'string',
                'max:255',
            ],
            'class_date' => [
                'required',
                'date'
            ],
            'class_description' => [
                'nullable',
                'string',
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
            'round_duration' => [
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
    public function edit(TrainingClass $trainingclass)
    {
        \Log::info('Edit method called', [
            'training_class' => $trainingclass->toArray()
        ]);

        return Inertia::render('TrainingClasses/EditTrainingClass', [
            'training_class' => $trainingclass
        ]);
    }

    /**
     * Update the specified training class.
     */
    public function update(Request $request, TrainingClass $trainingclass)
    {
        // Validate the request
        $validated = $request->validate([
            'instructor' => [
                'nullable',
                'string',
                'max:255',
            ],
            'location' => [
                'required',
                'string',
                'max:255',
            ],
            'class_date' => [
                'required',
                'date'
            ],
            'class_description' => [
                'nullable',
                'string',
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
            'round_duration' => [
                'nullable',
                'integer',
                'min:1'
            ],
        ]);

        // Update the database record
        $trainingclass->update($validated);

        return back()->with('success', true);
    }

    /**
     * Remove the specified training class.
     */
    public function destroy(TrainingClass $trainingclass)
    {
        Log::info('Destroy method called', [
            'route_params' => request()->route()->parameters(),
            'training_class' => $trainingclass->toArray(),
            'class_id' => $trainingclass->class_id
        ]);

        try {
            // Verify we have the correct instance
            if (!$trainingclass->exists) {
                Log::error('Training class not found', ['id' => $trainingclass->class_id]);
                return back()->with('error', 'Training class not found');
            }

            // Check for related techniques
            if ($trainingclass->techniques()->exists()) {
                Log::info('Class has techniques', [
                    'class_id' => $trainingclass->class_id,
                    'technique_count' => $trainingclass->techniques()->count()
                ]);
                return back()->with('error', 'Cannot delete class with associated techniques');
            }

            // Perform deletion
            $deleted = $trainingclass->delete();

            Log::info('Delete operation result', [
                'class_id' => $trainingclass->class_id,
                'deleted' => $deleted
            ]);

            if ($deleted) {
                return back()->with('success', true);
            }

            return back()->with('error', 'Failed to delete the class');

        } catch (QueryException $e) {
            Log::error('Delete operation failed', [
                'error' => $e->getMessage(),
                'code' => $e->getCode()
            ]);
            return back()->with('error', 'Database error occurred');
        }
    }
}
