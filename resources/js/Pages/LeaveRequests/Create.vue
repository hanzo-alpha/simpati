<script setup lang="ts">
import { ref, computed } from 'vue';
import { useForm, Link } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { FileText, ArrowLeft, Calendar, Loader2, CheckCircle2 } from '@lucide/vue';

const props = defineProps<{
    sisaCuti?: number;
}>();

const form = useForm({
    type: 'cuti',
    tanggal_mulai: '',
    tanggal_selesai: '',
    alasan: '',
    surat_tugas: null as File | null,
});

const leaveTypes = [
    { value: 'cuti', label: 'Cuti Tahunan', icon: '🏖️' },
    { value: 'sakit', label: 'Izin Sakit', icon: '🏥' },
    { value: 'dinas_luar', label: 'Dinas Luar', icon: '🚘' },
    { value: 'dinas_dalam', label: 'Dinas Dalam', icon: '🏢' },
];

const duration = computed(() => {
    if (!form.tanggal_mulai || !form.tanggal_selesai) return 0;
    const start = new Date(form.tanggal_mulai);
    const end = new Date(form.tanggal_selesai);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
});

const handleFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
        form.surat_tugas = target.files[0];
    }
};

const submit = () => {
    form.post('/leave-requests');
};
</script>

<template>
    <AppLayout>
        <div class="max-w-xl mx-auto space-y-6 pb-8">
            <!-- Header Card -->
            <Card class="border-border/60 shadow-md backdrop-blur-xl bg-card/95">
                <CardHeader class="pb-3 flex-row items-center gap-3 space-y-0">
                    <Link href="/leave-requests">
                        <Button variant="outline" size="icon" class="h-9 w-9 rounded-xl cursor-pointer">
                            <ArrowLeft class="w-4 h-4" />
                        </Button>
                    </Link>
                    <div>
                        <CardTitle class="text-xl font-extrabold flex items-center gap-2">
                            <FileText class="w-5 h-5 text-teal-600 dark:text-teal-400" />
                            <span>Pengajuan Izin / Cuti Baru</span>
                        </CardTitle>
                        <p class="text-xs text-muted-foreground mt-0.5">Formulir permohonan ke atasan OPD</p>
                    </div>
                </CardHeader>
            </Card>

            <!-- Type Selector Grid -->
            <Card class="border-border/60 shadow-md backdrop-blur-xl bg-card/95">
                <CardHeader class="pb-3">
                    <CardTitle class="text-xs uppercase tracking-wider text-muted-foreground font-bold">
                        Pilih Kategori Permohonan
                    </CardTitle>
                </CardHeader>
                <CardContent class="pt-0">
                    <div class="grid grid-cols-2 gap-3">
                        <button
                            v-for="type in leaveTypes"
                            :key="type.value"
                            type="button"
                            @click="form.type = type.value"
                            class="p-4 rounded-xl border text-center transition-all cursor-pointer"
                            :class="
                                form.type === type.value
                                    ? 'bg-teal-500/15 border-teal-500/50 shadow-md shadow-teal-500/10 ring-2 ring-teal-500/20'
                                    : 'bg-card border-border hover:border-teal-500/40'
                            "
                        >
                            <span class="text-2xl">{{ type.icon }}</span>
                            <p class="text-xs font-bold text-foreground mt-1">{{ type.label }}</p>
                        </button>
                    </div>
                </CardContent>
            </Card>

            <!-- Form Card -->
            <Card class="border-border/60 shadow-md backdrop-blur-xl bg-card/95">
                <CardContent class="p-5 space-y-4">
                    <div v-if="form.type === 'cuti'" class="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2">
                        <CheckCircle2 class="w-4 h-4 shrink-0" />
                        <span>Sisa Cuti Tahunan Anda: {{ sisaCuti || 12 }} Hari</span>
                    </div>

                    <form @submit.prevent="submit" class="space-y-4">
                        <div class="grid grid-cols-2 gap-3">
                            <div class="space-y-1.5">
                                <Label for="tanggal_mulai" class="text-xs">Tanggal Mulai</Label>
                                <Input id="tanggal_mulai" v-model="form.tanggal_mulai" type="date" required class="h-9 text-xs" />
                            </div>
                            <div class="space-y-1.5">
                                <Label for="tanggal_selesai" class="text-xs">Tanggal Selesai</Label>
                                <Input id="tanggal_selesai" v-model="form.tanggal_selesai" type="date" required class="h-9 text-xs" />
                            </div>
                        </div>

                        <div v-if="duration > 0" class="text-center">
                            <Badge variant="outline" class="bg-teal-500/15 text-teal-600 dark:text-teal-400 border-teal-500/30 font-bold text-xs px-3 py-1">
                                Durasi Pengajuan: {{ duration }} Hari
                            </Badge>
                        </div>

                        <div class="space-y-1.5">
                            <Label for="alasan" class="text-xs">Alasan Lengkap Permohonan</Label>
                            <textarea
                                id="alasan"
                                v-model="form.alasan"
                                required
                                rows="3"
                                placeholder="Jelaskan alasan permohonan izin/cuti..."
                                class="w-full p-3 bg-background border border-input rounded-md text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none"
                            ></textarea>
                        </div>

                        <div class="space-y-1.5">
                            <Label for="surat_tugas" class="text-xs">Lampiran Surat Tugas / Bukti (PDF / Image)</Label>
                            <Input id="surat_tugas" type="file" @change="handleFileChange" class="h-9 text-xs" />
                        </div>

                        <Button
                            type="submit"
                            :disabled="form.processing"
                            class="w-full h-11 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-semibold shadow-md shadow-teal-600/20 rounded-xl cursor-pointer mt-2"
                        >
                            <Loader2 v-if="form.processing" class="w-4 h-4 mr-2 animate-spin" />
                            <span v-if="!form.processing">Kirim Permohonan Izin</span>
                            <span v-else>Mengirim...</span>
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>
