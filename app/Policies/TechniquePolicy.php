<?php

namespace App\Policies;

use App\Models\Technique;
use App\Models\User;

class TechniquePolicy
{
    public function view(User $user, Technique $technique): bool
    {
        return $user->id === $technique->user_id;
    }

    public function update(User $user, Technique $technique): bool
    {
        return $user->id === $technique->user_id;
    }

    public function delete(User $user, Technique $technique): bool
    {
        return $user->id === $technique->user_id;
    }
}
