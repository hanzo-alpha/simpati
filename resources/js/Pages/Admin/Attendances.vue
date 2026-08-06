<script setup lang="ts">
import { router } from '@inertiajs/vue3';
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
import axios from 'axios';
import { ref, computed, nextTick } from 'vue';
import Pagination from '@/Components/Pagination.vue';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/Components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/Components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/Components/ui/dropdown-menu';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/Components/ui/select';
import AdminLayout from '@/Layouts/AdminLayout.vue';
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
    },
);

const searchQuery = ref(props.filters.search || '');
const selectedMonth = ref(
    String(
        props.filters.month ? Number(props.filters.month) : props.currentMonth,
    ),
);
const selectedYear = ref(
    String(props.filters.year ? Number(props.filters.year) : props.currentYear),
);
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
        if (qrInputRef.value) {
qrInputRef.value.focus();
}
    });
};

const submitQrScan = async () => {
    if (!qrInput.value) {
return;
}

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
            if (qrInputRef.value) {
qrInputRef.value.focus();
}
        });
    } catch (err: any) {
        qrError.value =
            err.response?.data?.message || 'Gagal memverifikasi QR Code NIP.';
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
    {
        label: 'Total Log Presensi',
        value: props.summary.total || 0,
        color: 'text-foreground',
    },
    {
        label: 'Presensi Tepat Waktu',
        value: props.summary.tepat_waktu || 0,
        color: 'text-emerald-500',
    },
    {
        label: 'Presensi Terlambat',
        value: props.summary.terlambat || 0,
        color: 'text-amber-500',
    },
    {
        label: 'Check-in Masuk',
        value: props.summary.masuk || 0,
        color: 'text-teal-500',
    },
    {
        label: 'Check-out Pulang',
        value: props.summary.pulang || 0,
        color: 'text-purple-500',
    },
]);

const reload = () => {
    router.get(
        adminRoutes.attendances.url(),
        {
            month: selectedMonth.value,
            year: selectedYear.value,
            opd: selectedOpd.value !== 'all' ? selectedOpd.value : undefined,
            unit_kerja:
                selectedUnitKerja.value !== 'all'
                    ? selectedUnitKerja.value
                    : undefined,
            jenis:
                selectedJenis.value !== 'all' ? selectedJenis.value : undefined,
            status:
                selectedStatus.value !== 'all'
                    ? selectedStatus.value
                    : undefined,
            search: searchQuery.value || undefined,
        },
        { preserveState: true, preserveScroll: true },
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
    const opdParam =
        selectedOpd.value !== 'all' ? `&opd=${selectedOpd.value}` : '';
    const unitParam =
        selectedUnitKerja.value !== 'all'
            ? `&unit_kerja=${selectedUnitKerja.value}`
            : '';
    const params = `month=${selectedMonth.value}&year=${selectedYear.value}${opdParam}${unitParam}`;
    window.location.href = `/admin/attendances/export?${params}`;
};

const downloadTppReport = () => {
    const opdParam =
        selectedOpd.value !== 'all' ? `&opd=${selectedOpd.value}` : '';
    const params = `month=${selectedMonth.value}&year=${selectedYear.value}${opdParam}`;
    window.open(`/admin/attendances/export-tpp?${params}`, '_blank');
};

const downloadSummaryReport = () => {
    const opdParam =
        selectedOpd.value !== 'all' ? `&opd=${selectedOpd.value}` : '';
    const params = `month=${selectedMonth.value}&year=${selectedYear.value}${opdParam}`;
    window.open(`/admin/attendances/export-summary?${params}`, '_blank');
};

const downloadRecapPdf = (type: string) => {
    const opdParam =
        selectedOpd.value !== 'all' ? `&opd=${selectedOpd.value}` : '';
    const typeParam = type ? `&type=${type}` : '';
    const params = `month=${selectedMonth.value}&year=${selectedYear.value}${opdParam}${typeParam}`;
    window.open(`/admin/attendances/export-recap?${params}`, '_blank');
};
</script>

<template>
    <AdminLayout
        title="Rekap Presensi ASN"
        :subtitle="`Data log presensi periode ${monthName}`"
    >
        <!-- Page Header Actions (Scan QR Prominent Button) -->
        <template #actions>
            <Button
                @click="openQrModal"
                class="cursor-pointer rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-xs font-semibold text-white shadow-md shadow-emerald-600/20 hover:from-emerald-700 hover:to-teal-700"
            >
                <QrCode class="mr-2 h-4 w-4" />
                <span>Scan QR Presensi ASN</span>
            </Button>
        </template>

        <!-- 1. Top Summary KPI Widget Cards (Paling Atas) -->
        <div class="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-5">
            <Card
                v-for="s in summaryCards"
                :key="s.label"
                class="border-border/60 bg-card/95 text-center shadow-sm backdrop-blur-xl"
            >
                <CardContent class="p-4">
                    <p class="text-xl font-black" :class="s.color">
                        {{ s.value }}
                    </p>
                    <p class="mt-1 text-xs font-medium text-muted-foreground">
                        {{ s.label }}
                    </p>
                </CardContent>
            </Card>
        </div>

        <!-- 2. Filter & Search & Export Card -->
        <Card
            class="mb-6 border-border/60 bg-card/95 shadow-md backdrop-blur-xl"
        >
            <CardHeader
                class="flex-row items-center justify-between space-y-0 pb-3"
            >
                <CardTitle class="flex items-center gap-2 text-base font-bold">
                    <Filter class="h-4 w-4 text-teal-600 dark:text-teal-400" />
                    <span>Pencarian & Filter Rekap Presensi</span>
                </CardTitle>

                <Button
                    v-if="hasActiveFilters"
                    variant="ghost"
                    size="sm"
                    @click="resetFilters"
                    class="h-8 cursor-pointer text-xs text-rose-500 hover:bg-rose-500/10"
                >
                    <RotateCcw class="mr-1 h-3.5 w-3.5" />
                    <span>Reset Filter</span>
                </Button>
            </CardHeader>

            <CardContent class="space-y-4 pt-0">
                <!-- Search & Action Toolbar -->
                <div
                    class="flex flex-col items-center justify-between gap-3 md:flex-row"
                >
                    <div class="relative w-full md:flex-1">
                        <Search
                            class="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                        />
                        <Input
                            id="search"
                            v-model="searchQuery"
                            @keyup.enter="reload"
                            type="text"
                            placeholder="Ketik Nama / NIP Pegawai lalu Tekan Enter..."
                            class="h-9 w-full pl-9 text-xs transition-all focus-visible:ring-teal-500"
                        />
                    </div>

                    <div
                        class="flex w-full flex-wrap items-center justify-end gap-2 md:w-auto"
                    >
                        <!-- Shadcn DropdownMenu for Rekap Per Jenis -->
                        <DropdownMenu>
                            <DropdownMenuTrigger as-child>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    class="h-9 cursor-pointer text-xs font-semibold"
                                >
                                    <FileText
                                        class="mr-1.5 h-3.5 w-3.5 text-sky-500"
                                    />
                                    <span>Rekap Per Jenis</span>
                                    <ChevronDown class="ml-1 h-3.5 w-3.5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                class="w-56 bg-card/95 backdrop-blur-2xl"
                            >
                                <DropdownMenuLabel
                                    class="text-[10px] font-bold tracking-wider text-muted-foreground uppercase"
                                >
                                    Option Cetak PDF
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    v-for="opt in recapTypeOptions"
                                    :key="opt.value"
                                    @click="downloadRecapPdf(opt.value)"
                                    class="flex cursor-pointer items-center gap-2.5 text-xs"
                                >
                                    <span
                                        class="h-2 w-2 rounded-full"
                                        :class="opt.dot"
                                    ></span>
                                    <span class="font-medium text-foreground">{{
                                        opt.label
                                    }}</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Button
                            variant="outline"
                            size="sm"
                            @click="downloadSummaryReport"
                            class="h-9 cursor-pointer text-xs font-semibold"
                        >
                            <FileSpreadsheet
                                class="mr-1.5 h-3.5 w-3.5 text-amber-500"
                            />
                            <span>Rekap Matriks</span>
                        </Button>

                        <Button
                            variant="outline"
                            size="sm"
                            @click="downloadTppReport"
                            class="h-9 cursor-pointer text-xs font-semibold"
                        >
                            <FileText
                                class="mr-1.5 h-3.5 w-3.5 text-emerald-500"
                            />
                            <span>Laporan TPP</span>
                        </Button>

                        <Button
                            variant="outline"
                            size="sm"
                            @click="downloadCsv"
                            class="h-9 cursor-pointer text-xs font-semibold"
                        >
                            <Download
                                class="mr-1.5 h-3.5 w-3.5 text-teal-500"
                            />
                            <span>CSV</span>
                        </Button>
                    </div>
                </div>

                <!-- 6-Column Grid Filter Selects -->
                <div
                    class="grid grid-cols-1 gap-3 border-t border-border/50 pt-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
                >
                    <!-- Filter Bulan -->
                    <div class="space-y-1">
                        <Label
                            class="text-xs font-semibold text-muted-foreground"
                            >Bulan</Label
                        >
                        <Select
                            v-model="selectedMonth"
                            @update:model-value="reload"
                        >
                            <SelectTrigger
                                class="h-9 w-full bg-background text-xs"
                            >
                                <SelectValue placeholder="Pilih Bulan" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem
                                    v-for="m in months"
                                    :key="m.value"
                                    :value="m.value"
                                >
                                    {{ m.label }}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <!-- Filter Tahun -->
                    <div class="space-y-1">
                        <Label
                            class="text-xs font-semibold text-muted-foreground"
                            >Tahun</Label
                        >
                        <Select
                            v-model="selectedYear"
                            @update:model-value="reload"
                        >
                            <SelectTrigger
                                class="h-9 w-full bg-background text-xs"
                            >
                                <SelectValue placeholder="Pilih Tahun" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem
                                    v-for="y in ['2024', '2025', '2026']"
                                    :key="y"
                                    :value="y"
                                >
                                    {{ y }}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <!-- Filter OPD Utama -->
                    <div class="space-y-1">
                        <Label
                            class="text-xs font-semibold text-muted-foreground"
                            >OPD Utama</Label
                        >
                        <Select
                            v-model="selectedOpd"
                            @update:model-value="reload"
                        >
                            <SelectTrigger
                                class="h-9 w-full bg-background text-xs"
                            >
                                <SelectValue placeholder="Semua OPD" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua OPD</SelectItem>
                                <SelectItem
                                    v-for="o in offices"
                                    :key="o.id"
                                    :value="String(o.id)"
                                >
                                    {{ o.opd_name }}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <!-- Filter Sub OPD / Unit Kerja -->
                    <div class="space-y-1">
                        <Label
                            class="text-xs font-semibold text-muted-foreground"
                            >Sub Unit Kerja</Label
                        >
                        <Select
                            v-model="selectedUnitKerja"
                            @update:model-value="reload"
                        >
                            <SelectTrigger
                                class="h-9 w-full bg-background text-xs"
                            >
                                <SelectValue placeholder="Semua Unit Kerja" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all"
                                    >Semua Unit Kerja</SelectItem
                                >
                                <SelectItem
                                    v-for="u in unitKerjaList"
                                    :key="u"
                                    :value="u"
                                >
                                    {{ u }}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <!-- Filter Jenis Presensi -->
                    <div class="space-y-1">
                        <Label
                            class="text-xs font-semibold text-muted-foreground"
                            >Jenis Presensi</Label
                        >
                        <Select
                            v-model="selectedJenis"
                            @update:model-value="reload"
                        >
                            <SelectTrigger
                                class="h-9 w-full bg-background text-xs"
                            >
                                <SelectValue placeholder="Semua Jenis" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua Jenis</SelectItem>
                                <SelectItem value="masuk">Masuk</SelectItem>
                                <SelectItem value="pulang">Pulang</SelectItem>
                                <SelectItem value="wfh">WFH</SelectItem>
                                <SelectItem value="dinas_luar"
                                    >Dinas Luar</SelectItem
                                >
                                <SelectItem value="istirahat"
                                    >Istirahat</SelectItem
                                >
                                <SelectItem value="kembali">Kembali</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <!-- Filter Status Presensi -->
                    <div class="space-y-1">
                        <Label
                            class="text-xs font-semibold text-muted-foreground"
                            >Status Presensi</Label
                        >
                        <Select
                            v-model="selectedStatus"
                            @update:model-value="reload"
                        >
                            <SelectTrigger
                                class="h-9 w-full bg-background text-xs"
                            >
                                <SelectValue placeholder="Semua Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all"
                                    >Semua Status</SelectItem
                                >
                                <SelectItem value="tepat_waktu"
                                    >Tepat Waktu</SelectItem
                                >
                                <SelectItem value="terlambat"
                                    >Terlambat</SelectItem
                                >
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardContent>
        </Card>

        <!-- 3. Table Presensi Card -->
        <Card class="border-border/60 bg-card/95 shadow-md backdrop-blur-xl">
            <CardContent class="p-0">
                <div class="overflow-x-auto">
                    <table class="w-full text-xs">
                        <thead>
                            <tr
                                class="border-b border-border bg-muted/30 text-left text-muted-foreground"
                            >
                                <th
                                    class="w-10 px-4 py-3.5 text-center font-semibold"
                                >
                                    #
                                </th>
                                <th class="px-4 py-3.5 font-semibold">
                                    Tanggal
                                </th>
                                <th class="px-4 py-3.5 font-semibold">
                                    NIP & Nama Pegawai
                                </th>
                                <th class="px-4 py-3.5 font-semibold">
                                    OPD & Unit Kerja
                                </th>
                                <th
                                    class="px-4 py-3.5 text-center font-semibold"
                                >
                                    Jenis
                                </th>
                                <th
                                    class="px-4 py-3.5 text-center font-semibold"
                                >
                                    Waktu Presensi
                                </th>
                                <th
                                    class="px-4 py-3.5 text-center font-semibold"
                                >
                                    Status
                                </th>
                                <th
                                    class="px-4 py-3.5 text-center font-semibold"
                                >
                                    Koordinat GPS
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-border/40">
                            <tr
                                v-for="(att, i) in paginatedAttendances"
                                :key="att.id"
                                class="transition-colors hover:bg-muted/40"
                            >
                                <td
                                    class="px-4 py-3.5 text-center font-mono text-muted-foreground"
                                >
                                    {{
                                        (currentPage - 1) * itemsPerPage + i + 1
                                    }}
                                </td>
                                <td
                                    class="px-4 py-3.5 font-mono text-[11px] font-semibold text-muted-foreground"
                                >
                                    {{ att.tanggal }}
                                </td>
                                <td class="px-4 py-3.5">
                                    <p class="font-semibold text-foreground">
                                        {{ att.name }}
                                    </p>
                                    <p
                                        class="font-mono text-[10px] font-bold text-teal-600 dark:text-teal-400"
                                    >
                                        NIP: {{ att.nip }}
                                    </p>
                                </td>
                                <td class="px-4 py-3.5 text-muted-foreground">
                                    <p class="font-medium text-foreground">
                                        {{ att.opd }}
                                    </p>
                                    <span
                                        v-if="att.unit_kerja"
                                        class="inline-block rounded-md border border-teal-500/20 bg-teal-500/10 px-1.5 py-0.5 text-[9px] font-semibold text-teal-600 dark:text-teal-400"
                                    >
                                        {{ att.unit_kerja }}
                                    </span>
                                </td>
                                <td class="px-4 py-3.5 text-center">
                                    <Badge
                                        variant="outline"
                                        class="px-2 py-0.5 text-[10px] font-semibold uppercase"
                                    >
                                        {{ att.jenis }}
                                    </Badge>
                                </td>
                                <td
                                    class="px-4 py-3.5 text-center font-mono text-xs font-bold text-teal-600 dark:text-teal-400"
                                >
                                    {{ att.waktu }} WITA
                                </td>
                                <td class="px-4 py-3.5 text-center">
                                    <Badge
                                        :variant="
                                            att.status === 'tepat_waktu'
                                                ? 'default'
                                                : 'outline'
                                        "
                                        class="px-2.5 py-0.5 text-[10px] font-semibold uppercase"
                                        :class="{
                                            'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400':
                                                att.status === 'tepat_waktu',
                                            'border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400':
                                                att.status !== 'tepat_waktu',
                                        }"
                                    >
                                        {{
                                            att.status
                                                ? att.status.replace('_', ' ')
                                                : 'PRESENSI'
                                        }}
                                    </Badge>
                                </td>
                                <td
                                    class="px-4 py-3.5 text-center font-mono text-[11px] text-muted-foreground"
                                >
                                    <span
                                        v-if="att.latitude && att.longitude"
                                        class="flex items-center justify-center gap-1"
                                    >
                                        <MapPin
                                            class="h-3 w-3 shrink-0 text-sky-500"
                                        />
                                        <span
                                            >{{
                                                Number(att.latitude).toFixed(4)
                                            }},
                                            {{
                                                Number(att.longitude).toFixed(4)
                                            }}</span
                                        >
                                    </span>
                                    <span v-else>-</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div
                        v-if="!attendances.length"
                        class="space-y-2 py-10 text-center text-muted-foreground"
                    >
                        <ClipboardList
                            class="mx-auto h-8 w-8 text-muted-foreground/50"
                        />
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
            <DialogContent
                class="border-border/80 bg-card/95 backdrop-blur-2xl sm:max-w-md"
            >
                <DialogHeader>
                    <DialogTitle
                        class="flex items-center gap-2 text-base font-bold"
                    >
                        <QrCode class="h-4 w-4 text-emerald-500" />
                        <span>Scan QR Presensi ASN</span>
                    </DialogTitle>
                </DialogHeader>

                <form @submit.prevent="submitQrScan" class="space-y-3 pt-2">
                    <div class="space-y-1.5">
                        <Label for="qr_input" class="text-xs"
                            >Barcode / QR Code NIP ASN</Label
                        >
                        <Input
                            id="qr_input"
                            ref="qrInputRef"
                            v-model="qrInput"
                            required
                            placeholder="Scan dengan Scanner Barcode..."
                            class="h-10 font-mono text-xs"
                        />
                    </div>

                    <div class="space-y-1.5">
                        <Label for="qr_acara" class="text-xs"
                            >Nama Acara / Kehadiran Rapat (Opsional)</Label
                        >
                        <Input
                            id="qr_acara"
                            v-model="qrAcara"
                            placeholder="Misal: Apel Bersama / Rapat Paripurna"
                            class="h-9 text-xs"
                        />
                    </div>

                    <Button
                        type="submit"
                        :disabled="isVerifying"
                        class="h-10 w-full cursor-pointer bg-emerald-600 font-semibold text-white hover:bg-emerald-700"
                    >
                        <Loader2
                            v-if="isVerifying"
                            class="mr-2 h-4 w-4 animate-spin"
                        />
                        <span>Submit Verifikasi QR</span>
                    </Button>
                </form>

                <!-- QR Result Alert -->
                <div
                    v-if="qrResult"
                    class="space-y-1 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-xs text-foreground"
                >
                    <div
                        class="flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-400"
                    >
                        <CheckCircle2 class="h-4 w-4" />
                        <span>Presensi Berhasil Terverifikasi!</span>
                    </div>
                    <p class="font-semibold">{{ qrResult.user?.name }}</p>
                    <p class="font-mono text-[11px] text-muted-foreground">
                        NIP: {{ qrResult.user?.nip }}
                    </p>
                </div>

                <!-- QR Error Alert -->
                <div
                    v-if="qrError"
                    class="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs font-semibold text-rose-500"
                >
                    <AlertTriangle class="h-4 w-4 shrink-0" />
                    <span>{{ qrError }}</span>
                </div>
            </DialogContent>
        </Dialog>
    </AdminLayout>
</template>
