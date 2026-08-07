<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreOfficeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'opd_name' => 'required|string|max:255',
            'parent_id' => 'nullable|exists:offices,id',
            'unit_code' => 'nullable|string|max:50',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'radius_meters' => 'required|integer',
            'polygon_coordinates' => 'nullable|array',
            'alamat' => 'nullable|string',
        ];
    }
}
