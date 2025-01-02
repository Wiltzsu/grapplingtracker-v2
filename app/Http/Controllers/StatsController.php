<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StatsController extends Controller
{
    /**
     * Display the statspage.
     *
     * @return \Inertia\Response Returns Inertia response with Stats component
     */
    public function index(): Response
    {
        return Inertia::render('Stats');
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
