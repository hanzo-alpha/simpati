<?php

namespace App\Http\Requests\Admin;

use App\Enums\ScheduleType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class UpdateScheduleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'type' => ['required', new Enum(ScheduleType::class)],
            'jam_masuk' => 'required|string',
            'jam_pulang' => 'required|string',
            'toleransi_terlambat' => 'required|integer',
            'is_default' => 'nullable|boolean',
        ];
    }
}
