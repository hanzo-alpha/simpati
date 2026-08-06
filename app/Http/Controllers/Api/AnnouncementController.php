<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AnnouncementController extends Controller
{
    /**
     * Get active broadcast announcements for user's OPD / all OPDs.
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        $officeId = $user->office_id;

        $announcements = Announcement::where('is_active', true)
            ->where(function ($q) use ($officeId) {
                $q->whereNull('office_id')
                    ->orWhere('office_id', $officeId);
            })
            ->where(function ($q) {
                $q->whereNull('expires_at')
                    ->orWhere('expires_at', '>=', now());
            })
            ->orderBy('published_at', 'desc')
            ->get();

        return response()->json([
            'announcements' => $announcements,
        ]);
    }
}
