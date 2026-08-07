<script setup lang="ts">
import { useForm } from '@inertiajs/vue3';
import {
    Building2,
    Plus,
    MapPin,
    Edit3,
    Trash2,
    Search,
    Layers,
    Building,
    Network,
} from '@lucide/vue';
import { ref, computed } from 'vue';
import Pagination from '@/Components/Pagination.vue';
import { useConfirm } from '@/composables/useConfirm';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/Components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/Components/ui/dialog';
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

interface OfficeItem {
    id: number;
    parent_id?: number | null;
    unit_code?: string | null;
    name: string;
    opd_name: string;
    alamat?: string;
    latitude?: number;
    longitude?: number;
    radius_meters?: number;
    polygon_coordinates?: Array<{ lat: number; lng: number }> | null;
    parent?: OfficeItem | null;
}

const props = defineProps<{
    offices: OfficeItem[];
}>();

const searchQuery = ref('');
const activeFilter = ref('all'); // all, parent, sub
const parentSearch = ref('');
const currentPage = ref(1);
const itemsPerPage = 10;

// Filter offices list for table
const filteredOffices = computed(() => {
    return props.offices.filter((o) => {
        const matchesSearch =
            !searchQuery.value.trim() ||
            o.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            o.opd_name
                .toLowerCase()
                .includes(searchQuery.value.toLowerCase()) ||
            (o.unit_code &&
                o.unit_code
                    .toLowerCase()
                    .includes(searchQuery.value.toLowerCase())) ||
            (o.parent &&
                o.parent.opd_name
                    .toLowerCase()
                    .includes(searchQuery.value.toLowerCase()));

        const matchesFilter =
            activeFilter.value === 'all' ||
            (activeFilter.value === 'parent' && !o.parent_id) ||
            (activeFilter.value === 'sub' && !!o.parent_id);

        return matchesSearch && matchesFilter;
    });
});

const paginatedOffices = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;

    return filteredOffices.value.slice(start, start + itemsPerPage);
});

// Parent options for dialog
const parentOfficeOptions = computed(() => {
    return props.offices.filter((o) => !o.parent_id);
});

const filteredParentOptions = computed(() => {
    if (!parentSearch.value.trim()) {
        return parentOfficeOptions.value;
    }

    const q = parentSearch.value.toLowerCase();

    return parentOfficeOptions.value.filter((p) =>
        p.opd_name.toLowerCase().includes(q),
    );
});

const showForm = ref(false);

const form = useForm({
    id: null as number | null,
    parent_id: 'none' as string | number,
    unit_code: '',
    name: '',
    opd_name: '',
    alamat: '',
    latitude: '' as number | string,
    longitude: '' as number | string,
    radius_meters: 100,
    polygon_coordinates: [] as Array<{ lat: number; lng: number }>,
});

const editOffice = (office: OfficeItem) => {
    form.id = office.id;
    form.parent_id = office.parent_id ? String(office.parent_id) : 'none';
    form.unit_code = office.unit_code || '';
    form.name = office.name;
    form.opd_name = office.opd_name;
    form.alamat = office.alamat || '';
    form.latitude = office.latitude || '';
    form.longitude = office.longitude || '';
    form.radius_meters = office.radius_meters || 100;
    form.polygon_coordinates = office.polygon_coordinates
        ? [...office.polygon_coordinates]
        : [];
    showForm.value = true;
};

const addPolygonPoint = () => {
    const lat = Number(form.latitude) || -4.3422;
    const lng = Number(form.longitude) || 120.0123;
    form.polygon_coordinates.push({ lat, lng });
};

const removePolygonPoint = (index: number) => {
    form.polygon_coordinates.splice(index, 1);
};

const resetForm = () => {
    form.reset();
    form.id = null;
    form.parent_id = 'none';
    form.polygon_coordinates = [];
    parentSearch.value = '';
    showForm.value = false;
};

const submitForm = () => {
    if (form.id) {
        form.put(`/admin/offices/${form.id}`, { onSuccess: () => resetForm() });
    } else {
        form.post('/admin/offices', { onSuccess: () => resetForm() });
    }
};

const { confirm: confirmDelete } = useConfirm();

const deleteOffice = async (id: number) => {
    const isOk = await confirmDelete({
        title: 'Hapus Unit Kantor / OPD',
        description: 'Apakah Anda yakin ingin menghapus data unit kantor OPD ini?',
        confirmText: 'Ya, Hapus Kantor',
        variant: 'danger',
    });
    if (isOk) {
        useForm({}).delete(`/admin/offices/${id}`);
    }
};
</script>

<template>
    <AdminLayout
        title="Kelola Kantor / OPD & Sub OPD"
        :subtitle="`${offices.length} unit kantor terdaftar di Kab. Soppeng`"
    >
        <template #actions>
            <Button
                @click="showForm = true"
                class="flex h-10 cursor-pointer items-center gap-2 rounded-none bg-primary px-4 text-xs font-bold tracking-wider text-primary-foreground uppercase shadow-none hover:bg-primary/90"
            >
                <Plus class="h-4 w-4" />
                <span>Tambah Kantor OPD</span>
            </Button>
        </template>

        <!-- Filter Card -->
        <Card
            class="mb-4 rounded-none border border-border bg-card p-4 text-card-foreground shadow-xs"
        >
            <div
                class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
            >
                <!-- Tabs filter -->
                <div class="flex items-center gap-1.5 overflow-x-auto">
                    <button
                        @click="activeFilter = 'all'"
                        class="h-8 cursor-pointer border px-3 text-xs font-bold tracking-wider uppercase transition-colors"
                        :class="
                            activeFilter === 'all'
                                ? 'border-primary bg-primary text-primary-foreground'
                                : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/60'
                        "
                    >
                        Semua ({{ offices.length }})
                    </button>
                    <button
                        @click="activeFilter = 'parent'"
                        class="h-8 cursor-pointer border px-3 text-xs font-bold tracking-wider uppercase transition-colors"
                        :class="
                            activeFilter === 'parent'
                                ? 'border-primary bg-primary text-primary-foreground'
                                : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/60'
                        "
                    >
                        OPD Induk ({{
                            offices.filter((o) => !o.parent_id).length
                        }})
                    </button>
                    <button
                        @click="activeFilter = 'sub'"
                        class="h-8 cursor-pointer border px-3 text-xs font-bold tracking-wider uppercase transition-colors"
                        :class="
                            activeFilter === 'sub'
                                ? 'border-primary bg-primary text-primary-foreground'
                                : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/60'
                        "
                    >
                        Sub OPD / UPTD ({{
                            offices.filter((o) => !!o.parent_id).length
                        }})
                    </button>
                </div>

                <!-- Search bar -->
                <div class="relative w-full md:w-72">
                    <Search
                        class="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                        v-model="searchQuery"
                        type="text"
                        placeholder="Cari OPD / Sub OPD / Kode..."
                        class="h-9 rounded-none pl-9 text-xs"
                    />
                </div>
            </div>
        </Card>

        <!-- Offices Table Card -->
        <Card
            class="overflow-hidden rounded-none border border-border bg-card text-card-foreground shadow-xs"
        >
            <CardContent class="p-0">
                <div class="overflow-x-auto">
                    <table class="w-full text-xs">
                        <thead>
                            <tr
                                class="border-b border-border bg-muted/40 text-left text-[11px] font-bold tracking-wider text-foreground uppercase"
                            >
                                <th
                                    class="w-10 px-4 py-3.5 text-center font-bold"
                                >
                                    #
                                </th>
                                <th class="px-4 py-3.5 font-bold">
                                    Nama OPD / Sub Unit
                                </th>
                                <th class="px-4 py-3.5 text-center font-bold">
                                    Tipe Unit
                                </th>
                                <th class="px-4 py-3.5 font-bold">
                                    OPD Induk Utama
                                </th>
                                <th class="px-4 py-3.5 font-bold">
                                    Alamat Lengkap
                                </th>
                                <th class="px-4 py-3.5 text-center font-bold">
                                    Radius Geofence
                                </th>
                                <th class="px-4 py-3.5 text-center font-bold">
                                    GPS
                                </th>
                                <th class="px-4 py-3.5 text-center font-bold">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-border/40">
                            <tr
                                v-for="(office, i) in paginatedOffices"
                                :key="office.id"
                                class="border-b border-border/40 transition-colors hover:bg-muted/30"
                            >
                                <td
                                    class="px-4 py-3.5 text-center font-mono text-muted-foreground"
                                >
                                    {{
                                        (currentPage - 1) * itemsPerPage + i + 1
                                    }}
                                </td>
                                <td class="px-4 py-3.5">
                                    <div
                                        class="flex items-center gap-1.5 font-bold text-foreground"
                                    >
                                        <Building2
                                            class="h-3.5 w-3.5 shrink-0 text-muted-foreground"
                                        />
                                        <span>{{ office.opd_name }}</span>
                                    </div>
                                    <div
                                        class="mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground"
                                    >
                                        <span>{{ office.name }}</span>
                                        <span
                                            v-if="office.unit_code"
                                            class="bg-muted px-1.5 py-0.5 font-mono text-[10px] font-bold text-foreground"
                                        >
                                            {{ office.unit_code }}
                                        </span>
                                    </div>
                                </td>
                                <td class="px-4 py-3.5 text-center">
                                    <Badge
                                        v-if="!office.parent_id"
                                        variant="outline"
                                        class="rounded-none border-blue-500/30 bg-blue-500/10 text-[10px] font-bold tracking-wider text-blue-700 uppercase dark:text-blue-400"
                                    >
                                        Induk OPD
                                    </Badge>
                                    <Badge
                                        v-else
                                        variant="outline"
                                        class="rounded-none border-purple-500/30 bg-purple-500/10 text-[10px] font-bold tracking-wider text-purple-700 uppercase dark:text-purple-400"
                                    >
                                        Sub OPD / UPTD
                                    </Badge>
                                </td>
                                <td class="px-4 py-3.5">
                                    <span
                                        v-if="office.parent"
                                        class="font-medium text-foreground"
                                    >
                                        {{ office.parent.opd_name }}
                                    </span>
                                    <span
                                        v-else
                                        class="text-[11px] text-muted-foreground"
                                    >
                                        (Unit Utama)
                                    </span>
                                </td>
                                <td
                                    class="max-w-xs truncate px-4 py-3.5 text-muted-foreground"
                                >
                                    {{ office.alamat || '-' }}
                                </td>
                                <td class="px-4 py-3.5 text-center">
                                    <Badge
                                        variant="secondary"
                                        class="rounded-none font-mono text-[10px] font-bold tracking-wider uppercase"
                                    >
                                        {{ office.radius_meters }}m
                                    </Badge>
                                </td>
                                <td
                                    class="px-4 py-3.5 text-center font-mono text-[11px] text-muted-foreground"
                                >
                                    <span
                                        v-if="
                                            office.latitude && office.longitude
                                        "
                                        class="flex items-center justify-center gap-1"
                                    >
                                        <MapPin
                                            class="h-3 w-3 shrink-0 text-emerald-600 dark:text-emerald-400"
                                        />
                                        <span
                                            >{{ office.latitude }},
                                            {{ office.longitude }}</span
                                        >
                                    </span>
                                    <span v-else>-</span>
                                </td>
                                <td class="px-4 py-3.5 text-center">
                                    <div
                                        class="flex items-center justify-center gap-1"
                                    >
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            @click="editOffice(office)"
                                            class="h-8 w-8 cursor-pointer rounded-none p-0 text-muted-foreground hover:border-border hover:bg-muted/50 hover:text-foreground"
                                            title="Edit Kantor"
                                        >
                                            <Edit3 class="h-3.5 w-3.5" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            @click="deleteOffice(office.id)"
                                            class="h-8 w-8 cursor-pointer rounded-none p-0 text-rose-500 hover:bg-rose-500/10"
                                            title="Hapus Kantor"
                                        >
                                            <Trash2 class="h-3.5 w-3.5" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div
                        v-if="!filteredOffices.length"
                        class="space-y-2 py-10 text-center text-muted-foreground"
                    >
                        <Building2
                            class="mx-auto h-8 w-8 text-muted-foreground/50"
                        />
                        <p>Tidak ada data kantor OPD yang cocok.</p>
                    </div>

                    <Pagination
                        v-if="filteredOffices.length > 0"
                        v-model:currentPage="currentPage"
                        :totalItems="filteredOffices.length"
                        :itemsPerPage="itemsPerPage"
                    />
                </div>
            </CardContent>
        </Card>

        <!-- Shadcn Dialog Form Office -->
        <Dialog v-model:open="showForm">
            <DialogContent
                class="rounded-none border border-border bg-card p-6 text-card-foreground shadow-xl sm:max-w-3xl"
            >
                <DialogHeader class="border-b border-border/60 pb-3">
                    <DialogTitle
                        class="flex items-center gap-2.5 text-base font-bold tracking-wider text-foreground uppercase"
                    >
                        <div
                            class="flex h-7 w-7 items-center justify-center rounded-none border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        >
                            <Building2 class="h-4 w-4" />
                        </div>
                        <span>{{
                            form.id
                                ? 'Edit Data Kantor / Sub OPD'
                                : 'Tambah Kantor OPD / Sub OPD Baru'
                        }}</span>
                    </DialogTitle>
                </DialogHeader>

                <form @submit.prevent="submitForm" class="space-y-4 pt-2">
                    <!-- Row 1: Parent OPD & Kode Unit -->
                    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div class="space-y-1.5">
                            <Label
                                class="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
                            >
                                OPD Induk Utama
                            </Label>
                            <Select v-model="form.parent_id">
                                <SelectTrigger
                                    class="h-10 rounded-none text-xs sm:text-sm"
                                >
                                    <SelectValue
                                        placeholder="Pilih OPD Induk / Tanpa Induk"
                                    />
                                </SelectTrigger>
                                <SelectContent
                                    class="rounded-none border-border"
                                >
                                    <div
                                        class="sticky top-0 z-10 border-b border-border bg-popover p-2"
                                    >
                                        <div class="relative">
                                            <Search
                                                class="pointer-events-none absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground"
                                            />
                                            <Input
                                                v-model="parentSearch"
                                                type="text"
                                                placeholder="Cari OPD Induk..."
                                                class="h-8 rounded-none border-input bg-background pl-8 text-xs"
                                                @keydown.stop
                                            />
                                        </div>
                                    </div>
                                    <div class="max-h-56 overflow-y-auto pt-1">
                                        <SelectItem value="none">
                                            -- Berdiri Sendiri (OPD Induk Utama)
                                            --
                                        </SelectItem>
                                        <SelectItem
                                            v-for="p in filteredParentOptions"
                                            :key="p.id"
                                            :value="String(p.id)"
                                        >
                                            {{ p.opd_name }}
                                        </SelectItem>
                                    </div>
                                </SelectContent>
                            </Select>
                        </div>
                        <div class="space-y-1.5">
                            <Label
                                for="unit_code"
                                class="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
                            >
                                Kode Unit / Singkatan
                            </Label>
                            <Input
                                id="unit_code"
                                v-model="form.unit_code"
                                placeholder="Contoh: SETDA, PKM-SALOTUNGO"
                                class="h-10 rounded-none font-mono text-xs sm:text-sm"
                            />
                        </div>
                    </div>

                    <!-- Row 2: Nama OPD & Nama Gedung -->
                    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div class="space-y-1.5">
                            <Label
                                for="opd_name"
                                class="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
                            >
                                Nama OPD / Sub OPD
                            </Label>
                            <Input
                                id="opd_name"
                                v-model="form.opd_name"
                                required
                                placeholder="Contoh: UPTD Puskesmas Salotungo"
                                class="h-10 rounded-none text-xs sm:text-sm"
                            />
                        </div>
                        <div class="space-y-1.5">
                            <Label
                                for="name"
                                class="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
                            >
                                Nama Kantor / Gedung
                            </Label>
                            <Input
                                id="name"
                                v-model="form.name"
                                required
                                placeholder="Contoh: Gedung Puskesmas Salotungo"
                                class="h-10 rounded-none text-xs sm:text-sm"
                            />
                        </div>
                    </div>

                    <div class="space-y-1.5">
                        <Label
                            for="alamat"
                            class="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
                        >
                            Alamat Lengkap Kantor
                        </Label>
                        <Input
                            id="alamat"
                            v-model="form.alamat"
                            placeholder="Jl. Salotungo No. 1..."
                            class="h-10 rounded-none text-xs sm:text-sm"
                        />
                    </div>

                    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div class="space-y-1.5">
                            <Label
                                for="latitude"
                                class="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
                            >
                                Latitude GPS
                            </Label>
                            <Input
                                id="latitude"
                                v-model="form.latitude"
                                placeholder="-4.3484"
                                class="h-10 rounded-none font-mono text-xs sm:text-sm"
                            />
                        </div>
                        <div class="space-y-1.5">
                            <Label
                                for="longitude"
                                class="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
                            >
                                Longitude GPS
                            </Label>
                            <Input
                                id="longitude"
                                v-model="form.longitude"
                                placeholder="120.0123"
                                class="h-10 rounded-none font-mono text-xs sm:text-sm"
                            />
                        </div>
                        <div class="space-y-1.5">
                            <Label
                                for="radius_meters"
                                class="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
                            >
                                Radius Geofence (Meter)
                            </Label>
                            <Input
                                id="radius_meters"
                                v-model="form.radius_meters"
                                type="number"
                                required
                                placeholder="100"
                                class="h-10 rounded-none font-mono text-xs font-bold text-emerald-600 sm:text-sm dark:text-emerald-400"
                            />
                        </div>
                    </div>

                    <!-- Polygon Geofence Coordinates Section -->
                    <div
                        class="mt-4 space-y-3 border border-border bg-muted/20 p-4"
                    >
                        <div class="flex items-center justify-between">
                            <div>
                                <h4
                                    class="text-xs font-bold text-foreground uppercase"
                                >
                                    Polygon Geofence (Batas Kompleks
                                    Non-Lingkaran)
                                </h4>
                                <p class="text-[11px] text-muted-foreground">
                                    Tambahkan koordinat titik-titik polygon jika
                                    kantormemiliki area kompleks tidak teratur.
                                </p>
                            </div>
                            <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                @click="addPolygonPoint"
                                class="h-7 cursor-pointer text-xs font-bold"
                            >
                                + Tambah Titik
                            </Button>
                        </div>

                        <div
                            v-if="form.polygon_coordinates.length > 0"
                            class="space-y-2"
                        >
                            <div
                                v-for="(point, idx) in form.polygon_coordinates"
                                :key="idx"
                                class="flex items-center gap-2"
                            >
                                <span
                                    class="w-12 font-mono text-[10px] font-bold text-muted-foreground"
                                    >#{{ idx + 1 }}</span
                                >
                                <Input
                                    v-model.number="point.lat"
                                    placeholder="Latitude"
                                    type="number"
                                    step="any"
                                    class="h-8 rounded-none font-mono text-xs"
                                />
                                <Input
                                    v-model.number="point.lng"
                                    placeholder="Longitude"
                                    type="number"
                                    step="any"
                                    class="h-8 rounded-none font-mono text-xs"
                                />
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    @click="removePolygonPoint(idx)"
                                    class="h-8 w-8 cursor-pointer p-0"
                                >
                                    ✕
                                </Button>
                            </div>
                        </div>
                        <div
                            v-else
                            class="text-[11px] text-muted-foreground italic"
                        >
                            Belum ada titik polygon diset. (Sistem akan
                            menggunakan Geofence Radius Lingkaran
                            {{ form.radius_meters || 100 }}m).
                        </div>
                    </div>

                    <div
                        class="mt-6 flex items-center justify-end gap-2 border-t border-border pt-4"
                    >
                        <Button
                            type="button"
                            variant="outline"
                            @click="resetForm"
                            class="h-10 cursor-pointer rounded-none px-5 text-xs font-bold tracking-wider uppercase"
                        >
                            Batal
                        </Button>
                        <Button
                            type="submit"
                            class="h-10 cursor-pointer rounded-none bg-primary px-6 text-xs font-bold tracking-wider text-primary-foreground uppercase shadow-none hover:bg-primary/90"
                        >
                            {{ form.id ? 'Simpan Perubahan' : 'Tambah Kantor' }}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    </AdminLayout>
</template>
