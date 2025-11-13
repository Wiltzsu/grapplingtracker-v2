<?php

namespace App\Services;

use Carbon\Carbon;
use App\Models\TrainingClass;
use App\Models\Technique;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Collection;

class StatsService
{
    public function getStats(int $userId, string $range, ?string $startDate, ?string $endDate): array
    {
        return [
            'totalClasses' => $this->getTotalClassesForUser($userId, $range, $startDate, $endDate),
            'totalClassDuration' => $this->getTotalClassDurationForUser($userId, $range, $startDate, $endDate),
            'totalSparringRounds' => $this->getTotalSparringRoundsForUser($userId, $range, $startDate, $endDate),
            'totalSparringDuration' => $this->getTotalSparringDurationForUser($userId, $range, $startDate, $endDate),
            'averageSparringRoundDuration' => $this->getAverageSparringRoundDuration($userId, $range, $startDate, $endDate),
            'averageClassDuration' => $this->getAverageClassDuration($userId, $range, $startDate, $endDate),
            'sparringRelativeToTraining' => $this->getSparringRelativeToTraining($userId, $range, $startDate, $endDate),
            'trainedPositionsDistribution' => $this->getTrainedPositionsDistribution($userId, $range, $startDate, $endDate),
            'trainingFrequency' => $this->getTrainingFrequency($userId, $range, $startDate, $endDate),
        ];
    }

    private function applyDateRange($query, string $range, ?string $startDate, ?string $endDate)
    {
        switch ($range) {
            case 'month':
                return $query->where('class_date', '>=', now()->subMonth(1));
            case '6months':
                return $query->where('class_date', '>=', now()->subMonth(6));
            case 'custom':
                if ($startDate && $endDate) {
                    return $query->whereBetween('class_date', [
                        Carbon::parse($startDate),
                        Carbon::parse($endDate)->endOfDay()
                    ]);
                }
                return $query;
            case 'all':
                return $query;
            default: // year
                return $query->where('class_date', '>=', now()->subYear());
        }
    }

    private function getTotalClassesForUser(int $userId, string $range, ?string $startDate, ?string $endDate): int
    {
        $query = TrainingClass::where('user_id', $userId);
        $query = $this->applyDateRange($query, $range, $startDate, $endDate);
        return $query->count();
    }

    private function getTotalClassDurationForUser(int $userId, string $range, ?string $startDate, ?string $endDate): int
    {
        $query = TrainingClass::where('user_id', $userId);
        $query = $this->applyDateRange($query, $range, $startDate, $endDate);
        return $query->sum('class_duration');

    }

    private function getTotalSparringRoundsForUser(int $userId, string $range, ?string $startDate, ?string $endDate): int
    {
        $query = TrainingClass::where('user_id', $userId);
        $query = $this->applyDateRange($query, $range, $startDate, $endDate);
        return $query->sum('rounds');
    }

    private function getTotalSparringDurationForUser(int $userId, string $range, ?string $startDate, ?string $endDate): int
    {
        $query = TrainingClass::where('user_id', $userId);
        $query = $this->applyDateRange($query, $range, $startDate, $endDate);
        return $query->sum(DB::raw('round_duration * rounds'));
    }

    private function getAverageSparringRoundDuration(int $userId, string $range, ?string $startDate, ?string $endDate): float
    {
        $totalSparringRoundDuration = $this->getTotalSparringDurationForUser($userId, $range, $startDate, $endDate);
        $totalSparringRounds = $this->getTotalSparringRoundsForUser($userId, $range, $startDate, $endDate);

        return $totalSparringRounds > 0 ? round($totalSparringRoundDuration / $totalSparringRounds, 2) : 0;
    }

    private function getAverageClassDuration(int $userId, string $range, ?string $startDate, ?string $endDate): float
    {
        $totalClassDuration = $this->getTotalClassDurationForUser($userId, $range, $startDate, $endDate);
        $totalClasses = $this->getTotalClassesForUser($userId, $range, $startDate, $endDate);

        return $totalClasses > 0 ? round($totalClassDuration / $totalClasses, 0) : 0;
    }

    private function getSparringRelativeToTraining(int $userId, string $range, ?string $startDate, ?string $endDate): float
    {
        $totalSparringDuration = $this->getTotalSparringDurationForUser($userId, $range, $startDate, $endDate);
        $totalClassDuration = $this->getTotalClassDurationForUser($userId, $range, $startDate, $endDate);

        if ($totalClassDuration === 0) {
            return 0;
        }

        return round(($totalSparringDuration / $totalClassDuration) * 100, 1);
    }

    private function getTrainedPositionsDistribution(int $userId, string $range, ?string $startDate, ?string $endDate): Collection
    {
        $query = Technique::with('position')
            ->join('training_classes', 'techniques.class_id', '=', 'training_classes.class_id')
            ->where('techniques.user_id', $userId);

        $query = $this->applyDateRange($query, $range, $startDate, $endDate);

        return $query
        ->select('techniques.*')
        ->get()
        ->groupBy('position.position_name')
        ->map(function ($techniques, $positionName) {
            return [
                'position_name' => $positionName,
                'count' => $techniques->count()
            ];
        })
        ->values();
    }

    private function getTrainingFrequency(int $userId, string $range, ?string $startDate, ?string $endDate)
    {
        $query = TrainingClass::where('user_id', $userId);
        $query = $this->applyDateRange($query, $range, $startDate, $endDate);

         // Clone the query to avoid modifying the original
         $queryForDates = clone $query;
         $startDate = $queryForDates->min('class_date');
         $endDate = $queryForDates->max('class_date');

         if ($startDate && $endDate) {
             $months = collect();
             $currentDate = Carbon::parse($startDate)->startOfMonth();
             $endMonth = Carbon::parse($endDate)->startOfMonth();

             while ($currentDate->lte($endMonth)) {
                 $months->push($currentDate->format('Y-m'));
                 $currentDate->addMonth();
             }

             // Get training frequency with months that have 0 classes
             $trainingFrequency = $months->map(function ($month) use ($query) {
                 // Clone the query for this specific month to avoid query builder state issues
                 $monthQuery = clone $query;
                 $count = $monthQuery
                     ->whereRaw('DATE_FORMAT(class_date, "%Y-%m") = ?', [$month])
                     ->count();

                 return [
                     'month' => $month,
                     'count' => $count
                 ];
             });

             return $trainingFrequency;
         } else {
             // Fallback to original logic if no dates found
             $trainingFrequency = $query
                 ->selectRaw('DATE_FORMAT(class_date, "%Y-%m") as month, COUNT(*) as count')
                 ->groupBy('month')
                 ->orderBy('month')
                 ->get();
            return $trainingFrequency;
         }

    }
}
