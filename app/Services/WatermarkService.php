<?php

namespace App\Services;

class WatermarkService
{
    /**
     * Apply security watermark text overlay to an image file.
     */
    public static function applyWatermark(
        string $absolutePath,
        string $nama,
        string $nip,
        float $lat,
        float $lng,
        ?string $timestamp = null
    ): bool {
        if (! file_exists($absolutePath)) {
            return false;
        }

        $imageInfo = @getimagesize($absolutePath);
        if (! $imageInfo) {
            return false;
        }

        $mime = $imageInfo['mime'];
        $image = match ($mime) {
            'image/jpeg', 'image/jpg' => @imagecreatefromjpeg($absolutePath),
            'image/png' => @imagecreatefrompng($absolutePath),
            'image/webp' => @imagecreatefromwebp($absolutePath),
            default => null,
        };

        if (! $image) {
            return false;
        }

        $width = imagesx($image);
        $height = imagesy($image);

        // Banner height at bottom (12% of image height, minimum 55px)
        $bannerHeight = max(55, (int) ($height * 0.12));
        $bannerY = $height - $bannerHeight;

        // Semi-transparent dark slate background
        $bg = imagecolorallocatealpha($image, 15, 23, 42, 30);
        imagefilledrectangle($image, 0, $bannerY, $width, $height, $bg);

        // Text colors
        $white = imagecolorallocate($image, 255, 255, 255);
        $emerald = imagecolorallocate($image, 16, 185, 129);

        $timeStr = $timestamp ?? now('Asia/Makassar')->format('d/m/Y H:i:s').' WITA';
        $line1 = "SIMPATI VERIFIED - {$nama} ({$nip})";
        $line2 = "GPS: {$lat}, {$lng} | {$timeStr}";

        imagestring($image, 4, 15, $bannerY + 8, $line1, $emerald);
        imagestring($image, 3, 15, $bannerY + 30, $line2, $white);

        match ($mime) {
            'image/jpeg', 'image/jpg' => imagejpeg($image, $absolutePath, 85),
            'image/png' => imagepng($image, $absolutePath, 8),
            'image/webp' => imagewebp($image, $absolutePath, 85),
            default => imagejpeg($image, $absolutePath, 85),
        };

        imagedestroy($image);

        return true;
    }
}
