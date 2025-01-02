<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AddController extends Controller
{
    /**
     * Display the add entry page.
     *
     * @return \Inertia\Response Returns Inertia response with Add component
     */
    public function index(): Response
    {
        return Inertia::render('Add');
    }

    /**
     * Store a newly created entry in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        // This will be implemented when you're ready to handle form submissions
        // Example implementation:
        /*
        $validated = $request->validate([
            'type' => 'required|string',
            // other validation rules
        ]);

        // Store the entry
        // Redirect with success message
        return redirect()->route('add')->with('success', 'Entry created successfully.');
        */
    }
}
