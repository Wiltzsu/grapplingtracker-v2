<?php
// app/Http/Controllers/Api/StatsController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseController;
use App\Models\Category;
use App\Models\TrainingClass;
use App\Models\Technique;
use App\Models\Position;
use Illuminate\Http\JsonResponse;

class StatsController extends BaseController
{
	public function index(): JsonResponse
	{
		$stats = [
			'categories' => Category::where('user_id', auth()->id())->count(),
			'training_classes' => TrainingClass::where('user_id', auth()->id())->count(),
			'techniques' => Technique::where('user_id', auth()->id())->count(),
			'positions' => Position::where('user_id', auth()->id())->count(),
		];
		return $this->success($stats, 'Stats retrieved');
	}
}
