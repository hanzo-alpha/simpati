<?php

namespace App\Http\Controllers\Settings;

use App\Actions\Fortify\UpdateUserPassword;
use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\PasswordUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SecurityController extends Controller
{
    /**
     * Show the user's security settings page.
     */
    public function edit(Request $request): Response
    {
        $isAdmin = in_array($request->user()->role?->name, ['super_admin', 'admin_opd']);

        return Inertia::render('Settings/Security', [
            'status' => session('status'),
            'isAdmin' => $isAdmin,
        ]);
    }

    /**
     * Update the user's password.
     */
    public function update(PasswordUpdateRequest $request, UpdateUserPassword $updater): RedirectResponse
    {
        $updater->update($request->user(), $request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Password updated.')]);

        return back()->with('status', 'password-updated');
    }
}
