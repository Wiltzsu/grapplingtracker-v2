<?php
// app/Http/Controllers/Api/UserController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseController;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class UserController extends BaseController
{
	public function show(Request $request): JsonResponse
	{
		return $this->success($request->user(), 'User retrieved');
	}

	public function update(Request $request): JsonResponse
	{
		$data = $request->validate([
			'name' => 'sometimes|required|string|max:255',
		]);
		$user = $request->user();
		$user->update($data);
		return $this->success($user->fresh(), 'User updated');
	}
}
