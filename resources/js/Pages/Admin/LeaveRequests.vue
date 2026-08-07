<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import {
    FileText,
    Check,
    X,
    Clock,
    Calendar,
    CheckCircle2,
    AlertCircle,
    Search,
    Paperclip,
    Eye,
    ExternalLink,
    Download,
} from '@lucide/vue';
import { ref, computed } from 'vue';
import Pagination from '@/Components/Pagination.vue';
import { useConfirm } from '@/composables/useConfirm';
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
import AdminLayout from '@/Layouts/AdminLayout.vue';

interface Office {
    opd_name?: string;
}

interface User {
    name?: string;
    office?: Office;
    sisa_cuti_tahunan?: number;
}

interface LeaveRequestItem {
    id: number;
    user?: User;
    type: string;
    type_label: string;
    tanggal_mulai: string;
    tanggal_selesai: string;
    alasan: string;
    lampiran_url?: string | null;
    duration?: number;
    status: 'menunggu' | 'disetujui' | 'ditolak' | string;
    status_label: string;
}

const props = withDefaults(
    defineProps<{
        requests?: LeaveRequestItem[];
    }>(),
    {
        requests: () => [],
    },
);

const activeStatus = ref('all');
const searchQuery = ref('');
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

const statusFilters = computed(() => {
    const counts = { menunggu: 0, disetujui: 0, ditolak: 0 };
    props.requests.forEach((r) => {
        if (counts[r.status as keyof typeof counts] !== undefined) {
            counts[r.status as keyof typeof counts]++;
        }
    });

    return [
        { label: 'Semua', value: 'all', count: props.requests.length },
        { label: 'Pending', value: 'menunggu', count: counts.menunggu },
        { label: 'Disetujui', value: 'disetujui', count: counts.disetujui },
        { label: 'Ditolak', value: 'ditolak', count: counts.ditolak },
    ];
});

const filteredRequests = computed(() => {
    let list = props.requests;

    if (activeStatus.value !== 'all') {
        list = list.filter((r) => r.status === activeStatus.value);
    }

    if (searchQuery.value.trim()) {
        const q = searchQuery.value.toLowerCase();
        list = list.filter(
            (r) =>
                (r.user?.name && r.user.name.toLowerCase().includes(q)) ||
                (r.user?.office?.opd_name &&
                    r.user.office.opd_name.toLowerCase().includes(q)) ||
                (r.alasan && r.alasan.toLowerCase().includes(q)) ||
                (r.type_label && r.type_label.toLowerCase().includes(q)),
        );
    }

    return list;
});

const currentPage = ref(1);
const itemsPerPage = 10;

const paginatedRequests = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;

    return filteredRequests.value.slice(start, start + itemsPerPage);
});

const { confirm: confirmAction } = useConfirm();

const updateStatus = async (id: number, status: string) => {
    const isApprove = status === 'disetujui';
    const isOk = await confirmAction({
        title: isApprove ? 'Setujui Permohonan Izin / Cuti' : 'Tolak Permohonan Izin / Cuti',
        description: isApprove
            ? 'Apakah Anda yakin ingin menyetujui permohonan izin/cuti ini?'
            : 'Apakah Anda yakin ingin menolak permohonan izin/cuti ini?',
        confirmText: isApprove ? 'Ya, Setujui' : 'Ya, Tolak',
        variant: isApprove ? 'success' : 'danger',
    });

    if (isOk) {
        router.put(
            `/admin/leave-requests/${id}`,
            { status },
            { preserveScroll: true },
        );
    }
};
</script>

<template>
    <AdminLayout
        title="Kelola Pengajuan Izin / Cuti"
        :subtitle="`${requests.length} total permohonan masuk`"
    >
        <!-- Search & Status Filter Toolbar Card -->
        <Card
            class="mb-6 rounded-none border border-border bg-card text-card-foreground shadow-xs"
        >
            <CardContent
                class="flex flex-col items-center justify-between gap-3 p-4 md:flex-row"
            >
                <!-- Search Box -->
                <div class="relative w-full md:w-80">
                    <Search
                        class="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                        v-model="searchQuery"
                        type="text"
                        placeholder="Cari Nama Pegawai, OPD, atau Alasan..."
                        class="h-9 rounded-none pl-9 text-xs"
                    />
                </div>

                <!-- Status Filter Tabs -->
                <div
                    class="flex w-full items-center gap-1.5 overflow-x-auto md:w-auto"
                >
                    <Button
                        v-for="sf in statusFilters"
                        :key="sf.value"
                        size="sm"
                        :variant="
                            activeStatus === sf.value ? 'default' : 'outline'
                        "
                        @click="activeStatus = sf.value"
                        class="flex h-9 cursor-pointer items-center gap-1.5 rounded-none px-3 text-[11px] font-bold tracking-wider uppercase transition-all"
                        :class="
                            activeStatus === sf.value
                                ? 'bg-primary text-primary-foreground shadow-none'
                                : 'border-border bg-background text-muted-foreground hover:text-foreground'
                        "
                    >
                        <span>{{ sf.label }}</span>
                        <span
                            class="rounded-none px-1.5 py-0.5 text-[10px] font-bold"
                            :class="
                                activeStatus === sf.value
                                    ? 'bg-primary-foreground/20 text-primary-foreground'
                                    : 'bg-muted text-muted-foreground'
                            "
                        >
                            {{ sf.count }}
                        </span>
                    </Button>
                </div>
            </CardContent>
        </Card>

        <!-- Requests Table Card -->
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
                                <th
                                    class="w-10 px-5 py-3.5 text-center font-bold"
                                >
                                    #
                                </th>
                                <th class="px-5 py-3.5 font-bold">
                                    Pegawai ASN
                                </th>
                                <th class="px-5 py-3.5 font-bold">
                                    Kategori Izin
                                </th>
                                <th class="px-5 py-3.5 font-bold">
                                    Periode Tanggal
                                </th>
                                <th class="px-5 py-3.5 font-bold">
                                    Alasan Permohonan
                                </th>
                                <th class="px-5 py-3.5 text-center font-bold">
                                    Lampiran
                                </th>
                                <th class="px-5 py-3.5 text-center font-bold">
                                    Status
                                </th>
                                <th class="px-5 py-3.5 text-center font-bold">
                                    Aksi Keputusan
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-border/40">
                            <tr
                                v-for="(req, idx) in paginatedRequests"
                                :key="req.id"
                                class="border-b border-border/40 transition-colors hover:bg-muted/30"
                            >
                                <td
                                    class="px-5 py-3.5 text-center font-mono font-bold text-muted-foreground"
                                >
                                    {{
                                        (currentPage - 1) * itemsPerPage +
                                        idx +
                                        1
                                    }}
                                </td>
                                <td class="px-5 py-3.5">
                                    <div class="font-bold text-foreground">
                                        {{ req.user?.name || '-' }}
                                    </div>
                                    <div
                                        class="flex items-center gap-2 text-[11px] text-muted-foreground"
                                    >
                                        <span>{{
                                            req.user?.office?.opd_name || '-'
                                        }}</span>
                                        <Badge
                                            v-if="req.type === 'cuti'"
                                            variant="outline"
                                            class="rounded-none border-teal-500/30 text-[9px] font-bold text-teal-600 uppercase dark:text-teal-400"
                                        >
                                            Sisa Cuti:
                                            {{
                                                req.user?.sisa_cuti_tahunan ??
                                                12
                                            }}
                                            Hari
                                        </Badge>
                                    </div>
                                </td>
                                <td class="px-5 py-3.5">
                                    <Badge
                                        variant="outline"
                                        class="rounded-none text-[10px] font-bold tracking-wider uppercase"
                                    >
                                        {{ req.type_label || req.type }}
                                    </Badge>
                                </td>
                                <td
                                    class="px-5 py-3.5 font-mono text-[11px] text-muted-foreground"
                                >
                                    <p>
                                        {{ req.tanggal_mulai }} s/d
                                        {{ req.tanggal_selesai }}
                                    </p>
                                    <p
                                        v-if="req.duration"
                                        class="mt-0.5 font-sans font-bold text-emerald-600 dark:text-emerald-400"
                                    >
                                        Durasi: {{ req.duration }} Hari
                                    </p>
                                </td>
                                <td
                                    class="max-w-xs truncate px-5 py-3.5 text-muted-foreground"
                                >
                                    {{ req.alasan }}
                                </td>
                                <td class="px-5 py-3.5 text-center">
                                    <Button
                                        v-if="req.lampiran_url"
                                        variant="outline"
                                        size="sm"
                                        @click="openPreview(req.lampiran_url)"
                                        class="h-7 rounded-none border-teal-500/30 bg-teal-500/10 text-[10px] font-bold text-teal-600 uppercase hover:bg-teal-500/20 dark:text-teal-400"
                                    >
                                        <Paperclip class="mr-1 h-3 w-3" />
                                        <span>Lihat Berkas</span>
                                    </Button>
                                    <span
                                        v-else
                                        class="text-[11px] text-muted-foreground"
                                        >-</span
                                    >
                                </td>
                                <td class="px-5 py-3.5 text-center">
                                    <Badge
                                        :variant="
                                            req.status === 'disetujui'
                                                ? 'default'
                                                : 'outline'
                                        "
                                        class="rounded-none text-[10px] font-bold tracking-wider uppercase"
                                        :class="{
                                            'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400':
                                                req.status === 'disetujui',
                                            'border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400':
                                                req.status === 'menunggu',
                                            'border-rose-500/30 bg-rose-500/10 text-rose-500':
                                                req.status === 'ditolak',
                                        }"
                                    >
                                        {{ req.status_label || req.status }}
                                    </Badge>
                                </td>
                                <td class="px-5 py-3.5 text-center">
                                    <div
                                        v-if="req.status === 'menunggu'"
                                        class="flex items-center justify-center gap-1.5"
                                    >
                                        <Button
                                            size="sm"
                                            @click="
                                                updateStatus(
                                                    req.id,
                                                    'disetujui',
                                                )
                                            "
                                            class="h-8 cursor-pointer rounded-none bg-emerald-600 px-3 text-[11px] font-bold text-white uppercase shadow-none hover:bg-emerald-700"
                                        >
                                            <Check class="mr-1 h-3.5 w-3.5" />
                                            Approve
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            @click="
                                                updateStatus(req.id, 'ditolak')
                                            "
                                            class="h-8 cursor-pointer rounded-none px-3 text-[11px] font-bold uppercase shadow-none"
                                        >
                                            <X class="mr-1 h-3.5 w-3.5" />
                                            Reject
                                        </Button>
                                    </div>
                                    <span
                                        v-else
                                        class="text-xs text-muted-foreground italic"
                                    >
                                        Telah Diproses
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div
                        v-if="!filteredRequests.length"
                        class="space-y-2 py-10 text-center text-muted-foreground"
                    >
                        <FileText
                            class="mx-auto h-8 w-8 text-muted-foreground/50"
                        />
                        <p>
                            Tidak ada data pengajuan izin/cuti yang ditemukan.
                        </p>
                    </div>

                    <Pagination
                        v-if="filteredRequests.length > 0"
                        v-model:currentPage="currentPage"
                        :totalItems="filteredRequests.length"
                        :itemsPerPage="itemsPerPage"
                    />
                </div>
            </CardContent>
        </Card>

        <!-- Preview Modal Lampiran PDF / Image -->
        <Dialog v-model:open="showPreviewModal">
            <DialogContent
                class="rounded-none border border-border bg-card p-6 text-card-foreground shadow-xl sm:max-w-4xl"
            >
                <DialogHeader
                    class="flex flex-row items-center justify-between border-b border-border/60 pb-3"
                >
                    <DialogTitle
                        class="flex items-center gap-2.5 text-base font-bold tracking-wider text-foreground uppercase"
                    >
                        <Paperclip
                            class="h-4 w-4 text-teal-600 dark:text-teal-400"
                        />
                        <span>Preview Lampiran Dokumen Permohonan</span>
                    </DialogTitle>
                </DialogHeader>

                <div class="py-4">
                    <iframe
                        v-if="previewFileType === 'pdf'"
                        :src="previewUrl"
                        class="h-[550px] w-full rounded-none border border-border bg-background"
                    ></iframe>
                    <div
                        v-else
                        class="flex max-h-[550px] items-center justify-center overflow-auto rounded-none border border-border bg-muted/20 p-2"
                    >
                        <img
                            :src="previewUrl"
                            alt="Lampiran"
                            class="max-h-[520px] w-auto object-contain"
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
                        class="h-9 rounded-none text-xs font-bold uppercase"
                    >
                        Tutup
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    </AdminLayout>
</template>
