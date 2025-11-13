<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Services\StatsService;

class StatsController extends Controller
{
    /**
     * Display the statspage.
     *
     * @return \Inertia\Response Returns Inertia response with Stats component
     */
    public function index(Request $request, StatsService $statsService): Response
    {
        $stats = $statsService->getStats(
            auth()->id(),
            $request->range ?? 'year',
            $request->startDate,
            $request->endDate
        );

        return Inertia::render('Stats', [
            'stats' => $stats,
        ]);
    }
}
