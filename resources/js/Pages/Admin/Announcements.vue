<script setup lang="ts">
import { ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Megaphone, Plus, Edit3, Trash2, Pin } from '@lucide/vue';

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
        form.put(`/admin/announcements/${form.id}`, { onSuccess: () => resetForm() });
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
    <AdminLayout title="Broadcast Edaran" subtitle="Pengumuman Resmi untuk Seluruh Pegawai ASN">
        <template #actions>
            <Button
                @click="showForm = true"
                class="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-semibold shadow-md shadow-teal-600/20 rounded-xl cursor-pointer"
            >
                <Plus class="w-4 h-4 mr-2" />
                <span>Buat Broadcast Baru</span>
            </Button>
        </template>

        <!-- Announcements Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card
                v-for="ann in announcements"
                :key="ann.id"
                class="border-border/60 shadow-md backdrop-blur-xl bg-card/95 flex flex-col justify-between"
            >
                <CardHeader class="pb-3">
                    <div class="flex items-start justify-between gap-3">
                        <div class="flex items-center gap-2">
                            <Badge
                                v-if="ann.pinned"
                                variant="default"
                                class="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 text-[10px] uppercase font-bold"
                            >
                                <Pin class="w-3 h-3 mr-1" />
                                Pinned
                            </Badge>
                            <span class="text-xs font-mono text-muted-foreground">{{ ann.created_at || 'Terbaru' }}</span>
                        </div>
                        <div class="flex items-center gap-1">
                            <Button
                                variant="ghost"
                                size="sm"
                                @click="editAnnouncement(ann)"
                                class="h-7 w-7 p-0 text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer"
                                title="Edit Pengumuman"
                            >
                                <Edit3 class="w-3.5 h-3.5" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                @click="deleteAnnouncement(ann.id)"
                                class="h-7 w-7 p-0 text-rose-500 hover:bg-rose-500/10 cursor-pointer"
                                title="Hapus Pengumuman"
                            >
                                <Trash2 class="w-3.5 h-3.5" />
                            </Button>
                        </div>
                    </div>
                    <CardTitle class="text-base font-bold tracking-tight text-foreground mt-2">
                        {{ ann.judul }}
                    </CardTitle>
                </CardHeader>
                <CardContent class="pt-0">
                    <p class="text-xs text-muted-foreground whitespace-pre-line leading-relaxed">
                        {{ ann.isi }}
                    </p>
                </CardContent>
            </Card>

            <div v-if="!announcements.length" class="col-span-full text-center text-muted-foreground py-12 space-y-2">
                <Megaphone class="w-8 h-8 mx-auto text-muted-foreground/50" />
                <p>Belum ada edaran pengumuman publik yang dipublikasikan.</p>
            </div>
        </div>

        <!-- Shadcn Dialog Form Announcement -->
        <Dialog v-model:open="showForm">
            <DialogContent class="sm:max-w-lg bg-card/95 border-border/80 backdrop-blur-2xl">
                <DialogHeader>
                    <DialogTitle class="text-base font-bold flex items-center gap-2">
                        <Megaphone class="w-4 h-4 text-teal-600 dark:text-teal-400" />
                        <span>{{ form.id ? 'Edit Broadcast Edaran' : 'Buat Broadcast Edaran Baru' }}</span>
                    </DialogTitle>
                </DialogHeader>

                <form @submit.prevent="submitForm" class="space-y-4 pt-2">
                    <div class="space-y-1.5">
                        <Label for="judul" class="text-xs">Judul Pengumuman</Label>
                        <Input id="judul" v-model="form.judul" required placeholder="Contoh: Edaran Jam Kerja Ramadan 1447H" class="h-9 text-xs" />
                    </div>

                    <div class="space-y-1.5">
                        <Label for="isi" class="text-xs">Isi Lengkap Edaran</Label>
                        <textarea
                            id="isi"
                            v-model="form.isi"
                            required
                            rows="5"
                            placeholder="Tuliskan detail pengumuman untuk seluruh ASN..."
                            class="w-full p-3 bg-background border border-input rounded-md text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none"
                        ></textarea>
                    </div>

                    <div class="flex items-center gap-2 pt-1">
                        <Checkbox
                            id="pinned"
                            :checked="form.pinned"
                            @update:checked="form.pinned = $event"
                        />
                        <Label for="pinned" class="text-xs cursor-pointer">Sematkan di Atas (Pin Announcement)</Label>
                    </div>

                    <div class="flex items-center justify-end gap-2 pt-3 border-t border-border">
                        <Button type="button" variant="outline" size="sm" @click="resetForm" class="cursor-pointer">
                            Batal
                        </Button>
                        <Button type="submit" size="sm" class="bg-teal-600 hover:bg-teal-700 text-white cursor-pointer">
                            {{ form.id ? 'Simpan Perubahan' : 'Siarkan Edaran' }}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    </AdminLayout>
</template>
