<script setup lang="ts">
import { usePage, Link } from '@inertiajs/vue3';
import {
    Clock,
    MapPin,
    Calendar,
    ChevronRight,
    Sparkles,
    CheckCircle2,
    AlertTriangle,
    FileText,
    Navigation,
} from '@lucide/vue';
import { ref, computed, onMounted } from 'vue';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/Components/ui/card';
import AppLayout from '@/Layouts/AppLayout.vue';

interface TodayAttendance {
    masuk?: string;
    istirahat?: string;
    kembali?: string;
    pulang?: string;
}

interface MonthlyStats {
    hadir: number;
    terlambat: number;
    izin: number;
    alpha: number;
}

interface OfficeProp {
    name?: string;
    radius_meters?: number;
    latitude?: number;
    longitude?: number;
}

const props = defineProps<{
    todayAttendance?: TodayAttendance;
    monthlyStats?: MonthlyStats;
    office?: OfficeProp;
}>();

const page = usePage();
const user = computed(() => page.props.auth?.user || { name: 'ASN Soppeng' });

const userLat = ref<number | null>(null);
const userLng = ref<number | null>(null);
const distance = ref<number | null>(null);

const officeLat = computed(() => props.office?.latitude || -4.3484);
const officeLng = computed(() => props.office?.longitude || 119.8837);
const officeRadius = computed(() => props.office?.radius_meters || 200);

const isInRadius = computed(() => {
    if (distance.value === null) {
        return false;
    }

    return distance.value <= officeRadius.value;
});

const distanceText = computed(() => {
    if (distance.value === null) {
        return 'Mendeteksi...';
    }

    return distance.value < 1000
        ? `${Math.round(distance.value)}m`
        : `${(distance.value / 1000).toFixed(1)}km`;
});

const greeting = computed(() => {
    const hour = new Date().getHours();

    if (hour < 11) {
        return 'Selamat Pagi 🌅';
    }

    if (hour < 15) {
        return 'Selamat Siang ☀️';
    }

    if (hour < 18) {
        return 'Selamat Sore 🌤️';
    }

    return 'Selamat Malam 🌙';
});

const currentDate = computed(() => {
    return new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
});

const initials = computed(() => {
    const name = user.value.name || 'A';

    return name
        .split(' ')
        .map((n: string) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
});

const todayStatus = computed(() => [
    {
        type: 'masuk',
        label: 'Presensi Masuk',
        icon: '🌅',
        time: props.todayAttendance?.masuk,
        done: !!props.todayAttendance?.masuk,
    },
    {
        type: 'istirahat',
        label: 'Presensi Istirahat',
        icon: '☕',
        time: props.todayAttendance?.istirahat,
        done: !!props.todayAttendance?.istirahat,
    },
    {
        type: 'kembali',
        label: 'Presensi Kembali',
        icon: '💼',
        time: props.todayAttendance?.kembali,
        done: !!props.todayAttendance?.kembali,
    },
    {
        type: 'pulang',
        label: 'Presensi Pulang',
        icon: '🏠',
        time: props.todayAttendance?.pulang,
        done: !!props.todayAttendance?.pulang,
    },
]);

const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
) => {
    const R = 6371e3;
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
};

let map: any = null;
let userMarker: any = null;
let leafletInstance: any = null;

const initMap = async () => {
    if (typeof window === 'undefined') {
        return;
    }

    const mapEl = document.getElementById('userMap');

    if (!mapEl) {
        return;
    }

    if (!leafletInstance) {
        leafletInstance = (await import('leaflet')).default;
        await import('leaflet/dist/leaflet.css');
    }

    const L = leafletInstance;

    map = L.map('userMap').setView([officeLat.value, officeLng.value], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap',
    }).addTo(map);

    L.circle([officeLat.value, officeLng.value], {
        color: '#0d9488',
        fillColor: '#0d9488',
        fillOpacity: 0.15,
        radius: officeRadius.value,
    }).addTo(map);
};

const locateUser = () => {
    if (typeof window === 'undefined') {
        return;
    }

    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((pos) => {
            userLat.value = pos.coords.latitude;
            userLng.value = pos.coords.longitude;
            distance.value = calculateDistance(
                userLat.value,
                userLng.value,
                officeLat.value,
                officeLng.value,
            );

            if (map && leafletInstance) {
                const L = leafletInstance;

                if (userMarker) {
                    map.removeLayer(userMarker);
                }

                userMarker = L.circleMarker([userLat.value, userLng.value], {
                    color: isInRadius.value ? '#10b981' : '#f43f5e',
                    fillColor: isInRadius.value ? '#10b981' : '#f43f5e',
                    fillOpacity: 0.9,
                    radius: 8,
                }).addTo(map);
                map.setView([userLat.value, userLng.value], 15);
            }
        });
    }
};

onMounted(async () => {
    if (typeof window === 'undefined') {
        return;
    }

    await initMap();
    locateUser();
});
</script>

<template>
    <AppLayout>
        <div class="mx-auto max-w-2xl space-y-6 pb-8">
            <!-- Header User Greeting Card -->
            <Card
                class="border-border/60 bg-card/95 shadow-md backdrop-blur-xl"
            >
                <CardContent class="flex items-center justify-between p-5">
                    <div class="space-y-1">
                        <p class="text-xs font-semibold text-muted-foreground">
                            {{ greeting }}
                        </p>
                        <h1
                            class="text-2xl font-extrabold tracking-tight text-foreground"
                        >
                            {{ user.name }}
                        </h1>
                        <p
                            class="font-mono text-[11px] font-bold text-teal-600 dark:text-teal-400"
                        >
                            {{ currentDate }}
                        </p>
                    </div>

                    <div
                        class="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-base font-extrabold text-white shadow-md shadow-teal-500/20"
                    >
                        {{ initials }}
                    </div>
                </CardContent>
            </Card>

            <!-- Map Card -->
            <Card
                class="overflow-hidden border-border/60 bg-card/95 shadow-md backdrop-blur-xl"
            >
                <CardContent class="relative p-0">
                    <div id="userMap" class="z-0 h-44 w-full"></div>
                    <div
                        class="absolute right-3 bottom-3 left-3 z-10 flex items-center justify-between"
                    >
                        <Badge
                            :variant="isInRadius ? 'default' : 'destructive'"
                            class="flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold shadow-md"
                        >
                            <Navigation class="h-3 w-3" />
                            <span
                                >{{
                                    isInRadius
                                        ? 'Dalam Radius Geofence'
                                        : 'Di Luar Radius Kantor'
                                }}
                                ({{ distanceText }})</span
                            >
                        </Badge>
                        <Button
                            size="icon"
                            variant="secondary"
                            @click="locateUser"
                            class="h-8 w-8 cursor-pointer rounded-xl shadow-md"
                            title="Refresh Lokasi GPS"
                        >
                            <MapPin
                                class="h-4 w-4 text-teal-600 dark:text-teal-400"
                            />
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <!-- Today Status Card -->
            <Card
                class="border-border/60 bg-card/95 shadow-md backdrop-blur-xl"
            >
                <CardHeader
                    class="flex-row items-center justify-between space-y-0 pb-3"
                >
                    <CardTitle
                        class="flex items-center gap-2 text-base font-bold"
                    >
                        <Clock
                            class="h-4 w-4 text-teal-600 dark:text-teal-400"
                        />
                        <span>Status Presensi Hari Ini</span>
                    </CardTitle>
                    <Link href="/presensi">
                        <Button
                            size="sm"
                            class="cursor-pointer rounded-xl bg-teal-600 text-xs font-semibold text-white hover:bg-teal-700"
                        >
                            Presensi Sekarang
                        </Button>
                    </Link>
                </CardHeader>
                <CardContent class="pt-0">
                    <div class="space-y-2">
                        <div
                            v-for="item in todayStatus"
                            :key="item.type"
                            class="flex items-center justify-between rounded-xl border border-border/40 bg-muted/40 p-3"
                        >
                            <div class="flex items-center gap-3">
                                <span class="text-xl">{{ item.icon }}</span>
                                <span
                                    class="text-xs font-semibold text-foreground"
                                    >{{ item.label }}</span
                                >
                            </div>
                            <div class="flex items-center gap-2">
                                <span
                                    class="font-mono text-xs font-bold"
                                    :class="
                                        item.done
                                            ? 'text-emerald-600 dark:text-emerald-400'
                                            : 'text-muted-foreground/40'
                                    "
                                >
                                    {{ item.time || '--:--' }}
                                </span>
                                <Badge
                                    :variant="item.done ? 'default' : 'outline'"
                                    class="px-2 py-0.5 text-[9px] font-semibold uppercase"
                                    :class="{
                                        'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400':
                                            item.done,
                                    }"
                                >
                                    {{ item.done ? 'Sudah' : 'Belum' }}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <!-- Monthly Summary KPI Card -->
            <Card
                v-if="monthlyStats"
                class="border-border/60 bg-card/95 shadow-md backdrop-blur-xl"
            >
                <CardHeader class="pb-3">
                    <CardTitle
                        class="flex items-center gap-2 text-base font-bold"
                    >
                        <Calendar
                            class="h-4 w-4 text-teal-600 dark:text-teal-400"
                        />
                        <span>Ringkasan Kehadiran Bulan Ini</span>
                    </CardTitle>
                </CardHeader>
                <CardContent class="pt-0">
                    <div class="grid grid-cols-4 gap-2 text-center">
                        <div
                            class="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-2.5"
                        >
                            <p
                                class="text-lg font-black text-emerald-600 dark:text-emerald-400"
                            >
                                {{ monthlyStats.hadir }}
                            </p>
                            <p
                                class="text-[10px] font-semibold text-muted-foreground"
                            >
                                Hadir
                            </p>
                        </div>
                        <div
                            class="rounded-xl border border-amber-500/20 bg-amber-500/10 p-2.5"
                        >
                            <p
                                class="text-lg font-black text-amber-600 dark:text-amber-400"
                            >
                                {{ monthlyStats.terlambat }}
                            </p>
                            <p
                                class="text-[10px] font-semibold text-muted-foreground"
                            >
                                Telat
                            </p>
                        </div>
                        <div
                            class="rounded-xl border border-sky-500/20 bg-sky-500/10 p-2.5"
                        >
                            <p
                                class="text-lg font-black text-sky-600 dark:text-sky-400"
                            >
                                {{ monthlyStats.izin }}
                            </p>
                            <p
                                class="text-[10px] font-semibold text-muted-foreground"
                            >
                                Izin
                            </p>
                        </div>
                        <div
                            class="rounded-xl border border-rose-500/20 bg-rose-500/10 p-2.5"
                        >
                            <p
                                class="text-lg font-black text-rose-600 dark:text-rose-400"
                            >
                                {{ monthlyStats.alpha }}
                            </p>
                            <p
                                class="text-[10px] font-semibold text-muted-foreground"
                            >
                                Alpha
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>
