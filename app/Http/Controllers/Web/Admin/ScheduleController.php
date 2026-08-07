<?php

namespace App\Http\Controllers\Web\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreScheduleRequest;
use App\Http\Requests\Admin\UpdateScheduleRequest;
use App\Models\Office;
use App\Models\WorkSchedule;

class ScheduleController extends Controller
{
    public function index()
    {
        $schedules = WorkSchedule::with('office')->get();
        $offices = Office::all();

        return inertia('Admin/Schedules', [
            'schedules' => $schedules,
            'offices' => $offices,
        ]);
    }

    public function store(StoreScheduleRequest $request)
    {
        if ($request->office_id === 'global' || $request->office_id === '') {
            $request->merge(['office_id' => null]);
        }

        $data = $request->validated();

        WorkSchedule::create($data);

        return back()->with('success', 'Jadwal kerja berhasil dibuat.');
    }

    public function update(UpdateScheduleRequest $request, WorkSchedule $schedule)
    {
        if ($request->office_id === 'global' || $request->office_id === '') {
            $request->merge(['office_id' => null]);
        }

        $data = $request->validated();

        $schedule->update($data);

        return back()->with('success', 'Jadwal kerja berhasil diperbarui.');
    }

    public function destroy(WorkSchedule $schedule)
    {
        $schedule->delete();

        return back()->with('success', 'Jadwal kerja berhasil dihapus.');
    }
}
