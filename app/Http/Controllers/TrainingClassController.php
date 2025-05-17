<?php

namespace App\Http\Controllers;

use App\Models\TrainingClass;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Log;
use App\Models\Category;
use App\Models\Position;
use App\Models\Technique;

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
    public function index(Request $request)
    {
        $search = $request->input('search');
        $perPage = $request->input('perPage', 15);

        return Inertia::render('TrainingClasses/Index', [
            'training_classes' => TrainingClass::search($search)
                ->where('user_id', auth()->id())
                ->orderby('class_date', 'DESC')
                ->query(function ($query) {
                    $query->with('techniques');
                })
                ->paginate($perPage)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('TrainingClasses/CreateTrainingClass', [
            'categories' => Category::where('user_id', auth()->id())->get(),
            'positions' => Position::where('user_id', auth()->id())->get(),
            'training_classes' => TrainingClass::where('user_id', auth()->id())->get(),
        ]);
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
            'techniques' => ['sometimes', 'array'],
            'techniques.*.technique_name' => ['required_with:techniques', 'string', 'max:255'],
            'techniques.*.technique_description' => ['required_with:techniques', 'string'],
            'techniques.*.category_id' => ['required_with:techniques', 'integer'],
            'techniques.*.position_id' => ['required_with:techniques', 'integer'],
        ]);

        // Add user_id to the validated data
        $validated['user_id'] = auth()->id();

        // Create the training class
        $trainingClass = TrainingClass::create($validated);

        // Create the techniques and associate them with the training class
        foreach ($request->techniques as $technique) {
            $technique['user_id'] = auth()->id();
            $technique['class_id'] = $trainingClass->class_id;
            Technique::create($technique);
        }

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
        return Inertia::render('TrainingClasses/EditTrainingClass', [
            // Eager load the related techniques for the class
            'training_class' => $trainingclass->load('techniques'),
            'categories' => Category::where('user_id', auth()->id())->get(),
            'positions' => Position::where('user_id', auth()->id())->get(),
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
            'techniques' => ['sometimes', 'array'],
            'techniques.*.technique_name' => ['required_with:techniques', 'string', 'max:255'],
            'techniques.*.technique_description' => ['required_with:techniques', 'string'],
            'techniques.*.category_id' => ['required_with:techniques', 'integer'],
            'techniques.*.position_id' => ['required_with:techniques', 'integer'],
        ]);

        // Update the training class
        $trainingclass->update($validated);

        // Update techniques
        if (isset($request->techniques)) {
            // Delete existing techniques
            $trainingclass->techniques()->delete();

            // Create new techniques
            foreach ($request->techniques as $technique) {
                $technique['user_id'] = auth()->id();
                $technique['class_id'] = $trainingclass->class_id;
                Technique::create($technique);
            }
        }

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
