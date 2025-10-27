<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

/**
 * Handles all category-related operations.
 */
class CategoryController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of categories.
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny', Category::class);

        return Inertia::render('Categories/Index', [
            'categories' => $request->user()
                ->categories()
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
        $this->authorize('create', Category::class);

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
     */
    public function store(Request $request)
    {
        $this->authorize('create', Category::class);

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

        $validated['user_id'] = $request->user()->id;

        Category::create($validated);

        return back()->with('success', true);
    }

    /**
     * Show the form for editing the specified category.
     */
    public function edit(Category $category)
    {
        $this->authorize('update', $category);

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
        $this->authorize('update', $category);

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
        $this->authorize('delete', $category);

        $category->delete();

        return redirect(route('categories.index'));
    }
}
