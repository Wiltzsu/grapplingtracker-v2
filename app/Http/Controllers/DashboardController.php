<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Services\DashboardService;

class DashboardController extends Controller
{
    /**
     * Display the dashboard page.
     */
    public function index(DashboardService $dashboardService): Response
    {
        $dashboardData = $dashboardService->getDashboardData(
            auth()->id()
        );

        return Inertia::render('Dashboard', $dashboardData);
    }
}
