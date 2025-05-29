<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class LegalController extends Controller
{
    /**
     * Display the privacy policy page.
     * Renders the privacy policy view using Inertia.js.
     *
     * @return \Inertia\Response The rendered privacy policy page.
     */
    public function Policy(): Response
    {
        return Inertia::render('Legal/Policy');
    }

    /**
     * Display the terms of service page.
     * Renders the terms of service page using Inertia.js.
     *
     * @return \Inertia\Response The rendered terms of service page.
     */
    public function TermsOfService(): Response
    {
        return Inertia::render('Legal/TermsOfService');
    }
}