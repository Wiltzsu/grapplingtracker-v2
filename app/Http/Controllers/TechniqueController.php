<?php

namespace App\Http\Controllers;

use App\Models\Technique;
use App\Models\Category;
use App\Models\Position;
use App\Models\TrainingClass;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Http\Requests\StoreTechniqueRequest;
use App\Http\Requests\UpdateTechniqueRequest;

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
     */
    public function create()
    {
        $this->authorize('create', Technique::class);
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
    public function store(StoreTechniqueRequest $request)
    {
        Technique::create($request->validated());
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
    public function update(UpdateTechniqueRequest $request, Technique $technique)
    {
        $technique->update($request->validated());
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
