<?php

namespace App\Http\Controllers\Web;

use App\Actions\Fortify\UpdateUserPassword;
use App\Actions\Fortify\UpdateUserProfileInformation;
use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\PasswordUpdateRequest;
use App\Http\Requests\Settings\ProfileDeleteRequest;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Show the user's profile page.
     */
    public function show(Request $request): Response
    {
        $isAdmin = in_array($request->user()->role?->name, ['super_admin', 'admin_opd']);

        return Inertia::render('Profile/Index', [
            'isAdmin' => $isAdmin,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request, UpdateUserProfileInformation $updater): RedirectResponse
    {
        $updater->update($request->user(), $request->validated());

        return back()->with('status', 'profile-updated');
    }

    /**
     * Update the user's password.
     */
    public function updatePassword(PasswordUpdateRequest $request, UpdateUserPassword $updater): RedirectResponse
    {
        $updater->update($request->user(), $request->validated());

        return back()->with('status', 'password-updated');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(ProfileDeleteRequest $request): RedirectResponse
    {
        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
