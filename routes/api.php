<?php

use App\Http\Controllers\Api\AnnouncementController;
use App\Http\Controllers\Api\AttendanceController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\LeaveRequestController;
use App\Http\Controllers\Api\RankingController;
use App\Http\Controllers\Api\ShiftSwapController;
use App\Http\Controllers\Api\SimpegIntegrationController;
use App\Http\Controllers\Api\StatisticController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/request-device-reset', [AuthController::class, 'requestDeviceReset']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/fcm-token', [AuthController::class, 'updateFcmToken']);

    // Presensi
    Route::post('/attendance', [AttendanceController::class, 'store']);
    Route::post('/attendance/scan-qr', [AttendanceController::class, 'scanQr']);
    Route::get('/attendance/today', [AttendanceController::class, 'today']);
    Route::get('/attendance/history', [AttendanceController::class, 'history']);
    Route::get('/attendance/schedule', [AttendanceController::class, 'getSchedule']);
    Route::get('/attendance/export-pdf', [AttendanceController::class, 'exportPdf']);
    Route::get('/supervision/live-locations', [AttendanceController::class, 'liveLocations']);

    // Pengajuan
    Route::get('/leave-requests', [LeaveRequestController::class, 'index']);
    Route::get('/leave-requests/subordinates', [LeaveRequestController::class, 'subordinatesIndex']);
    Route::post('/leave-requests', [LeaveRequestController::class, 'store']);
    Route::get('/leave-requests/{leaveRequest}', [LeaveRequestController::class, 'show']);
    Route::patch('/leave-requests/{leaveRequest}/status', [LeaveRequestController::class, 'updateStatus']);

    // Ranking
    Route::get('/ranking', [RankingController::class, 'index']);

    // Pengumuman
    Route::get('/announcements', [AnnouncementController::class, 'index']);

    // Tukar Shift
    Route::get('/shift-swaps', [ShiftSwapController::class, 'index']);
    Route::post('/shift-swaps', [ShiftSwapController::class, 'store']);
    Route::patch('/shift-swaps/{shiftSwap}/status', [ShiftSwapController::class, 'updateStatus']);

    // Stats
    Route::get('/statistics', [StatisticController::class, 'index']);

    // SIMPEG Integration API
    Route::prefix('v1/simpeg')->group(function () {
        Route::post('/sync-master', [SimpegIntegrationController::class, 'syncMasterData']);
        Route::get('/recap', [SimpegIntegrationController::class, 'getRecapForSimpeg']);
    });
});
