<script setup lang="ts">
import { useForm } from '@inertiajs/vue3';
import { QrCode, Plus, Calendar, MapPin, Users, Clock } from '@lucide/vue';
import { ref } from 'vue';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/Components/ui/card';
import { Dialog, DialogContent } from '@/Components/ui/dialog';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import AdminLayout from '@/Layouts/AdminLayout.vue';

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
}

const props = defineProps<{
    events: EventItem[];
}>();

const showForm = ref(false);
const activeQrModal = ref<EventItem | null>(null);

const form = useForm({
    nama_kegiatan: '',
    penyelenggara: 'Pemerintah Kabupaten Soppeng',
    tanggal: new Date().toISOString().split('T')[0],
    jam_mulai: '07:00',
    jam_selesai: '09:00',
    lokasi: 'Halaman Kantor Bupati Soppeng',
});

const submitForm = () => {
    form.post('/admin/events', {
        onSuccess: () => {
            form.reset();
            showForm.value = false;
        },
    });
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
                class="flex flex-col justify-between rounded-none border border-border bg-card text-card-foreground shadow-xs"
            >
                <div>
                    <CardHeader class="border-b border-border pb-3">
                        <div class="flex items-center justify-between">
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
                            <span
                                class="font-mono text-xs font-bold text-muted-foreground"
                            >
                                {{ item.participants_count || 0 }} ASN Hadir
                            </span>
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
                                >{{ item.tanggal }} ({{ item.jam_mulai }} -
                                {{ item.jam_selesai }} WITA)</span
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
                            class="mt-3 border border-dashed border-emerald-500/40 bg-emerald-500/5 p-3 text-center"
                        >
                            <div
                                class="font-mono text-[11px] text-muted-foreground"
                            >
                                KODE TOKEN PRESET
                            </div>
                            <div
                                class="font-mono text-base font-black tracking-widest text-emerald-600 dark:text-emerald-400"
                            >
                                {{ item.qr_token }}
                            </div>
                        </div>
                    </CardContent>
                </div>

                <div class="border-t border-border p-3">
                    <Button
                        variant="outline"
                        size="sm"
                        @click="activeQrModal = item"
                        class="w-full cursor-pointer rounded-none text-xs font-bold uppercase"
                    >
                        <QrCode class="mr-1.5 h-3.5 w-3.5" />
                        Tampilkan Layar QR Presensi
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

        <!-- Dialog Fullscreen QR Code Display -->
        <Dialog :open="!!activeQrModal" @update:open="activeQrModal = null">
            <DialogContent
                class="max-w-lg rounded-none border-border bg-card p-8 text-center"
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
                        {{ activeQrModal.lokasi }} | {{ activeQrModal.tanggal }}
                    </p>

                    <div
                        class="mx-auto my-6 inline-block border-4 border-emerald-500 bg-white p-6 shadow-lg"
                    >
                        <!-- Big QR Display -->
                        <div
                            class="font-mono text-2xl font-black tracking-widest break-all text-slate-900 select-all"
                        >
                            {{ activeQrModal.qr_token }}
                        </div>
                        <p
                            class="mt-2 font-sans text-[10px] font-bold text-slate-500 uppercase"
                        >
                            Pindai QR ini melalui aplikasi SIMPATI Mobile
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
