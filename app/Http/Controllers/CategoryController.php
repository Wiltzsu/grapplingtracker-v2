<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Database\QueryException;
use Illuminate\Http\RedirectResponse;

/**
 * Handles all category-related operations.
 */
class CategoryController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of categories.
     */
    public function index(Request $request): Response
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
    public function store(StoreCategoryRequest $request): RedirectResponse
    {
        Category::create($request->validated());
        return back()->with('success', true);
    }

    /**
     * Show the form for editing the specified category.
     */
    public function edit(Category $category): Response
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
    public function update(UpdateCategoryRequest $request, Category $category): RedirectResponse
    {
        $category->update($request->validated());
        return back()->with('success', true);
    }

    /**
     * Remove the specified category.
     */
    public function destroy(Category $category): RedirectResponse
    {
        $this->authorize('delete', $category);

        try {
            if ($category->techniques()->exists()) {
                return back()->withErrors([
                   'error' => 'Cannot delete category because it is being used by one or more techniques.'
                ]);
            }

            $category->delete();
            return redirect(route('categories.index'));

        } catch (QueryException $e) {
            return back()->withErrors([
                'error' => 'An unexpected error occurred while deleting the category.'
            ]);
        }
    }
}
