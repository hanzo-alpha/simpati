<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class FcmService
{
    /**
     * Send push notification to a specific FCM token or array of tokens.
     */
    public static function send(string|array $tokens, string $title, string $body, array $payload = []): bool
    {
        $targetTokens = is_array($tokens) ? array_filter($tokens) : [$tokens];

        if (empty($targetTokens)) {
            return false;
        }

        // Log notification event for auditing
        Log::info('FCM Notification Dispatch', [
            'tokens_count' => count($targetTokens),
            'title' => $title,
            'body' => $body,
            'payload' => $payload,
        ]);

        $serverKey = config('services.firebase.server_key');

        if (! $serverKey) {
            // Simulated success if server key is not configured yet in local environment
            return true;
        }

        try {
            $response = Http::withHeaders([
                'Authorization' => 'key='.$serverKey,
                'Content-Type' => 'application/json',
            ])->post('https://fcm.googleapis.com/fcm/send', [
                'registration_ids' => array_values($targetTokens),
                'notification' => [
                    'title' => $title,
                    'body' => $body,
                    'sound' => 'default',
                    'badge' => 1,
                ],
                'data' => $payload,
                'priority' => 'high',
            ]);

            return $response->successful();
        } catch (\Throwable $e) {
            Log::error('FCM Notification Failed: '.$e->getMessage());

            return false;
        }
    }

    /**
     * Send push notification to a specific user.
     */
    public static function sendToUser(User $user, string $title, string $body, array $payload = []): bool
    {
        if (! $user->fcm_token) {
            return false;
        }

        return static::send($user->fcm_token, $title, $body, $payload);
    }

    /**
     * Send broadcast push notification to all active users or OPD specific users.
     */
    public static function broadcast(string $title, string $body, ?int $officeId = null, array $payload = []): int
    {
        $query = User::where('is_active', true)->whereNotNull('fcm_token');

        if ($officeId) {
            $query->where('office_id', $officeId);
        }

        $tokens = $query->pluck('fcm_token')->filter()->toArray();

        if (empty($tokens)) {
            return 0;
        }

        // Chunk tokens by 500 for FCM API limits
        $chunks = array_chunk($tokens, 500);
        $sentCount = 0;

        foreach ($chunks as $chunk) {
            if (static::send($chunk, $title, $body, $payload)) {
                $sentCount += count($chunk);
            }
        }

        return $sentCount;
    }
}
