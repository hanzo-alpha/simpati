<?php

use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\SecurityController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth'])->group(function () {
    Route::redirect('settings', '/profil');

    // Profile Settings
    Route::get('profil', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::get('profil', [ProfileController::class, 'edit'])->name('profil');
    Route::patch('profil', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('profil', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Security / Password Settings
    Route::get('settings/security', [SecurityController::class, 'edit'])->name('security.edit');
    Route::put('profil/password', [SecurityController::class, 'update'])
        ->middleware('throttle:6,1')
        ->name('user-password.update');

    // Appearance / Theme Preference Settings
    Route::get('settings/appearance', function (Request $request) {
        $isAdmin = in_array($request->user()->role?->name, ['super_admin', 'admin_opd']);

        return Inertia::render('Settings/Appearance', ['isAdmin' => $isAdmin]);
    })->name('appearance.edit');
});
