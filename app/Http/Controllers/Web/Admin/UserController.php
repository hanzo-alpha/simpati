<?php

namespace App\Http\Controllers\Web\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreUserRequest;
use App\Http\Requests\Admin\UpdateUserRequest;
use App\Models\Office;
use App\Models\Role;
use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::with(['role', 'office', 'profile'])->latest();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('nip', 'like', "%{$search}%")
                    ->orWhereHas('profile', function ($pq) use ($search) {
                        $pq->where('nip', 'like', "%{$search}%");
                    });
            });
        }

        if ($request->filled('office_id')) {
            $query->where('office_id', $request->office_id);
        }

        if ($request->filled('role_id')) {
            $query->where('role_id', $request->role_id);
        }

        $users = $query->paginate(15)->withQueryString();
        $offices = Office::select('id', 'name', 'opd_name')->get();
        $roles = Role::select('id', 'name', 'display_name')->get();

        return inertia('Admin/Users', [
            'users' => $users,
            'offices' => $offices,
            'roles' => $roles,
            'filters' => $request->only(['search', 'office_id', 'role_id']),
        ]);
    }

    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'role_id' => $data['role_id'],
            'office_id' => $data['office_id'] ?? null,
        ]);

        UserProfile::create([
            'user_id' => $user->id,
            'nip' => $data['nip'] ?? null,
            'jabatan' => $data['jabatan'] ?? null,
            'unit_kerja' => $data['unit_kerja'] ?? null,
            'golongan' => $data['golongan'] ?? null,
            'sisa_cuti_tahunan' => $data['sisa_cuti_tahunan'] ?? 12,
        ]);

        return back()->with('success', 'Pegawai ASN berhasil ditambahkan.');
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();

        $user->update([
            'name' => $data['name'],
            'email' => $data['email'],
            'role_id' => $data['role_id'],
            'office_id' => $data['office_id'] ?? null,
        ]);

        if (! empty($data['password'])) {
            $user->update(['password' => Hash::make($data['password'])]);
        }

        $user->profile()->updateOrCreate(
            ['user_id' => $user->id],
            [
                'nip' => $data['nip'] ?? null,
                'jabatan' => $data['jabatan'] ?? null,
                'unit_kerja' => $data['unit_kerja'] ?? null,
                'golongan' => $data['golongan'] ?? null,
            ]
        );

        return back()->with('success', 'Data pegawai ASN berhasil diperbarui.');
    }

    public function toggle(User $user)
    {
        $user->update(['is_active' => ! $user->is_active]);

        $statusStr = $user->is_active ? 'diaktifkan' : 'dinonaktifkan';

        return back()->with('success', "Akun {$user->name} berhasil {$statusStr}.");
    }

    public function resetDeviceBinding(User $user)
    {
        $user->update(['device_id' => null]);

        return back()->with('success', "Device binding untuk {$user->name} berhasil direset.");
    }
}
