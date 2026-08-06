<script setup lang="ts">
import { ref, computed } from 'vue';
import { router } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Pagination from '@/Components/Pagination.vue';
import { FileText, Check, X, Clock, Calendar, CheckCircle2, AlertCircle } from '@lucide/vue';

interface Office {
    opd_name?: string;
}

interface User {
    name?: string;
    office?: Office;
}

interface LeaveRequestItem {
    id: number;
    user?: User;
    type: string;
    type_label: string;
    tanggal_mulai: string;
    tanggal_selesai: string;
    alasan: string;
    status: 'menunggu' | 'disetujui' | 'ditolak' | string;
    status_label: string;
}

const props = withDefaults(
    defineProps<{
        requests?: LeaveRequestItem[];
    }>(),
    {
        requests: () => [],
    }
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
    if (activeStatus.value === 'all') return props.requests;
    return props.requests.filter((r) => r.status === activeStatus.value);
});

const currentPage = ref(1);
const itemsPerPage = 10;

const paginatedRequests = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return filteredRequests.value.slice(start, start + itemsPerPage);
});

const updateStatus = (id: number, status: string) => {
    router.put(`/admin/leave-requests/${id}`, { status }, { preserveScroll: true });
};
</script>

<template>
    <AdminLayout title="Kelola Pengajuan Izin / Cuti" :subtitle="`${requests.length} total permohonan masuk`">
        <!-- Status Filter Tabs Card -->
        <Card class="border-border/60 shadow-md backdrop-blur-xl bg-card/95 mb-6">
            <CardContent class="p-4 flex items-center gap-2 overflow-x-auto">
                <Button
                    v-for="sf in statusFilters"
                    :key="sf.value"
                    size="sm"
                    :variant="activeStatus === sf.value ? 'default' : 'outline'"
                    @click="activeStatus = sf.value"
                    class="text-xs h-8 cursor-pointer rounded-lg flex items-center gap-1.5"
                    :class="{ 'bg-teal-600 hover:bg-teal-700 text-white': activeStatus === sf.value }"
                >
                    <span>{{ sf.label }}</span>
                    <span class="px-1.5 py-0.5 rounded-full text-[10px] bg-background/20 font-bold">
                        {{ sf.count }}
                    </span>
                </Button>
            </CardContent>
        </Card>

        <!-- Requests Table Card -->
        <Card class="border-border/60 shadow-md backdrop-blur-xl bg-card/95">
            <CardContent class="p-0">
                <div class="overflow-x-auto">
                    <table class="w-full text-xs">
                        <thead>
                            <tr class="text-left text-muted-foreground border-b border-border bg-muted/30">
                                <th class="px-5 py-3.5 font-semibold text-center w-10">#</th>
                                <th class="px-5 py-3.5 font-semibold">Pegawai ASN</th>
                                <th class="px-5 py-3.5 font-semibold">Kategori Izin</th>
                                <th class="px-5 py-3.5 font-semibold">Periode Tanggal</th>
                                <th class="px-5 py-3.5 font-semibold">Alasan Permohonan</th>
                                <th class="px-5 py-3.5 font-semibold text-center">Status</th>
                                <th class="px-5 py-3.5 font-semibold text-center">Aksi Keputusan</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-border/40">
                            <tr
                                v-for="(req, i) in paginatedRequests"
                                :key="req.id"
                                class="hover:bg-muted/40 transition-colors"
                            >
                                <td class="px-5 py-3.5 text-center font-mono text-muted-foreground">{{ (currentPage - 1) * itemsPerPage + i + 1 }}</td>
                                <td class="px-5 py-3.5">
                                    <p class="font-bold text-foreground">{{ req.user?.name || 'Pegawai ASN' }}</p>
                                    <p class="text-[11px] text-muted-foreground">{{ req.user?.office?.opd_name || '-' }}</p>
                                </td>
                                <td class="px-5 py-3.5">
                                    <Badge variant="outline" class="font-semibold">
                                        {{ req.type_label || req.type }}
                                    </Badge>
                                </td>
                                <td class="px-5 py-3.5 font-mono text-muted-foreground text-[11px]">
                                    {{ req.tanggal_mulai }} s/d {{ req.tanggal_selesai }}
                                </td>
                                <td class="px-5 py-3.5 text-muted-foreground max-w-xs truncate">{{ req.alasan }}</td>
                                <td class="px-5 py-3.5 text-center">
                                    <Badge
                                        :variant="req.status === 'disetujui' ? 'default' : 'outline'"
                                        class="uppercase text-[10px] font-semibold"
                                        :class="{
                                            'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30': req.status === 'disetujui',
                                            'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30': req.status === 'menunggu',
                                            'bg-rose-500/10 text-rose-500 border-rose-500/30': req.status === 'ditolak',
                                        }"
                                    >
                                        {{ req.status_label || req.status }}
                                    </Badge>
                                </td>
                                <td class="px-5 py-3.5 text-center">
                                    <div v-if="req.status === 'menunggu'" class="flex items-center justify-center gap-1">
                                        <Button
                                            size="sm"
                                            @click="updateStatus(req.id, 'disetujui')"
                                            class="h-7 text-xs bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                                        >
                                            <Check class="w-3.5 h-3.5 mr-1" />
                                            Approve
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            @click="updateStatus(req.id, 'ditolak')"
                                            class="h-7 text-xs cursor-pointer"
                                        >
                                            <X class="w-3.5 h-3.5 mr-1" />
                                            Reject
                                        </Button>
                                    </div>
                                    <span v-else class="text-[11px] text-muted-foreground font-semibold">Telah Diproses</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div v-if="!filteredRequests.length" class="text-center text-muted-foreground py-10 space-y-2">
                        <FileText class="w-8 h-8 mx-auto text-muted-foreground/50" />
                        <p>Tidak ada data pengajuan izin/cuti yang ditemukan.</p>
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
