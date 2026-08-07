<?php

namespace App\Http\Controllers\Web\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreOfficeRequest;
use App\Http\Requests\Admin\UpdateOfficeRequest;
use App\Models\Office;

class OfficeController extends Controller
{
    public function index()
    {
        $offices = Office::with(['parent', 'subOffices'])->latest()->get();

        return inertia('Admin/Offices', [
            'offices' => $offices,
        ]);
    }

    public function store(StoreOfficeRequest $request)
    {
        if ($request->parent_id === 'none' || $request->parent_id === '') {
            $request->merge(['parent_id' => null]);
        }

        $data = $request->validated();

        Office::create($data);

        return back()->with('success', 'Data Kantor / OPD berhasil ditambahkan.');
    }

    public function update(UpdateOfficeRequest $request, Office $office)
    {
        if ($request->parent_id === 'none' || $request->parent_id === '') {
            $request->merge(['parent_id' => null]);
        }

        $data = $request->validated();

        $office->update($data);

        return back()->with('success', 'Data Kantor / OPD berhasil diperbarui.');
    }

    public function destroy(Office $office)
    {
        if ($office->users()->count() > 0) {
            return back()->withErrors(['office' => 'Kantor/OPD tidak dapat dihapus karena masih digunakan oleh pegawai.']);
        }

        $office->delete();

        return back()->with('success', 'Data Kantor / OPD berhasil dihapus.');
    }
}
