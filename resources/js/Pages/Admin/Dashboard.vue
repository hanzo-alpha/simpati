<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Link } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import StatCard from '@/Components/StatCard.vue';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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
        stats: () => ({ totalUsers: 0, todayPresent: 0, todayLate: 0, pendingRequests: 0 }),
        recentRequests: () => [],
        todayAttendances: () => [],
        liveLocations: () => [],
        dailyTrend: () => [],
        chartBars: () => [
            { label: 'Hadir Tepat Waktu', value: 0, pct: 0, color: 'bg-emerald-500' },
            { label: 'Terlambat', value: 0, pct: 0, color: 'bg-amber-500' },
            { label: 'Alpha', value: 0, pct: 0, color: 'bg-rose-500' },
            { label: 'Izin/Cuti', value: 0, pct: 0, color: 'bg-sky-500' },
        ],
    }
);

const activeTrendTab = ref<'month' | 'weekly'>('month');

const maxDailyTotal = computed(() => {
    if (!props.dailyTrend || !props.dailyTrend.length) return 1;
    return Math.max(...props.dailyTrend.map((d) => d.total || 0), 1);
});

onMounted(() => {
    const mapElement = document.getElementById('dashboardMap');
    if (!mapElement) return;

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
        if (!loc.latitude || !loc.longitude) return;

        let color = '#10b981';
        if (loc.status === 'terlambat' || loc.status === 'sangat_terlambat') color = '#f59e0b';
        if (loc.jenis === 'dinas_luar' || loc.jenis === 'wfh') color = '#6366f1';

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
    <AdminLayout title="Dashboard" subtitle="Ringkasan data presensi ASN Kabupaten Soppeng">
        <!-- 1. Stats KPI Grid Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard icon="users" label="Total Pegawai ASN" :value="stats.totalUsers" color="teal" />
            <StatCard
                icon="check"
                label="Hadir Hari Ini"
                :value="stats.todayPresent"
                :sub="`dari total ${stats.totalUsers} ASN`"
                color="green"
            />
            <StatCard icon="alert" label="Terlambat Hari Ini" :value="stats.todayLate" color="yellow" />
            <StatCard icon="file" label="Pengajuan Pending" :value="stats.pendingRequests" color="blue" />
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <!-- 2. Attendance Chart & Trend Widget (Preset Sera Typography) -->
            <Card class="rounded-none border border-border bg-card text-card-foreground shadow-xs flex flex-col justify-between">
                <CardHeader class="p-5 flex-row items-center justify-between space-y-0 border-b border-border/60">
                    <div>
                        <CardTitle class="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                            <Activity class="w-4 h-4 text-emerald-500" />
                            <span>Tren & Distribusi Kehadiran</span>
                        </CardTitle>
                        <p class="text-xs text-muted-foreground mt-0.5">
                            Ringkasan statistik bulan ini & 7 hari terakhir
                        </p>
                    </div>
                    <div class="flex items-center gap-1 bg-muted/60 p-1 rounded-none text-xs font-medium border border-border">
                        <button
                            @click="activeTrendTab = 'month'"
                            class="px-2.5 py-1 rounded-none transition-all cursor-pointer"
                            :class="
                                activeTrendTab === 'month'
                                    ? 'bg-primary text-primary-foreground font-bold'
                                    : 'text-muted-foreground hover:text-foreground'
                            "
                        >
                            Bulan Ini
                        </button>
                        <button
                            @click="activeTrendTab = 'weekly'"
                            class="px-2.5 py-1 rounded-none transition-all cursor-pointer"
                            :class="
                                activeTrendTab === 'weekly'
                                    ? 'bg-primary text-primary-foreground font-bold'
                                    : 'text-muted-foreground hover:text-foreground'
                            "
                        >
                            7 Hari Terakhir
                        </button>
                    </div>
                </CardHeader>

                <CardContent class="p-5 flex-1">
                    <!-- Tab 1: Distribusi Bulan Ini -->
                    <div v-if="activeTrendTab === 'month'" class="space-y-4">
                        <div v-for="(bar, i) in chartBars" :key="i" class="space-y-1.5">
                            <div class="flex items-center justify-between text-xs font-medium">
                                <span class="text-muted-foreground font-medium text-xs">{{ bar.label }}</span>
                                <div class="flex items-center gap-2">
                                    <span class="font-mono text-foreground font-bold text-sm">{{ bar.value }}</span>
                                    <span class="text-xs px-1.5 py-0.5 rounded-none bg-muted text-muted-foreground font-mono border border-border">
                                        {{ bar.pct }}%
                                    </span>
                                </div>
                            </div>
                            <div class="h-3 bg-muted rounded-none overflow-hidden border border-border/40">
                                <div
                                    class="h-full rounded-none transition-all duration-500 bg-primary"
                                    :style="{ width: Math.max(bar.pct, bar.value > 0 ? 4 : 0) + '%' }"
                                ></div>
                            </div>
                        </div>
                    </div>

                    <!-- Tab 2: Tren 7 Hari Terakhir Bar Chart -->
                    <div v-else class="py-1">
                        <div class="flex items-end justify-between gap-3 h-40 pt-4 px-1">
                            <div
                                v-for="(day, i) in dailyTrend"
                                :key="i"
                                class="flex-1 flex flex-col items-center gap-2 group relative"
                            >
                                <div class="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-popover text-popover-foreground text-xs py-1 px-2 rounded-none pointer-events-none whitespace-nowrap z-20 shadow-md border border-border">
                                    {{ day.label }}:
                                    <span class="text-emerald-500 font-bold">{{ day.hadir }} Hadir</span>,
                                    <span class="text-amber-500 font-bold">{{ day.terlambat }} Telat</span>
                                </div>

                                <div class="w-full max-w-[32px] h-28 bg-muted/60 rounded-none overflow-hidden flex flex-col-reverse p-0.5 transition-all border border-border">
                                    <div
                                        class="w-full bg-primary transition-all duration-500"
                                        :style="{ height: maxDailyTotal > 0 ? (day.hadir / maxDailyTotal) * 100 + '%' : '0%' }"
                                    ></div>
                                    <div
                                        class="w-full bg-amber-500 transition-all duration-500 mb-0.5"
                                        :style="{ height: maxDailyTotal > 0 ? (day.terlambat / maxDailyTotal) * 100 + '%' : '0%' }"
                                    ></div>
                                    <div
                                        class="w-full bg-sky-500 transition-all duration-500 mb-0.5"
                                        :style="{ height: maxDailyTotal > 0 ? ((day.wfh || 0) / maxDailyTotal) * 100 + '%' : '0%' }"
                                    ></div>
                                </div>

                                <span class="text-xs font-mono font-medium text-muted-foreground truncate max-w-full">
                                    {{ day.label.split(',')[0] }}
                                </span>
                            </div>
                        </div>

                        <div class="flex items-center justify-center gap-4 mt-3 text-xs text-muted-foreground border-t border-border/50 pt-3">
                            <div class="flex items-center gap-1.5">
                                <span class="w-2.5 h-2.5 rounded-none bg-primary"></span>
                                <span>Hadir</span>
                            </div>
                            <div class="flex items-center gap-1.5">
                                <span class="w-2.5 h-2.5 rounded-none bg-amber-500"></span>
                                <span>Terlambat</span>
                            </div>
                            <div class="flex items-center gap-1.5">
                                <span class="w-2.5 h-2.5 rounded-none bg-sky-500"></span>
                                <span>WFH</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <!-- 3. Recent Leave Requests Widget -->
            <Card class="rounded-none border border-border bg-card text-card-foreground shadow-xs flex flex-col justify-between">
                <CardHeader class="p-5 flex-row items-center justify-between space-y-0 border-b border-border/60">
                    <CardTitle class="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                        <FileText class="w-4 h-4 text-emerald-500" />
                        <span>Pengajuan Izin Terbaru</span>
                    </CardTitle>
                    <Link
                        href="/admin/leave-requests"
                        class="text-xs font-semibold text-primary hover:underline flex items-center gap-1 transition-colors"
                    >
                        <span>Lihat Semua</span>
                        <ArrowUpRight class="w-3.5 h-3.5" />
                    </Link>
                </CardHeader>

                <CardContent class="p-5 flex-1">
                    <div class="space-y-2.5">
                        <div
                            v-for="req in recentRequests"
                            :key="req.id"
                            class="flex items-center justify-between gap-3 p-3 bg-muted/30 hover:bg-muted/60 rounded-none border border-border transition-all"
                        >
                            <div class="flex items-center gap-3 min-w-0">
                                <div class="w-8 h-8 rounded-none bg-primary/10 text-primary font-bold flex items-center justify-center text-xs shrink-0 border border-primary/20">
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
                                    <p class="text-xs font-bold truncate text-foreground">{{ req.user?.name }}</p>
                                    <p class="text-xs text-muted-foreground font-mono">
                                        {{ req.jenis }} &bull; {{ req.tanggal_mulai }}
                                    </p>
                                </div>
                            </div>
                            <Badge
                                variant="outline"
                                class="capitalize text-xs px-2.5 py-0.5 font-semibold rounded-none shrink-0"
                                :class="{
                                    'border-amber-500/40 text-amber-600 dark:text-amber-400 bg-amber-500/10': req.status === 'pending',
                                    'border-emerald-500/40 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10': req.status === 'approved',
                                }"
                            >
                                {{ req.status === 'pending' ? 'Pending' : req.status === 'approved' ? 'Disetujui' : 'Ditolak' }}
                            </Badge>
                        </div>

                        <p v-if="!recentRequests.length" class="text-center text-xs text-muted-foreground py-8">
                            Belum ada permohonan izin masuk.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>

        <!-- 4. Live Geofence Monitoring Map Card -->
        <Card class="rounded-none border border-border bg-card text-card-foreground shadow-xs mb-6">
            <CardHeader class="p-5 border-b border-border/60 flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                <div>
                    <CardTitle class="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                        <span class="w-2.5 h-2.5 rounded-none bg-emerald-500 animate-ping"></span>
                        <MapPin class="w-4 h-4 text-emerald-500" />
                        <span>Peta Geofence Real-Time ASN</span>
                    </CardTitle>
                    <p class="text-xs text-muted-foreground mt-0.5">
                        Sebaran koordinat lokasi presensi ASN Kabupaten Soppeng hari ini
                    </p>
                </div>
                <div class="flex items-center gap-3 text-xs">
                    <span class="flex items-center gap-1.5 text-muted-foreground font-medium">
                        <span class="w-2 h-2 rounded-none bg-emerald-500"></span> Tepat Waktu
                    </span>
                    <span class="flex items-center gap-1.5 text-muted-foreground font-medium">
                        <span class="w-2 h-2 rounded-none bg-amber-500"></span> Terlambat
                    </span>
                    <span class="flex items-center gap-1.5 text-muted-foreground font-medium">
                        <span class="w-2 h-2 rounded-none bg-indigo-500"></span> Dinas / WFH
                    </span>
                </div>
            </CardHeader>
            <CardContent class="p-5">
                <div id="dashboardMap" class="w-full h-80 rounded-none overflow-hidden border border-border z-0"></div>
            </CardContent>
        </Card>

        <!-- 5. Recent Attendance Table Widget -->
        <Card class="rounded-none border border-border bg-card text-card-foreground shadow-xs">
            <CardHeader class="p-5 border-b border-border/60">
                <CardTitle class="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                    <Clock class="w-4 h-4 text-emerald-500" />
                    <span>Log Presensi Hari Ini</span>
                </CardTitle>
            </CardHeader>
            <CardContent class="p-0">
                <div class="overflow-x-auto">
                    <table class="w-full text-xs">
                        <thead>
                            <tr class="text-left text-muted-foreground border-b border-border bg-muted/30">
                                <th class="px-5 py-3.5 font-bold uppercase text-xs tracking-wider">Nama Pegawai ASN</th>
                                <th class="px-5 py-3.5 font-bold uppercase text-xs tracking-wider">OPD Utama</th>
                                <th class="px-5 py-3.5 font-bold uppercase text-xs tracking-wider text-center">Masuk</th>
                                <th class="px-5 py-3.5 font-bold uppercase text-xs tracking-wider text-center">Istirahat</th>
                                <th class="px-5 py-3.5 font-bold uppercase text-xs tracking-wider text-center">Kembali</th>
                                <th class="px-5 py-3.5 font-bold uppercase text-xs tracking-wider text-center">Pulang</th>
                                <th class="px-5 py-3.5 font-bold uppercase text-xs tracking-wider text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-border/40">
                            <tr
                                v-for="row in todayAttendances"
                                :key="row.user_id"
                                class="hover:bg-muted/40 transition-colors"
                            >
                                <td class="px-5 py-3.5 font-bold text-foreground text-xs">{{ row.name }}</td>
                                <td class="px-5 py-3.5 text-muted-foreground text-xs">{{ row.opd }}</td>
                                <td
                                    class="px-5 py-3.5 font-mono font-bold text-center text-xs"
                                    :class="row.masuk ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground'"
                                >
                                    {{ row.masuk || '--:--' }}
                                </td>
                                <td
                                    class="px-5 py-3.5 font-mono font-bold text-center text-xs"
                                    :class="row.istirahat ? 'text-amber-600 dark:text-amber-400' : 'text-muted-foreground'"
                                >
                                    {{ row.istirahat || '--:--' }}
                                </td>
                                <td
                                    class="px-5 py-3.5 font-mono font-bold text-center text-xs"
                                    :class="row.kembali ? 'text-sky-600 dark:text-sky-400' : 'text-muted-foreground'"
                                >
                                    {{ row.kembali || '--:--' }}
                                </td>
                                <td
                                    class="px-5 py-3.5 font-mono font-bold text-center text-xs"
                                    :class="row.pulang ? 'text-purple-600 dark:text-purple-400' : 'text-muted-foreground'"
                                >
                                    {{ row.pulang || '--:--' }}
                                </td>
                                <td class="px-5 py-3.5 text-center">
                                    <Badge
                                        :variant="row.status === 'tepat_waktu' ? 'default' : 'outline'"
                                        class="text-xs font-semibold px-2.5 py-0.5 uppercase rounded-none"
                                        :class="{
                                            'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30': row.status === 'tepat_waktu',
                                            'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30': row.status === 'terlambat',
                                        }"
                                    >
                                        {{ row.status ? row.status.replace('_', ' ') : 'PRESENSI' }}
                                    </Badge>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <p v-if="!todayAttendances.length" class="text-center text-muted-foreground py-6 text-xs">
                        Belum ada log presensi terdaftar hari ini.
                    </p>
                </div>
            </CardContent>
        </Card>
    </AdminLayout>
</template>
