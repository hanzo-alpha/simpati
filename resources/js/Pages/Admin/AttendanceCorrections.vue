<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import { Check, X, Clock, FileText } from '@lucide/vue';
import { ref, computed } from 'vue';
import Pagination from '@/Components/Pagination.vue';
import { useConfirm } from '@/composables/useConfirm';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import AdminLayout from '@/Layouts/AdminLayout.vue';

interface Office {
    opd_name?: string;
    name?: string;
}

interface UserProfile {
    jabatan?: string;
    unit_kerja?: string;
}

interface User {
    name?: string;
    nip?: string;
    office?: Office;
    profile?: UserProfile;
}

interface AttendanceCorrectionItem {
    id: number;
    user?: User;
    tanggal: string;
    jenis: string;
    jam_koreksi: string;
    alasan: string;
    lampiran_path?: string;
    status: 'menunggu' | 'disetujui' | 'ditolak' | string;
    approver?: User;
    catatan_approval?: string;
}

const props = withDefaults(
    defineProps<{
        corrections?: AttendanceCorrectionItem[];
    }>(),
    {
        corrections: () => [],
    },
);

const currentPage = ref(1);
const itemsPerPage = 10;

const paginatedCorrections = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;

    return props.corrections.slice(start, start + itemsPerPage);
});

const { confirm: confirmAction } = useConfirm();

const updateStatus = async (correction: AttendanceCorrectionItem, status: string) => {
    const isApprove = status === 'disetujui';
    const isOk = await confirmAction({
        title: isApprove ? 'Setujui Pengajuan Koreksi' : 'Tolak Pengajuan Koreksi',
        description: isApprove
            ? `Apakah Anda yakin ingin menyetujui pengajuan koreksi presensi dari ${correction.user?.name || 'pegawai'}?`
            : `Apakah Anda yakin ingin menolak pengajuan koreksi presensi dari ${correction.user?.name || 'pegawai'}?`,
        confirmText: isApprove ? 'Ya, Setujui' : 'Ya, Tolak',
        variant: isApprove ? 'success' : 'danger',
    });

    if (isOk) {
        const catatan =
            status === 'ditolak' ? prompt('Alasan penolakan (opsional):') : null;

        router.put(
            `/admin/attendance-corrections/${correction.id}`,
            { status, catatan_approval: catatan },
            { preserveScroll: true },
        );
    }
};

const formatJenis = (jenis?: string) => {
    if (!jenis) {
return '-';
}

    switch (jenis.toLowerCase()) {
        case 'masuk':
            return 'Masuk (Pagi)';
        case 'istirahat':
            return 'Istirahat';
        case 'kembali':
            return 'Kembali Istirahat';
        case 'pulang':
            return 'Pulang (Sore)';
        default:
            return jenis.toUpperCase();
    }
};
</script>

<template>
    <AdminLayout
        title="Kelola Koreksi Presensi ASN"
        :subtitle="`${corrections.length} pengajuan lupa presensi / kendala teknis`"
    >
        <!-- Corrections Table Card -->
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
                                <th class="px-5 py-3.5 font-semibold">
                                    Pegawai ASN
                                </th>
                                <th class="px-5 py-3.5 font-semibold">
                                    OPD & Jabatan
                                </th>
                                <th
                                    class="px-5 py-3.5 text-center font-semibold"
                                >
                                    Tanggal
                                </th>
                                <th
                                    class="px-5 py-3.5 text-center font-semibold"
                                >
                                    Jam Seharusnya
                                </th>
                                <th
                                    class="px-5 py-3.5 text-center font-semibold"
                                >
                                    Jenis
                                </th>
                                <th class="px-5 py-3.5 font-semibold">
                                    Alasan Koreksi
                                </th>
                                <th
                                    class="px-5 py-3.5 text-center font-semibold"
                                >
                                    Lampiran
                                </th>
                                <th
                                    class="px-5 py-3.5 text-center font-semibold"
                                >
                                    Status
                                </th>
                                <th
                                    class="px-5 py-3.5 text-center font-semibold"
                                >
                                    Aksi Approval
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-border/40">
                            <tr
                                v-for="item in paginatedCorrections"
                                :key="item.id"
                                class="transition-colors hover:bg-muted/40"
                            >
                                <td class="px-5 py-3.5">
                                    <div class="font-bold text-foreground">
                                        {{ item.user?.name || 'Pegawai ASN' }}
                                    </div>
                                    <div
                                        class="font-mono text-[10px] text-muted-foreground"
                                    >
                                        NIP: {{ item.user?.nip || '-' }}
                                    </div>
                                </td>
                                <td class="px-5 py-3.5 text-muted-foreground">
                                    <div>
                                        {{
                                            item.user?.office?.opd_name ||
                                            item.user?.office?.name ||
                                            '-'
                                        }}
                                    </div>
                                    <div
                                        class="text-[10px] text-emerald-600 dark:text-emerald-400"
                                    >
                                        {{ item.user?.profile?.jabatan || '-' }}
                                    </div>
                                </td>
                                <td
                                    class="px-5 py-3.5 text-center font-mono font-bold text-teal-600 dark:text-teal-400"
                                >
                                    {{ item.tanggal }}
                                </td>
                                <td
                                    class="px-5 py-3.5 text-center font-mono font-bold text-foreground"
                                >
                                    {{
                                        item.jam_koreksi
                                            ? item.jam_koreksi.substring(0, 5)
                                            : '--:--'
                                    }}
                                    WITA
                                </td>
                                <td
                                    class="px-5 py-3.5 text-center font-semibold"
                                >
                                    <span
                                        class="rounded-none bg-secondary px-2 py-1 font-mono text-[10px] text-secondary-foreground uppercase"
                                    >
                                        {{ formatJenis(item.jenis) }}
                                    </span>
                                </td>
                                <td
                                    class="max-w-xs px-5 py-3.5 text-muted-foreground"
                                >
                                    <div class="line-clamp-2">
                                        {{ item.alasan }}
                                    </div>
                                    <div
                                        v-if="item.catatan_approval"
                                        class="mt-1 text-[10px] text-amber-600 italic dark:text-amber-400"
                                    >
                                        Catatan: {{ item.catatan_approval }}
                                    </div>
                                </td>
                                <td class="px-5 py-3.5 text-center">
                                    <a
                                        v-if="item.lampiran_path"
                                        :href="`/storage/${item.lampiran_path}`"
                                        target="_blank"
                                        class="inline-flex items-center gap-1 font-bold text-emerald-600 underline hover:text-emerald-700 dark:text-emerald-400"
                                    >
                                        <FileText class="h-3.5 w-3.5" />
                                        <span>File</span>
                                    </a>
                                    <span
                                        v-else
                                        class="text-[10px] text-muted-foreground"
                                        >-</span
                                    >
                                </td>
                                <td class="px-5 py-3.5 text-center">
                                    <Badge
                                        :variant="
                                            item.status === 'disetujui'
                                                ? 'default'
                                                : 'outline'
                                        "
                                        class="text-[10px] font-semibold uppercase"
                                        :class="{
                                            'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400':
                                                item.status === 'disetujui',
                                            'border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400':
                                                item.status === 'menunggu',
                                            'border-rose-500/30 bg-rose-500/10 text-rose-500':
                                                item.status === 'ditolak',
                                        }"
                                    >
                                        {{ item.status }}
                                    </Badge>
                                </td>
                                <td class="px-5 py-3.5 text-center">
                                    <div
                                        v-if="item.status === 'menunggu'"
                                        class="flex items-center justify-center gap-1"
                                    >
                                        <Button
                                            size="sm"
                                            @click="
                                                updateStatus(item, 'disetujui')
                                            "
                                            class="h-7 cursor-pointer bg-emerald-600 text-xs text-white hover:bg-emerald-700"
                                        >
                                            <Check class="mr-1 h-3.5 w-3.5" />
                                            Setujui
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            @click="
                                                updateStatus(item, 'ditolak')
                                            "
                                            class="h-7 cursor-pointer text-xs"
                                        >
                                            <X class="mr-1 h-3.5 w-3.5" />
                                            Tolak
                                        </Button>
                                    </div>
                                    <span
                                        v-else
                                        class="text-[11px] font-semibold text-muted-foreground"
                                    >
                                        Telah Diproses
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div
                        v-if="!corrections.length"
                        class="space-y-2 py-10 text-center text-muted-foreground"
                    >
                        <Clock
                            class="mx-auto h-8 w-8 text-muted-foreground/50"
                        />
                        <p>
                            Belum ada pengajuan koreksi presensi ASN yang perlu
                            diproses.
                        </p>
                    </div>

                    <Pagination
                        v-if="corrections.length > 0"
                        v-model:currentPage="currentPage"
                        :totalItems="corrections.length"
                        :itemsPerPage="itemsPerPage"
                    />
                </div>
            </CardContent>
        </Card>
    </AdminLayout>
</template>
