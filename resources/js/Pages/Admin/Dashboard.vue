<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import {
    Activity,
    FileText,
    MapPin,
    Calendar,
    ArrowUpRight,
    Users,
    CheckCircle2,
    Clock,
    AlertCircle,
} from '@lucide/vue';
import { ref, computed, onMounted } from 'vue';
import StatCard from '@/Components/StatCard.vue';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/Components/ui/card';
import AdminLayout from '@/Layouts/AdminLayout.vue';

interface StatProps {
    totalUsers: number;
    todayPresent: number;
    todayLate: number;
    pendingRequests: number;
}

interface RequestUser {
    name?: string;
}

interface LeaveRequest {
    id: number;
    user?: RequestUser;
    jenis: string;
    tanggal_mulai: string;
    status: 'pending' | 'approved' | 'rejected' | string;
}

interface AttendanceRow {
    user_id: number;
    name: string;
    opd: string;
    masuk?: string;
    istirahat?: string;
    kembali?: string;
    pulang?: string;
    status: string;
}

interface LiveLocation {
    latitude?: number;
    longitude?: number;
    name: string;
    opd: string;
    waktu: string;
    status: string;
    jenis?: string;
}

interface DailyTrendItem {
    label: string;
    hadir: number;
    terlambat: number;
    wfh?: number;
    total?: number;
}

interface ChartBar {
    label: string;
    value: number;
    pct: number;
    color: string;
}

const props = withDefaults(
    defineProps<{
        stats?: StatProps;
        recentRequests?: LeaveRequest[];
        todayAttendances?: AttendanceRow[];
        liveLocations?: LiveLocation[];
        dailyTrend?: DailyTrendItem[];
        chartBars?: ChartBar[];
    }>(),
    {
        stats: () => ({
            totalUsers: 0,
            todayPresent: 0,
            todayLate: 0,
            pendingRequests: 0,
        }),
        recentRequests: () => [],
        todayAttendances: () => [],
        liveLocations: () => [],
        dailyTrend: () => [],
        chartBars: () => [
            {
                label: 'Hadir Tepat Waktu',
                value: 0,
                pct: 0,
                color: 'bg-emerald-500',
            },
            { label: 'Terlambat', value: 0, pct: 0, color: 'bg-amber-500' },
            { label: 'Alpha', value: 0, pct: 0, color: 'bg-rose-500' },
            { label: 'Izin/Cuti', value: 0, pct: 0, color: 'bg-sky-500' },
        ],
    },
);

const activeTrendTab = ref<'month' | 'weekly'>('month');

const maxDailyTotal = computed(() => {
    if (!props.dailyTrend || !props.dailyTrend.length) {
        return 1;
    }

    return Math.max(...props.dailyTrend.map((d) => d.total || 0), 1);
});

onMounted(async () => {
    if (typeof window === 'undefined') {
        return;
    }

    const L = (await import('leaflet')).default;
    await import('leaflet/dist/leaflet.css');

    const mapElement = document.getElementById('dashboardMap');

    if (!mapElement) {
        return;
    }

    const map = L.map('dashboardMap').setView([-4.3484, 119.8837], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    L.circle([-4.3484, 119.8837], {
        color: '#10b981',
        fillColor: '#10b981',
        fillOpacity: 0.15,
        radius: 200,
    })
        .addTo(map)
        .bindPopup('<b>Kantor Bupati Soppeng</b><br>Geofence Radius: 200m');

    props.liveLocations.forEach((loc) => {
        if (!loc.latitude || !loc.longitude) {
            return;
        }

        let color = '#10b981';

        if (loc.status === 'terlambat' || loc.status === 'sangat_terlambat') {
            color = '#f59e0b';
        }

        if (loc.jenis === 'dinas_luar' || loc.jenis === 'wfh') {
            color = '#6366f1';
        }

        const marker = L.circleMarker([loc.latitude, loc.longitude], {
            color: color,
            fillColor: color,
            fillOpacity: 0.9,
            radius: 8,
        }).addTo(map);

        marker.bindPopup(`
            <div style="font-family: sans-serif; font-size: 12px; min-width: 150px;">
                <b style="font-size: 13px; color: #111827;">${loc.name}</b><br>
                <span style="color: #6b7280;">${loc.opd}</span><br>
                <div style="margin-top: 6px; padding-top: 4px; border-top: 1px solid #e5e7eb;">
                    <span>Waktu: <b>${loc.waktu}</b></span> | 
                    <span>Status: <b>${loc.status}</b></span>
                </div>
            </div>
        `);
    });
});
</script>

<template>
    <AdminLayout
        title="Dashboard"
        subtitle="Ringkasan data presensi ASN Kabupaten Soppeng"
    >
        <!-- 1. Stats KPI Grid Cards -->
        <div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
                icon="users"
                label="Total Pegawai ASN"
                :value="stats.totalUsers"
                color="teal"
            />
            <StatCard
                icon="check"
                label="Hadir Hari Ini"
                :value="stats.todayPresent"
                :sub="`dari total ${stats.totalUsers} ASN`"
                color="green"
            />
            <StatCard
                icon="alert"
                label="Terlambat Hari Ini"
                :value="stats.todayLate"
                color="yellow"
            />
            <StatCard
                icon="file"
                label="Pengajuan Pending"
                :value="stats.pendingRequests"
                color="blue"
            />
        </div>

        <div class="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <!-- 2. Attendance Chart & Trend Widget (Preset Sera Typography) -->
            <Card
                class="flex flex-col justify-between rounded-none border border-border bg-card text-card-foreground shadow-xs"
            >
                <CardHeader
                    class="flex-row items-center justify-between space-y-0 border-b border-border/60 p-5"
                >
                    <div>
                        <CardTitle
                            class="flex items-center gap-2 text-sm font-bold tracking-wider text-foreground uppercase"
                        >
                            <Activity class="h-4 w-4 text-emerald-500" />
                            <span>Tren & Distribusi Kehadiran</span>
                        </CardTitle>
                        <p class="mt-0.5 text-xs text-muted-foreground">
                            Ringkasan statistik bulan ini & 7 hari terakhir
                        </p>
                    </div>
                    <div
                        class="flex items-center gap-1 rounded-none border border-border bg-muted/60 p-1 text-xs font-medium"
                    >
                        <button
                            @click="activeTrendTab = 'month'"
                            class="cursor-pointer rounded-none px-2.5 py-1 transition-all"
                            :class="
                                activeTrendTab === 'month'
                                    ? 'bg-primary font-bold text-primary-foreground'
                                    : 'text-muted-foreground hover:text-foreground'
                            "
                        >
                            Bulan Ini
                        </button>
                        <button
                            @click="activeTrendTab = 'weekly'"
                            class="cursor-pointer rounded-none px-2.5 py-1 transition-all"
                            :class="
                                activeTrendTab === 'weekly'
                                    ? 'bg-primary font-bold text-primary-foreground'
                                    : 'text-muted-foreground hover:text-foreground'
                            "
                        >
                            7 Hari Terakhir
                        </button>
                    </div>
                </CardHeader>

                <CardContent class="flex-1 p-5">
                    <!-- Tab 1: Distribusi Bulan Ini -->
                    <div v-if="activeTrendTab === 'month'" class="space-y-4">
                        <div
                            v-for="(bar, i) in chartBars"
                            :key="i"
                            class="space-y-1.5"
                        >
                            <div
                                class="flex items-center justify-between text-xs font-medium"
                            >
                                <span
                                    class="text-xs font-medium text-muted-foreground"
                                    >{{ bar.label }}</span
                                >
                                <div class="flex items-center gap-2">
                                    <span
                                        class="font-mono text-sm font-bold text-foreground"
                                        >{{ bar.value }}</span
                                    >
                                    <span
                                        class="rounded-none border border-border bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground"
                                    >
                                        {{ bar.pct }}%
                                    </span>
                                </div>
                            </div>
                            <div
                                class="h-3 overflow-hidden rounded-none border border-border/40 bg-muted"
                            >
                                <div
                                    class="h-full rounded-none bg-primary transition-all duration-500"
                                    :style="{
                                        width:
                                            Math.max(
                                                bar.pct,
                                                bar.value > 0 ? 4 : 0,
                                            ) + '%',
                                    }"
                                ></div>
                            </div>
                        </div>
                    </div>

                    <!-- Tab 2: Tren 7 Hari Terakhir Bar Chart -->
                    <div v-else class="py-1">
                        <div
                            class="flex h-40 items-end justify-between gap-3 px-1 pt-4"
                        >
                            <div
                                v-for="(day, i) in dailyTrend"
                                :key="i"
                                class="group relative flex flex-1 flex-col items-center gap-2"
                            >
                                <div
                                    class="pointer-events-none absolute -top-10 z-20 rounded-none border border-border bg-popover px-2 py-1 text-xs whitespace-nowrap text-popover-foreground opacity-0 shadow-md transition-opacity group-hover:opacity-100"
                                >
                                    {{ day.label }}:
                                    <span class="font-bold text-emerald-500"
                                        >{{ day.hadir }} Hadir</span
                                    >,
                                    <span class="font-bold text-amber-500"
                                        >{{ day.terlambat }} Telat</span
                                    >
                                </div>

                                <div
                                    class="flex h-28 w-full max-w-[32px] flex-col-reverse overflow-hidden rounded-none border border-border bg-muted/60 p-0.5 transition-all"
                                >
                                    <div
                                        class="w-full bg-primary transition-all duration-500"
                                        :style="{
                                            height:
                                                maxDailyTotal > 0
                                                    ? (day.hadir /
                                                          maxDailyTotal) *
                                                          100 +
                                                      '%'
                                                    : '0%',
                                        }"
                                    ></div>
                                    <div
                                        class="mb-0.5 w-full bg-amber-500 transition-all duration-500"
                                        :style="{
                                            height:
                                                maxDailyTotal > 0
                                                    ? (day.terlambat /
                                                          maxDailyTotal) *
                                                          100 +
                                                      '%'
                                                    : '0%',
                                        }"
                                    ></div>
                                    <div
                                        class="mb-0.5 w-full bg-sky-500 transition-all duration-500"
                                        :style="{
                                            height:
                                                maxDailyTotal > 0
                                                    ? ((day.wfh || 0) /
                                                          maxDailyTotal) *
                                                          100 +
                                                      '%'
                                                    : '0%',
                                        }"
                                    ></div>
                                </div>

                                <span
                                    class="max-w-full truncate font-mono text-xs font-medium text-muted-foreground"
                                >
                                    {{ day.label.split(',')[0] }}
                                </span>
                            </div>
                        </div>

                        <div
                            class="mt-3 flex items-center justify-center gap-4 border-t border-border/50 pt-3 text-xs text-muted-foreground"
                        >
                            <div class="flex items-center gap-1.5">
                                <span
                                    class="h-2.5 w-2.5 rounded-none bg-primary"
                                ></span>
                                <span>Hadir</span>
                            </div>
                            <div class="flex items-center gap-1.5">
                                <span
                                    class="h-2.5 w-2.5 rounded-none bg-amber-500"
                                ></span>
                                <span>Terlambat</span>
                            </div>
                            <div class="flex items-center gap-1.5">
                                <span
                                    class="h-2.5 w-2.5 rounded-none bg-sky-500"
                                ></span>
                                <span>WFH</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <!-- 3. Recent Leave Requests Widget -->
            <Card
                class="flex flex-col justify-between rounded-none border border-border bg-card text-card-foreground shadow-xs"
            >
                <CardHeader
                    class="flex-row items-center justify-between space-y-0 border-b border-border/60 p-5"
                >
                    <CardTitle
                        class="flex items-center gap-2 text-sm font-bold tracking-wider text-foreground uppercase"
                    >
                        <FileText class="h-4 w-4 text-emerald-500" />
                        <span>Pengajuan Izin Terbaru</span>
                    </CardTitle>
                    <Link
                        href="/admin/leave-requests"
                        class="flex items-center gap-1 text-xs font-semibold text-primary transition-colors hover:underline"
                    >
                        <span>Lihat Semua</span>
                        <ArrowUpRight class="h-3.5 w-3.5" />
                    </Link>
                </CardHeader>

                <CardContent class="flex-1 p-5">
                    <div class="space-y-2.5">
                        <div
                            v-for="req in recentRequests"
                            :key="req.id"
                            class="flex items-center justify-between gap-3 rounded-none border border-border bg-muted/30 p-3 transition-all hover:bg-muted/60"
                        >
                            <div class="flex min-w-0 items-center gap-3">
                                <div
                                    class="flex h-8 w-8 shrink-0 items-center justify-center rounded-none border border-primary/20 bg-primary/10 text-xs font-bold text-primary"
                                >
                                    {{
                                        req.user?.name
                                            ?.split(' ')
                                            .map((n) => n[0])
                                            .join('')
                                            .substring(0, 2)
                                            .toUpperCase()
                                    }}
                                </div>
                                <div class="min-w-0">
                                    <p
                                        class="truncate text-xs font-bold text-foreground"
                                    >
                                        {{ req.user?.name }}
                                    </p>
                                    <p
                                        class="font-mono text-xs text-muted-foreground"
                                    >
                                        {{ req.jenis }} &bull;
                                        {{ req.tanggal_mulai }}
                                    </p>
                                </div>
                            </div>
                            <Badge
                                variant="outline"
                                class="shrink-0 rounded-none px-2.5 py-0.5 text-xs font-semibold capitalize"
                                :class="{
                                    'border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400':
                                        req.status === 'pending',
                                    'border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400':
                                        req.status === 'approved',
                                }"
                            >
                                {{
                                    req.status === 'pending'
                                        ? 'Pending'
                                        : req.status === 'approved'
                                          ? 'Disetujui'
                                          : 'Ditolak'
                                }}
                            </Badge>
                        </div>

                        <p
                            v-if="!recentRequests.length"
                            class="py-8 text-center text-xs text-muted-foreground"
                        >
                            Belum ada permohonan izin masuk.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>

        <!-- 4. Live Geofence Monitoring Map Card -->
        <Card
            class="mb-6 rounded-none border border-border bg-card text-card-foreground shadow-xs"
        >
            <CardHeader
                class="flex-col justify-between space-y-2 border-b border-border/60 p-5 sm:flex-row sm:items-center sm:space-y-0"
            >
                <div>
                    <CardTitle
                        class="flex items-center gap-2 text-sm font-bold tracking-wider text-foreground uppercase"
                    >
                        <span
                            class="h-2.5 w-2.5 animate-ping rounded-none bg-emerald-500"
                        ></span>
                        <MapPin class="h-4 w-4 text-emerald-500" />
                        <span>Peta Geofence Real-Time ASN</span>
                    </CardTitle>
                    <p class="mt-0.5 text-xs text-muted-foreground">
                        Sebaran koordinat lokasi presensi ASN Kabupaten Soppeng
                        hari ini
                    </p>
                </div>
                <div class="flex items-center gap-3 text-xs">
                    <span
                        class="flex items-center gap-1.5 font-medium text-muted-foreground"
                    >
                        <span
                            class="h-2 w-2 rounded-none bg-emerald-500"
                        ></span>
                        Tepat Waktu
                    </span>
                    <span
                        class="flex items-center gap-1.5 font-medium text-muted-foreground"
                    >
                        <span class="h-2 w-2 rounded-none bg-amber-500"></span>
                        Terlambat
                    </span>
                    <span
                        class="flex items-center gap-1.5 font-medium text-muted-foreground"
                    >
                        <span class="h-2 w-2 rounded-none bg-indigo-500"></span>
                        Dinas / WFH
                    </span>
                </div>
            </CardHeader>
            <CardContent class="p-5">
                <div
                    id="dashboardMap"
                    class="z-0 h-80 w-full overflow-hidden rounded-none border border-border"
                ></div>
            </CardContent>
        </Card>

        <!-- 5. Recent Attendance Table Widget -->
        <Card
            class="rounded-none border border-border bg-card text-card-foreground shadow-xs"
        >
            <CardHeader
                class="flex flex-col gap-2 border-b border-border/60 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
                <div>
                    <CardTitle
                        class="flex items-center gap-2 text-sm font-bold tracking-wider text-foreground uppercase"
                    >
                        <Clock class="h-4 w-4 text-emerald-500" />
                        <span>Log Presensi Hari Ini</span>
                    </CardTitle>
                    <p class="mt-0.5 text-xs text-muted-foreground">
                        Aktivitas terkini jam presensi pegawai ASN Kabupaten Soppeng hari ini
                    </p>
                </div>

                <Link
                    href="/admin/attendances"
                    class="flex items-center gap-1 text-xs font-semibold text-primary transition-colors hover:underline"
                >
                    <span>Lihat Seluruh Rekap Presensi</span>
                    <ArrowUpRight class="h-3.5 w-3.5" />
                </Link>
            </CardHeader>
            <CardContent class="p-0">
                <div class="overflow-x-auto">
                    <table class="w-full text-xs">
                        <thead>
                            <tr
                                class="border-b border-border bg-muted/30 text-left text-muted-foreground"
                            >
                                <th
                                    class="px-5 py-3.5 text-xs font-bold tracking-wider uppercase"
                                >
                                    Nama Pegawai ASN
                                </th>
                                <th
                                    class="px-5 py-3.5 text-xs font-bold tracking-wider uppercase"
                                >
                                    OPD Utama
                                </th>
                                <th
                                    class="px-5 py-3.5 text-center text-xs font-bold tracking-wider uppercase"
                                >
                                    Masuk
                                </th>
                                <th
                                    class="px-5 py-3.5 text-center text-xs font-bold tracking-wider uppercase"
                                >
                                    Istirahat
                                </th>
                                <th
                                    class="px-5 py-3.5 text-center text-xs font-bold tracking-wider uppercase"
                                >
                                    Kembali
                                </th>
                                <th
                                    class="px-5 py-3.5 text-center text-xs font-bold tracking-wider uppercase"
                                >
                                    Pulang
                                </th>
                                <th
                                    class="px-5 py-3.5 text-center text-xs font-bold tracking-wider uppercase"
                                >
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-border/40">
                            <tr
                                v-for="row in todayAttendances"
                                :key="row.user_id"
                                class="transition-colors hover:bg-muted/40"
                            >
                                <td
                                    class="px-5 py-3.5 text-xs font-bold text-foreground"
                                >
                                    {{ row.name }}
                                </td>
                                <td
                                    class="px-5 py-3.5 text-xs text-muted-foreground"
                                >
                                    {{ row.opd }}
                                </td>
                                <td
                                    class="px-5 py-3.5 text-center font-mono text-xs font-bold"
                                    :class="
                                        row.masuk
                                            ? 'text-emerald-600 dark:text-emerald-400'
                                            : 'text-muted-foreground'
                                    "
                                >
                                    {{ row.masuk || '--:--' }}
                                </td>
                                <td
                                    class="px-5 py-3.5 text-center font-mono text-xs font-bold"
                                    :class="
                                        row.istirahat
                                            ? 'text-amber-600 dark:text-amber-400'
                                            : 'text-muted-foreground'
                                    "
                                >
                                    {{ row.istirahat || '--:--' }}
                                </td>
                                <td
                                    class="px-5 py-3.5 text-center font-mono text-xs font-bold"
                                    :class="
                                        row.kembali
                                            ? 'text-sky-600 dark:text-sky-400'
                                            : 'text-muted-foreground'
                                    "
                                >
                                    {{ row.kembali || '--:--' }}
                                </td>
                                <td
                                    class="px-5 py-3.5 text-center font-mono text-xs font-bold"
                                    :class="
                                        row.pulang
                                            ? 'text-purple-600 dark:text-purple-400'
                                            : 'text-muted-foreground'
                                    "
                                >
                                    {{ row.pulang || '--:--' }}
                                </td>
                                <td class="px-5 py-3.5 text-center">
                                    <Badge
                                        :variant="
                                            row.status === 'tepat_waktu'
                                                ? 'default'
                                                : 'outline'
                                        "
                                        class="rounded-none px-2.5 py-0.5 text-xs font-semibold uppercase"
                                        :class="{
                                            'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400':
                                                row.status === 'tepat_waktu',
                                            'border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400':
                                                row.status === 'terlambat',
                                        }"
                                    >
                                        {{
                                            row.status
                                                ? row.status.replace('_', ' ')
                                                : 'PRESENSI'
                                        }}
                                    </Badge>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <p
                        v-if="!todayAttendances.length"
                        class="py-6 text-center text-xs text-muted-foreground"
                    >
                        Belum ada log presensi terdaftar hari ini.
                    </p>
                </div>
            </CardContent>
        </Card>
    </AdminLayout>
</template>
