<?php
// app/Http/Controllers/Api/ChirpController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseController;
use App\Models\Chirp;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ChirpController extends BaseController
{
	public function index(Request $request): JsonResponse
	{
		$items = Chirp::with('user:id,name')
			->where('user_id', auth()->id())
			->latest()
			->paginate($request->get('per_page', 15));
		return $this->paginated($items, 'Chirps retrieved');
	}

	public function store(Request $request): JsonResponse
	{
		$data = $request->validate(['message' => 'required|string|max:1000']);
		$item = $request->user()->chirps()->create($data);
		return $this->success($item, 'Chirp created', 201);
	}

	public function destroy(Chirp $chirp): JsonResponse
	{
		$this->authorize('delete', $chirp);
		$chirp->delete();
		return $this->success(null, 'Chirp deleted');
	}
}
