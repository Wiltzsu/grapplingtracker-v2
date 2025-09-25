<?php
// app/Http/Controllers/Api/CategoryController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseController;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CategoryController extends BaseController
{
	public function index(Request $request): JsonResponse
	{
		$items = Category::where('user_id', auth()->id())->latest()->paginate($request->get('per_page', 15));
		return $this->paginated($items, 'Categories retrieved');
	}

	public function store(Request $request): JsonResponse
	{
		$data = $request->validate([
			'category_name' => 'required|string|max:255',
			'category_description' => 'nullable|string|max:2000',
		]);
		$data['user_id'] = auth()->id();
		$item = Category::create($data);
		return $this->success($item, 'Category created', 201);
	}

	public function show(Category $category): JsonResponse
	{
		$this->authorize('view', $category);
		return $this->success($category, 'Category retrieved');
	}

	public function update(Request $request, Category $category): JsonResponse
	{
		$this->authorize('update', $category);
		$data = $request->validate([
			'category_name' => 'sometimes|required|string|max:255',
			'category_description' => 'nullable|string|max:2000',
		]);
		$category->update($data);
		return $this->success($category, 'Category updated');
	}

	public function destroy(Category $category): JsonResponse
	{
		$this->authorize('delete', $category);
		$category->delete();
		return $this->success(null, 'Category deleted');
	}
}
