<?php

use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Web\AdminController;
use App\Http\Controllers\Web\AttendanceController;
use App\Http\Controllers\Web\DashboardController;
use App\Http\Controllers\Web\LeaveRequestController;
use App\Models\Attendance;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return inertia('Welcome');
});

// Auth routes
Route::get('/login', function () {
    return inertia('Auth/Login');
})->name('login');

Route::post('/login', function (Request $request) {
    $credentials = $request->validate([
        'nip' => 'required|string',
        'password' => 'required|string',
    ]);

    $user = User::where('nip', $credentials['nip'])->first();

    if (! $user || ! Hash::check($credentials['password'], $user->password)) {
        return back()->withErrors(['nip' => 'NIP atau password salah.']);
    }

    if (! $user->is_active) {
        return back()->withErrors(['nip' => 'Akun tidak aktif.']);
    }

    auth()->login($user);
    $request->session()->regenerate();

    // Redirect admin to admin panel
    if (in_array($user->role?->name, ['super_admin', 'admin_opd'])) {
        return redirect('/admin');
    }

    return redirect('/dashboard');
});

Route::post('/logout', function (Request $request) {
    auth()->logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return redirect('/login');
})->name('logout');

// Protected routes (ASN)
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/riwayat', [AttendanceController::class, 'riwayat'])->name('riwayat');
    Route::get('/statistik', [AttendanceController::class, 'statistik'])->name('statistik');
    Route::get('/peringkat', [AttendanceController::class, 'peringkat'])->name('peringkat');
    Route::get('/presensi', function (Request $request) {
        $todayAttendances = Attendance::where('user_id', $request->user()->id)
            ->where('tanggal', now()->toDateString())
            ->orderBy('waktu')
            ->get();

        return inertia('Attendance/Presensi', [
            'todayAttendances' => $todayAttendances,
            'office' => $request->user()->office,
        ]);
    })->name('presensi');

    Route::get('/pengajuan', [LeaveRequestController::class, 'index'])->name('pengajuan.index');
    Route::get('/pengajuan/buat', [LeaveRequestController::class, 'create'])->name('pengajuan.create');
    Route::post('/pengajuan', [LeaveRequestController::class, 'store'])->name('pengajuan.store');

    Route::get('/profil', [ProfileController::class, 'show'])->name('profil');
    Route::put('/profil', [ProfileController::class, 'update'])->name('profil.update');
    Route::put('/profil/password', [ProfileController::class, 'updatePassword'])->name('profil.password');
    Route::delete('/profil', [ProfileController::class, 'destroy'])->name('profil.destroy');
});

// Admin Panel Routes
Route::middleware(['auth'])->prefix('admin')->group(function () {
    Route::get('/', [AdminController::class, 'dashboard'])->name('admin.dashboard');

    // Offices
    Route::get('/offices', [AdminController::class, 'offices'])->name('admin.offices');
    Route::post('/offices', [AdminController::class, 'storeOffice']);
    Route::put('/offices/{office}', [AdminController::class, 'updateOffice']);
    Route::delete('/offices/{office}', [AdminController::class, 'destroyOffice']);

    // Users
    Route::get('/users', [AdminController::class, 'users'])->name('admin.users');
    Route::post('/users', [AdminController::class, 'storeUser']);
    Route::put('/users/{user}', [AdminController::class, 'updateUser']);
    Route::put('/users/{user}/toggle', [AdminController::class, 'toggleUser']);
    Route::put('/users/{user}/reset-device', [AdminController::class, 'resetDeviceBinding']);

    // Attendances
    Route::get('/attendances', [AdminController::class, 'attendances'])->name('admin.attendances');
    Route::get('/attendances/export', [AdminController::class, 'exportAttendances'])->name('admin.attendances.export');
    Route::get('/attendances/export-tpp', [AdminController::class, 'exportTppReport'])->name('admin.attendances.export-tpp');
    Route::get('/attendances/export-recap', [AdminController::class, 'exportAttendanceRecap'])->name('admin.attendances.export-recap');
    Route::get('/attendances/export-summary', [AdminController::class, 'exportAttendanceSummary'])->name('admin.attendances.export-summary');
    Route::post('/attendances/verify-qr', [AdminController::class, 'verifyQrCode'])->name('admin.attendances.verify-qr');

    // Leave Requests
    Route::get('/leave-requests', [AdminController::class, 'leaveRequests'])->name('admin.leave-requests');
    Route::put('/leave-requests/{leaveRequest}', [AdminController::class, 'updateLeaveRequest']);

    // Work Schedules
    Route::get('/schedules', [AdminController::class, 'schedules'])->name('admin.schedules');
    Route::post('/schedules', [AdminController::class, 'storeSchedule']);
    Route::put('/schedules/{schedule}', [AdminController::class, 'updateSchedule']);
    Route::delete('/schedules/{schedule}', [AdminController::class, 'destroySchedule']);

    // Announcements / Broadcast Edaran
    Route::get('/announcements', [AdminController::class, 'announcements'])->name('admin.announcements');
    Route::post('/announcements', [AdminController::class, 'storeAnnouncement']);
    Route::delete('/announcements/{announcement}', [AdminController::class, 'destroyAnnouncement']);

    // Shift Swap Management
    Route::get('/shift-swaps', [AdminController::class, 'shiftSwaps'])->name('admin.shift-swaps');
    Route::put('/shift-swaps/{shiftSwap}', [AdminController::class, 'updateShiftSwapStatus']);

    // Attendance Corrections (Koreksi Presensi) Management
    Route::get('/attendance-corrections', [AdminController::class, 'attendanceCorrections'])->name('admin.attendance-corrections');
    Route::put('/attendance-corrections/{attendanceCorrection}', [AdminController::class, 'updateAttendanceCorrectionStatus']);

    // Presensi Apel / Event / Upacara
    Route::get('/events', [AdminController::class, 'events'])->name('admin.events');
    Route::post('/events', [AdminController::class, 'storeEvent'])->name('admin.events.store');

    // Security Audit Logs
    Route::get('/audit-logs', [AdminController::class, 'auditLogs'])->name('admin.audit-logs');

    // Peringkat Kehadiran
    Route::get('/peringkat', [AttendanceController::class, 'peringkat'])->name('admin.peringkat');

    // System Settings
    Route::get('/settings', [AdminController::class, 'settings'])->name('admin.settings');
    Route::post('/settings', [AdminController::class, 'updateSettings'])->name('admin.settings.update');
    Route::post('/settings/test-simpeg', [AdminController::class, 'testSimpegConnection'])->name('admin.settings.test-simpeg');

    // Profile Page for Admin
    Route::get('/profil', [ProfileController::class, 'edit'])->name('admin.profil');
});

require __DIR__.'/settings.php';
