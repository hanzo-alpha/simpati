<script setup lang="ts">
import { ref, computed } from 'vue';
import { Link } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Plus, Clock, CheckCircle2, XCircle, AlertCircle } from '@lucide/vue';

interface LeaveItem {
    id: number;
    type: string;
    tanggal_mulai: string;
    tanggal_selesai: string;
    alasan: string;
    status: 'menunggu' | 'disetujui' | 'ditolak' | string;
    duration?: number;
}

const props = withDefaults(
    defineProps<{
        requests?: LeaveItem[];
    }>(),
    {
        requests: () => [],
    }
);

const activeFilter = ref('all');

const filterTabs = [
    { label: 'Semua', value: 'all' },
    { label: 'Pending', value: 'menunggu' },
    { label: 'Disetujui', value: 'disetujui' },
    { label: 'Ditolak', value: 'ditolak' },
];

const filteredRequests = computed(() => {
    if (activeFilter.value === 'all') return props.requests;
    return props.requests.filter((r) => r.status === activeFilter.value);
});

const summary = computed(() => {
    const s = { total: props.requests.length, menunggu: 0, disetujui: 0, ditolak: 0 };
    props.requests.forEach((r) => {
        if (r.status === 'menunggu') s.menunggu++;
        if (r.status === 'disetujui') s.disetujui++;
        if (r.status === 'ditolak') s.ditolak++;
    });
    return s;
});
</script>

<template>
    <AppLayout>
        <div class="max-w-2xl mx-auto space-y-6 pb-8">
            <!-- Header Card -->
            <Card class="border-border/60 shadow-md backdrop-blur-xl bg-card/95">
                <CardHeader class="pb-3 flex-row items-center justify-between space-y-0">
                    <div>
                        <CardTitle class="text-xl font-extrabold flex items-center gap-2">
                            <FileText class="w-5 h-5 text-teal-600 dark:text-teal-400" />
                            <span>Riwayat Pengajuan Izin</span>
                        </CardTitle>
                        <p class="text-xs text-muted-foreground mt-0.5">Daftar permohonan izin/cuti ASN</p>
                    </div>

                    <Link href="/pengajuan/buat">
                        <Button class="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-semibold text-xs shadow-md shadow-teal-600/20 rounded-xl cursor-pointer">
                            <Plus class="w-4 h-4 mr-1" />
                            <span>Buat Baru</span>
                        </Button>
                    </Link>
                </CardHeader>

                <CardContent class="pt-0 border-t border-border/40 mt-2">
                    <div class="flex items-center justify-around text-xs text-muted-foreground pt-3 font-semibold">
                        <span>Total: {{ summary.total }}</span>
                        <span class="text-amber-600 dark:text-amber-400">Pending: {{ summary.menunggu }}</span>
                        <span class="text-emerald-600 dark:text-emerald-400">Disetujui: {{ summary.disetujui }}</span>
                        <span class="text-rose-600 dark:text-rose-400">Ditolak: {{ summary.ditolak }}</span>
                    </div>
                </CardContent>
            </Card>

            <!-- Filter Tabs -->
            <div class="flex items-center gap-2 overflow-x-auto">
                <button
                    v-for="tab in filterTabs"
                    :key="tab.value"
                    @click="activeFilter = tab.value"
                    class="px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap"
                    :class="
                        activeFilter === tab.value
                            ? 'bg-teal-500/15 text-teal-600 dark:text-teal-400 border border-teal-500/30 shadow-xs'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    "
                >
                    {{ tab.label }}
                </button>
            </div>

            <!-- Requests List -->
            <div class="space-y-3">
                <div v-if="!filteredRequests.length" class="text-center py-12 text-muted-foreground space-y-2">
                    <FileText class="w-10 h-10 mx-auto text-muted-foreground/40" />
                    <p class="text-sm font-medium">Belum ada catatan pengajuan izin.</p>
                </div>

                <Card
                    v-for="req in filteredRequests"
                    :key="req.id"
                    class="border-border/60 shadow-sm hover:shadow-md transition-all backdrop-blur-xl bg-card/95 overflow-hidden"
                >
                    <CardContent class="p-4 space-y-2">
                        <div class="flex items-center justify-between">
                            <Badge
                                :variant="req.status === 'disetujui' ? 'default' : req.status === 'ditolak' ? 'destructive' : 'outline'"
                                class="text-[10px] font-semibold uppercase px-2.5 py-0.5"
                                :class="{
                                    'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30': req.status === 'menunggu',
                                    'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30': req.status === 'disetujui',
                                }"
                            >
                                {{ req.status === 'menunggu' ? 'Pending Approval' : req.status === 'disetujui' ? 'Disetujui' : 'Ditolak' }}
                            </Badge>

                            <Badge variant="outline" class="text-[10px] font-semibold">
                                {{ req.type }}
                            </Badge>
                        </div>

                        <div>
                            <p class="text-xs font-bold text-foreground">
                                {{ req.tanggal_mulai }} — {{ req.tanggal_selesai }}
                            </p>
                            <p class="text-[11px] text-muted-foreground mt-0.5">
                                Alasan: {{ req.alasan }}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </AppLayout>
</template>
