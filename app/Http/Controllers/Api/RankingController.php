<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\RankingService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RankingController extends Controller
{
    /**
     * Get ranking leaderboard.
     */
    public function index(Request $request): JsonResponse
    {
        $request->validate([
            'scope' => 'required|in:opd,kabupaten',
            'month' => 'nullable|integer|min:1|max:12',
            'year' => 'nullable|integer|min:2020',
        ]);

        $scope = $request->input('scope');
        $month = $request->has('month') ? $request->input('month') : now()->month;
        $year = $request->input('year', now()->year);
        $user = $request->user();

        // Base query for users
        $query = User::with(['office', 'role'])
            ->whereHas('role', function ($q) {
                $q->where('name', 'asn');
            });

        if ($scope === 'opd') {
            $query->where('office_id', $user->office_id);
        }

        $users = $query->get();
        $leaderboard = [];
        $rankingService = new RankingService;

        foreach ($users as $u) {
            $result = $rankingService->calculateScore($u->id, $month, $year);
            $leaderboard[] = [
                'user_id' => $u->id,
                'name' => $u->name,
                'nip' => $u->nip,
                'opd_name' => $u->office->opd_name ?? '-',
                'score' => $result['score'],
                'is_zero_alpha' => $result['is_zero_alpha'],
                'details' => $result['details'],
                'avatar' => null, // Placeholder for future avatar
                'badge' => $rankingService->getBadge($result['score'], $result['is_zero_alpha']),
            ];
        }

        // Sort by score descending
        usort($leaderboard, function ($a, $b) {
            return $b['score'] <=> $a['score'];
        });

        // Limit to Top 20
        $leaderboard = array_slice($leaderboard, 0, 20);

        // Add rank
        foreach ($leaderboard as $index => &$item) {
            $item['rank'] = $index + 1;
        }

        return response()->json([
            'month' => $month,
            'year' => $year,
            'scope' => $scope,
            'leaderboard' => $leaderboard,
        ]);
    }
}
