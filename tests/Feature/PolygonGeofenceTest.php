<?php

namespace Tests\Feature;

use App\Models\Office;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PolygonGeofenceTest extends TestCase
{
    use RefreshDatabase;

    public function test_polygon_geofence_validates_point_inside_polygon(): void
    {
        // Define a square polygon around Kantor Bupati Soppeng
        $polygon = [
            ['lat' => -4.3410, 'lng' => 120.0110],
            ['lat' => -4.3410, 'lng' => 120.0150],
            ['lat' => -4.3450, 'lng' => 120.0150],
            ['lat' => -4.3450, 'lng' => 120.0110],
        ];

        $office = Office::create([
            'name' => 'Kantor Bupati Soppeng',
            'opd_name' => 'Setda Pemkab Soppeng',
            'latitude' => -4.3422,
            'longitude' => 120.0123,
            'radius_meters' => 100,
            'polygon_coordinates' => $polygon,
        ]);

        // Point inside polygon
        $this->assertTrue($office->isWithinRadius(-4.3425, 120.0125));

        // Point outside polygon
        $this->assertFalse($office->isWithinRadius(-4.3500, 120.0200));
    }

    public function test_falls_back_to_radius_meters_when_polygon_is_empty(): void
    {
        $office = Office::create([
            'name' => 'Kantor Dinas Kesehatan',
            'opd_name' => 'Dinkes Soppeng',
            'latitude' => -4.3422000,
            'longitude' => 120.0123000,
            'radius_meters' => 200,
            'polygon_coordinates' => null,
        ]);

        // Point within 100 meters (inside radius)
        $this->assertTrue($office->isWithinRadius(-4.3422500, 120.0123500));

        // Point far away (outside radius)
        $this->assertFalse($office->isWithinRadius(-4.3600000, 120.0500000));
    }
}
