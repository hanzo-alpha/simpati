<script setup lang="ts">
import { useForm, Link } from '@inertiajs/vue3';
import {
    FileText,
    ArrowLeft,
    Calendar,
    Loader2,
    CheckCircle2,
    Paperclip,
    X,
    FileCheck,
} from '@lucide/vue';
import { ref, computed } from 'vue';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import AppLayout from '@/Layouts/AppLayout.vue';

const props = defineProps<{
    sisaCuti?: number;
}>();

const form = useForm({
    type: 'cuti',
    tanggal_mulai: '',
    tanggal_selesai: '',
    alasan: '',
    lampiran: null as File | null,
});

const filePreviewName = ref('');
const filePreviewSize = ref('');

const leaveTypes = [
    { value: 'cuti', label: 'Cuti Tahunan', icon: '🏖️' },
    { value: 'sakit', label: 'Izin Sakit', icon: '🏥' },
    { value: 'dinas_luar', label: 'Dinas Luar', icon: '🚘' },
    { value: 'dinas_dalam', label: 'Dinas Dalam', icon: '🏢' },
];

const duration = computed(() => {
    if (!form.tanggal_mulai || !form.tanggal_selesai) {
        return 0;
    }

    const start = new Date(form.tanggal_mulai);
    const end = new Date(form.tanggal_selesai);
    const diffTime = Math.abs(end.getTime() - start.getTime());

    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
});

const handleFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement;

    if (target.files && target.files[0]) {
        const file = target.files[0];
        form.lampiran = file;
        filePreviewName.value = file.name;
        filePreviewSize.value = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
    }
};

const clearFile = () => {
    form.lampiran = null;
    filePreviewName.value = '';
    filePreviewSize.value = '';
};

const submit = () => {
    form.post('/leave-requests');
};
</script>

<template>
    <AppLayout>
        <div class="mx-auto max-w-xl space-y-6 pb-8">
            <!-- Header Card -->
            <Card
                class="border-border/60 bg-card/95 shadow-md backdrop-blur-xl"
            >
                <CardHeader class="flex-row items-center gap-3 space-y-0 pb-3">
                    <Link href="/pengajuan">
                        <Button
                            variant="outline"
                            size="icon"
                            class="h-9 w-9 cursor-pointer rounded-xl"
                        >
                            <ArrowLeft class="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <CardTitle
                            class="flex items-center gap-2 text-xl font-extrabold"
                        >
                            <FileText
                                class="h-5 w-5 text-teal-600 dark:text-teal-400"
                            />
                            <span>Pengajuan Izin / Cuti Baru</span>
                        </CardTitle>
                        <p class="mt-0.5 text-xs text-muted-foreground">
                            Formulir permohonan ke atasan OPD
                        </p>
                    </div>
                </CardHeader>
            </Card>

            <!-- Type Selector Grid -->
            <Card
                class="border-border/60 bg-card/95 shadow-md backdrop-blur-xl"
            >
                <CardHeader class="pb-3">
                    <CardTitle
                        class="text-xs font-bold tracking-wider text-muted-foreground uppercase"
                    >
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
                            class="cursor-pointer rounded-xl border p-4 text-center transition-all"
                            :class="
                                form.type === type.value
                                    ? 'border-teal-500/50 bg-teal-500/15 shadow-md ring-2 shadow-teal-500/10 ring-teal-500/20'
                                    : 'border-border bg-card hover:border-teal-500/40'
                            "
                        >
                            <span class="text-2xl">{{ type.icon }}</span>
                            <p class="mt-1 text-xs font-bold text-foreground">
                                {{ type.label }}
                            </p>
                        </button>
                    </div>
                </CardContent>
            </Card>

            <!-- Form Card -->
            <Card
                class="border-border/60 bg-card/95 shadow-md backdrop-blur-xl"
            >
                <CardContent class="space-y-4 p-5">
                    <div
                        v-if="form.type === 'cuti'"
                        class="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs font-semibold text-emerald-600 dark:text-emerald-400"
                    >
                        <CheckCircle2 class="h-4 w-4 shrink-0" />
                        <span
                            >Sisa Cuti Tahunan Anda:
                            {{ sisaCuti || 12 }} Hari</span
                        >
                    </div>

                    <form @submit.prevent="submit" class="space-y-4">
                        <div class="grid grid-cols-2 gap-3">
                            <div class="space-y-1.5">
                                <Label for="tanggal_mulai" class="text-xs"
                                    >Tanggal Mulai</Label
                                >
                                <Input
                                    id="tanggal_mulai"
                                    v-model="form.tanggal_mulai"
                                    type="date"
                                    required
                                    class="h-9 text-xs"
                                />
                            </div>
                            <div class="space-y-1.5">
                                <Label for="tanggal_selesai" class="text-xs"
                                    >Tanggal Selesai</Label
                                >
                                <Input
                                    id="tanggal_selesai"
                                    v-model="form.tanggal_selesai"
                                    type="date"
                                    required
                                    class="h-9 text-xs"
                                />
                            </div>
                        </div>

                        <div v-if="duration > 0" class="text-center">
                            <Badge
                                variant="outline"
                                class="border-teal-500/30 bg-teal-500/15 px-3 py-1 text-xs font-bold text-teal-600 dark:text-teal-400"
                            >
                                Durasi Pengajuan: {{ duration }} Hari
                            </Badge>
                        </div>

                        <div class="space-y-1.5">
                            <Label for="alasan" class="text-xs"
                                >Alasan Lengkap Permohonan</Label
                            >
                            <textarea
                                id="alasan"
                                v-model="form.alasan"
                                required
                                rows="3"
                                placeholder="Jelaskan alasan permohonan izin/cuti..."
                                class="w-full rounded-xl border border-input bg-background p-3 text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none"
                            ></textarea>
                        </div>

                        <div class="space-y-1.5">
                            <Label for="lampiran" class="text-xs"
                                >Lampiran Surat Tugas / Bukti (PDF / JPG /
                                PNG)</Label
                            >
                            <Input
                                id="lampiran"
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                @change="handleFileChange"
                                class="h-9 text-xs"
                            />

                            <!-- Live File Selected Preview Badge -->
                            <div
                                v-if="filePreviewName"
                                class="mt-2 flex items-center justify-between rounded-xl border border-teal-500/30 bg-teal-500/10 p-2.5 text-xs text-teal-700 dark:text-teal-300"
                            >
                                <div class="flex items-center gap-2 truncate">
                                    <FileCheck
                                        class="h-4 w-4 shrink-0 text-teal-600 dark:text-teal-400"
                                    />
                                    <span class="truncate font-semibold">{{
                                        filePreviewName
                                    }}</span>
                                    <span class="text-[10px] opacity-75"
                                        >({{ filePreviewSize }})</span
                                    >
                                </div>
                                <button
                                    type="button"
                                    @click="clearFile"
                                    class="ml-2 cursor-pointer text-rose-500 hover:text-rose-700"
                                >
                                    <X class="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            :disabled="form.processing"
                            class="mt-2 h-11 w-full cursor-pointer rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 font-semibold text-white shadow-md shadow-teal-600/20 hover:from-teal-700 hover:to-emerald-700"
                        >
                            <Loader2
                                v-if="form.processing"
                                class="mr-2 h-4 w-4 animate-spin"
                            />
                            <span v-if="!form.processing"
                                >Kirim Permohonan Izin</span
                            >
                            <span v-else>Mengirim...</span>
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>
