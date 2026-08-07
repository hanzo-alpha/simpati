<?php

namespace Tests\Unit;

use App\Services\WatermarkService;
use Tests\TestCase;

class WatermarkServiceTest extends TestCase
{
    public function test_watermark_service_applies_watermark_to_valid_jpeg_image(): void
    {
        // Create a temporary test GD image
        $tempPath = sys_get_temp_dir().'/test_selfie_'.uniqid().'.jpg';
        $image = imagecreatetruecolor(400, 400);
        $blue = imagecolorallocate($image, 0, 102, 204);
        imagefill($image, 0, 0, $blue);
        imagejpeg($image, $tempPath);
        imagedestroy($image);

        $result = WatermarkService::applyWatermark(
            $tempPath,
            'Dr. H. Andi Sukri, M.Si',
            '198501012010011005',
            -4.342200,
            120.012300,
            '07/08/2026 11:30:00 WITA'
        );

        $this->assertTrue($result);
        $this->assertFileExists($tempPath);

        // Clean up
        @unlink($tempPath);
    }
}
