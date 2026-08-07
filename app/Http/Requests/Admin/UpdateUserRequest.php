<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $userId = $this->route('user')?->id ?? $this->user_id;

        return [
            'nip' => 'required|string|max:18|unique:users,nip,'.$userId,
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,'.$userId,
            'password' => 'nullable|string|min:8',
            'role_id' => 'required|exists:roles,id',
            'office_id' => 'required|exists:offices,id',
            'jabatan' => 'nullable|string|max:255',
            'unit_kerja' => 'nullable|string|max:255',
            'golongan' => 'nullable|string|max:50',
            'phone' => 'nullable|string|max:20',
        ];
    }
}
