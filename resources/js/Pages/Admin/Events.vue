<script setup lang="ts">
import { router, useForm } from '@inertiajs/vue3';
import {
    QrCode,
    Plus,
    Calendar,
    MapPin,
    Users,
    Clock,
    Pencil,
    Trash2,
    Search,
    CheckCircle2,
} from '@lucide/vue';
import { ref, computed } from 'vue';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/Components/ui/card';
import { Dialog, DialogContent } from '@/Components/ui/dialog';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { useConfirm } from '@/composables/useConfirm';
import AdminLayout from '@/Layouts/AdminLayout.vue';

interface Participant {
    id: number;
    user_name: string;
    nip: string;
    opd: string;
    waktu_presensi: string;
    keterangan: string;
}

interface EventItem {
    id: number;
    nama_kegiatan: string;
    penyelenggara: string;
    tanggal: string;
    jam_mulai: string;
    jam_selesai: string;
    lokasi: string;
    qr_token: string;
    is_active: boolean;
    participants_count?: number;
    participants?: Participant[];
}

const props = defineProps<{
    events: EventItem[];
}>();

const { confirm } = useConfirm();

const showForm = ref(false);
const showEditForm = ref(false);
const showParticipantsModal = ref(false);
const activeQrModal = ref<EventItem | null>(null);
const activeParticipantsEvent = ref<EventItem | null>(null);
const editingEventId = ref<number | null>(null);
const participantSearchQuery = ref('');

const form = useForm({
    nama_kegiatan: '',
    penyelenggara: 'Pemerintah Kabupaten Soppeng',
    tanggal: new Date().toISOString().split('T')[0],
    jam_mulai: '07:00',
    jam_selesai: '09:00',
    lokasi: 'Halaman Kantor Bupati Soppeng',
});

const editForm = useForm({
    nama_kegiatan: '',
    penyelenggara: '',
    tanggal: '',
    jam_mulai: '',
    jam_selesai: '',
    lokasi: '',
    is_active: true,
});

const submitForm = () => {
    form.post('/admin/events', {
        onSuccess: () => {
            form.reset();
            showForm.value = false;
        },
    });
};

const openEditModal = (item: EventItem) => {
    editingEventId.value = item.id;
    editForm.nama_kegiatan = item.nama_kegiatan;
    editForm.penyelenggara = item.penyelenggara;
    editForm.tanggal = item.tanggal;
    editForm.jam_mulai = item.jam_mulai;
    editForm.jam_selesai = item.jam_selesai;
    editForm.lokasi = item.lokasi;
    editForm.is_active = item.is_active;
    showEditForm.value = true;
};

const submitEditForm = () => {
    if (!editingEventId.value) {
        return;
    }

    editForm.put(`/admin/events/${editingEventId.value}`, {
        onSuccess: () => {
            showEditForm.value = false;
            editingEventId.value = null;
        },
    });
};

const deleteEvent = async (item: EventItem) => {
    const isConfirmed = await confirm({
        title: 'Hapus Event Presensi?',
        description: `Apakah Anda yakin ingin menghapus "${item.nama_kegiatan}"? Seluruh riwayat presensi peserta pada event ini juga akan dihapus secara permanen.`,
        confirmText: 'Hapus Event',
        variant: 'destructive',
    });

    if (isConfirmed) {
        router.delete(`/admin/events/${item.id}`);
    }
};

const openParticipantsModal = (item: EventItem) => {
    activeParticipantsEvent.value = item;
    participantSearchQuery.value = '';
    showParticipantsModal.value = true;
};

const filteredParticipants = computed(() => {
    if (!activeParticipantsEvent.value?.participants) {
        return [];
    }

    const query = participantSearchQuery.value.trim().toLowerCase();
    if (!query) {
        return activeParticipantsEvent.value.participants;
    }

    return activeParticipantsEvent.value.participants.filter(
        (p) =>
            p.user_name.toLowerCase().includes(query) ||
            p.nip.toLowerCase().includes(query) ||
            p.opd.toLowerCase().includes(query),
    );
});

const formatTanggal = (dateStr?: string) => {
    if (!dateStr) {
        return '-';
    }

    const rawDate = dateStr.split('T')[0];
    const parts = rawDate.split('-');

    if (parts.length === 3) {
        const year = parts[0];
        const monthIndex = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);
        const months = [
            'Januari',
            'Februari',
            'Maret',
            'April',
            'Mei',
            'Juni',
            'Juli',
            'Agustus',
            'September',
            'Oktober',
            'November',
            'Desember',
        ];

        return `${day} ${months[monthIndex] || ''} ${year}`;
    }

    return dateStr;
};
</script>

<template>
    <AdminLayout
        title="Presensi Apel, Upacara & Kegiatan Gabungan"
        subtitle="Generator QR Code Dinamis & Pemantauan Kehadiran Acara"
    >
        <template #actions>
            <Button
                @click="showForm = true"
                class="flex h-10 cursor-pointer items-center gap-2 rounded-none bg-primary px-4 text-xs font-bold tracking-wider text-primary-foreground uppercase shadow-none hover:bg-primary/90"
            >
                <Plus class="h-4 w-4" />
                <span>Buat Presensi Kegiatan</span>
            </Button>
        </template>

        <!-- List Events Cards Grid -->
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card
                v-for="item in events"
                :key="item.id"
                class="flex flex-col justify-between rounded-none border border-border bg-card text-card-foreground shadow-xs transition-shadow hover:shadow-md"
            >
                <div>
                    <CardHeader class="border-b border-border pb-3">
                        <div class="flex items-center justify-between gap-2">
                            <div class="flex items-center gap-2">
                                <Badge
                                    :variant="
                                        item.is_active ? 'default' : 'outline'
                                    "
                                    class="rounded-none text-[10px] font-bold uppercase"
                                    :class="
                                        item.is_active
                                            ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                            : ''
                                    "
                                >
                                    {{ item.is_active ? 'AKTIF' : 'SELESAI' }}
                                </Badge>
                                <button
                                    @click="openParticipantsModal(item)"
                                    class="flex cursor-pointer items-center gap-1 font-mono text-xs font-bold text-muted-foreground hover:text-emerald-500"
                                    title="Klik untuk melihat daftar ASN yang sudah absen"
                                >
                                    <Users class="h-3.5 w-3.5" />
                                    <span>{{ item.participants_count || 0 }} ASN Hadir</span>
                                </button>
                            </div>

                            <!-- Action Buttons Edit & Delete -->
                            <div class="flex items-center gap-1">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    @click="openEditModal(item)"
                                    title="Edit Event Presensi"
                                    class="h-7 w-7 rounded-none text-muted-foreground hover:bg-muted hover:text-foreground"
                                >
                                    <Pencil class="h-3.5 w-3.5" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    @click="deleteEvent(item)"
                                    title="Hapus Event Presensi"
                                    class="h-7 w-7 rounded-none text-muted-foreground hover:bg-rose-500/10 hover:text-rose-500"
                                >
                                    <Trash2 class="h-3.5 w-3.5" />
                                </Button>
                            </div>
                        </div>

                        <CardTitle
                            class="mt-2 text-sm font-extrabold text-foreground"
                        >
                            {{ item.nama_kegiatan }}
                        </CardTitle>
                        <p class="text-[11px] text-muted-foreground">
                            {{ item.penyelenggara }}
                        </p>
                    </CardHeader>

                    <CardContent class="space-y-2.5 pt-4 text-xs">
                        <div
                            class="flex items-center gap-2 text-muted-foreground"
                        >
                            <Calendar
                                class="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400"
                            />
                            <span
                                >{{ formatTanggal(item.tanggal) }} ({{
                                    item.jam_mulai
                                }}
                                - {{ item.jam_selesai }} WITA)</span
                            >
                        </div>
                        <div
                            class="flex items-center gap-2 text-muted-foreground"
                        >
                            <MapPin
                                class="h-3.5 w-3.5 shrink-0 text-rose-500"
                            />
                            <span class="truncate">{{ item.lokasi }}</span>
                        </div>

                        <!-- QR Code Token Card -->
                        <div
                            class="mt-3 flex flex-col items-center justify-center border border-dashed border-emerald-500/40 bg-emerald-500/5 p-3 text-center"
                        >
                            <img
                                :src="`https://api.qrserver.com/v1/create-qr-code/?size=120x120&margin=4&data=${encodeURIComponent(item.qr_token)}`"
                                alt="QR Code"
                                class="h-24 w-24 rounded-md border border-slate-200 bg-white p-1"
                            />
                            <div
                                class="mt-2 font-mono text-[10px] text-muted-foreground uppercase"
                            >
                                KODE TOKEN PRESET
                            </div>
                            <div
                                class="font-mono text-sm font-black tracking-widest text-emerald-600 dark:text-emerald-400"
                            >
                                {{ item.qr_token }}
                            </div>
                        </div>
                    </CardContent>
                </div>

                <div class="grid grid-cols-2 gap-2 border-t border-border p-3">
                    <Button
                        variant="outline"
                        size="sm"
                        @click="openParticipantsModal(item)"
                        class="cursor-pointer rounded-none text-[11px] font-bold uppercase"
                    >
                        <Users class="mr-1.5 h-3.5 w-3.5 text-sky-500" />
                        Daftar ASN Hadir ({{ item.participants_count || 0 }})
                    </Button>
                    <Button
                        variant="default"
                        size="sm"
                        @click="activeQrModal = item"
                        class="cursor-pointer rounded-none bg-primary text-[11px] font-bold text-primary-foreground uppercase shadow-none hover:bg-primary/90"
                    >
                        <QrCode class="mr-1.5 h-3.5 w-3.5" />
                        Layar QR Presensi
                    </Button>
                </div>
            </Card>

            <div
                v-if="!events.length"
                class="col-span-full py-12 text-center text-muted-foreground"
            >
                <Calendar
                    class="mx-auto mb-2 h-10 w-10 text-muted-foreground/50"
                />
                <p>
                    Belum ada jadwal presensi kegiatan / apel gabungan yang
                    dibuat.
                </p>
            </div>
        </div>

        <!-- Dialog Modal Tambah Event -->
        <Dialog v-model:open="showForm">
            <DialogContent class="max-w-md rounded-none border-border bg-card">
                <div class="border-b border-border pb-3">
                    <h3 class="text-sm font-bold text-foreground uppercase">
                        Buat Presensi Apel / Upacara
                    </h3>
                    <p class="text-xs text-muted-foreground">
                        Generasi QR Token untuk pemindaian presensi masal ASN
                    </p>
                </div>

                <form @submit.prevent="submitForm" class="space-y-4 pt-2">
                    <div class="space-y-1.5">
                        <Label
                            class="text-[11px] font-bold text-muted-foreground uppercase"
                            >Nama Kegiatan / Upacara</Label
                        >
                        <Input
                            v-model="form.nama_kegiatan"
                            required
                            placeholder="Contoh: Apel Kesadaran Nasional"
                            class="h-10 rounded-none text-xs"
                        />
                    </div>
                    <div class="space-y-1.5">
                        <Label
                            class="text-[11px] font-bold text-muted-foreground uppercase"
                            >Penyelenggara</Label
                        >
                        <Input
                            v-model="form.penyelenggara"
                            required
                            placeholder="Contoh: BKPSDM Kab. Soppeng"
                            class="h-10 rounded-none text-xs"
                        />
                    </div>
                    <div class="space-y-1.5">
                        <Label
                            class="text-[11px] font-bold text-muted-foreground uppercase"
                            >Tanggal Pelaksanaan</Label
                        >
                        <Input
                            v-model="form.tanggal"
                            type="date"
                            required
                            class="h-10 rounded-none font-mono text-xs"
                        />
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                        <div class="space-y-1.5">
                            <Label
                                class="text-[11px] font-bold text-muted-foreground uppercase"
                                >Jam Mulai</Label
                            >
                            <Input
                                v-model="form.jam_mulai"
                                type="time"
                                required
                                class="h-10 rounded-none font-mono text-xs"
                            />
                        </div>
                        <div class="space-y-1.5">
                            <Label
                                class="text-[11px] font-bold text-muted-foreground uppercase"
                                >Jam Selesai</Label
                            >
                            <Input
                                v-model="form.jam_selesai"
                                type="time"
                                required
                                class="h-10 rounded-none font-mono text-xs"
                            />
                        </div>
                    </div>
                    <div class="space-y-1.5">
                        <Label
                            class="text-[11px] font-bold text-muted-foreground uppercase"
                            >Lokasi Kegiatan</Label
                        >
                        <Input
                            v-model="form.lokasi"
                            required
                            placeholder="Contoh: Halaman Kantor Bupati Soppeng"
                            class="h-10 rounded-none text-xs"
                        />
                    </div>

                    <div
                        class="flex justify-end gap-2 border-t border-border pt-4"
                    >
                        <Button
                            type="button"
                            variant="outline"
                            @click="showForm = false"
                            class="h-10 rounded-none text-xs font-bold uppercase"
                            >Batal</Button
                        >
                        <Button
                            type="submit"
                            class="h-10 rounded-none bg-primary text-xs font-bold text-primary-foreground uppercase"
                            >Terbitkan QR Event</Button
                        >
                    </div>
                </form>
            </DialogContent>
        </Dialog>

        <!-- Dialog Modal Edit Event -->
        <Dialog v-model:open="showEditForm">
            <DialogContent class="max-w-md rounded-none border-border bg-card">
                <div class="border-b border-border pb-3">
                    <h3 class="text-sm font-bold text-foreground uppercase">
                        Edit Presensi Apel / Upacara
                    </h3>
                    <p class="text-xs text-muted-foreground">
                        Perbarui detail jadwal, lokasi, atau status event
                    </p>
                </div>

                <form @submit.prevent="submitEditForm" class="space-y-4 pt-2">
                    <div class="space-y-1.5">
                        <Label
                            class="text-[11px] font-bold text-muted-foreground uppercase"
                            >Nama Kegiatan / Upacara</Label
                        >
                        <Input
                            v-model="editForm.nama_kegiatan"
                            required
                            class="h-10 rounded-none text-xs"
                        />
                    </div>
                    <div class="space-y-1.5">
                        <Label
                            class="text-[11px] font-bold text-muted-foreground uppercase"
                            >Penyelenggara</Label
                        >
                        <Input
                            v-model="editForm.penyelenggara"
                            required
                            class="h-10 rounded-none text-xs"
                        />
                    </div>
                    <div class="space-y-1.5">
                        <Label
                            class="text-[11px] font-bold text-muted-foreground uppercase"
                            >Tanggal Pelaksanaan</Label
                        >
                        <Input
                            v-model="editForm.tanggal"
                            type="date"
                            required
                            class="h-10 rounded-none font-mono text-xs"
                        />
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                        <div class="space-y-1.5">
                            <Label
                                class="text-[11px] font-bold text-muted-foreground uppercase"
                                >Jam Mulai</Label
                            >
                            <Input
                                v-model="editForm.jam_mulai"
                                type="time"
                                required
                                class="h-10 rounded-none font-mono text-xs"
                            />
                        </div>
                        <div class="space-y-1.5">
                            <Label
                                class="text-[11px] font-bold text-muted-foreground uppercase"
                                >Jam Selesai</Label
                            >
                            <Input
                                v-model="editForm.jam_selesai"
                                type="time"
                                required
                                class="h-10 rounded-none font-mono text-xs"
                            />
                        </div>
                    </div>
                    <div class="space-y-1.5">
                        <Label
                            class="text-[11px] font-bold text-muted-foreground uppercase"
                            >Lokasi Kegiatan</Label
                        >
                        <Input
                            v-model="editForm.lokasi"
                            required
                            class="h-10 rounded-none text-xs"
                        />
                    </div>

                    <div class="flex items-center gap-2 pt-1">
                        <input
                            type="checkbox"
                            id="edit_is_active"
                            v-model="editForm.is_active"
                            class="h-4 w-4 rounded-none border-border accent-emerald-600"
                        />
                        <Label
                            for="edit_is_active"
                            class="cursor-pointer text-xs font-bold text-foreground"
                            >Status Event Aktif (Siap Menerima Presensi)</Label
                        >
                    </div>

                    <div
                        class="flex justify-end gap-2 border-t border-border pt-4"
                    >
                        <Button
                            type="button"
                            variant="outline"
                            @click="showEditForm = false"
                            class="h-10 rounded-none text-xs font-bold uppercase"
                            >Batal</Button
                        >
                        <Button
                            type="submit"
                            class="h-10 rounded-none bg-primary text-xs font-bold text-primary-foreground uppercase"
                            >Simpan Perubahan</Button
                        >
                    </div>
                </form>
            </DialogContent>
        </Dialog>

        <!-- Dialog Modal Daftar ASN Hadir / Absen -->
        <Dialog v-model:open="showParticipantsModal">
            <DialogContent class="sm:max-w-4xl rounded-none border-border bg-card p-6">
                <div class="border-b border-border pb-3 pr-8">
                    <h3 class="flex items-center gap-2 text-sm font-bold text-foreground uppercase">
                        <Users class="h-4 w-4 text-emerald-500" />
                        <span>Daftar ASN Hadir — {{ activeParticipantsEvent?.nama_kegiatan }}</span>
                    </h3>
                    <p class="text-xs text-muted-foreground">
                        Total {{ activeParticipantsEvent?.participants_count || 0 }} Pegawai ASN telah melakukan presensi QR Code
                    </p>
                </div>

                <div class="mt-3 flex items-center justify-between">
                    <div class="relative w-full max-w-sm">
                        <Search class="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            v-model="participantSearchQuery"
                            placeholder="Cari nama, NIP, atau OPD..."
                            class="h-9 rounded-none border-border bg-background pl-9 text-xs"
                        />
                    </div>
                </div>

                <div class="mt-3 max-h-96 overflow-y-auto border border-border">
                    <table class="w-full text-xs">
                        <thead>
                            <tr class="border-b border-border bg-muted/40 text-left text-muted-foreground">
                                <th class="w-12 px-4 py-3 text-center font-bold uppercase">#</th>
                                <th class="px-4 py-3 font-bold uppercase min-w-[200px]">Nama & NIP Pegawai ASN</th>
                                <th class="px-4 py-3 font-bold uppercase min-w-[180px]">Instansi / OPD</th>
                                <th class="px-4 py-3 text-center font-bold uppercase min-w-[140px] whitespace-nowrap">Waktu Scan</th>
                                <th class="px-4 py-3 text-center font-bold uppercase min-w-[150px] whitespace-nowrap">Status Presensi</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-border/40">
                            <tr
                                v-for="(p, index) in filteredParticipants"
                                :key="p.id"
                                class="transition-colors hover:bg-muted/30"
                            >
                                <td class="px-4 py-3 text-center font-mono font-bold text-muted-foreground">
                                    {{ index + 1 }}
                                </td>
                                <td class="px-4 py-3">
                                    <p class="font-bold text-foreground">{{ p.user_name }}</p>
                                    <p class="font-mono text-[11px] text-muted-foreground">NIP. {{ p.nip }}</p>
                                </td>
                                <td class="px-4 py-3 text-muted-foreground">
                                    {{ p.opd }}
                                </td>
                                <td class="px-4 py-3 text-center font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
                                    {{ p.waktu_presensi }}
                                </td>
                                <td class="px-4 py-3 text-center whitespace-nowrap">
                                    <Badge variant="outline" class="rounded-none border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] text-emerald-600 dark:text-emerald-400">
                                        <CheckCircle2 class="mr-1 h-3 w-3 shrink-0" />
                                        {{ p.keterangan || 'Hadir Tepat Waktu' }}
                                    </Badge>
                                </td>
                            </tr>
                            <tr v-if="!filteredParticipants.length">
                                <td colspan="5" class="py-8 text-center text-xs text-muted-foreground">
                                    Belum ada data ASN yang tercatat hadir pada kegiatan ini.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="mt-4 flex justify-end">
                    <Button
                        variant="outline"
                        @click="showParticipantsModal = false"
                        class="h-9 rounded-none text-xs font-bold uppercase"
                    >
                        Tutup
                    </Button>
                </div>
            </DialogContent>
        </Dialog>

        <!-- Dialog Fullscreen QR Code Display -->
        <Dialog :open="!!activeQrModal" @update:open="activeQrModal = null">
            <DialogContent
                class="max-w-lg rounded-none border-border bg-card p-8 text-center shadow-2xl"
            >
                <div v-if="activeQrModal" class="space-y-4">
                    <Badge
                        class="border-emerald-500/30 bg-emerald-500/10 text-xs text-emerald-600 uppercase dark:text-emerald-400"
                    >
                        Presensi Apel & Upacara Aktif
                    </Badge>
                    <h2 class="text-xl font-extrabold text-foreground">
                        {{ activeQrModal.nama_kegiatan }}
                    </h2>
                    <p class="text-xs text-muted-foreground">
                        {{ activeQrModal.lokasi }} |
                        {{ formatTanggal(activeQrModal.tanggal) }} ({{
                            activeQrModal.jam_mulai
                        }}
                        - {{ activeQrModal.jam_selesai }} WITA)
                    </p>

                    <div
                        class="mx-auto my-4 flex flex-col items-center justify-center rounded-xl border-4 border-emerald-500 bg-white p-6 shadow-2xl"
                    >
                        <!-- Real 2D QR Code Image Generator -->
                        <img
                            :src="`https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=10&data=${encodeURIComponent(activeQrModal.qr_token)}`"
                            alt="QR Code Presensi Event"
                            class="h-64 w-64 bg-white p-2"
                        />

                        <!-- Token Text Code -->
                        <div
                            class="mt-4 rounded-md border border-slate-200 bg-slate-50 px-4 py-2 font-mono text-lg font-black tracking-widest text-slate-900 select-all"
                        >
                            {{ activeQrModal.qr_token }}
                        </div>
                        <p
                            class="mt-2 font-sans text-[11px] font-bold tracking-wider text-slate-500 uppercase"
                        >
                            Pindai QR ini atau masukkan Kode Token via SIMPATI
                            Mobile
                        </p>
                    </div>

                    <p class="text-xs text-muted-foreground">
                        Tampilkan layar ini di Proyektor / TV Layar Besar saat
                        Apel berlangsung.
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    </AdminLayout>
</template>
