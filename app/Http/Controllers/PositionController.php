<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePositionRequest;
use App\Http\Requests\UpdatePositionRequest;
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
    public function store(StorePositionRequest $request)
    {
        Position::create($request->validated());
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
    public function update(UpdatePositionRequest $request, Position $position)
    {
        // Update database record
        $position->update($request->validated());
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
