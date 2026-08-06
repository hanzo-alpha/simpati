<script setup lang="ts">
import { ref, computed } from 'vue';
import { useForm } from '@inertiajs/vue3';
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
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import Pagination from '@/Components/Pagination.vue';
import { Clock, Plus, Edit3, Trash2 } from '@lucide/vue';

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
        form.put(`/admin/schedules/${form.id}`, { onSuccess: () => resetForm() });
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
    <AdminLayout title="Kelola Jam Kerja" :subtitle="`${schedules.length} jadwal terdaftar`">
        <template #actions>
            <Button
                @click="showForm = true"
                class="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-semibold shadow-md shadow-teal-600/20 rounded-xl cursor-pointer"
            >
                <Plus class="w-4 h-4 mr-2" />
                <span>Tambah Jam Kerja</span>
            </Button>
        </template>

        <!-- Schedules Table Card -->
        <Card class="border-border/60 shadow-md backdrop-blur-xl bg-card/95">
            <CardContent class="p-0">
                <div class="overflow-x-auto">
                    <table class="w-full text-xs">
                        <thead>
                            <tr class="text-left text-muted-foreground border-b border-border bg-muted/30">
                                <th class="px-5 py-3.5 font-semibold">Nama Jadwal</th>
                                <th class="px-5 py-3.5 font-semibold">OPD Utama</th>
                                <th class="px-5 py-3.5 font-semibold text-center">Tipe</th>
                                <th class="px-5 py-3.5 font-semibold text-center">Jam Masuk</th>
                                <th class="px-5 py-3.5 font-semibold text-center">Jam Pulang</th>
                                <th class="px-5 py-3.5 font-semibold text-center">Toleransi</th>
                                <th class="px-5 py-3.5 font-semibold">Hari Berlaku</th>
                                <th class="px-5 py-3.5 font-semibold text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-border/40">
                            <tr
                                v-for="sch in paginatedSchedules"
                                :key="sch.id"
                                class="hover:bg-muted/40 transition-colors"
                            >
                                <td class="px-5 py-3.5 font-bold text-foreground">{{ sch.nama_jadwal }}</td>
                                <td class="px-5 py-3.5 text-muted-foreground">{{ sch.office?.opd_name || '-' }}</td>
                                <td class="px-5 py-3.5 text-center">
                                    <Badge
                                        variant="outline"
                                        class="uppercase text-[10px] font-semibold"
                                        :class="{
                                            'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30': sch.type === 'reguler',
                                            'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30': sch.type === 'shift',
                                            'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30': sch.type === 'khusus',
                                        }"
                                    >
                                        {{ sch.type }}
                                    </Badge>
                                </td>
                                <td class="px-5 py-3.5 text-center font-mono font-bold text-teal-600 dark:text-teal-400">
                                    {{ sch.jam_masuk }} WITA
                                </td>
                                <td class="px-5 py-3.5 text-center font-mono font-bold text-purple-600 dark:text-purple-400">
                                    {{ sch.jam_pulang }} WITA
                                </td>
                                <td class="px-5 py-3.5 text-center font-mono text-muted-foreground">
                                    {{ sch.toleransi_menit || 0 }} mnt
                                </td>
                                <td class="px-5 py-3.5 text-muted-foreground text-[11px]">{{ sch.hari }}</td>
                                <td class="px-5 py-3.5 text-center">
                                    <div class="flex items-center justify-center gap-1">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            @click="editSchedule(sch)"
                                            class="h-7 w-7 p-0 text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer"
                                            title="Edit Jam Kerja"
                                        >
                                            <Edit3 class="w-3.5 h-3.5" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            @click="deleteSchedule(sch.id)"
                                            class="h-7 w-7 p-0 text-rose-500 hover:bg-rose-500/10 cursor-pointer"
                                            title="Hapus Jam Kerja"
                                        >
                                            <Trash2 class="w-3.5 h-3.5" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div v-if="!schedules.length" class="text-center text-muted-foreground py-10 space-y-2">
                        <Clock class="w-8 h-8 mx-auto text-muted-foreground/50" />
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
            <DialogContent class="sm:max-w-lg bg-card/95 border-border/80 backdrop-blur-2xl">
                <DialogHeader>
                    <DialogTitle class="text-base font-bold flex items-center gap-2">
                        <Clock class="w-4 h-4 text-teal-600 dark:text-teal-400" />
                        <span>{{ form.id ? 'Edit Jam Kerja' : 'Tambah Jam Kerja Baru' }}</span>
                    </DialogTitle>
                </DialogHeader>

                <form @submit.prevent="submitForm" class="space-y-4 pt-2">
                    <div class="grid grid-cols-2 gap-3">
                        <div class="space-y-1.5">
                            <Label for="nama_jadwal" class="text-xs">Nama Jam Kerja</Label>
                            <Input id="nama_jadwal" v-model="form.nama_jadwal" required placeholder="Contoh: Reguler Senin-Kamis" class="h-9 text-xs" />
                        </div>
                        <div class="space-y-1.5">
                            <Label class="text-xs">OPD / Kantor</Label>
                            <Select v-model="form.office_id">
                                <SelectTrigger class="h-9 text-xs bg-background">
                                    <SelectValue placeholder="Pilih OPD" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem v-for="o in offices" :key="o.id" :value="String(o.id)">
                                        {{ o.opd_name }}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-3">
                        <div class="space-y-1.5">
                            <Label class="text-xs">Tipe Jadwal</Label>
                            <Select v-model="form.type">
                                <SelectTrigger class="h-9 text-xs bg-background">
                                    <SelectValue placeholder="Pilih Tipe" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="reguler">Reguler</SelectItem>
                                    <SelectItem value="shift">Shift</SelectItem>
                                    <SelectItem value="khusus">Khusus / Ramadan</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div class="space-y-1.5">
                            <Label for="toleransi_menit" class="text-xs">Toleransi (Menit)</Label>
                            <Input id="toleransi_menit" v-model="form.toleransi_menit" type="number" required class="h-9 text-xs" />
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-3">
                        <div class="space-y-1.5">
                            <Label for="jam_masuk" class="text-xs">Jam Masuk</Label>
                            <Input id="jam_masuk" v-model="form.jam_masuk" type="time" required class="h-9 text-xs" />
                        </div>
                        <div class="space-y-1.5">
                            <Label for="jam_pulang" class="text-xs">Jam Pulang</Label>
                            <Input id="jam_pulang" v-model="form.jam_pulang" type="time" required class="h-9 text-xs" />
                        </div>
                    </div>

                    <div class="space-y-1.5">
                        <Label for="hari" class="text-xs">Hari Berlaku (Dipisah koma)</Label>
                        <Input id="hari" v-model="form.hari" required placeholder="Senin,Selasa,Rabu,Kamis,Jumat" class="h-9 text-xs" />
                    </div>

                    <div class="flex items-center justify-end gap-2 pt-3 border-t border-border">
                        <Button type="button" variant="outline" size="sm" @click="resetForm" class="cursor-pointer">
                            Batal
                        </Button>
                        <Button type="submit" size="sm" class="bg-teal-600 hover:bg-teal-700 text-white cursor-pointer">
                            {{ form.id ? 'Simpan Perubahan' : 'Tambah Jadwal' }}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    </AdminLayout>
</template>
