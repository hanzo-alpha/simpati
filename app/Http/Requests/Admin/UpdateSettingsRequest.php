<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSettingsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'app_name' => 'required|string|max:255',
            'app_tagline' => 'required|string|max:255',
            'pemda_name' => 'required|string|max:255',
            'admin_email' => 'required|email',
            'admin_phone' => 'required|string',

            'jam_buka_masuk' => 'required|string',
            'jam_cutoff_harian' => 'required|string',
            'toleransi_menit' => 'required|numeric',
            'potongan_terlambat' => 'required|numeric',
            'potongan_sangat_terlambat' => 'nullable|numeric',
            'potongan_psw' => 'nullable|numeric',
            'potongan_tk' => 'required|numeric',
            'potongan_max_tpp' => 'nullable|numeric',

            'device_binding_enabled' => 'required|boolean',
            'fake_gps_block_enabled' => 'required|boolean',
            'allow_rear_camera' => 'nullable|boolean',
            'allow_gallery_upload' => 'nullable|boolean',
            'min_mobile_version' => 'required|string',
            'force_mobile_update' => 'required|boolean',

            'simpeg_api_url' => 'required|string',
            'simpeg_secret_key' => 'required|string',
            'simpeg_auto_sync' => 'required|boolean',
        ];
    }
}
