<?php

namespace App\Http\Controllers;

use App\Models\Technique;
use App\Models\Category;
use App\Models\Position;
use App\Models\TrainingClass;
use Illuminate\Http\Request;
use Inertia\Inertia;

/**
 * TechniqueController
 *
 * Handles all HTTP requests related to techniques, including CRUD operations
 * and search functionality. Uses Inertia.js for server-side rendering.
 */
class TechniqueController extends Controller
{
    /**
     * Display a listing of the techniques.
     *
     * @param Request $request The incoming HTTP request
     * @return \Inertia\Response
     *
     * This method:
     * - Handles search functionality using Laravel Scout
     * - Filters techniques by the authenticated user
     * - Joins related tables (categories, positions, training classes)
     * - Orders results by creation date
     */
    public function index(Request $request)
    {
        $search = $request->input('search');

        /**
         * Display a listin of techniques
         *
         * 'techniques' is a prop that is passed to the Techniques Index component
         * 'where' gets only the techniques belonging to the currently logged in user id
         * latest() orders the results by creation date
         * get() executes the query and retrieves all records
         */
        return Inertia::render('Techniques/Index', [
            'techniques' => Technique::search($search)
                ->where('user_id', auth()->id())
                ->query(function ($query) {
                    $query->join('categories', 'techniques.category_id', '=', 'categories.category_id')
                        ->join('positions', 'techniques.position_id', '=', 'positions.position_id')
                        ->leftJoin('training_classes', 'techniques.class_id', '=', 'training_classes.class_id')
                        ->select(
                            'techniques.*',
                            'categories.category_name',
                            'positions.position_name',
                            'training_classes.instructor',
                            'training_classes.location'
                        );
                })
                ->latest('created_at')
                ->get(),
                // Page header props for breadcrumb.
                'pageHeader' => [
                    'backRoute' => route('view'),
                    'backLabel' => 'View',
                    'sectionRoute' => route('techniques.index'),
                    'sectionLabel' => 'Techniques',
                    'childRoute' => null,
                ],
        ]);
    }

    /**
     * Show the form for creating a new technique.
     *
     * @return \Inertia\Response
     *
     * This method:
     * - Loads all categories, positions, and training classes for the authenticated user
     * - Passes this data to the CreateTechnique React component
     * - Training classes are ordered by date in descending order
     */
    public function create()
    {
        return Inertia::render('Techniques/CreateTechnique', [
            'categories'       => Category::where('user_id', auth()->id())->get(),
            'positions'        => Position::where('user_id', auth()->id())->get(),
            'training_classes' => TrainingClass::where('user_id', auth()->id())->orderby('class_date', 'DESC')->get(),

            // Page header props for breadcrumb.
            'pageHeader' => [
                'backRoute' => route('dashboard'),
                'backLabel' => 'Dashboard',
                'sectionRoute' => route('techniques.index'),
                'sectionLabel' => 'Techniques',
                'childRoute' => null,
                'childLabel' => 'Add technique',
                'cancelRoute' => route('techniques.index'),
            ],
        ]);
    }

    /**
     * Store a newly created technique in storage.
     *
     * @param Request $request The incoming HTTP request
     * @return \Illuminate\Http\RedirectResponse
     *
     * This method:
     * - Validates the incoming request data
     * - Adds the authenticated user's ID to the data
     * - Creates a new technique record
     * - Returns to the previous page with a success message
     */
    public function store(Request $request)
    {
        // Validate incoming request data
        $validated = $request->validate([
            'technique_name' => [
                'required',
                'string',
                'max:255',
            ],
            'technique_description' => [
                'nullable',
                'string',
            ],
            'category_id' => [
                'required',
                'integer'
            ],
            'class_id' => [
                'nullable',
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
     * Display the specified technique.
     *
     * @param Technique $technique The technique to display
     * @return void
     */
    public function show(Technique $technique)
    {
        //
    }

    /**
     * Show the form for editing a technique.
     *
     * @param Technique $technique The technique to edit
     * @return \Inertia\Response
     *
     * This method:
     * - Loads the technique with its related category, position, and training class
     * - Loads all categories, positions, and training classes for the authenticated user
     * - Passes this data to the EditTechnique React component
     * - Includes a 'from' parameter to track navigation source
     */
    public function edit(Technique $technique)
    {
        return Inertia::render('Techniques/EditTechnique', [
            'technique' => $technique->load(['category', 'position', 'trainingClass']),
            'categories' => Category::where('user_id', auth()->id())->get(),
            'positions' => Position::where('user_id', auth()->id())->get(),
            'training_classes' => TrainingClass::where('user_id', auth()->id())->orderby('class_date', 'DESC')->get(),
            'from' => request()->query('from', 'techniques')
        ]);
    }

    /**
     * Update the specified technique in storage.
     *
     * @param Request $request The incoming HTTP request
     * @param Technique $technique The technique to update
     * @return \Illuminate\Http\RedirectResponse
     *
     * This method:
     * - Validates the incoming request data
     * - Updates the technique record
     * - Returns to the previous page with a success message
     */
    public function update(Request $request, Technique $technique)
    {
        // Validate the request
        $validated = $request->validate([
            'technique_name' => [
                'required',
                'string',
                'max:255',
            ],
            'technique_description' => [
                'nullable',
                'string',
            ],
            'category_id' => [
                'required',
                'integer',
                'exists:categories,category_id'
            ],
            'position_id' => [
                'required',
                'integer',
                'exists:positions,position_id'
            ],
            'class_id' => [
                'nullable',
                'integer',
                'exists:training_classes,class_id'
            ],
        ]);

        $technique->update($validated);

        return back()->with('success', true);
    }

    /**
     * Remove the specified technique from storage.
     *
     * @param Technique $technique The technique to delete
     * @return \Illuminate\Http\RedirectResponse
     *
     * This method:
     * - Deletes the specified technique
     * - Redirects to the techniques index page
     */
    public function destroy(Technique $technique)
    {
        $technique->delete();

        return redirect(route('techniques.index'));
    }
}
