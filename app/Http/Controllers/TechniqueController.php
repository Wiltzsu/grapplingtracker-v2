<?php

namespace App\Http\Controllers;

use App\Models\Technique;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TechniqueController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Techniques/CreateTechnique');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Technique $technique)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Technique $technique)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Technique $technique)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Technique $technique)
    {
        //
    }
}
