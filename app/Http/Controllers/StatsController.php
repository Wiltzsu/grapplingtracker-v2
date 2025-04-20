<?php

namespace App\Http\Controllers;

use App\Models\TrainingClass;
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

        // Rolling/sparring related stats
        $queryTotalRounds = TrainingClass::where('user_id', auth()->id());
        $queryTotalRoundDuration = TrainingClass::where('user_id', auth()->id());
        $queryAverageRoundDuration = TrainingClass::where('user_id', auth()->id());

        // Total classes
        switch ($request->range) {
            case '6months':
                $queryTotalClasses->where('class_date', '>=', now()->subMonths(6));
                break;
            case 'year':
                $queryTotalClasses->where('class_date', '>=', now()->subYear());
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
            default: // month
                $queryTotalClasses->where('class_date', '>=', now()->startOfMonth());
                break;
        }

        $totalClasses = $queryTotalClasses->count();

        // Total class duration
        switch ($request->range) {
            case '6months':
                $queryTotalClassDuration->where('class_date', '>=', now()->subMonths(6));
                break;
            case 'year':
                $queryTotalClassDuration->where('class_date', '>=', now()->subYear());
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
            default: // month
                $queryTotalClassDuration->where('class_date', '>=', now()->startOfMonth());
                break;
        }

        $totalClassDuration = $queryTotalClassDuration->sum('class_duration');

        // Total rounds
        switch ($request->range) {
            case '6months':
                $queryTotalRounds->where('class_date', '>=', now()->subMonths(6));
                break;
            case 'year':
                $queryTotalRounds->where('class_date', '>=', now()->subYear());
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
            default: // month
                $queryTotalRounds->where('class_date', '>=', now()->startOfMonth());
                break;
        }

        $totalRollingRounds = $queryTotalRounds->sum('rounds');

        // Total round duration
        switch ($request->range) {
            case '6months':
                $queryTotalRoundDuration->where('class_date', '>=', now()->subMonths(6));
                break;
            case 'year':
                $queryTotalRoundDuration->where('class_date', '>=', now()->subYear());
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
            default: // month
            $queryTotalRoundDuration->where('class_date', '>=', now()->startOfMonth());
                break;
        }

        $totalRoundDuration = $queryTotalRoundDuration->sum(DB::raw('round_duration * rounds'));

        // // Average round duration
        // switch($request->range) {
        //     case '6months':
        //         $queryAverageRoundDuration->where('class_date', '>=', now()->subMonths(6));
        //         break;
        //     case 'year':
        //         $queryAverageRoundDuration->where('class_date', '>=', now()->subYear());
        //         break;
        //     case 'custom':
        //         if ($request->startDate && $request->endDate) {
        //             $queryAverageRoundDuration->whereBetween('class_date', [
        //                 Carbon::parse($request->startDate),
        //                 Carbon::parse($request->endDate)->endOfDay()
        //             ]);
        //         }
        //         break;
        //     case 'all':
        //         break;
        //     default: // month
        //     $
        // }

        return Inertia::render('Stats', [
            'totalClasses' => $totalClasses,
            'totalRollingRounds' => $totalRollingRounds,
            'totalRoundDuration' => $totalRoundDuration,
            'totalClassDuration' => $totalClassDuration,
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
