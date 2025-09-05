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
     *
     * - 'categories' is a prop that is passed to the Index component
     * - latest() orders the results by creation date
     * - get() executes the query and retrieves all records
     */
    public function index()
    {
        return Inertia::render('Categories/Index', [
            'categories' => Category::where('user_id', auth()->id())
                ->latest()
                ->get(),
                // Page header props for breadcrumb.
                'pageHeader' => [
                    'backRoute' => route('view'),
                    'backLabel' => 'View',
                    'sectionRoute' => null,
                    'sectionLabel' => 'Categories',
                ],
        ]);
    }

    /**
     * Show the form for creating a new category.
     */
    public function create(): Response
    {
        return Inertia::render('Categories/CreateCategory', [
            // Page header props for breadcrumb.
            'pageHeader' => [
                'backRoute' => route('dashboard'),
                'backLabel' => 'Dashboard',
                'sectionRoute' => null,
                'sectionLabel' => 'Add category',
            ],
        ]);
    }

    /**
     * Store a newly created category.
     *
     * - Occurs when a user submits the form for creating a category
     * - Validates the data
     * - Creates a new Category model instance
     */
    public function store(Request $request)
    {
        // Validate the incoming request data
        $validated = $request->validate([
            'category_name' => [
                'required',
                'string',
                'max:255',
                'regex:/^[\p{L}\p{N}\s\-_]+$/u'  // Letters, numbers, spaces, hyphens, underscores
            ],
            'category_description' => [
                'nullable',
                'string',
                'max:255',
                'regex:/^[\p{L}\p{N}\s\-_.,!?]+$/u'  // More permissive for descriptions
            ],
        ]);

        $validated['user_id'] = auth()->id();

        /* Creates a new Category instance and saves it to the database using mass assignment
         *
         * - Uses Category model's $fillable array to protect against mass assignment vulnerabilities
         * - $validated array contains 'category_name' and 'category_description' from the form
         *
         * - Equivalent to:
         *   $category = new Category();
         *   $category->category_name = $validated['category_name'];
         *   $category->category_description = $validated['category_description'];
         *   $category->save();
         */
        Category::create($validated);

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
     *
     * 'category' is the prop passed to EditCategory.jsx.
     */
    public function edit(Category $category)
    {
        return Inertia::render('Categories/EditCategory', [
            'category' => $category,
            // Page header props for breadcrumb.
            'pageHeader' => [
                'backRoute' => route('categories.index'),
                'backLabel' => 'View',
                'sectionRoute' => null,
                'sectionLabel' => $category->category_name,
            ],
        ]);
    }

    /**
     * Update the specified category.
     */
    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'category_name' => 'required|string|max:255',
            'category_description' => 'nullable|string|max:255',
        ]);

        $category->update($validated);

        return back()->with('success', true);
    }

    /**
     * Remove the specified category.
     */
    public function destroy(Category $category)
    {
        $category->delete();

        return redirect(route('categories.index'));
    }
}
