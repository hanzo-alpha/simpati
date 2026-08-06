# 🏛️ SIMPATI - Sistem Informasi Presensi ASN Terpadu

[![Laravel CI](https://github.com/hanzo-alpha/simpati/actions/workflows/ci.yml/badge.svg)](https://github.com/hanzo-alpha/simpati/actions/workflows/ci.yml)
[![PHP Version](https://img.shields.io/badge/PHP-8.3%20%7C%208.5-777BB4?style=flat&logo=php)](https://php.net)
[![Laravel Version](https://img.shields.io/badge/Laravel-12.x-FF2D20?style=flat&logo=laravel)](https://laravel.com)
[![Vue Version](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=flat&logo=vuedotjs)](https://vuejs.org)
[![Inertia Version](https://img.shields.io/badge/Inertia.js-v3-9553E9?style=flat&logo=inertia)](https://inertiajs.com)
[![Mobile Repo](https://img.shields.io/badge/Flutter_App-simpati--mobile-02569B?style=flat&logo=flutter)](https://github.com/hanzo-alpha/simpati-mobile)

**SIMPATI** (Sistem Informasi Presensi ASN Terpadu) adalah platform manajemen kepegawaian, presensi digital geofencing GPS, dan otomatisasi kalkulasi TPP (*Tambahan Penghasilan Pegawai*) terpadu untuk Pemerintah Daerah Kabupaten Soppeng.

---

## 🌟 Fitur Utama Platform

- 📍 **Geofencing GPS Radius Kantor**: Presensi hanya sah apabila koordinat GPS berada dalam polygon/radius lokasi kantor OPD (misal 200 meter).
- 🚫 **Anti-Fake GPS & Mock Location**: Proteksi otomatis pendeteksian aplikasi manipulasi GPS (Fake GPS/Spoofer).
- 📸 **Verifikasi Selfie Biometrik Live**: Pengambilan foto presensi secara langsung menggunakan kamera depan.
- 📱 **Single Device Binding Lock**: Mengunci 1 NIP pegawai pada 1 Hardware ID (IMEI) smartphone resmi untuk mencegah penitipan presensi.
- 📊 **Kalkulasi Potongan TPP Otomatis**: Penghitungan estimasi potongan TPP bulanan berdasarkan akumulasi menit keterlambatan (TL1–TL4) & pulang cepat (PSW) sesuai Perbup.
- 💼 **Manajemen Izin & Dinas Luar**: Alur verifikasi dan *approval* Atasan Langsung untuk pegawai dinas di luar radius.
- 📢 **Broadcast Edaran OPD**: Penyampaian surat edaran resmi langsung ke aplikasi mobile seluruh ASN.
- 🎨 **Shadcn Vue Preset Aesthetic**: Mengusung desain **Preset `a35Qlr3g` (Style: Sera | Base: Mist | Theme: Emerald | Font: Space Grotesk)**.

---

## 🛠️ Arsitektur & Teknologi

- **Backend Framework**: Laravel 12 (PHP 8.5)
- **Frontend SPA**: Inertia.js v3 + Vue 3 (Options API / Script Setup)
- **Desain & UI**: Tailwind CSS v4 + Shadcn Vue Preset (`Sera / Mist / Emerald`)
- **Autentikasi & API**: Laravel Fortify + Laravel Sanctum REST API
- **Testing**: PHPUnit Test Suite (100% Green Coverage)
- **Code Formatter**: Laravel Pint (`vendor/bin/pint`)
- **Aplikasi Mobile**: Flutter SDK (Repositori Terpisah: [`simpati-mobile`](https://github.com/hanzo-alpha/simpati-mobile))

---

## 🚀 Panduan Instalasi & Pengembangan Lokal

### Prasyarat System:
- PHP >= 8.3 dengan ekstensi `gd`, `pdo_sqlite` / `pdo_mysql`, `mbstring`, `zip`, `intl`
- Node.js >= 20.x & NPM / Bun
- Composer >= 2.x

### Langkah Instalasi:

1. **Clone Repositori**:
   ```bash
   git clone https://github.com/hanzo-alpha/simpati.git
   cd simpati
   ```

2. **Instal Dependensi PHP & JavaScript**:
   ```bash
   composer install
   npm install
   ```

3. **Konfigurasi Environment**:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Migrasi Database & Seeder**:
   ```bash
   php artisan migrate --seed
   ```

5. **Jalankan Server Development**:
   ```bash
   # Terminal 1: Vite Dev Server
   npm run dev

   # Terminal 2: Laravel Artisan Server / Herd
   php artisan serve
   ```

6. **Kompilasi Production Build**:
   ```bash
   npm run build
   ```

---

## 🧪 Pengujian Otomatis (PHPUnit)

Jalankan test suite otomatis menggunakan Artisan:

```bash
php artisan test
```

Untuk menjalankan pemeriksaan format kode Laravel Pint:
```bash
vendor/bin/pint --test
```

---

## 📱 Repositori Terkait

Aplikasi mobile Flutter untuk ASN Pemkab Soppeng dikelola di repositori terpisah:
👉 **[hanzo-alpha/simpati-mobile](https://github.com/hanzo-alpha/simpati-mobile)**

---

## 📄 Lisensi & Hak Cipta

&copy; {{ new Date().getFullYear() }} Pemerintah Kabupaten Soppeng. Seluruh Hak Cipta Dilindungi.
