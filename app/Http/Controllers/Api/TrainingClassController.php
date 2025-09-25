<?php
// app/Http/Controllers/Api/TrainingClassController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseController;
use App\Models\TrainingClass;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TrainingClassController extends BaseController
{
	public function index(Request $request): JsonResponse
	{
		$items = TrainingClass::where('user_id', auth()->id())->latest()->paginate($request->get('per_page', 15));
		return $this->paginated($items, 'Training classes retrieved');
	}

	public function store(Request $request): JsonResponse
	{
		$data = $request->validate([
			'instructor' => 'required|string|max:255',
			'location' => 'nullable|string|max:255',
			'class_description' => 'nullable|string|max:2000',
			'class_date' => 'required|date',
		]);
		$data['user_id'] = auth()->id();
		$item = TrainingClass::create($data);
		return $this->success($item, 'Training class created', 201);
	}

	public function show(TrainingClass $trainingClass): JsonResponse
	{
		$this->authorize('view', $trainingClass);
		return $this->success($trainingClass, 'Training class retrieved');
	}

	public function update(Request $request, TrainingClass $trainingClass): JsonResponse
	{
		$this->authorize('update', $trainingClass);
		$data = $request->validate([
			'instructor' => 'sometimes|required|string|max:255',
			'location' => 'nullable|string|max:255',
			'class_description' => 'nullable|string|max:2000',
			'class_date' => 'sometimes|required|date',
		]);
		$trainingClass->update($data);
		return $this->success($trainingClass, 'Training class updated');
	}

	public function destroy(TrainingClass $trainingClass): JsonResponse
	{
		$this->authorize('delete', $trainingClass);
		$trainingClass->delete();
		return $this->success(null, 'Training class deleted');
	}

	public function recent(Request $request): JsonResponse
	{
		$items = TrainingClass::where('user_id', auth()->id())->latest()->take(5)->get();
	 return $this->success($items, 'Recent training classes');
	}
}
