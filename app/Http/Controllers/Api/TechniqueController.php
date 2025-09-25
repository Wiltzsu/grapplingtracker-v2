<?php

namespace App\Http\Controllers\Api;

use App\Models\Technique;
use App\Models\Category;
use App\Models\Position;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TechniqueController extends BaseController
{
    /**
     * Display a listing of techniques
     */
    public function index(Request $request): JsonResponse
    {
        $query = Technique::with(['category', 'position', 'trainingClass'])
            ->where('user_id', auth()->id());

        // Search functionality
        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('technique_name', 'like', '%' . $request->search . '%')
                  ->orWhere('technique_description', 'like', '%' . $request->search . '%');
            });
        }

        // Filter by category
        if ($request->has('category_id') && $request->category_id) {
            $query->where('category_id', $request->category_id);
        }

        // Filter by position
        if ($request->has('position_id') && $request->position_id) {
            $query->where('position_id', $request->position_id);
        }

        $techniques = $query->latest()->paginate($request->get('per_page', 15));

        return $this->paginated($techniques, 'Techniques retrieved successfully');
    }

    /**
     * Store a newly created technique
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'technique_name' => 'required|string|max:255',
            'technique_description' => 'nullable|string|max:2000',
            'category_id' => 'required|exists:categories,category_id',
            'position_id' => 'required|exists:positions,position_id',
            'class_id' => 'nullable|exists:training_classes,class_id',
        ]);

        $validated['user_id'] = auth()->id();

        $technique = Technique::create($validated);
        $technique->load(['category', 'position', 'trainingClass']);

        return $this->success($technique, 'Technique created successfully', 201);
    }

    /**
     * Display the specified technique
     */
    public function show(Technique $technique): JsonResponse
    {
        $this->authorize('view', $technique);

        $technique->load(['category', 'position', 'trainingClass']);

        return $this->success($technique, 'Technique retrieved successfully');
    }

    /**
     * Update the specified technique
     */
    public function update(Request $request, Technique $technique): JsonResponse
    {
        $this->authorize('update', $technique);

        $validated = $request->validate([
            'technique_name' => 'sometimes|required|string|max:255',
            'technique_description' => 'nullable|string|max:2000',
            'category_id' => 'sometimes|required|exists:categories,category_id',
            'position_id' => 'sometimes|required|exists:positions,position_id',
            'class_id' => 'nullable|exists:training_classes,class_id',
        ]);

        $technique->update($validated);
        $technique->load(['category', 'position', 'trainingClass']);

        return $this->success($technique, 'Technique updated successfully');
    }

    /**
     * Remove the specified technique
     */
    public function destroy(Technique $technique): JsonResponse
    {
        $this->authorize('delete', $technique);

        $technique->delete();

        return $this->success(null, 'Technique deleted successfully');
    }

    /**
     * Search techniques using Laravel Scout
     */
    public function search(Request $request): JsonResponse
    {
        $search = $request->get('q', '');

        if (empty($search)) {
            return $this->error('Search query is required', 400);
        }

        $techniques = Technique::search($search)
            ->where('user_id', auth()->id())
            ->paginate($request->get('per_page', 15));

        return $this->paginated($techniques, 'Search results retrieved successfully');
    }

    /**
     * Get techniques by category
     */
    public function byCategory(Category $category): JsonResponse
    {
        $this->authorize('view', $category);

        $techniques = Technique::with(['category', 'position', 'trainingClass'])
            ->where('user_id', auth()->id())
            ->where('category_id', $category->category_id)
            ->latest()
            ->get();

        return $this->success($techniques, 'Techniques by category retrieved successfully');
    }

    /**
     * Get techniques by position
     */
    public function byPosition(Position $position): JsonResponse
    {
        $this->authorize('view', $position);

        $techniques = Technique::with(['category', 'position', 'trainingClass'])
            ->where('user_id', auth()->id())
            ->where('position_id', $position->position_id)
            ->latest()
            ->get();

        return $this->success($techniques, 'Techniques by position retrieved successfully');
    }
}
