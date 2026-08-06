<script setup lang="ts">
import { useForm } from '@inertiajs/vue3';
import { Megaphone, Plus, Edit3, Trash2, Pin } from '@lucide/vue';
import { ref } from 'vue';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/Components/ui/card';
import { Checkbox } from '@/Components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/Components/ui/dialog';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import AdminLayout from '@/Layouts/AdminLayout.vue';

interface AnnouncementItem {
    id: number;
    judul: string;
    isi: string;
    pinned: boolean;
    created_at?: string;
}

const props = defineProps<{
    announcements: AnnouncementItem[];
}>();

const showForm = ref(false);

const form = useForm({
    id: null as number | null,
    judul: '',
    isi: '',
    pinned: false,
});

const editAnnouncement = (ann: AnnouncementItem) => {
    form.id = ann.id;
    form.judul = ann.judul;
    form.isi = ann.isi;
    form.pinned = Boolean(ann.pinned);
    showForm.value = true;
};

const resetForm = () => {
    form.reset();
    form.id = null;
    showForm.value = false;
};

const submitForm = () => {
    if (form.id) {
        form.put(`/admin/announcements/${form.id}`, {
            onSuccess: () => resetForm(),
        });
    } else {
        form.post('/admin/announcements', { onSuccess: () => resetForm() });
    }
};

const deleteAnnouncement = (id: number) => {
    if (confirm('Yakin hapus pengumuman ini?')) {
        useForm({}).delete(`/admin/announcements/${id}`);
    }
};
</script>

<template>
    <AdminLayout
        title="Broadcast Edaran"
        subtitle="Pengumuman Resmi untuk Seluruh Pegawai ASN"
    >
        <template #actions>
            <Button
                @click="showForm = true"
                class="cursor-pointer rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 font-semibold text-white shadow-md shadow-teal-600/20 hover:from-teal-700 hover:to-emerald-700"
            >
                <Plus class="mr-2 h-4 w-4" />
                <span>Buat Broadcast Baru</span>
            </Button>
        </template>

        <!-- Announcements Cards Grid -->
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card
                v-for="ann in announcements"
                :key="ann.id"
                class="flex flex-col justify-between border-border/60 bg-card/95 shadow-md backdrop-blur-xl"
            >
                <CardHeader class="pb-3">
                    <div class="flex items-start justify-between gap-3">
                        <div class="flex items-center gap-2">
                            <Badge
                                v-if="ann.pinned"
                                variant="default"
                                class="border-amber-500/30 bg-amber-500/10 text-[10px] font-bold text-amber-600 uppercase dark:text-amber-400"
                            >
                                <Pin class="mr-1 h-3 w-3" />
                                Pinned
                            </Badge>
                            <span
                                class="font-mono text-xs text-muted-foreground"
                                >{{ ann.created_at || 'Terbaru' }}</span
                            >
                        </div>
                        <div class="flex items-center gap-1">
                            <Button
                                variant="ghost"
                                size="sm"
                                @click="editAnnouncement(ann)"
                                class="h-7 w-7 cursor-pointer p-0 text-muted-foreground hover:bg-muted hover:text-foreground"
                                title="Edit Pengumuman"
                            >
                                <Edit3 class="h-3.5 w-3.5" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                @click="deleteAnnouncement(ann.id)"
                                class="h-7 w-7 cursor-pointer p-0 text-rose-500 hover:bg-rose-500/10"
                                title="Hapus Pengumuman"
                            >
                                <Trash2 class="h-3.5 w-3.5" />
                            </Button>
                        </div>
                    </div>
                    <CardTitle
                        class="mt-2 text-base font-bold tracking-tight text-foreground"
                    >
                        {{ ann.judul }}
                    </CardTitle>
                </CardHeader>
                <CardContent class="pt-0">
                    <p
                        class="text-xs leading-relaxed whitespace-pre-line text-muted-foreground"
                    >
                        {{ ann.isi }}
                    </p>
                </CardContent>
            </Card>

            <div
                v-if="!announcements.length"
                class="col-span-full space-y-2 py-12 text-center text-muted-foreground"
            >
                <Megaphone class="mx-auto h-8 w-8 text-muted-foreground/50" />
                <p>Belum ada edaran pengumuman publik yang dipublikasikan.</p>
            </div>
        </div>

        <!-- Shadcn Dialog Form Announcement -->
        <Dialog v-model:open="showForm">
            <DialogContent
                class="border-border/80 bg-card/95 backdrop-blur-2xl sm:max-w-lg"
            >
                <DialogHeader>
                    <DialogTitle
                        class="flex items-center gap-2 text-base font-bold"
                    >
                        <Megaphone
                            class="h-4 w-4 text-teal-600 dark:text-teal-400"
                        />
                        <span>{{
                            form.id
                                ? 'Edit Broadcast Edaran'
                                : 'Buat Broadcast Edaran Baru'
                        }}</span>
                    </DialogTitle>
                </DialogHeader>

                <form @submit.prevent="submitForm" class="space-y-4 pt-2">
                    <div class="space-y-1.5">
                        <Label for="judul" class="text-xs"
                            >Judul Pengumuman</Label
                        >
                        <Input
                            id="judul"
                            v-model="form.judul"
                            required
                            placeholder="Contoh: Edaran Jam Kerja Ramadan 1447H"
                            class="h-9 text-xs"
                        />
                    </div>

                    <div class="space-y-1.5">
                        <Label for="isi" class="text-xs"
                            >Isi Lengkap Edaran</Label
                        >
                        <textarea
                            id="isi"
                            v-model="form.isi"
                            required
                            rows="5"
                            placeholder="Tuliskan detail pengumuman untuk seluruh ASN..."
                            class="w-full rounded-md border border-input bg-background p-3 text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none"
                        ></textarea>
                    </div>

                    <div class="flex items-center gap-2 pt-1">
                        <Checkbox
                            id="pinned"
                            :checked="form.pinned"
                            @update:checked="form.pinned = $event"
                        />
                        <Label for="pinned" class="cursor-pointer text-xs"
                            >Sematkan di Atas (Pin Announcement)</Label
                        >
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
                            {{
                                form.id ? 'Simpan Perubahan' : 'Siarkan Edaran'
                            }}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    </AdminLayout>
</template>
