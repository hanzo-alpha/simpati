<script setup lang="ts">
import { ref, computed, nextTick } from 'vue';
import { router } from '@inertiajs/vue3';
import axios from 'axios';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import Pagination from '@/Components/Pagination.vue';
import {
    ClipboardList,
    Search,
    Filter,
    RotateCcw,
    QrCode,
    FileSpreadsheet,
    FileText,
    Download,
    ChevronDown,
    CheckCircle2,
    AlertTriangle,
    MapPin,
    Loader2,
} from '@lucide/vue';
import * as adminRoutes from '@/routes/admin';

interface Office {
    id: number;
    opd_name: string;
}

interface AttendanceItem {
    id: number;
    tanggal: string;
    waktu: string;
    name: string;
    nip: string;
    opd: string;
    unit_kerja?: string;
    jenis: string;
    status: string;
    latitude?: number;
    longitude?: number;
}

interface SummaryProps {
    total?: number;
    tepat_waktu?: number;
    terlambat?: number;
    masuk?: number;
    pulang?: number;
}

interface FiltersProps {
    search?: string;
    month?: string | number;
    year?: string | number;
    opd?: string;
    unit_kerja?: string;
    jenis?: string;
    status?: string;
}

const props = withDefaults(
    defineProps<{
        attendances?: AttendanceItem[];
        offices?: Office[];
        unitKerjaList?: string[];
        summary?: SummaryProps;
        currentMonth?: number;
        currentYear?: number;
        filters?: FiltersProps;
    }>(),
    {
        attendances: () => [],
        offices: () => [],
        unitKerjaList: () => [],
        summary: () => ({}),
        currentMonth: () => new Date().getMonth() + 1,
        currentYear: () => new Date().getFullYear(),
        filters: () => ({}),
    }
);

const searchQuery = ref(props.filters.search || '');
const selectedMonth = ref(String(props.filters.month ? Number(props.filters.month) : props.currentMonth));
const selectedYear = ref(String(props.filters.year ? Number(props.filters.year) : props.currentYear));
const selectedOpd = ref(props.filters.opd ? String(props.filters.opd) : 'all');
const selectedUnitKerja = ref(props.filters.unit_kerja || 'all');
const selectedJenis = ref(props.filters.jenis || 'all');
const selectedStatus = ref(props.filters.status || 'all');

const showQrModal = ref(false);
const qrInput = ref('');
const qrAcara = ref('');
const qrResult = ref<any>(null);
const qrError = ref<string | null>(null);
const isVerifying = ref(false);
const qrInputRef = ref<HTMLInputElement | null>(null);

const currentPage = ref(1);
const itemsPerPage = 10;

const paginatedAttendances = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return props.attendances.slice(start, start + itemsPerPage);
});

const hasActiveFilters = computed(() => {
    return (
        searchQuery.value !== '' ||
        selectedOpd.value !== 'all' ||
        selectedUnitKerja.value !== 'all' ||
        selectedJenis.value !== 'all' ||
        selectedStatus.value !== 'all'
    );
});

const openQrModal = () => {
    showQrModal.value = true;
    qrResult.value = null;
    qrError.value = null;
    qrInput.value = '';
    nextTick(() => {
        if (qrInputRef.value) qrInputRef.value.focus();
    });
};

const submitQrScan = async () => {
    if (!qrInput.value) return;
    isVerifying.value = true;
    qrResult.value = null;
    qrError.value = null;

    try {
        const response = await axios.post('/admin/attendances/verify-qr', {
            qr_code: qrInput.value,
            acara: qrAcara.value,
        });

        qrResult.value = response.data;
        qrInput.value = '';
        nextTick(() => {
            if (qrInputRef.value) qrInputRef.value.focus();
        });
    } catch (err: any) {
        qrError.value = err.response?.data?.message || 'Gagal memverifikasi QR Code NIP.';
    } finally {
        isVerifying.value = false;
    }
};

const recapTypeOptions = [
    { value: '', label: 'Semua Jenis Presensi', dot: 'bg-slate-400' },
    { value: 'masuk', label: 'Masuk (Check-in)', dot: 'bg-emerald-500' },
    { value: 'pulang', label: 'Pulang (Check-out)', dot: 'bg-purple-500' },
    { value: 'wfh', label: 'Work From Home', dot: 'bg-sky-500' },
    { value: 'dinas_luar', label: 'Dinas Luar', dot: 'bg-indigo-500' },
    { value: 'istirahat', label: 'Istirahat', dot: 'bg-amber-500' },
    { value: 'kembali', label: 'Kembali', dot: 'bg-blue-500' },
];

const months = [
    { value: '1', label: 'Januari' },
    { value: '2', label: 'Februari' },
    { value: '3', label: 'Maret' },
    { value: '4', label: 'April' },
    { value: '5', label: 'Mei' },
    { value: '6', label: 'Juni' },
    { value: '7', label: 'Juli' },
    { value: '8', label: 'Agustus' },
    { value: '9', label: 'September' },
    { value: '10', label: 'Oktober' },
    { value: '11', label: 'November' },
    { value: '12', label: 'Desember' },
];

const monthName = computed(() => {
    const m = months.find((item) => item.value === selectedMonth.value);
    return `${m?.label || ''} ${selectedYear.value}`;
});

const summaryCards = computed(() => [
    { label: 'Total Log Presensi', value: props.summary.total || 0, color: 'text-foreground' },
    { label: 'Presensi Tepat Waktu', value: props.summary.tepat_waktu || 0, color: 'text-emerald-500' },
    { label: 'Presensi Terlambat', value: props.summary.terlambat || 0, color: 'text-amber-500' },
    { label: 'Check-in Masuk', value: props.summary.masuk || 0, color: 'text-teal-500' },
    { label: 'Check-out Pulang', value: props.summary.pulang || 0, color: 'text-purple-500' },
]);

const reload = () => {
    router.get(
        adminRoutes.attendances.url(),
        {
            month: selectedMonth.value,
            year: selectedYear.value,
            opd: selectedOpd.value !== 'all' ? selectedOpd.value : undefined,
            unit_kerja: selectedUnitKerja.value !== 'all' ? selectedUnitKerja.value : undefined,
            jenis: selectedJenis.value !== 'all' ? selectedJenis.value : undefined,
            status: selectedStatus.value !== 'all' ? selectedStatus.value : undefined,
            search: searchQuery.value || undefined,
        },
        { preserveState: true, preserveScroll: true }
    );
};

const resetFilters = () => {
    searchQuery.value = '';
    selectedOpd.value = 'all';
    selectedUnitKerja.value = 'all';
    selectedJenis.value = 'all';
    selectedStatus.value = 'all';
    reload();
};

const downloadCsv = () => {
    const opdParam = selectedOpd.value !== 'all' ? `&opd=${selectedOpd.value}` : '';
    const unitParam = selectedUnitKerja.value !== 'all' ? `&unit_kerja=${selectedUnitKerja.value}` : '';
    const params = `month=${selectedMonth.value}&year=${selectedYear.value}${opdParam}${unitParam}`;
    window.location.href = `/admin/attendances/export?${params}`;
};

const downloadTppReport = () => {
    const opdParam = selectedOpd.value !== 'all' ? `&opd=${selectedOpd.value}` : '';
    const params = `month=${selectedMonth.value}&year=${selectedYear.value}${opdParam}`;
    window.open(`/admin/attendances/export-tpp?${params}`, '_blank');
};

const downloadSummaryReport = () => {
    const opdParam = selectedOpd.value !== 'all' ? `&opd=${selectedOpd.value}` : '';
    const params = `month=${selectedMonth.value}&year=${selectedYear.value}${opdParam}`;
    window.open(`/admin/attendances/export-summary?${params}`, '_blank');
};

const downloadRecapPdf = (type: string) => {
    const opdParam = selectedOpd.value !== 'all' ? `&opd=${selectedOpd.value}` : '';
    const typeParam = type ? `&type=${type}` : '';
    const params = `month=${selectedMonth.value}&year=${selectedYear.value}${opdParam}${typeParam}`;
    window.open(`/admin/attendances/export-recap?${params}`, '_blank');
};
</script>

<template>
    <AdminLayout title="Rekap Presensi ASN" :subtitle="`Data log presensi periode ${monthName}`">
        <!-- Page Header Actions (Scan QR Prominent Button) -->
        <template #actions>
            <Button
                @click="openQrModal"
                class="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold text-xs shadow-md shadow-emerald-600/20 rounded-xl cursor-pointer"
            >
                <QrCode class="w-4 h-4 mr-2" />
                <span>Scan QR Presensi ASN</span>
            </Button>
        </template>

        <!-- 1. Top Summary KPI Widget Cards (Paling Atas) -->
        <div class="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <Card v-for="s in summaryCards" :key="s.label" class="border-border/60 shadow-sm backdrop-blur-xl bg-card/95 text-center">
                <CardContent class="p-4">
                    <p class="text-xl font-black" :class="s.color">{{ s.value }}</p>
                    <p class="text-xs font-medium text-muted-foreground mt-1">{{ s.label }}</p>
                </CardContent>
            </Card>
        </div>

        <!-- 2. Filter & Search & Export Card -->
        <Card class="border-border/60 shadow-md backdrop-blur-xl bg-card/95 mb-6">
            <CardHeader class="pb-3 flex-row items-center justify-between space-y-0">
                <CardTitle class="text-base font-bold flex items-center gap-2">
                    <Filter class="w-4 h-4 text-teal-600 dark:text-teal-400" />
                    <span>Pencarian & Filter Rekap Presensi</span>
                </CardTitle>

                <Button
                    v-if="hasActiveFilters"
                    variant="ghost"
                    size="sm"
                    @click="resetFilters"
                    class="h-8 text-xs text-rose-500 hover:bg-rose-500/10 cursor-pointer"
                >
                    <RotateCcw class="w-3.5 h-3.5 mr-1" />
                    <span>Reset Filter</span>
                </Button>
            </CardHeader>

            <CardContent class="pt-0 space-y-4">
                <!-- Search & Action Toolbar -->
                <div class="flex flex-col md:flex-row items-center justify-between gap-3">
                    <div class="relative w-full md:flex-1">
                        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                        <Input
                            id="search"
                            v-model="searchQuery"
                            @keyup.enter="reload"
                            type="text"
                            placeholder="Ketik Nama / NIP Pegawai lalu Tekan Enter..."
                            class="pl-9 h-9 text-xs transition-all focus-visible:ring-teal-500 w-full"
                        />
                    </div>

                    <div class="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
                        <!-- Shadcn DropdownMenu for Rekap Per Jenis -->
                        <DropdownMenu>
                            <DropdownMenuTrigger as-child>
                                <Button variant="outline" size="sm" class="h-9 text-xs font-semibold cursor-pointer">
                                    <FileText class="w-3.5 h-3.5 mr-1.5 text-sky-500" />
                                    <span>Rekap Per Jenis</span>
                                    <ChevronDown class="w-3.5 h-3.5 ml-1" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" class="w-56 backdrop-blur-2xl bg-card/95">
                                <DropdownMenuLabel class="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                                    Option Cetak PDF
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    v-for="opt in recapTypeOptions"
                                    :key="opt.value"
                                    @click="downloadRecapPdf(opt.value)"
                                    class="text-xs cursor-pointer flex items-center gap-2.5"
                                >
                                    <span class="w-2 h-2 rounded-full" :class="opt.dot"></span>
                                    <span class="font-medium text-foreground">{{ opt.label }}</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Button
                            variant="outline"
                            size="sm"
                            @click="downloadSummaryReport"
                            class="h-9 text-xs font-semibold cursor-pointer"
                        >
                            <FileSpreadsheet class="w-3.5 h-3.5 mr-1.5 text-amber-500" />
                            <span>Rekap Matriks</span>
                        </Button>

                        <Button
                            variant="outline"
                            size="sm"
                            @click="downloadTppReport"
                            class="h-9 text-xs font-semibold cursor-pointer"
                        >
                            <FileText class="w-3.5 h-3.5 mr-1.5 text-emerald-500" />
                            <span>Laporan TPP</span>
                        </Button>

                        <Button
                            variant="outline"
                            size="sm"
                            @click="downloadCsv"
                            class="h-9 text-xs font-semibold cursor-pointer"
                        >
                            <Download class="w-3.5 h-3.5 mr-1.5 text-teal-500" />
                            <span>CSV</span>
                        </Button>
                    </div>
                </div>

                <!-- 6-Column Grid Filter Selects -->
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 pt-3 border-t border-border/50">
                    <!-- Filter Bulan -->
                    <div class="space-y-1">
                        <Label class="text-xs font-semibold text-muted-foreground">Bulan</Label>
                        <Select v-model="selectedMonth" @update:model-value="reload">
                            <SelectTrigger class="h-9 text-xs bg-background w-full">
                                <SelectValue placeholder="Pilih Bulan" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem v-for="m in months" :key="m.value" :value="m.value">
                                    {{ m.label }}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <!-- Filter Tahun -->
                    <div class="space-y-1">
                        <Label class="text-xs font-semibold text-muted-foreground">Tahun</Label>
                        <Select v-model="selectedYear" @update:model-value="reload">
                            <SelectTrigger class="h-9 text-xs bg-background w-full">
                                <SelectValue placeholder="Pilih Tahun" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem v-for="y in ['2024', '2025', '2026']" :key="y" :value="y">
                                    {{ y }}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <!-- Filter OPD Utama -->
                    <div class="space-y-1">
                        <Label class="text-xs font-semibold text-muted-foreground">OPD Utama</Label>
                        <Select v-model="selectedOpd" @update:model-value="reload">
                            <SelectTrigger class="h-9 text-xs bg-background w-full">
                                <SelectValue placeholder="Semua OPD" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua OPD</SelectItem>
                                <SelectItem v-for="o in offices" :key="o.id" :value="String(o.id)">
                                    {{ o.opd_name }}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <!-- Filter Sub OPD / Unit Kerja -->
                    <div class="space-y-1">
                        <Label class="text-xs font-semibold text-muted-foreground">Sub Unit Kerja</Label>
                        <Select v-model="selectedUnitKerja" @update:model-value="reload">
                            <SelectTrigger class="h-9 text-xs bg-background w-full">
                                <SelectValue placeholder="Semua Unit Kerja" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua Unit Kerja</SelectItem>
                                <SelectItem v-for="u in unitKerjaList" :key="u" :value="u">
                                    {{ u }}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <!-- Filter Jenis Presensi -->
                    <div class="space-y-1">
                        <Label class="text-xs font-semibold text-muted-foreground">Jenis Presensi</Label>
                        <Select v-model="selectedJenis" @update:model-value="reload">
                            <SelectTrigger class="h-9 text-xs bg-background w-full">
                                <SelectValue placeholder="Semua Jenis" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua Jenis</SelectItem>
                                <SelectItem value="masuk">Masuk</SelectItem>
                                <SelectItem value="pulang">Pulang</SelectItem>
                                <SelectItem value="wfh">WFH</SelectItem>
                                <SelectItem value="dinas_luar">Dinas Luar</SelectItem>
                                <SelectItem value="istirahat">Istirahat</SelectItem>
                                <SelectItem value="kembali">Kembali</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <!-- Filter Status Presensi -->
                    <div class="space-y-1">
                        <Label class="text-xs font-semibold text-muted-foreground">Status Presensi</Label>
                        <Select v-model="selectedStatus" @update:model-value="reload">
                            <SelectTrigger class="h-9 text-xs bg-background w-full">
                                <SelectValue placeholder="Semua Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua Status</SelectItem>
                                <SelectItem value="tepat_waktu">Tepat Waktu</SelectItem>
                                <SelectItem value="terlambat">Terlambat</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardContent>
        </Card>

        <!-- 3. Table Presensi Card -->
        <Card class="border-border/60 shadow-md backdrop-blur-xl bg-card/95">
            <CardContent class="p-0">
                <div class="overflow-x-auto">
                    <table class="w-full text-xs">
                        <thead>
                            <tr class="text-left text-muted-foreground border-b border-border bg-muted/30">
                                <th class="px-4 py-3.5 font-semibold text-center w-10">#</th>
                                <th class="px-4 py-3.5 font-semibold">Tanggal</th>
                                <th class="px-4 py-3.5 font-semibold">NIP & Nama Pegawai</th>
                                <th class="px-4 py-3.5 font-semibold">OPD & Unit Kerja</th>
                                <th class="px-4 py-3.5 font-semibold text-center">Jenis</th>
                                <th class="px-4 py-3.5 font-semibold text-center">Waktu Presensi</th>
                                <th class="px-4 py-3.5 font-semibold text-center">Status</th>
                                <th class="px-4 py-3.5 font-semibold text-center">Koordinat GPS</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-border/40">
                            <tr
                                v-for="(att, i) in paginatedAttendances"
                                :key="att.id"
                                class="hover:bg-muted/40 transition-colors"
                            >
                                <td class="px-4 py-3.5 text-center font-mono text-muted-foreground">{{ (currentPage - 1) * itemsPerPage + i + 1 }}</td>
                                <td class="px-4 py-3.5 font-mono text-muted-foreground font-semibold text-[11px]">{{ att.tanggal }}</td>
                                <td class="px-4 py-3.5">
                                    <p class="font-semibold text-foreground">{{ att.name }}</p>
                                    <p class="text-[10px] font-mono text-teal-600 dark:text-teal-400 font-bold">NIP: {{ att.nip }}</p>
                                </td>
                                <td class="px-4 py-3.5 text-muted-foreground">
                                    <p class="font-medium text-foreground">{{ att.opd }}</p>
                                    <span v-if="att.unit_kerja" class="inline-block px-1.5 py-0.5 text-[9px] font-semibold bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-md border border-teal-500/20">
                                        {{ att.unit_kerja }}
                                    </span>
                                </td>
                                <td class="px-4 py-3.5 text-center">
                                    <Badge variant="outline" class="text-[10px] font-semibold uppercase px-2 py-0.5">
                                        {{ att.jenis }}
                                    </Badge>
                                </td>
                                <td class="px-4 py-3.5 text-center font-mono font-bold text-teal-600 dark:text-teal-400 text-xs">
                                    {{ att.waktu }} WITA
                                </td>
                                <td class="px-4 py-3.5 text-center">
                                    <Badge
                                        :variant="att.status === 'tepat_waktu' ? 'default' : 'outline'"
                                        class="text-[10px] font-semibold uppercase px-2.5 py-0.5"
                                        :class="{
                                            'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30': att.status === 'tepat_waktu',
                                            'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30': att.status !== 'tepat_waktu',
                                        }"
                                    >
                                        {{ att.status ? att.status.replace('_', ' ') : 'PRESENSI' }}
                                    </Badge>
                                </td>
                                <td class="px-4 py-3.5 text-center font-mono text-muted-foreground text-[11px]">
                                    <span v-if="att.latitude && att.longitude" class="flex items-center justify-center gap-1">
                                        <MapPin class="w-3 h-3 text-sky-500 shrink-0" />
                                        <span>{{ Number(att.latitude).toFixed(4) }}, {{ Number(att.longitude).toFixed(4) }}</span>
                                    </span>
                                    <span v-else>-</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div v-if="!attendances.length" class="text-center text-muted-foreground py-10 space-y-2">
                        <ClipboardList class="w-8 h-8 mx-auto text-muted-foreground/50" />
                        <p>Belum ada log data presensi untuk filter ini.</p>
                    </div>

                    <Pagination
                        v-if="attendances.length > 0"
                        v-model:currentPage="currentPage"
                        :totalItems="attendances.length"
                        :itemsPerPage="itemsPerPage"
                    />
                </div>
            </CardContent>
        </Card>

        <!-- Scan QR Presensi Shadcn Dialog -->
        <Dialog v-model:open="showQrModal">
            <DialogContent class="sm:max-w-md bg-card/95 border-border/80 backdrop-blur-2xl">
                <DialogHeader>
                    <DialogTitle class="text-base font-bold flex items-center gap-2">
                        <QrCode class="w-4 h-4 text-emerald-500" />
                        <span>Scan QR Presensi ASN</span>
                    </DialogTitle>
                </DialogHeader>

                <form @submit.prevent="submitQrScan" class="space-y-3 pt-2">
                    <div class="space-y-1.5">
                        <Label for="qr_input" class="text-xs">Barcode / QR Code NIP ASN</Label>
                        <Input
                            id="qr_input"
                            ref="qrInputRef"
                            v-model="qrInput"
                            required
                            placeholder="Scan dengan Scanner Barcode..."
                            class="h-10 text-xs font-mono"
                        />
                    </div>

                    <div class="space-y-1.5">
                        <Label for="qr_acara" class="text-xs">Nama Acara / Kehadiran Rapat (Opsional)</Label>
                        <Input
                            id="qr_acara"
                            v-model="qrAcara"
                            placeholder="Misal: Apel Bersama / Rapat Paripurna"
                            class="h-9 text-xs"
                        />
                    </div>

                    <Button type="submit" :disabled="isVerifying" class="w-full h-10 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold cursor-pointer">
                        <Loader2 v-if="isVerifying" class="w-4 h-4 mr-2 animate-spin" />
                        <span>Submit Verifikasi QR</span>
                    </Button>
                </form>

                <!-- QR Result Alert -->
                <div v-if="qrResult" class="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-foreground space-y-1">
                    <div class="flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 class="w-4 h-4" />
                        <span>Presensi Berhasil Terverifikasi!</span>
                    </div>
                    <p class="font-semibold">{{ qrResult.user?.name }}</p>
                    <p class="font-mono text-muted-foreground text-[11px]">NIP: {{ qrResult.user?.nip }}</p>
                </div>

                <!-- QR Error Alert -->
                <div v-if="qrError" class="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-500 font-semibold flex items-center gap-2">
                    <AlertTriangle class="w-4 h-4 shrink-0" />
                    <span>{{ qrError }}</span>
                </div>
            </DialogContent>
        </Dialog>
    </AdminLayout>
</template>
