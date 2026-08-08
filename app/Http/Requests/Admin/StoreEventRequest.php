<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreEventRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nama_kegiatan' => 'required|string|max:255',
            'penyelenggara' => 'required|string|max:255',
            'tanggal' => 'required|date',
            'jam_mulai' => 'required|string',
            'jam_selesai' => 'required|string',
            'lokasi' => 'required|string|max:255',
            'is_active' => 'nullable|boolean',
        ];
    }
}
