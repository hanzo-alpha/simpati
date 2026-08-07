<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsAdmin
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (! $user || ! in_array($user->role?->name, ['super_admin', 'admin_opd'])) {
            if ($request->wantsJson()) {
                return response()->json(['message' => 'Akses ditolak. Halaman khusus Administrator.'], 403);
            }

            return redirect()->route('dashboard')->with('error', 'Anda tidak memiliki hak akses ke Panel Admin.');
        }

        return $next($request);
    }
}
