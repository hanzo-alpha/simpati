<script setup lang="ts">
import { useForm } from '@inertiajs/vue3';
import { Clock, Plus, Edit3, Trash2, Search } from '@lucide/vue';
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
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/Components/ui/select';
import AdminLayout from '@/Layouts/AdminLayout.vue';

interface Office {
    id: number;
    opd_name: string;
}

interface ScheduleItem {
    id: number;
    nama_jadwal: string;
    office_id: number | null;
    type: 'reguler' | 'shift' | 'khusus' | string;
    hari: string;
    jam_masuk: string;
    jam_pulang: string;
    toleransi_menit?: number;
    office?: Office;
}

const props = defineProps<{
    schedules: ScheduleItem[];
    offices: Office[];
}>();

const opdSearch = ref('');

const filteredOffices = computed(() => {
    if (!opdSearch.value.trim()) {
        return props.offices;
    }

    const q = opdSearch.value.toLowerCase();

    return props.offices.filter((o) => o.opd_name.toLowerCase().includes(q));
});

const currentPage = ref(1);
const itemsPerPage = 10;

const paginatedSchedules = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;

    return props.schedules.slice(start, start + itemsPerPage);
});

const showForm = ref(false);

const form = useForm({
    id: null as number | null,
    nama_jadwal: '',
    office_id: 'global' as string,
    type: 'reguler',
    hari: 'Senin,Selasa,Rabu,Kamis,Jumat',
    jam_masuk: '07:30',
    jam_pulang: '16:00',
    toleransi_menit: 15,
});

const editSchedule = (sch: ScheduleItem) => {
    form.id = sch.id;
    form.nama_jadwal = sch.nama_jadwal;
    form.office_id = sch.office_id ? String(sch.office_id) : 'global';
    form.type = sch.type;
    form.hari = sch.hari;
    form.jam_masuk = sch.jam_masuk;
    form.jam_pulang = sch.jam_pulang;
    form.toleransi_menit = sch.toleransi_menit || 15;
    showForm.value = true;
};

const resetForm = () => {
    form.reset();
    form.id = null;
    form.office_id = 'global';
    showForm.value = false;
};

const submitForm = () => {
    if (form.id) {
        form.put(`/admin/schedules/${form.id}`, {
            onSuccess: () => resetForm(),
        });
    } else {
        form.post('/admin/schedules', { onSuccess: () => resetForm() });
    }
};

const deleteSchedule = (id: number) => {
    if (confirm('Yakin hapus jadwal kerja ini?')) {
        useForm({}).delete(`/admin/schedules/${id}`);
    }
};
</script>

<template>
    <AdminLayout
        title="Kelola Jam Kerja"
        :subtitle="`${schedules.length} jadwal terdaftar`"
    >
        <template #actions>
            <Button
                @click="showForm = true"
                class="flex h-10 cursor-pointer items-center gap-2 rounded-none bg-primary px-4 text-xs font-bold tracking-wider text-primary-foreground uppercase shadow-none hover:bg-primary/90"
            >
                <Plus class="h-4 w-4" />
                <span>Tambah Jam Kerja</span>
            </Button>
        </template>

        <!-- Schedules Table Card -->
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
                                <th class="px-4 py-3.5 font-bold">
                                    Nama Jadwal
                                </th>
                                <th class="px-4 py-3.5 font-bold">OPD Utama</th>
                                <th class="px-4 py-3.5 text-center font-bold">
                                    Tipe
                                </th>
                                <th class="px-4 py-3.5 text-center font-bold">
                                    Jam Masuk
                                </th>
                                <th class="px-4 py-3.5 text-center font-bold">
                                    Jam Pulang
                                </th>
                                <th class="px-4 py-3.5 text-center font-bold">
                                    Toleransi
                                </th>
                                <th class="px-4 py-3.5 font-bold">
                                    Hari Berlaku
                                </th>
                                <th class="px-4 py-3.5 text-center font-bold">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-border/40">
                            <tr
                                v-for="sch in paginatedSchedules"
                                :key="sch.id"
                                class="border-b border-border/40 transition-colors hover:bg-muted/30"
                            >
                                <td
                                    class="px-4 py-3.5 font-bold text-foreground"
                                >
                                    {{ sch.nama_jadwal }}
                                </td>
                                <td class="px-4 py-3.5">
                                    <Badge
                                        v-if="!sch.office_id || !sch.office"
                                        variant="outline"
                                        class="rounded-none border-blue-500/30 bg-blue-500/10 text-[10px] font-bold tracking-wider text-blue-700 uppercase dark:text-blue-400"
                                    >
                                        Semua OPD (Global Pemda)
                                    </Badge>
                                    <span
                                        v-else
                                        class="font-medium text-muted-foreground"
                                    >
                                        {{ sch.office.opd_name }}
                                    </span>
                                </td>
                                <td class="px-4 py-3.5 text-center">
                                    <Badge
                                        variant="outline"
                                        class="rounded-none text-[10px] font-bold tracking-wider uppercase"
                                        :class="{
                                            'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400':
                                                sch.type === 'reguler',
                                            'border-purple-500/30 bg-purple-500/10 text-purple-600 dark:text-purple-400':
                                                sch.type === 'shift',
                                            'border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400':
                                                sch.type === 'khusus',
                                        }"
                                    >
                                        {{ sch.type }}
                                    </Badge>
                                </td>
                                <td
                                    class="px-4 py-3.5 text-center font-mono font-bold text-emerald-600 dark:text-emerald-400"
                                >
                                    {{ sch.jam_masuk }} WITA
                                </td>
                                <td
                                    class="px-4 py-3.5 text-center font-mono font-bold text-purple-600 dark:text-purple-400"
                                >
                                    {{ sch.jam_pulang }} WITA
                                </td>
                                <td
                                    class="px-4 py-3.5 text-center font-mono text-muted-foreground"
                                >
                                    {{ sch.toleransi_menit || 0 }} mnt
                                </td>
                                <td
                                    class="px-4 py-3.5 text-[11px] text-muted-foreground"
                                >
                                    {{ sch.hari }}
                                </td>
                                <td class="px-4 py-3.5 text-center">
                                    <div
                                        class="flex items-center justify-center gap-1"
                                    >
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            @click="editSchedule(sch)"
                                            class="h-8 w-8 cursor-pointer rounded-none p-0 text-muted-foreground hover:border-border hover:bg-muted/50 hover:text-foreground"
                                            title="Edit Jam Kerja"
                                        >
                                            <Edit3 class="h-3.5 w-3.5" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            @click="deleteSchedule(sch.id)"
                                            class="h-8 w-8 cursor-pointer rounded-none p-0 text-rose-500 hover:bg-rose-500/10"
                                            title="Hapus Jam Kerja"
                                        >
                                            <Trash2 class="h-3.5 w-3.5" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div
                        v-if="!schedules.length"
                        class="space-y-2 py-10 text-center text-muted-foreground"
                    >
                        <Clock
                            class="mx-auto h-8 w-8 text-muted-foreground/50"
                        />
                        <p>Belum ada jadwal jam kerja yang terdaftar.</p>
                    </div>

                    <Pagination
                        v-if="schedules.length > 0"
                        v-model:currentPage="currentPage"
                        :totalItems="schedules.length"
                        :itemsPerPage="itemsPerPage"
                    />
                </div>
            </CardContent>
        </Card>

        <!-- Shadcn Dialog Form Schedules -->
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
                            <Clock class="h-4 w-4" />
                        </div>
                        <span>{{
                            form.id ? 'Edit Jam Kerja' : 'Tambah Jam Kerja Baru'
                        }}</span>
                    </DialogTitle>
                </DialogHeader>

                <form @submit.prevent="submitForm" class="space-y-4 pt-2">
                    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div class="space-y-1.5">
                            <Label
                                for="nama_jadwal"
                                class="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
                                >Nama Jam Kerja</Label
                            >
                            <Input
                                id="nama_jadwal"
                                v-model="form.nama_jadwal"
                                required
                                placeholder="Contoh: Reguler Senin-Kamis"
                                class="h-10 rounded-none text-xs sm:text-sm"
                            />
                        </div>
                        <div class="space-y-1.5">
                            <Label
                                class="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
                                >OPD / Kantor Target</Label
                            >
                            <Select v-model="form.office_id">
                                <SelectTrigger
                                    class="h-10 rounded-none text-xs sm:text-sm"
                                >
                                    <SelectValue
                                        placeholder="Pilih OPD / Global"
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
                                                v-model="opdSearch"
                                                type="text"
                                                placeholder="Cari OPD / Kantor..."
                                                class="h-8 rounded-none border-input bg-background pl-8 text-xs"
                                                @keydown.stop
                                            />
                                        </div>
                                    </div>
                                    <div class="max-h-56 overflow-y-auto pt-1">
                                        <SelectItem value="global"
                                            >Semua OPD (Global
                                            Pemda)</SelectItem
                                        >
                                        <SelectItem
                                            v-for="o in filteredOffices"
                                            :key="o.id"
                                            :value="String(o.id)"
                                        >
                                            {{ o.opd_name }}
                                        </SelectItem>
                                        <div
                                            v-if="!filteredOffices.length"
                                            class="p-3 text-center text-xs text-muted-foreground"
                                        >
                                            OPD tidak ditemukan
                                        </div>
                                    </div>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div class="space-y-1.5">
                            <Label
                                class="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
                                >Tipe Jadwal</Label
                            >
                            <Select v-model="form.type">
                                <SelectTrigger
                                    class="h-10 rounded-none text-xs sm:text-sm"
                                >
                                    <SelectValue
                                        placeholder="Pilih Tipe Jadwal"
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="reguler"
                                        >Reguler</SelectItem
                                    >
                                    <SelectItem value="shift">Shift</SelectItem>
                                    <SelectItem value="khusus"
                                        >Khusus / Ramadan</SelectItem
                                    >
                                </SelectContent>
                            </Select>
                        </div>
                        <div class="space-y-1.5">
                            <Label
                                for="toleransi_menit"
                                class="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
                                >Toleransi Keterlambatan (Menit)</Label
                            >
                            <Input
                                id="toleransi_menit"
                                v-model="form.toleransi_menit"
                                type="number"
                                required
                                class="h-10 rounded-none font-mono text-xs sm:text-sm"
                            />
                        </div>
                    </div>

                    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div class="space-y-1.5">
                            <Label
                                for="jam_masuk"
                                class="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
                                >Jam Masuk</Label
                            >
                            <Input
                                id="jam_masuk"
                                v-model="form.jam_masuk"
                                type="time"
                                required
                                class="h-10 rounded-none font-mono text-xs sm:text-sm"
                            />
                        </div>
                        <div class="space-y-1.5">
                            <Label
                                for="jam_pulang"
                                class="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
                                >Jam Pulang</Label
                            >
                            <Input
                                id="jam_pulang"
                                v-model="form.jam_pulang"
                                type="time"
                                required
                                class="h-10 rounded-none font-mono text-xs sm:text-sm"
                            />
                        </div>
                    </div>

                    <div class="space-y-1.5">
                        <Label
                            for="hari"
                            class="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
                            >Hari Berlaku (Dipisah koma)</Label
                        >
                        <Input
                            id="hari"
                            v-model="form.hari"
                            required
                            placeholder="Senin,Selasa,Rabu,Kamis,Jumat"
                            class="h-10 rounded-none text-xs sm:text-sm"
                        />
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
                            {{ form.id ? 'Simpan Perubahan' : 'Tambah Jadwal' }}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    </AdminLayout>
</template>
