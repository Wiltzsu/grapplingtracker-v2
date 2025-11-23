<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Http\Requests\StoreTrainingClassRequest;
use App\Http\Requests\UpdateTrainingClassRequest;
use App\Models\TrainingClass;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Category;
use App\Models\Position;
use App\Models\Technique;
use Illuminate\Http\RedirectResponse;

class TrainingClassController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of training classes.
     */
    public function index(Request $request): Response
    {
        $this->authorize('viewAny', TrainingClass::class);

        $search = $request->input('search');
        $perPage = $request->input('perPage', 15);

        return Inertia::render('TrainingClasses/Index', [
            'training_classes' => TrainingClass::search($search)
                ->where('user_id', auth()->id())
                ->orderby('class_date', 'DESC')
                ->query(function ($query) {
                    $query->with('techniques');
                })
                ->paginate($perPage),
                // Page header props for breadcrumb.
                'pageHeader' => [
                    'backRoute' => route('view'),
                    'backLabel' => 'View',
                    'sectionRoute' => null,
                    'sectionLabel' => 'Training sessions',
                ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $this->authorize('create', TrainingClass::class);

        return Inertia::render('TrainingClasses/CreateTrainingClass', [
            'categories' => Category::where('user_id', auth()->id())->get(),
            'positions' => Position::where('user_id', auth()->id())->get(),
            'training_classes' => TrainingClass::where('user_id', auth()->id())->get(),

            // Page header props for breadcrumb.
            'pageHeader' => [
                'backRoute' => route('dashboard'),
                'backLabel' => 'Dashboard',
                'sectionRoute' => null,
                'sectionLabel' => 'Add training session',
            ],
        ]);
    }

    /**
     * Store the training class in the database.
     */
    public function store(StoreTrainingClassRequest $request): RedirectResponse
    {
        $trainingClass = TrainingClass::create($request->validated());

        // Create the techniques and associate them with the training class
        if (isset($request->techniques)) {
            foreach ($request->techniques as $technique) {
                $technique['user_id'] = auth()->id();
                $technique['class_id'] = $trainingClass->class_id;
                Technique::create($technique);
            }
        }

        return back()->with('success', true);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TrainingClass $trainingclass): Response
    {
        $this->authorize('update', $trainingclass);

        return Inertia::render('TrainingClasses/EditTrainingClass', [
            // Eager load the related techniques for the class
            'training_class' => $trainingclass->load('techniques'),
            'categories' => Category::where('user_id', auth()->id())->get(),
            'positions' => Position::where('user_id', auth()->id())->get(),
            'pageHeader' => [
                'backRoute' => route('trainingclasses.index'),
                'backLabel' => 'Training sessions',
                'sectionRoute' => null,
                'sectionLabel' => ! empty( $trainingclass->instructor ) ? ( $trainingclass->instructor ) . "'s class" : 'No instructor',
            ],
        ]);
    }

    /**
     * Update the specified training class.
     */
    public function update(UpdateTrainingClassRequest $request, TrainingClass $trainingclass): RedirectResponse
    {
        $trainingclass->update($request->validated());

        // Update techniques
        if (isset($request->techniques)) {
            // Delete existing techniques first
            $trainingclass->techniques()->delete();

            foreach ($request->techniques as $technique) {
                $technique['user_id'] = auth()->id();
                $technique['class_id'] = $trainingclass->class_id;
                Technique::create($technique);
            }
        }

        return back()->with('success', true);
    }

    /**
     * Remove the specified training class.
     */
    public function destroy(TrainingClass $trainingclass): RedirectResponse
    {
        $this->authorize('delete', $trainingclass);

        $trainingclass->delete();
        return redirect(route('trainingclasses.index'));
    }
}
