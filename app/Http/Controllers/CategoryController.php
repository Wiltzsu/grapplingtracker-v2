<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Handles all category-related operations.
 */
class CategoryController extends Controller
{
    /**
     * Display a listing of categories.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new category.
     */
    public function create(): Response
    {
        return Inertia::render('Categories/CreateCategory');
    }

    /**
     * Store a newly created category.
     */
    public function store(Request $request)
    {
        // Validate and save the category
        $validated = $request->validate([
            'category_name' => 'required|string|max:255',
            'category_description' => 'nullable|string|max:255',
        ]);

        $category = new Category();
        $category->category_name = $validated['category_name'];
        $category->category_description = $validated['category_description'];
        $category->save();

        // Return to the same page with a success flash message
        return back()->with('success', true);
    }

    /**
     * Display the specified category.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified category.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified category.
     */
    public function update(Request $request, Category $category)
    {
        //
    }

    /**
     * Remove the specified category.
     */
    public function destroy(Category $category)
    {
        //
    }
}
