<?php

namespace Tests\Feature;

use Tests\TestCase;

class ApiHealthTest extends TestCase
{
    /**
     * Test that the API health endpoint returns a successful response.
     */
    public function test_api_health_endpoint_returns_successful_response(): void
    {
        $response = $this->get('/api/health');

        $response->assertStatus(200);
        $response->assertJson([
            'status' => 'ok',
            'version' => '1.0.0'
        ]);
        $response->assertJsonStructure([
            'status',
            'timestamp',
            'version'
        ]);
    }

    /**
     * Test that the API health endpoint returns valid JSON.
     */
    public function test_api_health_endpoint_returns_valid_json(): void
    {
        $response = $this->get('/api/health');

        $response->assertStatus(200);
        $response->assertHeader('content-type', 'application/json');

        $data = $response->json();
        $this->assertIsString($data['timestamp']);
        $this->assertIsString($data['status']);
        $this->assertIsString($data['version']);
    }

    /**
     * Test that the API health endpoint timestamp is recent.
     */
    public function test_api_health_endpoint_timestamp_is_recent(): void
    {
        $response = $this->get('/api/health');

        $response->assertStatus(200);

        $data = $response->json();
        $timestamp = \Carbon\Carbon::parse($data['timestamp']);

        // Check that the timestamp is within the last minute
        $this->assertTrue($timestamp->isAfter(now()->subMinute()));
        $this->assertTrue($timestamp->isBefore(now()->addMinute()));
    }
}
