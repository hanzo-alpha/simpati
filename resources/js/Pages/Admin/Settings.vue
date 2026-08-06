<script setup lang="ts">
import { ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
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

const props = defineProps<{
    settings: Record<string, string>;
}>();

const successMessage = ref('');
const testingConnection = ref(false);
const simpegTestResult = ref<{ success?: boolean; message?: string } | null>(null);

const form = useForm({
    app_name: props.settings.app_name || 'SIMPATI',
    app_tagline: props.settings.app_tagline || 'Sistem Presensi Digital ASN Kabupaten Soppeng',
    pemda_name: props.settings.pemda_name || 'Pemerintah Kabupaten Soppeng',
    admin_email: props.settings.admin_email || 'admin@soppengkab.go.id',
    admin_phone: props.settings.admin_phone || '081234567890',
    attendance_tolerance_minutes: props.settings.attendance_tolerance_minutes || '15',
    default_geofence_radius: props.settings.default_geofence_radius || '200',
    tpp_deduction_late_percent: props.settings.tpp_deduction_late_percent || '1.5',
    tpp_deduction_absent_percent: props.settings.tpp_deduction_absent_percent || '5.0',
    enable_device_binding: props.settings.enable_device_binding === '1' || props.settings.enable_device_binding === 'true',
    enable_fake_gps_detection: props.settings.enable_fake_gps_detection === '1' || props.settings.enable_fake_gps_detection === 'true',
    enable_auto_checkout: props.settings.enable_auto_checkout === '1' || props.settings.enable_auto_checkout === 'true',
    simpeg_api_url: props.settings.simpeg_api_url || 'https://simpeg.soppengkab.go.id/api/v1',
    simpeg_api_key: props.settings.simpeg_api_key || '',
});

const saveSettings = () => {
    form.post('/admin/settings', {
        onSuccess: () => {
            successMessage.value = 'Pengaturan sistem SIMPATI berhasil diperbarui!';
            setTimeout(() => {
                successMessage.value = '';
            }, 4000);
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
    } catch (e: any) {
        simpegTestResult.value = {
            success: false,
            message: e.response?.data?.message || 'Gagal terhubung ke API SIMPATI/SIMPEG.',
        };
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
                class="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-semibold shadow-md shadow-teal-600/20 rounded-xl cursor-pointer"
            >
                <Loader2 v-if="form.processing" class="w-4 h-4 mr-2 animate-spin" />
                <Save v-else class="w-4 h-4 mr-2" />
                <span>Simpan Pengaturan</span>
            </Button>
        </template>

        <!-- Alert Notification -->
        <div
            v-if="successMessage"
            class="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-between text-emerald-600 dark:text-emerald-400 font-bold text-xs shadow-sm"
        >
            <div class="flex items-center gap-3">
                <CheckCircle2 class="w-5 h-5 shrink-0" />
                <span>{{ successMessage }}</span>
            </div>
            <button @click="successMessage = ''" class="text-xs hover:text-foreground">✕</button>
        </div>

        <form @submit.prevent="saveSettings" class="space-y-6">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Card 1: Branding & Identitas Web -->
                <Card class="border-border/60 shadow-md backdrop-blur-xl bg-card/95">
                    <CardHeader class="pb-3 flex-row items-center gap-3 space-y-0">
                        <div class="w-10 h-10 rounded-2xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-600 dark:text-teal-400">
                            <Globe class="w-5 h-5" />
                        </div>
                        <div>
                            <CardTitle class="text-base font-bold">Branding & Identitas Web</CardTitle>
                            <p class="text-xs text-muted-foreground">Pengaturan nama portal, subtitle, dan kontak bantuan</p>
                        </div>
                    </CardHeader>
                    <CardContent class="space-y-4 pt-2">
                        <div class="space-y-1.5">
                            <Label for="app_name" class="text-xs font-semibold">Nama Aplikasi / Portal</Label>
                            <Input id="app_name" v-model="form.app_name" required class="h-9 text-xs" />
                        </div>

                        <div class="space-y-1.5">
                            <Label for="app_tagline" class="text-xs font-semibold">Tagline / Subtitle Sistem</Label>
                            <Input id="app_tagline" v-model="form.app_tagline" required class="h-9 text-xs" />
                        </div>

                        <div class="space-y-1.5">
                            <Label for="pemda_name" class="text-xs font-semibold">Nama Pemda / Instansi Induk</Label>
                            <Input id="pemda_name" v-model="form.pemda_name" required class="h-9 text-xs" />
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div class="space-y-1.5">
                                <Label for="admin_email" class="text-xs font-semibold">Email Support Admin</Label>
                                <Input id="admin_email" v-model="form.admin_email" type="email" required class="h-9 text-xs" />
                            </div>
                            <div class="space-y-1.5">
                                <Label for="admin_phone" class="text-xs font-semibold">WhatsApp Support Admin</Label>
                                <Input id="admin_phone" v-model="form.admin_phone" class="h-9 text-xs" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <!-- Card 2: Aturan Presensi & Cutoff -->
                <Card class="border-border/60 shadow-md backdrop-blur-xl bg-card/95">
                    <CardHeader class="pb-3 flex-row items-center gap-3 space-y-0">
                        <div class="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                            <Clock class="w-5 h-5" />
                        </div>
                        <div>
                            <CardTitle class="text-base font-bold">Aturan Presensi & Cutoff</CardTitle>
                            <p class="text-xs text-muted-foreground">Batas waktu presensi, toleransi, dan pemotongan TPP</p>
                        </div>
                    </CardHeader>
                    <CardContent class="space-y-4 pt-2">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div class="space-y-1.5">
                                <Label for="tolerance" class="text-xs font-semibold">Toleransi Keterlambatan (Menit)</Label>
                                <Input id="tolerance" v-model="form.attendance_tolerance_minutes" type="number" required class="h-9 text-xs" />
                            </div>
                            <div class="space-y-1.5">
                                <Label for="radius" class="text-xs font-semibold">Default Radius Geofence (Meter)</Label>
                                <Input id="radius" v-model="form.default_geofence_radius" type="number" required class="h-9 text-xs" />
                            </div>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div class="space-y-1.5">
                                <Label for="late_tpp" class="text-xs font-semibold">Potongan TPP Terlambat (%)</Label>
                                <Input id="late_tpp" v-model="form.tpp_deduction_late_percent" type="number" step="0.1" required class="h-9 text-xs" />
                            </div>
                            <div class="space-y-1.5">
                                <Label for="absent_tpp" class="text-xs font-semibold">Potongan TPP Alpha (%)</Label>
                                <Input id="absent_tpp" v-model="form.tpp_deduction_absent_percent" type="number" step="0.1" required class="h-9 text-xs" />
                            </div>
                        </div>

                        <div class="pt-2">
                            <div class="flex items-center gap-2 cursor-pointer">
                                <Checkbox
                                    id="auto_checkout"
                                    :checked="form.enable_auto_checkout"
                                    @update:checked="form.enable_auto_checkout = $event"
                                />
                                <Label for="auto_checkout" class="text-xs text-muted-foreground hover:text-foreground cursor-pointer">
                                    Otomatiskan Checkout Sistem jika ASN lupa presensi pulang
                                </Label>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <!-- Card 3: Keamanan Mobile App -->
                <Card class="border-border/60 shadow-md backdrop-blur-xl bg-card/95">
                    <CardHeader class="pb-3 flex-row items-center gap-3 space-y-0">
                        <div class="w-10 h-10 rounded-2xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-600 dark:text-sky-400">
                            <Smartphone class="w-5 h-5" />
                        </div>
                        <div>
                            <CardTitle class="text-base font-bold">Keamanan Mobile App</CardTitle>
                            <p class="text-xs text-muted-foreground">Penguncian HP (Device Binding) & Deteksi Fake GPS</p>
                        </div>
                    </CardHeader>
                    <CardContent class="space-y-4 pt-2">
                        <div class="p-3.5 rounded-xl bg-muted/50 border border-border/60 space-y-3">
                            <div class="flex items-center justify-between cursor-pointer">
                                <div>
                                    <p class="text-xs font-bold text-foreground">Device Binding (Single Device ID)</p>
                                    <p class="text-[11px] text-muted-foreground">ASN hanya dapat login pada 1 perangkat HP yang terdaftar.</p>
                                </div>
                                <Checkbox
                                    id="device_binding"
                                    :checked="form.enable_device_binding"
                                    @update:checked="form.enable_device_binding = $event"
                                />
                            </div>

                            <div class="border-t border-border/40 pt-3">
                                <div class="flex items-center justify-between cursor-pointer">
                                    <div>
                                        <p class="text-xs font-bold text-foreground">Anti Fake GPS & Mock Location</p>
                                        <p class="text-[11px] text-muted-foreground">Tolak otomatis presensi jika terdeteksi lokasi palsu/GPS spoofer.</p>
                                    </div>
                                    <Checkbox
                                        id="fake_gps"
                                        :checked="form.enable_fake_gps_detection"
                                        @update:checked="form.enable_fake_gps_detection = $event"
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <!-- Card 4: Integrasi SIMPEG -->
                <Card class="border-border/60 shadow-md backdrop-blur-xl bg-card/95">
                    <CardHeader class="pb-3 flex-row items-center gap-3 space-y-0">
                        <div class="w-10 h-10 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                            <RefreshCw class="w-5 h-5" />
                        </div>
                        <div>
                            <CardTitle class="text-base font-bold">Integrasi API SIMPEG</CardTitle>
                            <p class="text-xs text-muted-foreground">Sinkronisasi Master Pegawai & Rekap TPP ke SIMPEG</p>
                        </div>
                    </CardHeader>
                    <CardContent class="space-y-4 pt-2">
                        <div class="space-y-1.5">
                            <Label for="simpeg_url" class="text-xs font-semibold">Endpoint Base URL SIMPEG</Label>
                            <Input id="simpeg_url" v-model="form.simpeg_api_url" placeholder="https://simpeg.soppengkab.go.id/api/v1" class="h-9 text-xs" />
                        </div>

                        <div class="space-y-1.5">
                            <Label for="simpeg_key" class="text-xs font-semibold">Secret Bearer API Key SIMPEG</Label>
                            <Input id="simpeg_key" v-model="form.simpeg_api_key" type="password" placeholder="••••••••••••" class="h-9 text-xs" />
                        </div>

                        <div class="pt-2 flex items-center justify-between">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                @click="testSimpeg"
                                :disabled="testingConnection"
                                class="text-xs font-semibold cursor-pointer"
                            >
                                <Loader2 v-if="testingConnection" class="w-3.5 h-3.5 mr-1.5 animate-spin" />
                                <Zap v-else class="w-3.5 h-3.5 mr-1.5 text-amber-500" />
                                <span>Tes Koneksi API SIMPEG</span>
                            </Button>

                            <Badge v-if="simpegTestResult" :variant="simpegTestResult.success ? 'default' : 'destructive'" class="text-[10px]">
                                {{ simpegTestResult.message }}
                            </Badge>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </form>
    </AdminLayout>
</template>
