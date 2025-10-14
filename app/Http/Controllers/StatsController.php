<?php

namespace App\Http\Controllers;

use App\Models\TrainingClass;
use App\Models\Technique;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class StatsController extends Controller
{
    /**
     * Display the statspage.
     *
     * @return \Inertia\Response Returns Inertia response with Stats component
     */
    public function index(Request $request): Response
    {
        // Time based stats
        $queryTotalClasses = TrainingClass::where('user_id', auth()->id());
        $queryTotalClassDuration = TrainingClass::where('user_id', auth()->id());
        $queryAverageClassDuration = TrainingClass::where('user_id', auth()->id());

        // Rolling/sparring related stats
        $queryTotalRounds = TrainingClass::where('user_id', auth()->id());
        $queryTotalRoundDuration = TrainingClass::where('user_id', auth()->id());
        $queryAverageRoundDuration = TrainingClass::where('user_id', auth()->id());
        $querySparringRelativeToTraining = TrainingClass::where('user_id', auth()->id());

        // Charts
        $queryTrainingFrequency = TrainingClass::where('user_id', auth()->id());
        $queryPositionsRelative = TrainingClass::where('training_classes.user_id', auth()->id());

        // Total classes
        switch ($request->range) {
            case 'month':
                $queryTotalClasses->where('class_date', '>=', now()->subMonth(1));
                break;
            case '6months':
                $queryTotalClasses->where('class_date', '>=', now()->subMonths(6));
                break;
            case 'custom':
                if ($request->startDate && $request->endDate) {
                    $queryTotalClasses->whereBetween('class_date', [
                        Carbon::parse($request->startDate),
                        Carbon::parse($request->endDate)->endOfDay()
                    ]);
                }
                break;
            case 'all':
                // No date filtering needed
                break;
            default: // year
                $queryTotalClasses->where('class_date', '>=', now()->subYear());
                break;
        }

        $totalClasses = $queryTotalClasses->count();

        // Total class duration
        switch ($request->range) {
            case 'month':
                $queryTotalClassDuration->where('class_date', '>=', now()->subMonth(1));
                break;
            case '6months':
                $queryTotalClassDuration->where('class_date', '>=', now()->subMonths(6));
                break;
            case 'custom':
                if ($request->startDate && $request->endDate) {
                    $queryTotalClassDuration->whereBetween('class_date', [
                        Carbon::parse($request->startDate),
                        Carbon::parse($request->endDate)->endOfDay()
                    ]);
                }
                break;
            case 'all':
                // No date filtering needed
                break;
            default: // year
                $queryTotalClassDuration->where('class_date', '>=', now()->subYear());
                break;
        }

        $totalClassDuration = $queryTotalClassDuration->sum('class_duration');

        // Total rounds
        switch ($request->range) {
            case 'month':
                $queryTotalRounds->where('class_date', '>=', now()->subMonth(1));
                break;
            case '6months':
                $queryTotalRounds->where('class_date', '>=', now()->subMonths(6));
                break;
            case 'custom':
                if ($request->startDate && $request->endDate) {
                    $queryTotalRounds->whereBetween('class_date', [
                        Carbon::parse($request->startDate),
                        Carbon::parse($request->endDate)->endOfDay()
                    ]);
                }
                break;
            case 'all':
                // No date filtering needed
                break;
            default: // year
                $queryTotalRounds->where('class_date', '>=', now()->subYear());
                break;
        }

        $totalRollingRounds = $queryTotalRounds->sum('rounds');

        // Total round duration
        switch ($request->range) {
            case 'month':
                $queryTotalRoundDuration->where('class_date', '>=', now()->subMonth(1));
                break;
            case '6months':
                $queryTotalRoundDuration->where('class_date', '>=', now()->subMonths(6));
                break;
            case 'custom':
                if ($request->startDate && $request->endDate) {
                    $queryTotalRoundDuration->whereBetween('class_date', [
                        Carbon::parse($request->startDate),
                        Carbon::parse($request->endDate)->endOfDay()
                    ]);
                }
                break;
            case 'all':
                break;
            default: // year
            $queryTotalRoundDuration->where('class_date', '>=', now()->subYear());
                break;
        }

        $totalRoundDuration = $queryTotalRoundDuration->sum(DB::raw('round_duration * rounds'));

        // Average round duration
        switch($request->range) {
            case 'month':
                $queryAverageRoundDuration->where('class_date', '>=', now()->subMonth(1));
                break;
            case '6months':
                $queryAverageRoundDuration->where('class_date', '>=', now()->subMonths(6));
                break;
            case 'custom':
                if ($request->startDate && $request->endDate) {
                    $queryAverageRoundDuration->whereBetween('class_date', [
                        Carbon::parse($request->startDate),
                        Carbon::parse($request->endDate)->endOfDay()
                    ]);
                }
                break;
            case 'all':
                break;
            default: // year
                $queryAverageRoundDuration->where('class_date', '>=', now()->subYear());
                break;
        }

        $averageRoundDuration = round($queryAverageRoundDuration->whereNotNull('round_duration')
            ->where('rounds', '>', 0)
            ->avg('round_duration'), 2);

        // Classes per week
        switch($request->range) {
            case 'month':
                $queryAverageClassDuration->where('class_date', '>=', now()->subMonth(1));
                break;
            case '6months':
                $queryAverageClassDuration->where('class_date', '>=', now()->subMonths(6));
                break;
            case 'custom':
                if ($request->starDate && $request->endDate) {
                    $queryAverageClassDuration->whereBetween('class_date', [
                        Carbon::parse($request->startDate),
                        Carbon::parse($request->endDate)->endOfDay()
                    ]);
                }
                break;
            case 'all':
                break;
            default: // year
                $queryAverageClassDuration->where('class_date', '>=', now()->subYear());
                break;
        }

        $averageClassDuration = round($queryAverageClassDuration->whereNotNull('class_duration')
            ->avg('class_duration'), 0);

        // Sparring relative to training
        switch($request->range) {
            case 'month':
                $querySparringRelativeToTraining->where('class_date', '>=', now()->subMonth(1));
                break;
            case '6months':
                $querySparringRelativeToTraining->where('class_date', '>=', now()->subMonths(6));
                break;
            case 'custom':
                if ($request->startDate && $request->endDate) {
                    $querySparringRelativeToTraining->whereBetween('class_date', [
                        Carbon::parse($request->startDate),
                        Carbon::parse($request->endDate)->endOfDay()
                    ]);
                }
                break;
            case 'all':
                break;
            default: // year
                $querySparringRelativeToTraining->where('class_date', '>=', now()->subYear());
                break;
        }

        $sparringRelativeToTraining = $querySparringRelativeToTraining
            ->whereNotNull('round_duration')
            ->whereNotNull('rounds')
            ->where('rounds', '>', 0)
            ->select(DB::raw('
                (SUM(round_duration * rounds) / SUM(class_duration)) * 100 as percentage
            '))
            ->first()
            ->percentage ?? 0;

        // Chart training frequency
        switch($request->range) {
            case 'month':
                $queryTrainingFrequency->where('class_date', '>=', now()->subMonth(1));
                break;
            case '6months':
                $queryTrainingFrequency->where('class_date', '>=', now()->subMonths(6));
                break;
            case 'custom':
                if ($request->startDate && $request->endDate) {
                    $queryTrainingFrequency->whereBetween('class_date', [
                        Carbon::parse($request->startDate),
                        Carbon::parse($request->endDate)->endOfDay()
                    ]);
                }
                break;
            case 'all':
                break;
            default: // year
                $queryTrainingFrequency->where('class_date', '>=', now()->subYear());
                break;
        }

        // Clone the query to avoid modifying the original
        $queryForDates = clone $queryTrainingFrequency;
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
            $trainingFrequency = $months->map(function ($month) use ($queryTrainingFrequency) {
                // Clone the query for this specific month to avoid query builder state issues
                $monthQuery = clone $queryTrainingFrequency;
                $count = $monthQuery
                    ->whereRaw('DATE_FORMAT(class_date, "%Y-%m") = ?', [$month])
                    ->count();

                return [
                    'month' => $month,
                    'count' => $count
                ];
            });
        } else {
            // Fallback to original logic if no dates found
            $trainingFrequency = $queryTrainingFrequency
                ->selectRaw('DATE_FORMAT(class_date, "%Y-%m") as month, COUNT(*) as count')
                ->groupBy('month')
                ->orderBy('month')
                ->get();
        }

        // Chart positions trained relative to each other
        switch($request->range) {
            case 'month':
                $queryPositionsRelative->where('class_date', '>=', now()->subMonth(1));
                break;
            case '6months':
                $queryPositionsRelative->where('class_date', '>=', now()->subMonths(6));
                break;
            case 'custom':
                if ($request->startDate && $request->endDate) {
                    $queryPositionsRelative->whereBetween('class_date', [
                        Carbon::parse($request->startDate),
                        Carbon::parse($request->endDate)->endOfDay()
                    ]);
                }
                break;
            case 'all':
                break;
            default: // year
                $queryPositionsRelative->where('class_date', '>=', now()->subYear());
                break;
        }

        $positionsRelative = Technique::with('position')
        ->where('user_id', auth()->id())
        ->get()
        ->groupBy('position.position_name')
        ->map(function ($techniques, $positionName) {
            return [
                'position_name' => $positionName,
                'count' => $techniques->count()
            ];
        })
        ->values();

        return Inertia::render('Stats', [
            'totalClasses' => $totalClasses,
            'totalRollingRounds' => $totalRollingRounds,
            'totalRoundDuration' => $totalRoundDuration,
            'totalClassDuration' => $totalClassDuration,
            'averageRoundDuration' => $averageRoundDuration,
            'averageClassDuration' => $averageClassDuration,
            'sparringRelativeToTraining' => round($sparringRelativeToTraining, 1),
            'trainingFrequency' => $trainingFrequency,
            'positionsRelative' => $positionsRelative,
        ]);
    }

    /**
     * Store a newly created entry in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
    }
}
