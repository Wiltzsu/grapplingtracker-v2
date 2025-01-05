<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the dashboard page.
     *
     * @return \Inertia\Response Returns Inertia response with Stats component
     */
    public function index(): Response
    {
        return Inertia::render('Dashboard');
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
