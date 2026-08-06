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
} from '@lucide/vue';
import { ref, computed } from 'vue';
import Pagination from '@/Components/Pagination.vue';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/Components/ui/card';
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
    if (activeStatus.value === 'all') {
return props.requests;
}

    return props.requests.filter((r) => r.status === activeStatus.value);
});

const currentPage = ref(1);
const itemsPerPage = 10;

const paginatedRequests = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;

    return filteredRequests.value.slice(start, start + itemsPerPage);
});

const updateStatus = (id: number, status: string) => {
    router.put(
        `/admin/leave-requests/${id}`,
        { status },
        { preserveScroll: true },
    );
};
</script>

<template>
    <AdminLayout
        title="Kelola Pengajuan Izin / Cuti"
        :subtitle="`${requests.length} total permohonan masuk`"
    >
        <!-- Status Filter Tabs Card -->
        <Card
            class="mb-6 border-border/60 bg-card/95 shadow-md backdrop-blur-xl"
        >
            <CardContent class="flex items-center gap-2 overflow-x-auto p-4">
                <Button
                    v-for="sf in statusFilters"
                    :key="sf.value"
                    size="sm"
                    :variant="activeStatus === sf.value ? 'default' : 'outline'"
                    @click="activeStatus = sf.value"
                    class="flex h-8 cursor-pointer items-center gap-1.5 rounded-lg text-xs"
                    :class="{
                        'bg-teal-600 text-white hover:bg-teal-700':
                            activeStatus === sf.value,
                    }"
                >
                    <span>{{ sf.label }}</span>
                    <span
                        class="rounded-full bg-background/20 px-1.5 py-0.5 text-[10px] font-bold"
                    >
                        {{ sf.count }}
                    </span>
                </Button>
            </CardContent>
        </Card>

        <!-- Requests Table Card -->
        <Card class="border-border/60 bg-card/95 shadow-md backdrop-blur-xl rounded-2xl overflow-hidden">
            <CardContent class="p-0">
                <div class="overflow-x-auto">
                    <table class="w-full text-xs">
                        <thead>
                            <tr
                                class="border-b border-border/60 bg-muted/40 text-left text-xs uppercase tracking-wider font-semibold text-muted-foreground"
                            >
                                <th
                                    class="w-10 px-5 py-3.5 text-center font-semibold"
                                >
                                    #
                                </th>
                                <th class="px-5 py-3.5 font-semibold">
                                    Pegawai ASN
                                </th>
                                <th class="px-5 py-3.5 font-semibold">
                                    Kategori Izin
                                </th>
                                <th class="px-5 py-3.5 font-semibold">
                                    Periode Tanggal
                                </th>
                                <th class="px-5 py-3.5 font-semibold">
                                    Alasan Permohonan
                                </th>
                                <th
                                    class="px-5 py-3.5 text-center font-semibold"
                                >
                                    Status
                                </th>
                                <th
                                    class="px-5 py-3.5 text-center font-semibold"
                                >
                                    Aksi Keputusan
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-border/40">
                            <tr
                                v-for="(req, i) in paginatedRequests"
                                :key="req.id"
                                class="transition-colors hover:bg-muted/40"
                            >
                                <td
                                    class="px-5 py-3.5 text-center font-mono text-muted-foreground"
                                >
                                    {{
                                        (currentPage - 1) * itemsPerPage + i + 1
                                    }}
                                </td>
                                <td class="px-5 py-3.5">
                                    <p class="font-bold text-foreground">
                                        {{ req.user?.name || 'Pegawai ASN' }}
                                    </p>
                                    <div class="flex items-center gap-1.5 mt-0.5">
                                        <span class="text-[11px] text-muted-foreground">
                                            {{ req.user?.office?.opd_name || '-' }}
                                        </span>
                                        <Badge
                                            variant="outline"
                                            class="border-teal-500/30 bg-teal-500/10 text-[10px] font-semibold text-teal-600 dark:text-teal-400"
                                        >
                                            Sisa Cuti: {{ req.user?.sisa_cuti_tahunan ?? 12 }} Hari
                                        </Badge>
                                    </div>
                                </td>
                                <td class="px-5 py-3.5">
                                    <Badge
                                        variant="outline"
                                        class="font-semibold"
                                    >
                                        {{ req.type_label || req.type }}
                                    </Badge>
                                </td>
                                <td
                                    class="px-5 py-3.5 font-mono text-[11px] text-muted-foreground"
                                >
                                    <p>{{ req.tanggal_mulai }} s/d {{ req.tanggal_selesai }}</p>
                                    <p v-if="req.duration" class="font-sans font-semibold text-teal-600 dark:text-teal-400 mt-0.5">
                                        Durasi: {{ req.duration }} Hari
                                    </p>
                                </td>
                                <td
                                    class="max-w-xs truncate px-5 py-3.5 text-muted-foreground"
                                >
                                    {{ req.alasan }}
                                </td>
                                <td class="px-5 py-3.5 text-center">
                                    <Badge
                                        :variant="
                                            req.status === 'disetujui'
                                                ? 'default'
                                                : 'outline'
                                        "
                                        class="text-[10px] font-semibold uppercase"
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
                                        class="flex items-center justify-center gap-1"
                                    >
                                        <Button
                                            size="sm"
                                            @click="
                                                updateStatus(
                                                    req.id,
                                                    'disetujui',
                                                )
                                            "
                                            class="h-7 cursor-pointer bg-emerald-600 text-xs text-white hover:bg-emerald-700"
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
                                            class="h-7 cursor-pointer text-xs"
                                        >
                                            <X class="mr-1 h-3.5 w-3.5" />
                                            Reject
                                        </Button>
                                    </div>
                                    <span
                                        v-else
                                        class="text-[11px] font-semibold text-muted-foreground"
                                        >Telah Diproses</span
                                    >
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
    </AdminLayout>
</template>
