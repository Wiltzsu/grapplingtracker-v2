<?php

namespace App\Http\Controllers;

use App\Models\Position;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

/**
 * Handles all position-related operations.
 */
class PositionController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of positions.
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny', Position::class);

        return Inertia::render('Positions/Index', [
            'positions' => $request->user()
                ->positions()
                ->orderBy('position_name', 'asc')
                ->get(),
                // Page header props for breadcrumb.
                'pageHeader' => [
                    'backRoute' => route('view'),
                    'backLabel' => 'View',
                    'sectionRoute' => null,
                    'sectionLabel' => 'Positions',
                ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', Position::class);

        return Inertia::render('Positions/CreatePosition', [
            // Page header props for breadcrumb.
            'pageHeader' => [
                'backRoute' => route('dashboard'),
                'backLabel' => 'Dashboard',
                'sectionRoute' => null,
                'sectionLabel' => 'Add position',
            ],
        ]);
    }

    /**
     * Store a newly created position.
     */
    public function store(Request $request)
    {
        $this->authorize('create', Position::class);

        $validated = $request->validate([
            'position_name' => [
                'required',
                'string',
                'max:255',
                'regex:/^[\p{L}\p{N}\s\-_]+$/u'  // Letters, numbers, spaces, hyphens, underscores
            ],
            'position_description' => [
                'nullable',
                'string',
                'max:255',
                'regex:/^[\p{L}\p{N}\s\-_.,!?]+$/u'  // More permissive for descriptions
            ],
        ]);

        $validated['user_id'] = $request->user()->id;

        Position::create($validated);

        return back()->with('success', true);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Position $position)
    {
        $this->authorize('update', $position);

        return Inertia::render('Positions/EditPosition', [
            'position' => $position,
            // Page header props for breadcrumb
            'pageHeader' => [
                'backRoute' => route('positions.index'),
                'backLabel' => 'View',
                'sectionRoute' => null,
                'sectionLabel' => $position->position_name,
            ],
        ]);
    }

    /**
     * Update the specified position.
     */
    public function update(Request $request, Position $position)
    {
        $this->authorize('update', $position);

        $validated = $request->validate([
            'position_name' => [
                'required',
                'string',
                'max:255',
                'regex:/^[\p{L}\p{N}\s\-_]+$/u'  // Same rules as in create
            ],
            'position_description' => [
                'nullable',
                'string',
                'max:255',
                'regex:/^[\p{L}\p{N}\s\-_.,!?]+$/u'  // Same rules as in create
            ],
        ]);

        // Update database record
        $position->update($validated);

        return back()->with('success', true);
    }

    /**
     * Remove the specified position.
     */
    public function destroy(Position $position)
    {
        $this->authorize('delete', $position);

        try {
            // Prevent deletion if position is referenced by techniques
            if ($position->techniques()->exists()) {
                return back()->withErrors([
                    'error' => 'Cannot delete position because it is being used by one or more techniques.'
                ]);
            }

            $position->delete();
            return redirect(route('positions.index'));

        } catch (QueryException $e) {
            return back()->withErrors([
                'error' => 'An unexpected error occurred while deleting the position.'
            ]);
        }
    }
}
