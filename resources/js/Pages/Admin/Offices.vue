<script setup lang="ts">
import { useForm } from '@inertiajs/vue3';
import {
    Building2,
    Plus,
    MapPin,
    Edit3,
    Trash2,
    Navigation,
} from '@lucide/vue';
import { ref, computed } from 'vue';
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
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import AdminLayout from '@/Layouts/AdminLayout.vue';

interface OfficeItem {
    id: number;
    name: string;
    opd_name: string;
    alamat?: string;
    latitude?: number;
    longitude?: number;
    radius_meters?: number;
}

const props = defineProps<{
    offices: OfficeItem[];
}>();

const currentPage = ref(1);
const itemsPerPage = 10;

const paginatedOffices = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;

    return props.offices.slice(start, start + itemsPerPage);
});

const showForm = ref(false);

const form = useForm({
    id: null as number | null,
    name: '',
    opd_name: '',
    alamat: '',
    latitude: '' as number | string,
    longitude: '' as number | string,
    radius_meters: 200,
});

const editOffice = (office: OfficeItem) => {
    form.id = office.id;
    form.name = office.name;
    form.opd_name = office.opd_name;
    form.alamat = office.alamat || '';
    form.latitude = office.latitude || '';
    form.longitude = office.longitude || '';
    form.radius_meters = office.radius_meters || 200;
    showForm.value = true;
};

const resetForm = () => {
    form.reset();
    form.id = null;
    showForm.value = false;
};

const submitForm = () => {
    if (form.id) {
        form.put(`/admin/offices/${form.id}`, { onSuccess: () => resetForm() });
    } else {
        form.post('/admin/offices', { onSuccess: () => resetForm() });
    }
};

const deleteOffice = (id: number) => {
    if (confirm('Yakin hapus data kantor OPD ini?')) {
        useForm({}).delete(`/admin/offices/${id}`);
    }
};
</script>

<template>
    <AdminLayout
        title="Kelola Kantor / OPD"
        :subtitle="`${offices.length} lokasi kantor terdaftar`"
    >
        <template #actions>
            <Button
                @click="showForm = true"
                class="cursor-pointer rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 font-semibold text-white shadow-md shadow-teal-600/20 hover:from-teal-700 hover:to-emerald-700"
            >
                <Plus class="mr-2 h-4 w-4" />
                <span>Tambah Kantor OPD</span>
            </Button>
        </template>

        <!-- Office Table Card -->
        <Card class="border-border/60 bg-card/95 shadow-md backdrop-blur-xl">
            <CardContent class="p-0">
                <div class="overflow-x-auto">
                    <table class="w-full text-xs">
                        <thead>
                            <tr
                                class="border-b border-border bg-muted/30 text-left text-muted-foreground"
                            >
                                <th
                                    class="w-12 px-5 py-3.5 text-center font-semibold"
                                >
                                    #
                                </th>
                                <th class="px-5 py-3.5 font-semibold">
                                    Nama Kantor
                                </th>
                                <th class="px-5 py-3.5 font-semibold">
                                    OPD Utama
                                </th>
                                <th class="px-5 py-3.5 font-semibold">
                                    Alamat Lengkap
                                </th>
                                <th
                                    class="px-5 py-3.5 text-center font-semibold"
                                >
                                    Radius Geofence
                                </th>
                                <th
                                    class="px-5 py-3.5 text-center font-semibold"
                                >
                                    Koordinat GPS
                                </th>
                                <th
                                    class="px-5 py-3.5 text-center font-semibold"
                                >
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-border/40">
                            <tr
                                v-for="(office, i) in paginatedOffices"
                                :key="office.id"
                                class="transition-colors hover:bg-muted/40"
                            >
                                <td
                                    class="px-5 py-3.5 text-center font-mono text-muted-foreground"
                                >
                                    {{
                                        (currentPage - 1) * itemsPerPage + i + 1
                                    }}
                                </td>
                                <td
                                    class="px-5 py-3.5 font-bold text-foreground"
                                >
                                    {{ office.name }}
                                </td>
                                <td class="px-5 py-3.5">
                                    <Badge
                                        variant="outline"
                                        class="font-semibold"
                                    >
                                        {{ office.opd_name }}
                                    </Badge>
                                </td>
                                <td class="px-5 py-3.5 text-muted-foreground">
                                    {{ office.alamat || '-' }}
                                </td>
                                <td class="px-5 py-3.5 text-center">
                                    <Badge
                                        variant="secondary"
                                        class="font-mono text-[10px]"
                                    >
                                        {{ office.radius_meters }} Meter
                                    </Badge>
                                </td>
                                <td
                                    class="px-5 py-3.5 text-center font-mono text-[11px] text-muted-foreground"
                                >
                                    <span
                                        v-if="
                                            office.latitude && office.longitude
                                        "
                                        class="flex items-center justify-center gap-1"
                                    >
                                        <MapPin
                                            class="h-3 w-3 shrink-0 text-teal-600 dark:text-teal-400"
                                        />
                                        <span
                                            >{{ office.latitude }},
                                            {{ office.longitude }}</span
                                        >
                                    </span>
                                    <span v-else>-</span>
                                </td>
                                <td class="px-5 py-3.5 text-center">
                                    <div
                                        class="flex items-center justify-center gap-1"
                                    >
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            @click="editOffice(office)"
                                            class="h-7 w-7 cursor-pointer p-0 text-muted-foreground hover:bg-muted hover:text-foreground"
                                            title="Edit Kantor"
                                        >
                                            <Edit3 class="h-3.5 w-3.5" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            @click="deleteOffice(office.id)"
                                            class="h-7 w-7 cursor-pointer p-0 text-rose-500 hover:bg-rose-500/10"
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
                        v-if="!offices.length"
                        class="space-y-2 py-10 text-center text-muted-foreground"
                    >
                        <Building2
                            class="mx-auto h-8 w-8 text-muted-foreground/50"
                        />
                        <p>Belum ada data kantor OPD yang terdaftar.</p>
                    </div>

                    <Pagination
                        v-if="offices.length > 0"
                        v-model:currentPage="currentPage"
                        :totalItems="offices.length"
                        :itemsPerPage="itemsPerPage"
                    />
                </div>
            </CardContent>
        </Card>

        <!-- Shadcn Dialog Form Office -->
        <Dialog v-model:open="showForm">
            <DialogContent
                class="border-border/80 bg-card/95 backdrop-blur-2xl sm:max-w-4xl"
            >
                <DialogHeader>
                    <DialogTitle
                        class="flex items-center gap-2 text-base font-bold"
                    >
                        <Building2
                            class="h-4 w-4 text-teal-600 dark:text-teal-400"
                        />
                        <span>{{
                            form.id
                                ? 'Edit Data Kantor'
                                : 'Tambah Kantor OPD Baru'
                        }}</span>
                    </DialogTitle>
                </DialogHeader>

                <form @submit.prevent="submitForm" class="space-y-4 pt-2">
                    <div class="space-y-1.5">
                        <Label for="name" class="text-xs">Nama Kantor</Label>
                        <Input
                            id="name"
                            v-model="form.name"
                            required
                            placeholder="Contoh: Kantor Bupati Soppeng"
                            class="h-9 text-xs"
                        />
                    </div>

                    <div class="space-y-1.5">
                        <Label for="opd_name" class="text-xs"
                            >Nama OPD Utama</Label
                        >
                        <Input
                            id="opd_name"
                            v-model="form.opd_name"
                            required
                            placeholder="Contoh: Sekretariat Daerah"
                            class="h-9 text-xs"
                        />
                    </div>

                    <div class="space-y-1.5">
                        <Label for="alamat" class="text-xs"
                            >Alamat Kantor</Label
                        >
                        <Input
                            id="alamat"
                            v-model="form.alamat"
                            placeholder="Jl. Salotungo No. 1..."
                            class="h-9 text-xs"
                        />
                    </div>

                    <div class="grid grid-cols-3 gap-3">
                        <div class="space-y-1.5">
                            <Label for="latitude" class="text-xs"
                                >Latitude GPS</Label
                            >
                            <Input
                                id="latitude"
                                v-model="form.latitude"
                                placeholder="-4.3484"
                                class="h-9 text-xs"
                            />
                        </div>
                        <div class="space-y-1.5">
                            <Label for="longitude" class="text-xs"
                                >Longitude GPS</Label
                            >
                            <Input
                                id="longitude"
                                v-model="form.longitude"
                                placeholder="119.8837"
                                class="h-9 text-xs"
                            />
                        </div>
                        <div class="space-y-1.5">
                            <Label for="radius_meters" class="text-xs"
                                >Radius (Meter)</Label
                            >
                            <Input
                                id="radius_meters"
                                v-model="form.radius_meters"
                                type="number"
                                required
                                placeholder="200"
                                class="h-9 text-xs"
                            />
                        </div>
                    </div>

                    <div
                        class="flex items-center justify-end gap-2 border-t border-border pt-3"
                    >
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            @click="resetForm"
                            class="cursor-pointer"
                        >
                            Batal
                        </Button>
                        <Button
                            type="submit"
                            size="sm"
                            class="cursor-pointer bg-teal-600 text-white hover:bg-teal-700"
                        >
                            {{ form.id ? 'Simpan Perubahan' : 'Tambah Kantor' }}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    </AdminLayout>
</template>
