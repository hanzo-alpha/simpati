<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Login via NIP + Password and return Sanctum token.
     */
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'nip' => 'required|string',
            'password' => 'required|string',
            'device_id' => 'nullable|string',
        ]);

        $user = User::where('nip', $request->nip)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'nip' => ['NIP atau password salah.'],
            ]);
        }

        if (! $user->is_active) {
            throw ValidationException::withMessages([
                'nip' => ['Akun Anda tidak aktif. Hubungi admin.'],
            ]);
        }

        // Single Device Binding logic
        if ($request->filled('device_id')) {
            if (empty($user->device_id)) {
                $user->update(['device_id' => $request->device_id]);
            } elseif ($user->device_id !== $request->device_id) {
                throw ValidationException::withMessages([
                    'nip' => ['Akun NIP ini terikat pada HP lain. Hubungi Admin OPD untuk reset HP.'],
                ]);
            }
        }

        // Revoke old tokens
        $user->tokens()->delete();

        $token = $user->createToken('simpati-mobile')->plainTextToken;

        return response()->json([
            'message' => 'Login berhasil',
            'user' => $user->load(['role', 'office', 'profile']),
            'token' => $token,
        ]);
    }

    /**
     * Public endpoint for ASN to request device reset when changing phones.
     */
    public function requestDeviceReset(Request $request): JsonResponse
    {
        $request->validate([
            'nip' => 'required|string',
            'password' => 'required|string',
            'alasan' => 'required|string',
        ]);

        $user = User::where('nip', $request->nip)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'NIP atau password tidak valid.'], 422);
        }

        // Reset device ID binding for the user upon verified password
        $oldDevice = $user->device_id;
        $user->update(['device_id' => null]);

        // Audit Log
        Log::info("Self-service device binding reset by NIP {$user->nip}. Old device ID: {$oldDevice}. Reason: {$request->alasan}", [
            'user_id' => $user->id,
            'action' => 'device_reset_request',
            'ip' => $request->ip(),
        ]);

        return response()->json([
            'message' => 'Tautan perangkat HP lama berhasil di-reset! Silakan login kembali di HP baru Anda.',
        ]);
    }

    /**
     * Get authenticated user profile.
     */
    public function me(Request $request): JsonResponse
    {
        return response()->json([
            'user' => $request->user()->load(['role', 'office', 'profile']),
        ]);
    }

    /**
     * Logout and revoke current token.
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout berhasil',
        ]);
    }

    /**
     * Update user's FCM token for push notifications.
     */
    public function updateFcmToken(Request $request): JsonResponse
    {
        $request->validate([
            'fcm_token' => 'required|string',
        ]);

        $request->user()->update([
            'fcm_token' => $request->fcm_token,
        ]);

        return response()->json([
            'message' => 'FCM token updated successfully',
        ]);
    }
}
