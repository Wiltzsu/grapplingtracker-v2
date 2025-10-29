<?php

namespace App\Http\Controllers;

use App\Models\Technique;
use App\Models\Category;
use App\Models\Position;
use App\Models\TrainingClass;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

/**
 * Handles all technique-related operations
 */
class TechniqueController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the techniques.
     *
     * @param Request
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny', Technique::class);

        $search = $request->input('search');
        $perPage = $request->input('perPage', 15);

        // Use Scout search when there's a search term
        if ($search) {
            $techniques = Technique::search($search)
            ->where('user_id', auth()->id())
            ->query(fn($query) => $query->with(['category', 'position', 'trainingclass']))
            ->paginate($perPage);
        } else {
            // Regular Eloquent when no search term
            $techniques = Technique::where('techniques.user_id', auth()->id())
                ->with(['category', 'position', 'trainingclass'])
                ->orderBy('created_at', 'desc')
                ->paginate($perPage);
        }

        return Inertia::render('Techniques/Index', [
            'techniques' => $techniques,
            // Page header props for breadcrumb
            'pageHeader' => [
                'backRoute' => route('view'),
                'backLabel' => 'View',
                'sectionRoute' => null,
                'sectionLabel' => 'View techniques',
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
                'sectionRoute' => null,
                'sectionLabel' => 'Add technique',
            ],
        ]);
    }

    /**
     * Store a newly created technique in storage.
     *
     * @param Request
     * @return \Illuminate\Http\RedirectResponse
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
     * Show the form for editing a technique.
     *
     * @param Technique
     * @return \Inertia\Response
     */
    public function edit(Technique $technique)
    {
        $this->authorize('update', $technique);

        return Inertia::render('Techniques/EditTechnique', [
            'technique' => $technique->load(['category', 'position', 'trainingClass']),
            'categories' => Category::where('user_id', auth()->id())->get(),
            'positions' => Position::where('user_id', auth()->id())->get(),
            'training_classes' => TrainingClass::where('user_id', auth()->id())->orderby('class_date', 'DESC')->get(),
            'from' => request()->query('from', 'techniques'),
            // Page header props for breadcrumb.
            'pageHeader' => [
                'backRoute' => route('techniques.index'),
                'backLabel' => 'View',
                'sectionRoute' => null,
                'sectionLabel' => $technique->technique_name,
            ],
        ]);
    }

    /**
     * Update the specified technique in storage.
     *
     * @param Request
     * @param Technique
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, Technique $technique)
    {
        $this->authorize('update', $technique);

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
     */
    public function destroy(Technique $technique)
    {
        $this->authorize('delete', $technique);

        $technique->delete();

        return redirect(route('techniques.index'));
    }
}
