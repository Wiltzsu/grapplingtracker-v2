<?php

namespace App\Http\Controllers;

use App\Models\TrainingClass;
use Illuminate\Http\Request;
use Inertia\Inertia;
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
                ->paginate($perPage),
                // Page header props for breadcrumb.
                'pageHeader' => [
                    'backRoute' => route('view'),
                    'backLabel' => 'View',
                    'sectionRoute' => null,
                    'sectionLabel' => 'Training sessions',
                ],
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

            // Page header props for breadcrumb.
            'pageHeader' => [
                'backRoute' => route('dashboard'),
                'backLabel' => 'Dashboard',
                'sectionRoute' => null,
                'sectionLabel' => 'Add training session',
            ],
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
            'pageHeader' => [
                'backRoute' => route('trainingclasses.index'),
                'backLabel' => 'Training sessions',
                'sectionRoute' => null,
                'sectionLabel' => ! empty( $trainingclass->instructor ) ? ( $trainingclass->instructor ) . "'s class" : 'No instructor',
            ],
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
        $trainingclass->delete();

        return redirect(route('trainingclasses.index'));
    }
}
