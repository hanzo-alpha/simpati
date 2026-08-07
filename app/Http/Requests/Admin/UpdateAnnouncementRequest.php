<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAnnouncementRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'office_id' => 'nullable|exists:offices,id',
            'judul' => 'required|string|max:255',
            'konten' => 'nullable|string',
            'isi' => 'nullable|string',
            'kategori' => 'nullable|in:informasi,penting,darurat',
            'pinned' => 'nullable|boolean',
        ];
    }
}
