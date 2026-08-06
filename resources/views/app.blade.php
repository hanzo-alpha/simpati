<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="SIMPATI - Sistem Informasi Manajemen Presensi ASN Terpadu Integrasi Kabupaten Soppeng">

    <title inertia>{{ config('app.name', 'SIMPATI') }} - Kab. Soppeng</title>

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="/images/logo.png">
    <link rel="shortcut icon" href="/images/logo.png">
    <link rel="apple-touch-icon" href="/images/logo.png">

    <!-- Space Grotesk Google Font (Preset Lyra / Emerald) -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">

    @fonts

    {{-- Inline script to immediately set dark/light theme from localStorage before render --}}
    <script>
        (function() {
            const savedTheme = localStorage.getItem('simpati_theme') || 'dark';
            if (savedTheme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        })();
    </script>

    <!-- Scripts -->
    @vite(['resources/css/app.css', 'resources/js/app.ts', "resources/js/Pages/{$page['component']}.vue"])
    <x-inertia::head>
        <title>{{ config('app.name', 'SIMPATI') }}</title>
    </x-inertia::head>
    @inertiaHead
</head>
<body class="font-sans antialiased bg-background text-foreground">
    <x-inertia::app />
</body>
</html>
