<script setup lang="ts">
import { useForm } from '@inertiajs/vue3';
import { Clock, Plus, Edit3, Trash2 } from '@lucide/vue';
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
    office_id: number;
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
    office_id: '' as number | string,
    type: 'reguler',
    hari: 'Senin,Selasa,Rabu,Kamis,Jumat',
    jam_masuk: '07:30',
    jam_pulang: '16:00',
    toleransi_menit: 15,
});

const editSchedule = (sch: ScheduleItem) => {
    form.id = sch.id;
    form.nama_jadwal = sch.nama_jadwal;
    form.office_id = String(sch.office_id);
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
                class="cursor-pointer rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 font-semibold text-white shadow-md shadow-teal-600/20 hover:from-teal-700 hover:to-emerald-700"
            >
                <Plus class="mr-2 h-4 w-4" />
                <span>Tambah Jam Kerja</span>
            </Button>
        </template>

        <!-- Schedules Table Card -->
        <Card class="border-border/60 bg-card/95 shadow-md backdrop-blur-xl">
            <CardContent class="p-0">
                <div class="overflow-x-auto">
                    <table class="w-full text-xs">
                        <thead>
                            <tr
                                class="border-b border-border bg-muted/30 text-left text-muted-foreground"
                            >
                                <th class="px-5 py-3.5 font-semibold">
                                    Nama Jadwal
                                </th>
                                <th class="px-5 py-3.5 font-semibold">
                                    OPD Utama
                                </th>
                                <th
                                    class="px-5 py-3.5 text-center font-semibold"
                                >
                                    Tipe
                                </th>
                                <th
                                    class="px-5 py-3.5 text-center font-semibold"
                                >
                                    Jam Masuk
                                </th>
                                <th
                                    class="px-5 py-3.5 text-center font-semibold"
                                >
                                    Jam Pulang
                                </th>
                                <th
                                    class="px-5 py-3.5 text-center font-semibold"
                                >
                                    Toleransi
                                </th>
                                <th class="px-5 py-3.5 font-semibold">
                                    Hari Berlaku
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
                                v-for="sch in paginatedSchedules"
                                :key="sch.id"
                                class="transition-colors hover:bg-muted/40"
                            >
                                <td
                                    class="px-5 py-3.5 font-bold text-foreground"
                                >
                                    {{ sch.nama_jadwal }}
                                </td>
                                <td class="px-5 py-3.5 text-muted-foreground">
                                    {{ sch.office?.opd_name || '-' }}
                                </td>
                                <td class="px-5 py-3.5 text-center">
                                    <Badge
                                        variant="outline"
                                        class="text-[10px] font-semibold uppercase"
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
                                    class="px-5 py-3.5 text-center font-mono font-bold text-teal-600 dark:text-teal-400"
                                >
                                    {{ sch.jam_masuk }} WITA
                                </td>
                                <td
                                    class="px-5 py-3.5 text-center font-mono font-bold text-purple-600 dark:text-purple-400"
                                >
                                    {{ sch.jam_pulang }} WITA
                                </td>
                                <td
                                    class="px-5 py-3.5 text-center font-mono text-muted-foreground"
                                >
                                    {{ sch.toleransi_menit || 0 }} mnt
                                </td>
                                <td
                                    class="px-5 py-3.5 text-[11px] text-muted-foreground"
                                >
                                    {{ sch.hari }}
                                </td>
                                <td class="px-5 py-3.5 text-center">
                                    <div
                                        class="flex items-center justify-center gap-1"
                                    >
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            @click="editSchedule(sch)"
                                            class="h-7 w-7 cursor-pointer p-0 text-muted-foreground hover:bg-muted hover:text-foreground"
                                            title="Edit Jam Kerja"
                                        >
                                            <Edit3 class="h-3.5 w-3.5" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            @click="deleteSchedule(sch.id)"
                                            class="h-7 w-7 cursor-pointer p-0 text-rose-500 hover:bg-rose-500/10"
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
                class="border-border/60 bg-card/98 shadow-2xl backdrop-blur-2xl sm:max-w-3xl rounded-2xl p-6 sm:p-8"
            >
                <DialogHeader class="pb-2">
                    <DialogTitle
                        class="flex items-center gap-3 text-lg font-bold text-foreground"
                    >
                        <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                            <Clock class="h-5 w-5" />
                        </div>
                        <span>{{
                            form.id ? 'Edit Jam Kerja' : 'Tambah Jam Kerja Baru'
                        }}</span>
                    </DialogTitle>
                </DialogHeader>

                <form @submit.prevent="submitForm" class="space-y-5 pt-2">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="space-y-1.5">
                            <Label for="nama_jadwal" class="text-xs font-semibold text-foreground/80">Nama Jam Kerja</Label>
                            <Input
                                id="nama_jadwal"
                                v-model="form.nama_jadwal"
                                required
                                placeholder="Contoh: Reguler Senin-Kamis"
                                class="h-10 text-xs sm:text-sm rounded-xl"
                            />
                        </div>
                        <div class="space-y-1.5">
                            <Label class="text-xs font-semibold text-foreground/80">OPD / Kantor</Label>
                            <Select v-model="form.office_id">
                                <SelectTrigger
                                    class="h-10 bg-background text-xs sm:text-sm rounded-xl"
                                >
                                    <SelectValue placeholder="Pilih OPD / Kantor" />
                                </SelectTrigger>
                                <SelectContent>
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
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="space-y-1.5">
                            <Label class="text-xs font-semibold text-foreground/80">Tipe Jadwal</Label>
                            <Select v-model="form.type">
                                <SelectTrigger
                                    class="h-10 bg-background text-xs sm:text-sm rounded-xl"
                                >
                                    <SelectValue placeholder="Pilih Tipe Jadwal" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="reguler">Reguler</SelectItem>
                                    <SelectItem value="shift">Shift</SelectItem>
                                    <SelectItem value="khusus">Khusus / Ramadan</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div class="space-y-1.5">
                            <Label for="toleransi_menit" class="text-xs font-semibold text-foreground/80">Toleransi Keterlambatan (Menit)</Label>
                            <Input
                                id="toleransi_menit"
                                v-model="form.toleransi_menit"
                                type="number"
                                required
                                class="h-10 text-xs sm:text-sm rounded-xl"
                            />
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="space-y-1.5">
                            <Label for="jam_masuk" class="text-xs font-semibold text-foreground/80">Jam Masuk</Label>
                            <Input
                                id="jam_masuk"
                                v-model="form.jam_masuk"
                                type="time"
                                required
                                class="h-10 text-xs sm:text-sm rounded-xl"
                            />
                        </div>
                        <div class="space-y-1.5">
                            <Label for="jam_pulang" class="text-xs font-semibold text-foreground/80">Jam Pulang</Label>
                            <Input
                                id="jam_pulang"
                                v-model="form.jam_pulang"
                                type="time"
                                required
                                class="h-10 text-xs sm:text-sm rounded-xl"
                            />
                        </div>
                    </div>

                    <div class="space-y-1.5">
                        <Label for="hari" class="text-xs font-semibold text-foreground/80">Hari Berlaku (Dipisah koma)</Label>
                        <Input
                            id="hari"
                            v-model="form.hari"
                            required
                            placeholder="Senin,Selasa,Rabu,Kamis,Jumat"
                            class="h-10 text-xs sm:text-sm rounded-xl"
                        />
                    </div>

                    <div
                        class="flex items-center justify-end gap-3 border-t border-border/60 pt-4 mt-6"
                    >
                        <Button
                            type="button"
                            variant="outline"
                            @click="resetForm"
                            class="h-10 px-5 rounded-xl cursor-pointer text-xs sm:text-sm"
                        >
                            Batal
                        </Button>
                        <Button
                            type="submit"
                            class="h-10 px-6 rounded-xl cursor-pointer bg-teal-600 text-white hover:bg-teal-700 shadow-md font-semibold text-xs sm:text-sm"
                        >
                            {{ form.id ? 'Simpan Perubahan' : 'Tambah Jadwal' }}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    </AdminLayout>
</template>
