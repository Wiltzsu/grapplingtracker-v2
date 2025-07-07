<?php

use App\Models\TrainingClass;
use App\Models\Technique;

/**
 * Laravel Scout Configuration
 *
 * This file configures the search functionality for the application using Laravel Scout.
 * It defines settings for Meilisearch, including searchable attributes, filterable attributes,
 * and sortable attributes for each model.
 */
return [
    /**
     * The default search driver to use.
     * Currently set to use Meilisearch as the search engine.
     */
    'driver' => env('SCOUT_DRIVER', 'meilisearch'),

    /**
     * Meilisearch Configuration
     *
     * Settings for the Meilisearch search engine, including:
     * - Host configuration
     * - API key
     * - Index-specific settings for each model
     */
    'meilisearch' => [
        /**
         * The host URL for the Meilisearch server.
         * Defaults to localhost on port 7700.
         */
        'host' => env('MEILISEARCH_HOST', 'http://127.0.0.1:7700'),

        /**
         * The API key for Meilisearch authentication.
         * Can be set in the .env file.
         */
        'key' => env('MEILISEARCH_KEY', null),

        /**
         * Index-specific settings for each model.
         * Defines how each model's data should be indexed and searched.
         */
        'index-settings' => [
            /**
             * TrainingClass Model Settings
             *
             * Defines how training classes are indexed and searched:
             * - Filterable by user_id
             * - Sortable by class_date and created_at
             * - Searchable across instructor, location, class description,
             *   and related technique names and descriptions
             */
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

            /**
             * Technique Model Settings
             *
             * Defines how techniques are indexed and searched:
             * - Filterable by user_id
             * - Sortable by created_at
             * - Searchable across technique name, description,
             *   category name, position name, and location
             */
            Technique::class => [
                'filterableAttributes' => ['user_id'],
                'sortableAttributes' => ['created_at'],
                'searchableAttributes' => [
                    'technique_name',
                    'technique_description',
                    'category_name',
                    'position_name',
                    'location',
                ]
            ]
        ],
    ],
];