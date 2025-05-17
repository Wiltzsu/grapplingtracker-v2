<?php

use App\Models\TrainingClass;

return [
    'driver' => env('SCOUT_DRIVER', 'meilisearch'),

    'meilisearch' => [
        'host' => env('MEILISEARCH_HOST', 'http://127.0.0.1:7700'),
        'key' => env('MEILISEARCH_KEY', null),
        'index-settings' => [
            TrainingClass::class => [
                'filterableAttributes' => ['user_id'],
                'sortableAttributes' => ['class_date', 'created_at'],
                'searchableAttributes' => [
                    'instructor',
                    'location',
                    'class_description',
                    'techniques.name',
                    'techniques.description'
                ],
            ],
        ],
    ],
];