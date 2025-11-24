<?php

namespace App\Services;
use App\Models\Category;
use App\Models\TrainingClass;
use App\Models\Technique;
use App\Models\Position;

class DashboardService
{
    public function getDashboardData(int $userId): array {
        return [
            'recentActivity' => $this->getRecentActivity($userId),
        ];
    }

    public function getRecentActivity(int $userId): array
    {
        return [
            'categories' => Category::where('user_id', $userId)
                    ->latest()
                    ->take(3)
                    ->get(['category_name', 'created_at']),
                'training_classes' => TrainingClass::where('user_id', $userId)
                    ->latest()
                    ->take(3)
                    ->get(['instructor', 'created_at']),
                'techniques' => Technique::where('user_id', $userId)
                    ->latest()
                    ->take(3)
                    ->get(['technique_name', 'created_at']),
                'positions' => Position::where('user_id', $userId)
                    ->latest()
                    ->take(3)
                    ->get(['position_name', 'created_at']),
        ];
    }
}
