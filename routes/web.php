<?php

use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Web\Admin\AnnouncementController as AdminAnnouncementController;
use App\Http\Controllers\Web\Admin\AttendanceController as AdminAttendanceController;
use App\Http\Controllers\Web\Admin\AuditLogController as AdminAuditLogController;
use App\Http\Controllers\Web\Admin\CorrectionController as AdminCorrectionController;
use App\Http\Controllers\Web\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Web\Admin\EventController as AdminEventController;
use App\Http\Controllers\Web\Admin\LeaveRequestController as AdminLeaveRequestController;
use App\Http\Controllers\Web\Admin\OfficeController as AdminOfficeController;
use App\Http\Controllers\Web\Admin\ScheduleController as AdminScheduleController;
use App\Http\Controllers\Web\Admin\SettingController as AdminSettingController;
use App\Http\Controllers\Web\Admin\ShiftSwapController as AdminShiftSwapController;
use App\Http\Controllers\Web\Admin\UserController as AdminUserController;
use App\Http\Controllers\Web\AttendanceController;
use App\Http\Controllers\Web\AuthController;
use App\Http\Controllers\Web\DashboardController;
use App\Http\Controllers\Web\LeaveRequestController;
use Illuminate\Support\Facades\Route;

Route::get('/', fn () => inertia('Welcome'))->name('welcome');

// Authentication Routes
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'create'])->name('login');
    Route::post('/login', [AuthController::class, 'store']);
});
Route::post('/logout', [AuthController::class, 'destroy'])->name('logout');

// Protected Routes (ASN)
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/riwayat', [AttendanceController::class, 'riwayat'])->name('riwayat');
    Route::get('/statistik', [AttendanceController::class, 'statistik'])->name('statistik');
    Route::get('/peringkat', [AttendanceController::class, 'peringkat'])->name('peringkat');
    Route::get('/presensi', [AttendanceController::class, 'presensi'])->name('presensi');

    Route::get('/pengajuan', [LeaveRequestController::class, 'index'])->name('pengajuan.index');
    Route::get('/pengajuan/buat', [LeaveRequestController::class, 'create'])->name('pengajuan.create');
    Route::post('/pengajuan', [LeaveRequestController::class, 'store'])->name('pengajuan.store');

    Route::get('/profil', [ProfileController::class, 'show'])->name('profil');
    Route::put('/profil', [ProfileController::class, 'update'])->name('profil.update');
    Route::put('/profil/password', [ProfileController::class, 'updatePassword'])->name('profil.password');
    Route::delete('/profil', [ProfileController::class, 'destroy'])->name('profil.destroy');
});

// Admin Panel Routes
Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () {
    Route::get('/', [AdminDashboardController::class, 'index'])->name('admin.dashboard');

    // Offices
    Route::get('/offices', [AdminOfficeController::class, 'index'])->name('admin.offices');
    Route::post('/offices', [AdminOfficeController::class, 'store']);
    Route::put('/offices/{office}', [AdminOfficeController::class, 'update']);
    Route::delete('/offices/{office}', [AdminOfficeController::class, 'destroy']);

    // Users
    Route::get('/users', [AdminUserController::class, 'index'])->name('admin.users');
    Route::post('/users', [AdminUserController::class, 'store']);
    Route::put('/users/{user}', [AdminUserController::class, 'update']);
    Route::put('/users/{user}/toggle', [AdminUserController::class, 'toggle']);
    Route::put('/users/{user}/reset-device', [AdminUserController::class, 'resetDeviceBinding']);

    // Attendances
    Route::get('/attendances', [AdminAttendanceController::class, 'index'])->name('admin.attendances');
    Route::get('/attendances/export', [AdminAttendanceController::class, 'exportAttendances'])->name('admin.attendances.export');
    Route::get('/attendances/export-tpp', [AdminAttendanceController::class, 'exportTppReport'])->name('admin.attendances.export-tpp');
    Route::get('/attendances/export-recap', [AdminAttendanceController::class, 'exportAttendanceRecap'])->name('admin.attendances.export-recap');
    Route::post('/attendances/verify-qr', [AdminAttendanceController::class, 'verifyQrCode'])->name('admin.attendances.verify-qr');

    // Leave Requests
    Route::get('/leave-requests', [AdminLeaveRequestController::class, 'index'])->name('admin.leave-requests');
    Route::put('/leave-requests/{leaveRequest}', [AdminLeaveRequestController::class, 'update']);

    // Work Schedules
    Route::get('/schedules', [AdminScheduleController::class, 'index'])->name('admin.schedules');
    Route::post('/schedules', [AdminScheduleController::class, 'store']);
    Route::put('/schedules/{schedule}', [AdminScheduleController::class, 'update']);
    Route::delete('/schedules/{schedule}', [AdminScheduleController::class, 'destroy']);

    // Announcements / Broadcast Edaran
    Route::get('/announcements', [AdminAnnouncementController::class, 'index'])->name('admin.announcements');
    Route::post('/announcements', [AdminAnnouncementController::class, 'store']);
    Route::put('/announcements/{announcement}', [AdminAnnouncementController::class, 'update']);
    Route::delete('/announcements/{announcement}', [AdminAnnouncementController::class, 'destroy']);

    // Shift Swap Management
    Route::get('/shift-swaps', [AdminShiftSwapController::class, 'index'])->name('admin.shift-swaps');
    Route::put('/shift-swaps/{shiftSwap}', [AdminShiftSwapController::class, 'updateStatus']);

    // Attendance Corrections Management
    Route::get('/attendance-corrections', [AdminCorrectionController::class, 'index'])->name('admin.attendance-corrections');
    Route::put('/attendance-corrections/{attendanceCorrection}', [AdminCorrectionController::class, 'updateStatus']);

    // Presensi Apel / Event / Upacara
    Route::get('/events', [AdminEventController::class, 'index'])->name('admin.events');
    Route::post('/events', [AdminEventController::class, 'store'])->name('admin.events.store');
    Route::put('/events/{eventPresensi}', [AdminEventController::class, 'update'])->name('admin.events.update');
    Route::delete('/events/{eventPresensi}', [AdminEventController::class, 'destroy'])->name('admin.events.destroy');

    // Security Audit Logs
    Route::get('/audit-logs', [AdminAuditLogController::class, 'index'])->name('admin.audit-logs');

    // Peringkat Kehadiran
    Route::get('/peringkat', [AttendanceController::class, 'peringkat'])->name('admin.peringkat');

    // System Settings
    Route::get('/settings', [AdminSettingController::class, 'index'])->name('admin.settings');
    Route::post('/settings', [AdminSettingController::class, 'update'])->name('admin.settings.update');
    Route::post('/settings/test-simpeg', [AdminSettingController::class, 'testSimpegConnection'])->name('admin.settings.test-simpeg');

    // Profile Page for Admin
    Route::get('/profil', [ProfileController::class, 'edit'])->name('admin.profil');
});

require __DIR__.'/settings.php';
