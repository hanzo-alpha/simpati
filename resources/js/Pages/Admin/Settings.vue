<script setup lang="ts">
import { useForm } from '@inertiajs/vue3';
import {
    Globe,
    Clock,
    Shield,
    RefreshCw,
    Save,
    CheckCircle2,
    Zap,
    Smartphone,
    Building2,
    Loader2,
} from '@lucide/vue';
import axios from 'axios';
import { ref } from 'vue';
import { toast } from 'vue-sonner';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/Components/ui/card';
import { Checkbox } from '@/Components/ui/checkbox';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import AdminLayout from '@/Layouts/AdminLayout.vue';

const props = defineProps<{
    settings: Record<string, string>;
}>();

const testingConnection = ref(false);
const simpegTestResult = ref<{ success?: boolean; message?: string } | null>(
    null,
);

const form = useForm({
    app_name: props.settings.app_name || 'SIMPATI',
    app_tagline:
        props.settings.app_tagline ||
        'Sistem Presensi Digital ASN Kabupaten Soppeng',
    pemda_name: props.settings.pemda_name || 'Pemerintah Kabupaten Soppeng',
    admin_email: props.settings.admin_email || 'admin@soppeng.go.id',
    admin_phone: props.settings.admin_phone || '081234567890',
    attendance_tolerance_minutes:
        props.settings.attendance_tolerance_minutes ||
        props.settings.toleransi_menit ||
        '15',
    default_geofence_radius: props.settings.default_geofence_radius || '200',
    potongan_terlambat: props.settings.potongan_terlambat || '1.0',
    potongan_sangat_terlambat:
        props.settings.potongan_sangat_terlambat || '2.5',
    potongan_psw: props.settings.potongan_psw || '1.0',
    potongan_tk:
        props.settings.potongan_tk ||
        props.settings.potongan_absent_percent ||
        '5.0',
    potongan_max_tpp: props.settings.potongan_max_tpp || '100.0',
    jam_buka_masuk: props.settings.jam_buka_masuk || '06:00',
    jam_cutoff_harian: props.settings.jam_cutoff_harian || '18:00',
    toleransi_menit: props.settings.toleransi_menit || '15',
    min_mobile_version: props.settings.min_mobile_version || '1.2.0',
    force_mobile_update:
        props.settings.force_mobile_update === '1' ||
        props.settings.force_mobile_update === 'true',
    enable_device_binding:
        props.settings.enable_device_binding === '1' ||
        props.settings.enable_device_binding === 'true',
    enable_fake_gps_detection:
        props.settings.enable_fake_gps_detection === '1' ||
        props.settings.enable_fake_gps_detection === 'true',
    allow_rear_camera:
        props.settings.allow_rear_camera === '1' ||
        props.settings.allow_rear_camera === 'true',
    allow_gallery_upload:
        props.settings.allow_gallery_upload === '1' ||
        props.settings.allow_gallery_upload === 'true',
    enable_auto_checkout:
        props.settings.enable_auto_checkout === '1' ||
        props.settings.enable_auto_checkout === 'true',
    simpeg_api_url:
        props.settings.simpeg_api_url ||
        'https://simpeg.soppengkab.go.id/api/v1',
    simpeg_api_key: props.settings.simpeg_api_key || '',
});

const saveSettings = () => {
    form.post('/admin/settings', {
        onError: (errors) => {
            const firstErrKey = Object.keys(errors)[0];
            const firstErrVal = Object.values(errors)[0];
            const errMsg = firstErrVal
                ? `${firstErrKey}: ${firstErrVal}`
                : 'Silakan periksa kembali form dan coba beberapa saat lagi.';

            toast.error('Gagal Menyimpan Pengaturan', {
                description: errMsg,
            });
        },
    });
};

const testSimpeg = async () => {
    testingConnection.value = true;
    simpegTestResult.value = null;

    try {
        const response = await axios.post('/admin/settings/test-simpeg', {
            api_url: form.simpeg_api_url,
            api_key: form.simpeg_api_key,
        });
        simpegTestResult.value = response.data;
        if (response.data?.success) {
            toast.success('Koneksi SIMPEG Berhasil', {
                description: response.data.message,
            });
        }
    } catch (e: any) {
        const msg =
            e.response?.data?.message ||
            'Gagal terhubung ke API SIMPATI/SIMPEG.';
        simpegTestResult.value = {
            success: false,
            message: msg,
        };
        toast.error('Koneksi SIMPEG Gagal', {
            description: msg,
        });
    } finally {
        testingConnection.value = false;
    }
};
</script>

<template>
    <AdminLayout
        title="Pengaturan Sistem"
        subtitle="Konfigurasi Web Admin, Aturan Presensi, Keamanan Mobile App, & Integrasi SIMPEG"
    >
        <template #actions>
            <Button
                @click="saveSettings"
                :disabled="form.processing"
                class="flex h-10 cursor-pointer items-center gap-2 rounded-none bg-primary px-4 text-xs font-bold tracking-wider text-primary-foreground uppercase shadow-none hover:bg-primary/90"
            >
                <Loader2 v-if="form.processing" class="h-4 w-4 animate-spin" />
                <Save v-else class="h-4 w-4" />
                <span>Simpan Pengaturan</span>
            </Button>
        </template>

        <form @submit.prevent="saveSettings" class="space-y-6">
            <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <!-- Card 1: Branding & Identitas Web -->
                <Card
                    class="flex flex-col justify-between rounded-none border border-border bg-card text-card-foreground shadow-xs"
                >
                    <div>
                        <CardHeader
                            class="space-y-1 border-b border-border pb-3"
                        >
                            <div class="flex items-center gap-2.5">
                                <div
                                    class="flex h-7 w-7 shrink-0 items-center justify-center rounded-none border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                >
                                    <Globe class="h-3.5 w-3.5" />
                                </div>
                                <CardTitle
                                    class="text-sm font-bold tracking-wider text-foreground uppercase"
                                    >Branding & Identitas Web</CardTitle
                                >
                            </div>
                            <p class="text-xs text-muted-foreground">
                                Pengaturan nama portal, subtitle, dan kontak
                                bantuan
                            </p>
                        </CardHeader>
                        <CardContent class="space-y-4 pt-4">
                            <div class="space-y-1.5">
                                <Label
                                    for="app_name"
                                    class="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
                                    >Nama Aplikasi / Portal</Label
                                >
                                <Input
                                    id="app_name"
                                    v-model="form.app_name"
                                    required
                                    class="h-10 rounded-none bg-background text-xs"
                                />
                            </div>

                            <div class="space-y-1.5">
                                <Label
                                    for="app_tagline"
                                    class="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
                                    >Tagline / Subtitle Sistem</Label
                                >
                                <Input
                                    id="app_tagline"
                                    v-model="form.app_tagline"
                                    required
                                    class="h-10 rounded-none bg-background text-xs"
                                />
                            </div>

                            <div class="space-y-1.5">
                                <Label
                                    for="pemda_name"
                                    class="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
                                    >Nama Pemda / Instansi Induk</Label
                                >
                                <Input
                                    id="pemda_name"
                                    v-model="form.pemda_name"
                                    required
                                    class="h-10 rounded-none bg-background text-xs"
                                />
                            </div>

                            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <div class="space-y-1.5">
                                    <Label
                                        for="admin_email"
                                        class="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
                                        >Email Support Admin</Label
                                    >
                                    <Input
                                        id="admin_email"
                                        v-model="form.admin_email"
                                        type="email"
                                        required
                                        class="h-10 rounded-none bg-background text-xs"
                                    />
                                </div>
                                <div class="space-y-1.5">
                                    <Label
                                        for="admin_phone"
                                        class="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
                                        >WhatsApp Support Admin</Label
                                    >
                                    <Input
                                        id="admin_phone"
                                        v-model="form.admin_phone"
                                        class="h-10 rounded-none bg-background text-xs"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </div>
                </Card>

                <!-- Card 2: Aturan Presensi & Cutoff -->
                <Card
                    class="flex flex-col justify-between rounded-none border border-border bg-card text-card-foreground shadow-xs"
                >
                    <div>
                        <CardHeader
                            class="space-y-1 border-b border-border pb-3"
                        >
                            <div class="flex items-center gap-2.5">
                                <div
                                    class="flex h-7 w-7 shrink-0 items-center justify-center rounded-none border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                                >
                                    <Clock class="h-3.5 w-3.5" />
                                </div>
                                <CardTitle
                                    class="text-sm font-bold tracking-wider text-foreground uppercase"
                                    >Aturan Presensi & Cutoff</CardTitle
                                >
                            </div>
                            <p class="text-xs text-muted-foreground">
                                Batas waktu presensi, toleransi, dan pemotongan
                                TPP
                            </p>
                        </CardHeader>
                        <CardContent class="space-y-4 pt-4">
                            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <div class="space-y-1.5">
                                    <Label
                                        for="tolerance"
                                        class="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
                                        >Toleransi Keterlambatan (Menit)</Label
                                    >
                                    <Input
                                        id="tolerance"
                                        v-model="
                                            form.attendance_tolerance_minutes
                                        "
                                        type="number"
                                        required
                                        class="h-10 rounded-none bg-background font-mono text-xs"
                                    />
                                </div>
                                <div class="space-y-1.5">
                                    <Label
                                        for="radius"
                                        class="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
                                        >Default Radius Geofence (Meter)</Label
                                    >
                                    <Input
                                        id="radius"
                                        v-model="form.default_geofence_radius"
                                        type="number"
                                        required
                                        class="h-10 rounded-none bg-background font-mono text-xs"
                                    />
                                </div>
                            </div>

                            <div class="space-y-3 border-t border-border pt-3">
                                <h4
                                    class="text-xs font-bold text-foreground uppercase"
                                >
                                    Rule Engine Potongan TPP (Regulasi Perbup)
                                </h4>
                                <div
                                    class="grid grid-cols-1 gap-3 sm:grid-cols-3"
                                >
                                    <div class="space-y-1.5">
                                        <Label
                                            for="potongan_terlambat"
                                            class="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
                                            >Terlambat (TL1) %</Label
                                        >
                                        <Input
                                            id="potongan_terlambat"
                                            v-model="form.potongan_terlambat"
                                            type="number"
                                            step="0.1"
                                            required
                                            class="h-10 rounded-none bg-background font-mono text-xs"
                                        />
                                    </div>
                                    <div class="space-y-1.5">
                                        <Label
                                            for="potongan_sangat_terlambat"
                                            class="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
                                            >Terlambat Parah (TL2-TL4) %</Label
                                        >
                                        <Input
                                            id="potongan_sangat_terlambat"
                                            v-model="
                                                form.potongan_sangat_terlambat
                                            "
                                            type="number"
                                            step="0.1"
                                            required
                                            class="h-10 rounded-none bg-background font-mono text-xs"
                                        />
                                    </div>
                                    <div class="space-y-1.5">
                                        <Label
                                            for="potongan_psw"
                                            class="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
                                            >Pulang Cepat (PSW) %</Label
                                        >
                                        <Input
                                            id="potongan_psw"
                                            v-model="form.potongan_psw"
                                            type="number"
                                            step="0.1"
                                            required
                                            class="h-10 rounded-none bg-background font-mono text-xs"
                                        />
                                    </div>
                                </div>
                                <div
                                    class="grid grid-cols-1 gap-3 sm:grid-cols-2"
                                >
                                    <div class="space-y-1.5">
                                        <Label
                                            for="potongan_tk"
                                            class="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
                                            >Tanpa Keterangan (Alpha) % /
                                            Hari</Label
                                        >
                                        <Input
                                            id="potongan_tk"
                                            v-model="form.potongan_tk"
                                            type="number"
                                            step="0.1"
                                            required
                                            class="h-10 rounded-none bg-background font-mono text-xs"
                                        />
                                    </div>
                                    <div class="space-y-1.5">
                                        <Label
                                            for="potongan_max_tpp"
                                            class="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
                                            >Maksimum Potongan TPP % /
                                            Bulan</Label
                                        >
                                        <Input
                                            id="potongan_max_tpp"
                                            v-model="form.potongan_max_tpp"
                                            type="number"
                                            step="0.1"
                                            required
                                            class="h-10 rounded-none bg-background font-mono text-xs font-bold text-rose-600 dark:text-rose-400"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div class="pt-2">
                                <div
                                    class="flex cursor-pointer items-center gap-2.5 rounded-none border border-border bg-background p-3.5 transition-colors hover:bg-muted/20"
                                >
                                    <Checkbox
                                        id="auto_checkout"
                                        :checked="form.enable_auto_checkout"
                                        @update:checked="
                                            form.enable_auto_checkout = $event
                                        "
                                    />
                                    <Label
                                        for="auto_checkout"
                                        class="cursor-pointer text-xs font-bold tracking-wider text-muted-foreground uppercase select-none hover:text-foreground"
                                    >
                                        Otomatiskan Checkout Sistem jika ASN
                                        lupa presensi pulang
                                    </Label>
                                </div>
                            </div>
                        </CardContent>
                    </div>
                </Card>

                <!-- Card 3: Keamanan Mobile App -->
                <Card
                    class="flex flex-col justify-between rounded-none border border-border bg-card text-card-foreground shadow-xs"
                >
                    <div>
                        <CardHeader
                            class="space-y-1 border-b border-border pb-3"
                        >
                            <div class="flex items-center gap-2.5">
                                <div
                                    class="flex h-7 w-7 shrink-0 items-center justify-center rounded-none border border-sky-500/30 bg-sky-500/10 text-sky-600 dark:text-sky-400"
                                >
                                    <Smartphone class="h-3.5 w-3.5" />
                                </div>
                                <CardTitle
                                    class="text-sm font-bold tracking-wider text-foreground uppercase"
                                    >Keamanan Mobile App</CardTitle
                                >
                            </div>
                            <p class="text-xs text-muted-foreground">
                                Penguncian HP (Device Binding) & Deteksi Fake
                                GPS
                            </p>
                        </CardHeader>
                        <CardContent class="space-y-4 pt-4">
                            <div
                                class="divide-y divide-border border border-border bg-background"
                            >
                                <div
                                    class="flex cursor-pointer items-center justify-between p-3.5 transition-colors hover:bg-muted/30"
                                >
                                    <div>
                                        <p
                                            class="text-xs font-bold text-foreground"
                                        >
                                            Device Binding (Single Device ID)
                                        </p>
                                        <p
                                            class="text-[11px] text-muted-foreground"
                                        >
                                            ASN hanya dapat login pada 1
                                            perangkat HP yang terdaftar.
                                        </p>
                                    </div>
                                    <Checkbox
                                        id="device_binding"
                                        :checked="form.enable_device_binding"
                                        @update:checked="
                                            form.enable_device_binding = $event
                                        "
                                    />
                                </div>

                                <div
                                    class="flex cursor-pointer items-center justify-between p-3.5 transition-colors hover:bg-muted/30"
                                >
                                    <div>
                                        <p
                                            class="text-xs font-bold text-foreground"
                                        >
                                            Anti Fake GPS & Mock Location
                                        </p>
                                        <p
                                            class="text-[11px] text-muted-foreground"
                                        >
                                            Tolak otomatis presensi jika
                                            terdeteksi lokasi palsu/GPS spoofer.
                                        </p>
                                    </div>
                                    <Checkbox
                                        id="fake_gps"
                                        :checked="
                                            form.enable_fake_gps_detection
                                        "
                                        @update:checked="
                                            form.enable_fake_gps_detection =
                                                $event
                                        "
                                    />
                                </div>

                                <div
                                    class="flex cursor-pointer items-center justify-between p-3.5 transition-colors hover:bg-muted/30"
                                >
                                    <div>
                                        <p
                                            class="text-xs font-bold text-foreground"
                                        >
                                            Izinkan Kamera Belakang
                                        </p>
                                        <p
                                            class="text-[11px] text-muted-foreground"
                                        >
                                            Izinkan ASN mengambil foto presensi
                                            menggunakan kamera belakang.
                                        </p>
                                    </div>
                                    <Checkbox
                                        id="allow_rear_camera"
                                        :checked="form.allow_rear_camera"
                                        @update:checked="
                                            form.allow_rear_camera = $event
                                        "
                                    />
                                </div>

                                <div
                                    class="flex cursor-pointer items-center justify-between p-3.5 transition-colors hover:bg-muted/30"
                                >
                                    <div>
                                        <p
                                            class="text-xs font-bold text-foreground"
                                        >
                                            Izinkan Unggah dari Galeri
                                        </p>
                                        <p
                                            class="text-[11px] text-muted-foreground"
                                        >
                                            Izinkan ASN memilih foto dari galeri
                                            HP (Default: Nonaktif).
                                        </p>
                                    </div>
                                    <Checkbox
                                        id="allow_gallery_upload"
                                        :checked="form.allow_gallery_upload"
                                        @update:checked="
                                            form.allow_gallery_upload = $event
                                        "
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </div>
                </Card>

                <!-- Card 4: Integrasi SIMPEG -->
                <Card
                    class="flex flex-col justify-between rounded-none border border-border bg-card text-card-foreground shadow-xs"
                >
                    <div>
                        <CardHeader
                            class="space-y-1 border-b border-border pb-3"
                        >
                            <div class="flex items-center gap-2.5">
                                <div
                                    class="flex h-7 w-7 shrink-0 items-center justify-center rounded-none border border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                                >
                                    <RefreshCw class="h-3.5 w-3.5" />
                                </div>
                                <CardTitle
                                    class="text-sm font-bold tracking-wider text-foreground uppercase"
                                    >Integrasi API SIMPEG</CardTitle
                                >
                            </div>
                            <p class="text-xs text-muted-foreground">
                                Sinkronisasi Master Pegawai & Rekap TPP ke
                                SIMPEG
                            </p>
                        </CardHeader>
                        <CardContent class="space-y-4 pt-4">
                            <div class="space-y-1.5">
                                <Label
                                    for="simpeg_url"
                                    class="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
                                    >Endpoint Base URL SIMPEG</Label
                                >
                                <Input
                                    id="simpeg_url"
                                    v-model="form.simpeg_api_url"
                                    placeholder="https://simpeg.soppengkab.go.id/api/v1"
                                    class="h-10 rounded-none bg-background font-mono text-xs"
                                />
                            </div>

                            <div class="space-y-1.5">
                                <Label
                                    for="simpeg_key"
                                    class="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
                                    >Secret Bearer API Key SIMPEG</Label
                                >
                                <Input
                                    id="simpeg_key"
                                    v-model="form.simpeg_api_key"
                                    type="password"
                                    placeholder="••••••••••••"
                                    class="h-10 rounded-none bg-background font-mono text-xs"
                                />
                            </div>

                            <div class="flex items-center justify-between pt-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    @click="testSimpeg"
                                    :disabled="testingConnection"
                                    class="flex h-10 cursor-pointer items-center gap-2 rounded-none border-border text-xs font-bold tracking-wider uppercase"
                                >
                                    <Loader2
                                        v-if="testingConnection"
                                        class="h-3.5 w-3.5 animate-spin"
                                    />
                                    <Zap
                                        v-else
                                        class="h-3.5 w-3.5 text-amber-500"
                                    />
                                    <span>Tes Koneksi API SIMPEG</span>
                                </Button>

                                <Badge
                                    v-if="simpegTestResult"
                                    :variant="
                                        simpegTestResult.success
                                            ? 'default'
                                            : 'destructive'
                                    "
                                    class="rounded-none text-[10px] font-bold tracking-wider uppercase"
                                >
                                    {{ simpegTestResult.message }}
                                </Badge>
                            </div>
                        </CardContent>
                    </div>
                </Card>
            </div>
        </form>
    </AdminLayout>
</template>
