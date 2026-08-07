<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class GenerateAttendanceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'user_id' => 'required|exists:users,id',
            'tanggal' => 'required|date',
            'jenis' => 'required|in:masuk,pulang,wfh,dinas_luar,istirahat,kembali',
            'waktu' => 'required|string',
            'status' => 'required|in:tepat_waktu,terlambat,sangat_terlambat,pulang_cepat,alpha',
            'keterangan' => 'nullable|string',
        ];
    }
}
