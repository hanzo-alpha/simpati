<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useForm } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, CheckCircle2, AlertTriangle, Camera, Loader2, Navigation } from '@lucide/vue';

interface AttendanceProp {
    masuk?: string;
    istirahat?: string;
    kembali?: string;
    pulang?: string;
}

const props = defineProps<{
    todayAttendance?: AttendanceProp;
    office?: { name?: string; radius_meters?: number; latitude?: number; longitude?: number };
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
    { type: 'masuk', label: 'Masuk', time: props.todayAttendance?.masuk, done: !!props.todayAttendance?.masuk, icon: '🌅' },
    { type: 'istirahat', label: 'Istirahat', time: props.todayAttendance?.istirahat, done: !!props.todayAttendance?.istirahat, icon: '☕' },
    { type: 'kembali', label: 'Kembali', time: props.todayAttendance?.kembali, done: !!props.todayAttendance?.kembali, icon: '💼' },
    { type: 'pulang', label: 'Pulang', time: props.todayAttendance?.pulang, done: !!props.todayAttendance?.pulang, icon: '🏠' },
]);

const presensiTypes = computed(() => [
    { value: 'masuk', label: 'Presensi Masuk', icon: '🌅', disabled: !!props.todayAttendance?.masuk },
    { value: 'istirahat', label: 'Presensi Istirahat', icon: '☕', disabled: !!props.todayAttendance?.istirahat },
    { value: 'kembali', label: 'Presensi Kembali', icon: '💼', disabled: !!props.todayAttendance?.kembali },
    { value: 'pulang', label: 'Presensi Pulang', icon: '🏠', disabled: !!props.todayAttendance?.pulang },
]);

const officeRadius = computed(() => props.office?.radius_meters || 200);
const officeName = computed(() => props.office?.name || 'Kantor Pusat Bupati Soppeng');

const isInRadius = computed(() => {
    if (distance.value === null) return false;
    return distance.value <= officeRadius.value;
});

const distanceText = computed(() => {
    if (distance.value === null) return 'Mendeteksi GPS...';
    return distance.value < 1000 ? `${Math.round(distance.value)} m` : `${(distance.value / 1000).toFixed(1)} km`;
});

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
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
                distance.value = calculateDistance(userLat.value, userLng.value, officeLat, officeLng);
                locationStatus.value = 'success';
            },
            () => {
                locationStatus.value = 'error';
            },
            { enableHighAccuracy: true, timeout: 10000 }
        );
    }
};

const form = useForm({
    type: '',
    latitude: 0,
    longitude: 0,
});

const startPresensi = () => {
    if (!selectedType.value || !isInRadius.value || !userLat.value || !userLng.value) return;

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
        <div class="max-w-xl mx-auto space-y-6 pb-8">
            <header class="px-2 pt-4">
                <h1 class="text-2xl font-extrabold tracking-tight">Presensi Mandiri ASN</h1>
                <p class="text-xs text-muted-foreground mt-0.5">{{ currentDate }}</p>
            </header>

            <!-- Today Status Card -->
            <Card class="border-border/60 shadow-md backdrop-blur-xl bg-card/95">
                <CardHeader class="pb-3">
                    <CardTitle class="text-xs uppercase tracking-wider text-muted-foreground font-bold flex items-center gap-2">
                        <Clock class="w-4 h-4 text-teal-600 dark:text-teal-400" />
                        <span>Status Kehadiran Hari Ini</span>
                    </CardTitle>
                </CardHeader>
                <CardContent class="pt-0">
                    <div class="grid grid-cols-4 gap-2 text-center">
                        <div v-for="item in statusItems" :key="item.type" class="p-2.5 rounded-xl bg-muted/40 border border-border/40">
                            <span class="text-lg">{{ item.icon }}</span>
                            <p class="text-[10px] text-muted-foreground font-medium mt-0.5">{{ item.label }}</p>
                            <p
                                class="text-xs font-mono font-bold mt-1"
                                :class="item.done ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground/40'"
                            >
                                {{ item.time || '--:--' }}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <!-- Presensi Type Selector -->
            <Card class="border-border/60 shadow-md backdrop-blur-xl bg-card/95">
                <CardHeader class="pb-3">
                    <CardTitle class="text-xs uppercase tracking-wider text-muted-foreground font-bold">
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
                            class="p-4 rounded-xl border text-center transition-all duration-200 cursor-pointer"
                            :class="
                                type.disabled
                                    ? 'bg-muted/30 border-border/40 opacity-50 cursor-not-allowed'
                                    : selectedType === type.value
                                    ? 'bg-teal-500/15 border-teal-500/50 shadow-md shadow-teal-500/10'
                                    : 'bg-card border-border hover:border-teal-500/40'
                            "
                        >
                            <span class="text-2xl">{{ type.icon }}</span>
                            <p class="text-xs font-bold text-foreground mt-1">{{ type.label }}</p>
                            <Badge v-if="type.disabled" variant="outline" class="mt-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-[9px]">
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
                    class="w-32 h-32 rounded-full flex flex-col items-center justify-center shadow-xl transition-all duration-300 active:scale-95 cursor-pointer disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed"
                    :class="
                        selectedType && isInRadius
                            ? 'bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-teal-500/30 hover:scale-105 ring-4 ring-teal-500/20'
                            : 'bg-muted border border-border text-muted-foreground shadow-none'
                    "
                >
                    <Loader2 v-if="form.processing" class="w-8 h-8 animate-spin mb-1" />
                    <Camera v-else class="w-8 h-8 mb-1" />
                    <span class="text-xs font-extrabold tracking-wider">
                        {{ form.processing ? 'MEMPROSES' : selectedType ? 'PRESENSI' : 'PILIH JENIS' }}
                    </span>
                </button>
            </div>

            <!-- Location Status Card -->
            <Card class="border-border/60 shadow-md backdrop-blur-xl bg-card/95">
                <CardContent class="p-4 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div
                            class="w-10 h-10 rounded-2xl flex items-center justify-center border shrink-0"
                            :class="
                                locationStatus === 'loading'
                                    ? 'bg-amber-500/15 border-amber-500/30 text-amber-500'
                                    : isInRadius
                                    ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-500'
                                    : 'bg-rose-500/15 border-rose-500/30 text-rose-500'
                            "
                        >
                            <Loader2 v-if="locationStatus === 'loading'" class="w-5 h-5 animate-spin" />
                            <Navigation v-else class="w-5 h-5" />
                        </div>
                        <div>
                            <p
                                class="text-xs font-bold"
                                :class="isInRadius ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'"
                            >
                                {{ isInRadius ? 'Posisi Anda Dalam Radius Kantor' : 'Di Luar Radius Geofence Kantor' }}
                            </p>
                            <p class="text-[11px] text-muted-foreground font-medium">
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
