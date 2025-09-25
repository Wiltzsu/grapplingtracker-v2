<?php
// app/Http/Controllers/Api/PositionController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseController;
use App\Models\Position;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PositionController extends BaseController
{
	public function index(Request $request): JsonResponse
	{
		$items = Position::where('user_id', auth()->id())->latest()->paginate($request->get('per_page', 15));
		return $this->paginated($items, 'Positions retrieved');
	}

	public function store(Request $request): JsonResponse
	{
		$data = $request->validate([
			'position_name' => 'required|string|max:255',
			'position_description' => 'nullable|string|max:2000',
		]);
		$data['user_id'] = auth()->id();
		$item = Position::create($data);
		return $this->success($item, 'Position created', 201);
	}

	public function show(Position $position): JsonResponse
	{
		$this->authorize('view', $position);
		return $this->success($position, 'Position retrieved');
	}

	public function update(Request $request, Position $position): JsonResponse
	{
		$this->authorize('update', $position);
		$data = $request->validate([
			'position_name' => 'sometimes|required|string|max:255',
			'position_description' => 'nullable|string|max:2000',
		]);
		$position->update($data);
		return $this->success($position, 'Position updated');
	}

	public function destroy(Position $position): JsonResponse
	{
		$this->authorize('delete', $position);
		$position->delete();
		return $this->success(null, 'Position deleted');
	}
}
