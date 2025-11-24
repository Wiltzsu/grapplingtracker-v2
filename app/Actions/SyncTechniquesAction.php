<?php

namespace App\Actions;

use App\Models\Technique;
use App\Models\TrainingClass;

class SyncTechniquesAction
{
    /**
     * Sync techniques for a training class
     */
    public function execute(TrainingClass $trainingClass, array $techniques, int $userId): void
    {
        foreach ($techniques as $technique) {
            Technique::create([
                'user_id' => $userId,
                'class_id' => $trainingClass->class_id,
                'technique_name' => $technique['technique_name'],
                'technique_description' => $technique['technique_description'],
                'category_id' => $technique['category_id'],
                'position_id' => $technique['position_id'],
            ]);
        }
    }
}
