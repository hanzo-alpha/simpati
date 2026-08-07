<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import {
    FileText,
    Plus,
    Clock,
    CheckCircle2,
    XCircle,
    AlertCircle,
    Paperclip,
    Download,
} from '@lucide/vue';
import { ref, computed } from 'vue';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/Components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/Components/ui/dialog';
import AppLayout from '@/Layouts/AppLayout.vue';

interface LeaveItem {
    id: number;
    type: string;
    type_label?: string;
    tanggal_mulai: string;
    tanggal_selesai: string;
    alasan: string;
    lampiran_url?: string | null;
    status: 'menunggu' | 'disetujui' | 'ditolak' | string;
    status_label?: string;
    duration?: number;
}

const props = withDefaults(
    defineProps<{
        requests?: LeaveItem[];
    }>(),
    {
        requests: () => [],
    },
);

const activeFilter = ref('all');
const showPreviewModal = ref(false);
const previewUrl = ref('');
const previewFileType = ref<'image' | 'pdf'>('image');

const openPreview = (url: string) => {
    previewUrl.value = url;

    if (url.toLowerCase().endsWith('.pdf')) {
        previewFileType.value = 'pdf';
    } else {
        previewFileType.value = 'image';
    }

    showPreviewModal.value = true;
};

const filterTabs = [
    { label: 'Semua', value: 'all' },
    { label: 'Pending', value: 'menunggu' },
    { label: 'Disetujui', value: 'disetujui' },
    { label: 'Ditolak', value: 'ditolak' },
];

const filteredRequests = computed(() => {
    if (activeFilter.value === 'all') {
        return props.requests;
    }

    return props.requests.filter((r) => r.status === activeFilter.value);
});

const summary = computed(() => {
    const s = {
        total: props.requests.length,
        menunggu: 0,
        disetujui: 0,
        ditolak: 0,
    };
    props.requests.forEach((r) => {
        if (r.status === 'menunggu') {
            s.menunggu++;
        }

        if (r.status === 'disetujui') {
            s.disetujui++;
        }

        if (r.status === 'ditolak') {
            s.ditolak++;
        }
    });

    return s;
});
</script>

<template>
    <AppLayout>
        <div class="mx-auto max-w-2xl space-y-6 pb-8">
            <!-- Header Card -->
            <Card
                class="border-border/60 bg-card/95 shadow-md backdrop-blur-xl"
            >
                <CardHeader
                    class="flex-row items-center justify-between space-y-0 pb-3"
                >
                    <div>
                        <CardTitle
                            class="flex items-center gap-2 text-xl font-extrabold"
                        >
                            <FileText
                                class="h-5 w-5 text-teal-600 dark:text-teal-400"
                            />
                            <span>Riwayat Pengajuan Izin</span>
                        </CardTitle>
                        <p class="mt-0.5 text-xs text-muted-foreground">
                            Daftar permohonan izin/cuti ASN
                        </p>
                    </div>

                    <Link href="/pengajuan/buat">
                        <Button
                            class="cursor-pointer rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-xs font-semibold text-white shadow-md shadow-teal-600/20 hover:from-teal-700 hover:to-emerald-700"
                        >
                            <Plus class="mr-1 h-4 w-4" />
                            <span>Buat Baru</span>
                        </Button>
                    </Link>
                </CardHeader>

                <CardContent class="mt-2 border-t border-border/40 pt-0">
                    <div
                        class="flex items-center justify-around pt-3 text-xs font-semibold text-muted-foreground"
                    >
                        <span>Total: {{ summary.total }}</span>
                        <span class="text-amber-600 dark:text-amber-400"
                            >Pending: {{ summary.menunggu }}</span
                        >
                        <span class="text-emerald-600 dark:text-emerald-400"
                            >Disetujui: {{ summary.disetujui }}</span
                        >
                        <span class="text-rose-600 dark:text-rose-400"
                            >Ditolak: {{ summary.ditolak }}</span
                        >
                    </div>
                </CardContent>
            </Card>

            <!-- Filter Tabs -->
            <div class="flex items-center gap-2 overflow-x-auto">
                <button
                    v-for="tab in filterTabs"
                    :key="tab.value"
                    @click="activeFilter = tab.value"
                    class="cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-all"
                    :class="
                        activeFilter === tab.value
                            ? 'border border-teal-500/30 bg-teal-500/15 text-teal-600 shadow-xs dark:text-teal-400'
                            : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    "
                >
                    {{ tab.label }}
                </button>
            </div>

            <!-- Requests List -->
            <div class="space-y-3">
                <div
                    v-if="!filteredRequests.length"
                    class="py-12 text-center text-muted-foreground"
                >
                    <AlertCircle
                        class="mx-auto h-8 w-8 text-muted-foreground/50"
                    />
                    <p class="mt-2 text-xs">
                        Belum ada data riwayat permohonan.
                    </p>
                </div>

                <Card
                    v-for="req in filteredRequests"
                    :key="req.id"
                    class="border-border/60 bg-card/95 shadow-xs transition-all hover:shadow-md"
                >
                    <CardContent class="space-y-2 p-4">
                        <div class="flex items-center justify-between">
                            <Badge
                                :variant="
                                    req.status === 'disetujui'
                                        ? 'default'
                                        : 'outline'
                                "
                                class="rounded-lg text-[10px] font-bold uppercase"
                                :class="{
                                    'border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400':
                                        req.status === 'menunggu',
                                    'border-rose-500/30 bg-rose-500/10 text-rose-500':
                                        req.status === 'ditolak',
                                    'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400':
                                        req.status === 'disetujui',
                                }"
                            >
                                {{ req.status_label || req.status }}
                            </Badge>

                            <div class="flex items-center gap-2">
                                <Badge
                                    variant="outline"
                                    class="rounded-lg text-[10px] font-semibold uppercase"
                                >
                                    {{ req.type_label || req.type }}
                                </Badge>
                            </div>
                        </div>

                        <div>
                            <p class="text-xs font-bold text-foreground">
                                {{ req.tanggal_mulai }} —
                                {{ req.tanggal_selesai }}
                                <span
                                    v-if="req.duration"
                                    class="ml-1 text-emerald-600 dark:text-emerald-400"
                                >
                                    ({{ req.duration }} Hari)
                                </span>
                            </p>
                            <p class="mt-1 text-xs text-muted-foreground">
                                Alasan: {{ req.alasan }}
                            </p>
                        </div>

                        <div
                            v-if="req.lampiran_url"
                            class="flex items-center justify-between border-t border-border/40 pt-2"
                        >
                            <span
                                class="flex items-center gap-1 text-[11px] text-muted-foreground"
                            >
                                <Paperclip
                                    class="h-3.5 w-3.5 text-teal-600 dark:text-teal-400"
                                />
                                <span>Lampiran Dokumen</span>
                            </span>
                            <Button
                                variant="outline"
                                size="sm"
                                @click="openPreview(req.lampiran_url)"
                                class="h-7 rounded-lg border-teal-500/30 bg-teal-500/10 text-[10px] font-bold text-teal-600 hover:bg-teal-500/20 dark:text-teal-400"
                            >
                                Lihat Berkas
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>

        <!-- Preview Modal Lampiran PDF / Image -->
        <Dialog v-model:open="showPreviewModal">
            <DialogContent
                class="rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-xl sm:max-w-3xl"
            >
                <DialogHeader
                    class="flex flex-row items-center justify-between border-b border-border/60 pb-3"
                >
                    <DialogTitle
                        class="flex items-center gap-2 text-base font-bold text-foreground"
                    >
                        <Paperclip
                            class="h-4 w-4 text-teal-600 dark:text-teal-400"
                        />
                        <span>Preview Lampiran Dokumen</span>
                    </DialogTitle>
                </DialogHeader>

                <div class="py-4">
                    <iframe
                        v-if="previewFileType === 'pdf'"
                        :src="previewUrl"
                        class="h-[500px] w-full rounded-xl border border-border bg-background"
                    ></iframe>
                    <div
                        v-else
                        class="flex max-h-[500px] items-center justify-center overflow-auto rounded-xl border border-border bg-muted/20 p-2"
                    >
                        <img
                            :src="previewUrl"
                            alt="Lampiran"
                            class="max-h-[470px] w-auto object-contain"
                        />
                    </div>
                </div>

                <div
                    class="flex items-center justify-between border-t border-border pt-4"
                >
                    <a
                        :href="previewUrl"
                        target="_blank"
                        download
                        class="inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 hover:underline dark:text-teal-400"
                    >
                        <Download class="h-4 w-4" />
                        <span>Unduh Dokumen</span>
                    </a>
                    <Button
                        variant="outline"
                        @click="showPreviewModal = false"
                        class="h-9 rounded-xl text-xs font-semibold"
                    >
                        Tutup
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    </AppLayout>
</template>
