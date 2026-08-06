<template>
    <Head title="Portal Presensi Digital ASN - SIMPATI Kabupaten Soppeng" />
    <div
        class="relative min-h-screen overflow-x-hidden bg-background font-sans text-foreground selection:bg-primary selection:text-primary-foreground"
    >
        <!-- Preset Grid Pattern Backdrop -->
        <div
            class="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:24px_24px] opacity-40"
        ></div>

        <!-- Top Announcement Ribbon (Preset Style) -->
        <div
            class="relative z-50 flex items-center justify-center gap-3 border-b border-primary/20 bg-primary/10 px-6 py-2.5 text-center font-mono text-xs text-primary"
        >
            <span
                class="bg-primary px-2 py-0.5 text-[10px] font-bold tracking-wider text-primary-foreground uppercase"
                >RESMI</span
            >
            <span
                >Sistem Informasi Presensi ASN Terpadu Pemkab Soppeng &bull;
                Sesuai Perbup TPP & Verifikasi Geofence GPS</span
            >
        </div>

        <!-- Navbar (Preset Sera Style) -->
        <nav
            class="sticky top-0 z-40 border-b border-border bg-background/95 px-6 py-4 backdrop-blur-md lg:px-12"
        >
            <div class="mx-auto flex max-w-7xl items-center justify-between">
                <div class="flex items-center gap-3.5">
                    <img
                        src="/images/logo-removebg.png"
                        class="h-14 w-14 shrink-0 object-contain drop-shadow-xs filter"
                        alt="SIMPATI Logo"
                    />
                    <div>
                        <div class="flex items-center gap-2">
                            <span
                                class="font-sans text-3xl leading-none font-black tracking-widest text-foreground uppercase"
                                >SIMPATI</span
                            >
                            <span
                                class="border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider text-primary uppercase"
                                >v3.0</span
                            >
                        </div>
                        <span
                            class="mt-1 block font-mono text-[10px] font-bold tracking-widest text-muted-foreground uppercase"
                            >KABUPATEN SOPPENG</span
                        >
                    </div>
                </div>

                <div
                    class="hidden items-center gap-8 font-mono text-xs font-bold text-muted-foreground md:flex"
                >
                    <a
                        href="#fitur"
                        class="transition-colors hover:text-primary"
                        >FITUR UNGGULAN</a
                    >
                    <a href="#demo" class="transition-colors hover:text-primary"
                        >DEMO KONTROL</a
                    >
                    <a href="#faq" class="transition-colors hover:text-primary"
                        >FAQ & REGULASI</a
                    >
                </div>

                <div class="flex items-center gap-4">
                    <Link
                        href="/login"
                        class="flex cursor-pointer items-center gap-2 border border-primary bg-primary px-6 py-2.5 font-mono text-xs font-bold tracking-wider text-primary-foreground uppercase shadow-xs transition-all hover:bg-primary/90"
                    >
                        <span>Masuk Portal</span>
                        <svg
                            class="h-4 w-4 text-primary-foreground"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                        </svg>
                    </Link>
                </div>
            </div>
        </nav>

        <!-- Hero Section (Preset Emerald Style) -->
        <header
            class="relative z-10 mx-auto max-w-7xl px-6 pt-16 pb-20 lg:px-12"
        >
            <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
                <div class="space-y-6 text-left lg:col-span-7">
                    <div
                        class="inline-flex items-center gap-2 border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs font-semibold text-primary"
                    >
                        <span
                            class="h-2 w-2 animate-pulse rounded-full bg-primary"
                        ></span>
                        <span
                            >/pəˈrɛsɛnsi/ &bull; Presensi Digital Terverifikasi
                            ASN</span
                        >
                    </div>

                    <h1
                        class="text-4xl leading-[1.1] font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl"
                    >
                        Transformasi Digital <br />
                        <span
                            class="text-primary underline decoration-primary/40 underline-offset-8"
                            >Disiplin & Presensi ASN</span
                        >
                    </h1>

                    <p
                        class="max-w-xl text-base leading-relaxed text-muted-foreground lg:text-lg"
                    >
                        Sistem presensi aparatur berbasis
                        <strong class="text-foreground">Geofencing GPS</strong>,
                        verifikasi selfie kamera depan, penguncian perangkat
                        anti-titip absen, dan otomatisasi hitung TPP Pemkab
                        Soppeng.
                    </p>

                    <div class="flex flex-wrap items-center gap-4 pt-4">
                        <Link
                            href="/login"
                            class="flex cursor-pointer items-center gap-3 border border-primary bg-primary px-8 py-4 font-mono text-xs font-bold tracking-wider text-primary-foreground uppercase shadow-sm transition-all hover:bg-primary/90"
                        >
                            <span>Masuk ke Portal SIMPATI</span>
                            <svg
                                class="h-4 w-4 text-primary-foreground"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                />
                            </svg>
                        </Link>
                        <a
                            href="#demo"
                            class="border border-border bg-card px-8 py-4 font-mono text-xs font-bold tracking-wider text-foreground uppercase transition-all hover:bg-muted"
                        >
                            Lihat Live Demo System
                        </a>
                    </div>
                </div>

                <!-- Technical Showcase Card Container with Corner Brackets (Sera Style) -->
                <div class="relative lg:col-span-5">
                    <div
                        class="relative space-y-6 rounded-none border border-border bg-card p-6 shadow-md"
                    >
                        <!-- Corner Crosshairs / Brackets (Sera signature) -->
                        <div
                            class="absolute -top-1.5 -left-1.5 h-3.5 w-3.5 border-t-2 border-l-2 border-primary"
                        ></div>
                        <div
                            class="absolute -top-1.5 -right-1.5 h-3.5 w-3.5 border-t-2 border-r-2 border-primary"
                        ></div>
                        <div
                            class="absolute -bottom-1.5 -left-1.5 h-3.5 w-3.5 border-b-2 border-l-2 border-primary"
                        ></div>
                        <div
                            class="absolute -right-1.5 -bottom-1.5 h-3.5 w-3.5 border-r-2 border-b-2 border-primary"
                        ></div>

                        <div
                            class="flex items-center justify-between border-b border-border pb-3"
                        >
                            <div class="flex items-center gap-2">
                                <div
                                    class="h-3 w-3 rounded-full bg-primary"
                                ></div>
                                <span
                                    class="font-mono text-xs font-bold tracking-wider text-foreground uppercase"
                                    >Ringkasan Sistem OPD</span
                                >
                            </div>
                            <span
                                class="border border-primary/30 bg-primary/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-primary"
                                >LIVE ONLINE</span
                            >
                        </div>

                        <!-- Technical Stats Grid -->
                        <div class="grid grid-cols-2 gap-4">
                            <div class="border border-border bg-muted/50 p-4">
                                <p
                                    class="font-mono text-[10px] text-muted-foreground uppercase"
                                >
                                    Akurasi Geofence
                                </p>
                                <p
                                    class="mt-1 font-mono text-2xl font-black text-primary"
                                >
                                    Radius 200m
                                </p>
                                <p
                                    class="mt-1 text-[10px] text-muted-foreground"
                                >
                                    Kantor OPD Soppeng
                                </p>
                            </div>

                            <div class="border border-border bg-muted/50 p-4">
                                <p
                                    class="font-mono text-[10px] text-muted-foreground uppercase"
                                >
                                    Keamanan GPS
                                </p>
                                <p
                                    class="mt-1 font-mono text-2xl font-black text-primary"
                                >
                                    Anti-Fake GPS
                                </p>
                                <p
                                    class="mt-1 text-[10px] text-muted-foreground"
                                >
                                    Deteksi Mock Location
                                </p>
                            </div>
                        </div>

                        <div
                            class="space-y-2.5 border border-border bg-muted p-4"
                        >
                            <div
                                class="flex items-center justify-between font-mono text-xs"
                            >
                                <span class="text-muted-foreground"
                                    >Verifikasi Biometrik Kamera</span
                                >
                                <span class="font-bold text-primary"
                                    >TERHUBUNG</span
                                >
                            </div>
                            <div
                                class="flex items-center justify-between font-mono text-xs"
                            >
                                <span class="text-muted-foreground"
                                    >Single Device Lock NIP</span
                                >
                                <span class="font-bold text-primary"
                                    >TERKUNCI</span
                                >
                            </div>
                            <div
                                class="flex items-center justify-between font-mono text-xs"
                            >
                                <span class="text-muted-foreground"
                                    >Potongan TPP Perbup</span
                                >
                                <span class="font-bold text-primary"
                                    >OTOMATIS</span
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <!-- Interactive Demo Control Tabs Section (Preset Style) -->
        <section
            id="demo"
            class="relative z-10 mx-auto max-w-7xl px-6 py-12 lg:px-12"
        >
            <div
                class="relative rounded-none border border-border bg-card p-8 shadow-sm"
            >
                <!-- Corner Brackets -->
                <div
                    class="absolute -top-1.5 -left-1.5 h-3.5 w-3.5 border-t-2 border-l-2 border-primary"
                ></div>
                <div
                    class="absolute -top-1.5 -right-1.5 h-3.5 w-3.5 border-t-2 border-r-2 border-primary"
                ></div>
                <div
                    class="absolute -bottom-1.5 -left-1.5 h-3.5 w-3.5 border-b-2 border-l-2 border-primary"
                ></div>
                <div
                    class="absolute -right-1.5 -bottom-1.5 h-3.5 w-3.5 border-r-2 border-b-2 border-primary"
                ></div>

                <div
                    class="mb-6 flex flex-col justify-between gap-4 border-b border-border pb-6 md:flex-row md:items-center"
                >
                    <div>
                        <span
                            class="font-mono text-[10px] font-bold tracking-widest text-primary uppercase"
                            >MODUL UTAMA APLIKASI</span
                        >
                        <h3
                            class="font-sans text-2xl font-black tracking-tight text-foreground"
                        >
                            Pusat Kendali Presensi ASN
                        </h3>
                    </div>
                    <div class="flex flex-wrap items-center gap-2">
                        <button
                            @click="activeTab = 'geofence'"
                            :class="
                                activeTab === 'geofence'
                                    ? 'border-primary bg-primary text-primary-foreground'
                                    : 'border-border bg-muted text-muted-foreground hover:bg-muted/80'
                            "
                            class="cursor-pointer border px-4 py-2 font-mono text-xs font-bold uppercase transition-all"
                        >
                            01. Geofencing GPS
                        </button>
                        <button
                            @click="activeTab = 'tpp'"
                            :class="
                                activeTab === 'tpp'
                                    ? 'border-primary bg-primary text-primary-foreground'
                                    : 'border-border bg-muted text-muted-foreground hover:bg-muted/80'
                            "
                            class="cursor-pointer border px-4 py-2 font-mono text-xs font-bold uppercase transition-all"
                        >
                            02. Kalkulasi TPP
                        </button>
                        <button
                            @click="activeTab = 'device'"
                            :class="
                                activeTab === 'device'
                                    ? 'border-primary bg-primary text-primary-foreground'
                                    : 'border-border bg-muted text-muted-foreground hover:bg-muted/80'
                            "
                            class="cursor-pointer border px-4 py-2 font-mono text-xs font-bold uppercase transition-all"
                        >
                            03. Single Device Binding
                        </button>
                    </div>
                </div>

                <!-- Tab 1: Geofencing -->
                <div
                    v-if="activeTab === 'geofence'"
                    class="grid grid-cols-1 items-center gap-8 lg:grid-cols-2"
                >
                    <div class="space-y-4">
                        <span
                            class="border border-primary/30 bg-primary/10 px-2.5 py-1 font-mono text-[10px] font-bold text-primary uppercase"
                        >
                            Radius Kantor 200m
                        </span>
                        <h4 class="text-xl font-bold text-foreground">
                            Verifikasi Lokasi Presisi dengan Geofence Polygon
                        </h4>
                        <p
                            class="text-xs leading-relaxed text-muted-foreground"
                        >
                            Pegawai ASN hanya dapat melakukan presensi Masuk
                            atau Pulang apabila berada di dalam radius resmi
                            titik GPS kantor SKPD/OPD Kabupaten Soppeng.
                            Perangkat akan mendeteksi koordinat
                            latitude/longitude secara realtime.
                        </p>
                        <div
                            class="space-y-1.5 border border-border bg-muted/50 p-4 font-mono text-xs"
                        >
                            <div class="flex justify-between">
                                <span class="text-muted-foreground"
                                    >Status Lokasi:</span
                                ><span class="font-bold text-primary"
                                    >DALAM RADIUS KANTOR (18m)</span
                                >
                            </div>
                            <div class="flex justify-between">
                                <span class="text-muted-foreground"
                                    >Deteksi Mock GPS:</span
                                ><span class="font-bold text-primary"
                                    >AMAN (CLEAN DEVICE)</span
                                >
                            </div>
                        </div>
                    </div>
                    <div class="space-y-3 border border-border bg-muted p-6">
                        <div
                            class="flex items-center justify-between border-b border-border pb-2 font-mono text-xs"
                        >
                            <span class="text-foreground"
                                >OPD: Kantor Bupati Soppeng</span
                            >
                            <span class="text-primary">LAT: -4.3482</span>
                        </div>
                        <div class="space-y-2 border border-border bg-card p-4">
                            <p class="font-mono text-xs text-muted-foreground">
                                Peta Radius Geofence Aktivasi:
                            </p>
                            <div
                                class="flex h-28 items-center justify-center border border-primary/30 bg-primary/10 p-4 text-center"
                            >
                                <span
                                    class="font-mono text-xs font-bold text-primary"
                                    >[ MAP GEOFENCE ACTIVE &bull; RADIUS 200
                                    METER ]</span
                                >
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Tab 2: Kalkulasi TPP -->
                <div
                    v-else-if="activeTab === 'tpp'"
                    class="grid grid-cols-1 items-center gap-8 lg:grid-cols-2"
                >
                    <div class="space-y-4">
                        <span
                            class="border border-primary/30 bg-primary/10 px-2.5 py-1 font-mono text-[10px] font-bold text-primary uppercase"
                        >
                            Perbup TPP Kabupaten Soppeng
                        </span>
                        <h4 class="text-xl font-bold text-foreground">
                            Penghitungan Estimasi Potongan TPP Otomatis
                        </h4>
                        <p
                            class="text-xs leading-relaxed text-muted-foreground"
                        >
                            Setiap keterlambatan menit (TL1, TL2, TL3, TL4) atau
                            pulang sebelum waktunya (PSW) secara otomatis
                            dihitung dan diakumulasikan menjadi persentase
                            potongan TPP bulanan pegawai secara objektif.
                        </p>
                        <div
                            class="space-y-1.5 border border-border bg-muted/50 p-4 font-mono text-xs"
                        >
                            <div class="flex justify-between">
                                <span class="text-muted-foreground"
                                    >Akumulasi Keterlambatan:</span
                                ><span class="font-bold text-primary"
                                    >12 Menit (TL1)</span
                                >
                            </div>
                            <div class="flex justify-between">
                                <span class="text-muted-foreground"
                                    >Estimasi Potongan TPP:</span
                                ><span class="font-bold text-primary"
                                    >0.5% (Sesuai Regulasi)</span
                                >
                            </div>
                        </div>
                    </div>
                    <div class="space-y-3 border border-border bg-muted p-6">
                        <p class="font-mono text-xs font-bold text-primary">
                            Tabel Kategori Keterlambatan:
                        </p>
                        <table
                            class="w-full border-collapse font-mono text-[11px]"
                        >
                            <thead>
                                <tr
                                    class="border-b border-border text-muted-foreground"
                                >
                                    <th class="py-1 text-left">Kategori</th>
                                    <th class="py-1 text-left">
                                        Menit Terlambat
                                    </th>
                                    <th class="py-1 text-right">
                                        Potongan TPP
                                    </th>
                                </tr>
                            </thead>
                            <tbody
                                class="divide-y divide-border text-foreground"
                            >
                                <tr>
                                    <td class="py-1">TL 1</td>
                                    <td>1 - 30 Menit</td>
                                    <td class="text-right text-primary">
                                        0.5 %
                                    </td>
                                </tr>
                                <tr>
                                    <td class="py-1">TL 2</td>
                                    <td>31 - 60 Menit</td>
                                    <td class="text-right text-primary">
                                        1.0 %
                                    </td>
                                </tr>
                                <tr>
                                    <td class="py-1">TL 3</td>
                                    <td>61 - 90 Menit</td>
                                    <td class="text-right text-primary">
                                        1.25 %
                                    </td>
                                </tr>
                                <tr>
                                    <td class="py-1">TL 4</td>
                                    <td>> 90 Menit / Tanpa Keterangan</td>
                                    <td class="text-right text-destructive">
                                        2.5 % / Hari
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Tab 3: Device Binding -->
                <div
                    v-else
                    class="grid grid-cols-1 items-center gap-8 lg:grid-cols-2"
                >
                    <div class="space-y-4">
                        <span
                            class="border border-primary/30 bg-primary/10 px-2.5 py-1 font-mono text-[10px] font-bold text-primary uppercase"
                        >
                            Keamanan Akun Perangkat
                        </span>
                        <h4 class="text-xl font-bold text-foreground">
                            1 NIP ASN Terkunci pada 1 Smartphone Resmi
                        </h4>
                        <p
                            class="text-xs leading-relaxed text-muted-foreground"
                        >
                            Mencegah praktik penipuan titip absen antar pegawai.
                            Setiap akun NIP pegawai terikat secara permanen
                            dengan ID unik hardware perangkat ponsel yang
                            terdaftar secara resmi.
                        </p>
                        <div
                            class="space-y-1.5 border border-border bg-muted/50 p-4 font-mono text-xs"
                        >
                            <div class="flex justify-between">
                                <span class="text-muted-foreground"
                                    >Status Device Binding:</span
                                ><span class="font-bold text-primary"
                                    >TERDAFTAR (Samsung A54 5G)</span
                                >
                            </div>
                            <div class="flex justify-between">
                                <span class="text-muted-foreground"
                                    >Pengajuan Reset HP:</span
                                ><span class="font-bold text-primary"
                                    >Melalui Admin OPD</span
                                >
                            </div>
                        </div>
                    </div>
                    <div class="space-y-3 border border-border bg-muted p-6">
                        <div
                            class="space-y-2 border border-border bg-card p-4 font-mono text-xs"
                        >
                            <div class="flex justify-between">
                                <span class="text-muted-foreground"
                                    >Hardware ID:</span
                                ><span class="font-bold text-primary"
                                    >DEV-8849-SOPPENG-09</span
                                >
                            </div>
                            <div class="flex justify-between">
                                <span class="text-muted-foreground"
                                    >Model HP:</span
                                ><span class="text-foreground"
                                    >SM-A546B (Android 14)</span
                                >
                            </div>
                            <div class="flex justify-between">
                                <span class="text-muted-foreground"
                                    >Status Kunci:</span
                                ><span class="font-bold text-primary"
                                    >ACTIVE LOCK</span
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 4-Column Tech Stack Grid (Preset Sera Style) -->
        <section
            id="fitur"
            class="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-12"
        >
            <div class="mb-14 text-center">
                <span
                    class="font-mono text-xs font-bold tracking-widest text-primary uppercase"
                    >ARSITEKTURAL & FITUR</span
                >
                <h2
                    class="mt-2 font-sans text-3xl font-black tracking-tight text-foreground lg:text-4xl"
                >
                    Komponen Keunggulan SIMPATI
                </h2>
            </div>

            <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <!-- Preset Style Card 1 -->
                <div
                    class="group relative rounded-none border border-border bg-card p-6 transition-all hover:border-primary"
                >
                    <div
                        class="absolute -top-1 -left-1 h-2.5 w-2.5 border-t-2 border-l-2 border-primary"
                    ></div>
                    <div
                        class="absolute -right-1 -bottom-1 h-2.5 w-2.5 border-r-2 border-b-2 border-primary"
                    ></div>
                    <div
                        class="mb-6 flex h-12 w-12 items-center justify-center border border-border bg-muted transition-colors group-hover:bg-primary/10"
                    >
                        <svg
                            class="h-6 w-6 text-primary"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                    </div>
                    <h3
                        class="mb-2 font-mono text-base font-bold text-foreground uppercase"
                    >
                        Geofencing GPS
                    </h3>
                    <p class="text-xs leading-relaxed text-muted-foreground">
                        Presensi hanya sah dalam batas koordinat polygon lokasi
                        kantor OPD dengan toleransi radius presisi.
                    </p>
                </div>

                <!-- Preset Style Card 2 -->
                <div
                    class="group relative rounded-none border border-border bg-card p-6 transition-all hover:border-primary"
                >
                    <div
                        class="absolute -top-1 -left-1 h-2.5 w-2.5 border-t-2 border-l-2 border-primary"
                    ></div>
                    <div
                        class="absolute -right-1 -bottom-1 h-2.5 w-2.5 border-r-2 border-b-2 border-primary"
                    ></div>
                    <div
                        class="mb-6 flex h-12 w-12 items-center justify-center border border-border bg-muted transition-colors group-hover:bg-primary/10"
                    >
                        <svg
                            class="h-6 w-6 text-primary"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                            />
                        </svg>
                    </div>
                    <h3
                        class="mb-2 font-mono text-base font-bold text-foreground uppercase"
                    >
                        Anti-Fake GPS
                    </h3>
                    <p class="text-xs leading-relaxed text-muted-foreground">
                        Pendeteksi otomatis aplikasi lokasi palsu (Mock
                        Location/GPS Spoofer) langsung ditolak oleh sistem.
                    </p>
                </div>

                <!-- Preset Style Card 3 -->
                <div
                    class="group relative rounded-none border border-border bg-card p-6 transition-all hover:border-primary"
                >
                    <div
                        class="absolute -top-1 -left-1 h-2.5 w-2.5 border-t-2 border-l-2 border-primary"
                    ></div>
                    <div
                        class="absolute -right-1 -bottom-1 h-2.5 w-2.5 border-r-2 border-b-2 border-primary"
                    ></div>
                    <div
                        class="mb-6 flex h-12 w-12 items-center justify-center border border-border bg-muted transition-colors group-hover:bg-primary/10"
                    >
                        <svg
                            class="h-6 w-6 text-primary"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                    <h3
                        class="mb-2 font-mono text-base font-bold text-foreground uppercase"
                    >
                        Kalkulasi TPP Pemda
                    </h3>
                    <p class="text-xs leading-relaxed text-muted-foreground">
                        Estimasi kalkulasi akumulasi potongan TPP otomatis
                        berdasarkan menit keterlambatan & pulang cepat.
                    </p>
                </div>

                <!-- Preset Style Card 4 -->
                <div
                    class="group relative rounded-none border border-border bg-card p-6 transition-all hover:border-primary"
                >
                    <div
                        class="absolute -top-1 -left-1 h-2.5 w-2.5 border-t-2 border-l-2 border-primary"
                    ></div>
                    <div
                        class="absolute -right-1 -bottom-1 h-2.5 w-2.5 border-r-2 border-b-2 border-primary"
                    ></div>
                    <div
                        class="mb-6 flex h-12 w-12 items-center justify-center border border-border bg-muted transition-colors group-hover:bg-primary/10"
                    >
                        <svg
                            class="h-6 w-6 text-primary"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                        </svg>
                    </div>
                    <h3
                        class="mb-2 font-mono text-base font-bold text-foreground uppercase"
                    >
                        Single Device Binding
                    </h3>
                    <p class="text-xs leading-relaxed text-muted-foreground">
                        Penguncian NIP pegawai pada 1 IMEI/Hardware ID
                        smartphone resmi untuk eliminasi kecurangan titip
                        presensi.
                    </p>
                </div>
            </div>
        </section>

        <!-- FAQ Section (Preset Style Accordion) -->
        <section
            id="faq"
            class="relative z-10 mx-auto max-w-5xl px-6 py-16 lg:px-12"
        >
            <div class="mb-12 text-center">
                <span
                    class="font-mono text-xs font-bold tracking-widest text-primary uppercase"
                    >PERTANYAAN UMUM</span
                >
                <h2
                    class="mt-2 font-sans text-3xl font-black tracking-tight text-foreground"
                >
                    Pertanyaan Sering Diajukan ASN
                </h2>
            </div>

            <div class="space-y-4">
                <div
                    class="space-y-2 rounded-none border border-border bg-card p-6 text-left"
                >
                    <h4 class="text-sm font-bold text-foreground">
                        Bagaimana jika presensi gagal karena lokasi di luar
                        radius kantor?
                    </h4>
                    <p class="text-xs leading-relaxed text-muted-foreground">
                        Pastikan GPS smartphone Anda telah diaktifkan dengan
                        akurasi tinggi. Apabila Anda sedang menjalankan Tugas
                        Dinas Luar atau WFH, gunakan fitur pengajuan Izin/Dinas
                        Luar yang akan diverifikasi oleh Atasan Langsung.
                    </p>
                </div>

                <div
                    class="space-y-2 rounded-none border border-border bg-card p-6 text-left"
                >
                    <h4 class="text-sm font-bold text-foreground">
                        Bagaimana jika saya mengganti perangkat HP baru?
                    </h4>
                    <p class="text-xs leading-relaxed text-muted-foreground">
                        Pengajuan pelepasan/reset Device Binding HP lama dapat
                        dilakukan melalui Admin Kepegawaian OPD masing-masing
                        atau BKPSDM Kabupaten Soppeng.
                    </p>
                </div>
            </div>
        </section>

        <!-- Technical Specification Banner -->
        <section class="relative z-10 mx-auto my-12 max-w-7xl px-6 lg:px-12">
            <div
                class="relative flex flex-col items-center justify-between gap-8 rounded-none border border-primary bg-card p-10 shadow-md md:flex-row lg:p-14"
            >
                <div class="space-y-2 text-left">
                    <span
                        class="font-mono text-xs font-bold tracking-wider text-primary uppercase"
                        >PORTAL RESMI ASN</span
                    >
                    <h3
                        class="font-sans text-2xl font-black tracking-tight text-foreground lg:text-3xl"
                    >
                        Siap Melakukan Presensi Digital?
                    </h3>
                    <p class="max-w-xl text-xs text-muted-foreground">
                        Gunakan NIP dan kata sandi terdaftar untuk masuk ke
                        dashboard layanan presensi Kabupaten Soppeng.
                    </p>
                </div>

                <Link
                    href="/login"
                    class="flex shrink-0 cursor-pointer items-center gap-2 border border-primary bg-primary px-8 py-4 font-mono text-xs font-extrabold tracking-wider text-primary-foreground uppercase transition-all hover:bg-primary/90"
                >
                    <span>Akses Portal Sekarang</span>
                    <svg
                        class="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                    </svg>
                </Link>
            </div>
        </section>

        <!-- Preset Clean Footer -->
        <footer
            class="relative z-10 border-t border-border bg-background px-6 py-10 text-xs text-muted-foreground"
        >
            <div
                class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row"
            >
                <div class="flex items-center gap-3">
                    <img
                        src="/images/logo-removebg.png"
                        class="h-6 w-6 object-contain"
                        alt="SIMPATI Logo"
                    />
                    <span
                        class="font-mono font-bold tracking-wide text-foreground uppercase"
                        >SIMPATI &bull; KABUPATEN SOPPENG</span
                    >
                </div>
                <p class="font-mono text-muted-foreground">
                    &copy; {{ new Date().getFullYear() }} Pemerintah Kabupaten
                    Soppeng. Seluruh Hak Cipta Dilindungi.
                </p>
            </div>
        </footer>
    </div>
</template>

<script setup>
import { Link, Head } from '@inertiajs/vue3';
import { ref } from 'vue';

const activeTab = ref('geofence');
</script>
