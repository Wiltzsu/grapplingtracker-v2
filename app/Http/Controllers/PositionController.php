<?php

namespace App\Http\Controllers;

use App\Models\Position;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PositionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
     */
    public function show(Position $position)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Position $position)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Position $position)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Position $position)
    {
        //
    }
}
