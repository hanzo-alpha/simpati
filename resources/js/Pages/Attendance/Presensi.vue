<script setup lang="ts">
import { useForm } from '@inertiajs/vue3';
import {
    MapPin,
    Clock,
    CheckCircle2,
    AlertTriangle,
    Camera,
    Loader2,
    Navigation,
} from '@lucide/vue';
import { ref, computed, onMounted } from 'vue';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/Components/ui/card';
import AppLayout from '@/Layouts/AppLayout.vue';

interface AttendanceProp {
    masuk?: string;
    istirahat?: string;
    kembali?: string;
    pulang?: string;
}

const props = defineProps<{
    todayAttendance?: AttendanceProp;
    office?: {
        name?: string;
        radius_meters?: number;
        latitude?: number;
        longitude?: number;
    };
}>();

const selectedType = ref<string | null>(null);
const userLat = ref<number | null>(null);
const userLng = ref<number | null>(null);
const distance = ref<number | null>(null);
const locationStatus = ref<'loading' | 'success' | 'error'>('loading');

const currentDate = computed(() => {
    return new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
});

const statusItems = computed(() => [
    {
        type: 'masuk',
        label: 'Masuk',
        time: props.todayAttendance?.masuk,
        done: !!props.todayAttendance?.masuk,
        icon: '🌅',
    },
    {
        type: 'istirahat',
        label: 'Istirahat',
        time: props.todayAttendance?.istirahat,
        done: !!props.todayAttendance?.istirahat,
        icon: '☕',
    },
    {
        type: 'kembali',
        label: 'Kembali',
        time: props.todayAttendance?.kembali,
        done: !!props.todayAttendance?.kembali,
        icon: '💼',
    },
    {
        type: 'pulang',
        label: 'Pulang',
        time: props.todayAttendance?.pulang,
        done: !!props.todayAttendance?.pulang,
        icon: '🏠',
    },
]);

const presensiTypes = computed(() => [
    {
        value: 'masuk',
        label: 'Presensi Masuk',
        icon: '🌅',
        disabled: !!props.todayAttendance?.masuk,
    },
    {
        value: 'istirahat',
        label: 'Presensi Istirahat',
        icon: '☕',
        disabled: !!props.todayAttendance?.istirahat,
    },
    {
        value: 'kembali',
        label: 'Presensi Kembali',
        icon: '💼',
        disabled: !!props.todayAttendance?.kembali,
    },
    {
        value: 'pulang',
        label: 'Presensi Pulang',
        icon: '🏠',
        disabled: !!props.todayAttendance?.pulang,
    },
]);

const officeRadius = computed(() => props.office?.radius_meters || 200);
const officeName = computed(
    () => props.office?.name || 'Kantor Pusat Bupati Soppeng',
);

const isInRadius = computed(() => {
    if (distance.value === null) {
        return false;
    }

    return distance.value <= officeRadius.value;
});

const distanceText = computed(() => {
    if (distance.value === null) {
        return 'Mendeteksi GPS...';
    }

    return distance.value < 1000
        ? `${Math.round(distance.value)} m`
        : `${(distance.value / 1000).toFixed(1)} km`;
});

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

const getLocation = () => {
    locationStatus.value = 'loading';

    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                userLat.value = pos.coords.latitude;
                userLng.value = pos.coords.longitude;
                const officeLat = props.office?.latitude || -4.3484;
                const officeLng = props.office?.longitude || 119.8837;
                distance.value = calculateDistance(
                    userLat.value,
                    userLng.value,
                    officeLat,
                    officeLng,
                );
                locationStatus.value = 'success';
            },
            () => {
                locationStatus.value = 'error';
            },
            { enableHighAccuracy: true, timeout: 10000 },
        );
    }
};

const form = useForm({
    type: '',
    latitude: 0,
    longitude: 0,
});

const startPresensi = () => {
    if (
        !selectedType.value ||
        !isInRadius.value ||
        !userLat.value ||
        !userLng.value
    ) {
        return;
    }

    form.type = selectedType.value;
    form.latitude = userLat.value;
    form.longitude = userLng.value;

    form.post('/presensi', {
        onSuccess: () => {
            selectedType.value = null;
        },
    });
};

onMounted(() => {
    getLocation();
});
</script>

<template>
    <AppLayout>
        <div class="mx-auto max-w-xl space-y-6 pb-8">
            <header class="px-2 pt-4">
                <h1 class="text-2xl font-extrabold tracking-tight">
                    Presensi Mandiri ASN
                </h1>
                <p class="mt-0.5 text-xs text-muted-foreground">
                    {{ currentDate }}
                </p>
            </header>

            <!-- Today Status Card -->
            <Card
                class="border-border/60 bg-card/95 shadow-md backdrop-blur-xl"
            >
                <CardHeader class="pb-3">
                    <CardTitle
                        class="flex items-center gap-2 text-xs font-bold tracking-wider text-muted-foreground uppercase"
                    >
                        <Clock
                            class="h-4 w-4 text-teal-600 dark:text-teal-400"
                        />
                        <span>Status Kehadiran Hari Ini</span>
                    </CardTitle>
                </CardHeader>
                <CardContent class="pt-0">
                    <div class="grid grid-cols-4 gap-2 text-center">
                        <div
                            v-for="item in statusItems"
                            :key="item.type"
                            class="rounded-xl border border-border/40 bg-muted/40 p-2.5"
                        >
                            <span class="text-lg">{{ item.icon }}</span>
                            <p
                                class="mt-0.5 text-[10px] font-medium text-muted-foreground"
                            >
                                {{ item.label }}
                            </p>
                            <p
                                class="mt-1 font-mono text-xs font-bold"
                                :class="
                                    item.done
                                        ? 'text-emerald-600 dark:text-emerald-400'
                                        : 'text-muted-foreground/40'
                                "
                            >
                                {{ item.time || '--:--' }}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <!-- Presensi Type Selector -->
            <Card
                class="border-border/60 bg-card/95 shadow-md backdrop-blur-xl"
            >
                <CardHeader class="pb-3">
                    <CardTitle
                        class="text-xs font-bold tracking-wider text-muted-foreground uppercase"
                    >
                        Pilih Jenis Presensi
                    </CardTitle>
                </CardHeader>
                <CardContent class="pt-0">
                    <div class="grid grid-cols-2 gap-3">
                        <button
                            v-for="type in presensiTypes"
                            :key="type.value"
                            @click="selectedType = type.value"
                            :disabled="type.disabled"
                            class="cursor-pointer rounded-xl border p-4 text-center transition-all duration-200"
                            :class="
                                type.disabled
                                    ? 'cursor-not-allowed border-border/40 bg-muted/30 opacity-50'
                                    : selectedType === type.value
                                      ? 'border-teal-500/50 bg-teal-500/15 shadow-md shadow-teal-500/10'
                                      : 'border-border bg-card hover:border-teal-500/40'
                            "
                        >
                            <span class="text-2xl">{{ type.icon }}</span>
                            <p class="mt-1 text-xs font-bold text-foreground">
                                {{ type.label }}
                            </p>
                            <Badge
                                v-if="type.disabled"
                                variant="outline"
                                class="mt-1 border-emerald-500/30 bg-emerald-500/10 text-[9px] text-emerald-600 dark:text-emerald-400"
                            >
                                Sudah Presensi
                            </Badge>
                        </button>
                    </div>
                </CardContent>
            </Card>

            <!-- Big Capture Action Button -->
            <div class="flex flex-col items-center justify-center py-2">
                <button
                    @click="startPresensi"
                    :disabled="!selectedType || !isInRadius || form.processing"
                    class="flex h-32 w-32 cursor-pointer flex-col items-center justify-center rounded-full shadow-xl transition-all duration-300 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:grayscale"
                    :class="
                        selectedType && isInRadius
                            ? 'bg-gradient-to-br from-teal-500 to-emerald-600 text-white ring-4 shadow-teal-500/30 ring-teal-500/20 hover:scale-105'
                            : 'border border-border bg-muted text-muted-foreground shadow-none'
                    "
                >
                    <Loader2
                        v-if="form.processing"
                        class="mb-1 h-8 w-8 animate-spin"
                    />
                    <Camera v-else class="mb-1 h-8 w-8" />
                    <span class="text-xs font-extrabold tracking-wider">
                        {{
                            form.processing
                                ? 'MEMPROSES'
                                : selectedType
                                  ? 'PRESENSI'
                                  : 'PILIH JENIS'
                        }}
                    </span>
                </button>
            </div>

            <!-- Location Status Card -->
            <Card
                class="border-border/60 bg-card/95 shadow-md backdrop-blur-xl"
            >
                <CardContent class="flex items-center justify-between p-4">
                    <div class="flex items-center gap-3">
                        <div
                            class="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border"
                            :class="
                                locationStatus === 'loading'
                                    ? 'border-amber-500/30 bg-amber-500/15 text-amber-500'
                                    : isInRadius
                                      ? 'border-emerald-500/30 bg-emerald-500/15 text-emerald-500'
                                      : 'border-rose-500/30 bg-rose-500/15 text-rose-500'
                            "
                        >
                            <Loader2
                                v-if="locationStatus === 'loading'"
                                class="h-5 w-5 animate-spin"
                            />
                            <Navigation v-else class="h-5 w-5" />
                        </div>
                        <div>
                            <p
                                class="text-xs font-bold"
                                :class="
                                    isInRadius
                                        ? 'text-emerald-600 dark:text-emerald-400'
                                        : 'text-rose-500'
                                "
                            >
                                {{
                                    isInRadius
                                        ? 'Posisi Anda Dalam Radius Kantor'
                                        : 'Di Luar Radius Geofence Kantor'
                                }}
                            </p>
                            <p
                                class="text-[11px] font-medium text-muted-foreground"
                            >
                                {{ officeName }} (Geofence: {{ officeRadius }}m)
                            </p>
                        </div>
                    </div>
                    <Badge variant="outline" class="font-mono text-xs">
                        {{ distanceText }}
                    </Badge>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>
