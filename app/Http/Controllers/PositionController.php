<?php

namespace App\Http\Controllers;

use App\Models\Position;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Log;

/**
 * Handles all position-related operations.
 */
class PositionController extends Controller
{
    /**
     * Display a listing of positions.
     *
     * - 'categories' is a prop that is passed to the Index component
     * - latest() orders the results by creation date
     * - get() executes the query and retrieves all records
     */
    public function index()
    {
        return Inertia::render('Positions/Index', [
            'positions' => Position::latest()->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Positions/CreatePosition');
    }

    /**
     * Store a newly created position.
     *
     * - Occurs when a user submits the form for creating a position
     * - Validates the data
     * - Creates a new Position model instance
     */
    public function store(Request $request)
    {
        // Validate the incoming request data
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

        /* Creates a new Position instance and saves it to the database using mass assignment
         *
         * - Uses Position model's $fillable array to protect against mass assignment vulnerabilities
         * - $validated array contains 'position_name' and 'position_description' from the form
         *
         * - Equivalent to:
         *   $position = new Position();
         *   $position->position_name = $validated['position_name'];
         *   $position->position_description = $validated['position_description'];
         *   $position->save();
         */
        Position::create($validated);

        return back()->with('success', true);
    }

    /**
     * Display the specified resource.
     *
     * - Laravel's Route Model fetches the whole Position model instance
     * - The $position parameter contains the full model
     */
    public function show(Position $position)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * 'position' is the prop passed to EditPosition.jsx
     */
    public function edit(Position $position)
    {
        return Inertia::render('Positions/EditPosition', [
            'position' => $position
        ]);
    }

    /**
     * Update the specified position.
     */
    public function update(Request $request, Position $position)
    {
        // Validate the request
        $validated = $request->validate([
            'position_name' => 'required|string|max:255',
            'position_description' => 'nullable|string|max:255'
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
        try {
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
