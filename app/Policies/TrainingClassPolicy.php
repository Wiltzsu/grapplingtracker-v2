<?php

namespace App\Policies;

use App\Models\TrainingClass;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class TrainingClassPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, TrainingClass $trainingClass): bool
    {
        return $user->id === $trainingClass->user_id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, TrainingClass $trainingClass): bool
    {
        return $user->id === $trainingClass->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, TrainingClass $trainingClass): bool
    {
        return $user->id === $trainingClass->user_id;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, TrainingClass $trainingClass): bool
    {
        return $user->id === $trainingClass->user_id;
    }
}
