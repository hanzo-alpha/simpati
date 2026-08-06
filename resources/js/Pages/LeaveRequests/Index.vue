<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import {
    FileText,
    Plus,
    Clock,
    CheckCircle2,
    XCircle,
    AlertCircle,
} from '@lucide/vue';
import { ref, computed } from 'vue';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/Components/ui/card';
import AppLayout from '@/Layouts/AppLayout.vue';

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
    },
);

const activeFilter = ref('all');

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
                    class="space-y-2 py-12 text-center text-muted-foreground"
                >
                    <FileText
                        class="mx-auto h-10 w-10 text-muted-foreground/40"
                    />
                    <p class="text-sm font-medium">
                        Belum ada catatan pengajuan izin.
                    </p>
                </div>

                <Card
                    v-for="req in filteredRequests"
                    :key="req.id"
                    class="overflow-hidden border-border/60 bg-card/95 shadow-sm backdrop-blur-xl transition-all hover:shadow-md"
                >
                    <CardContent class="space-y-2 p-4">
                        <div class="flex items-center justify-between">
                            <Badge
                                :variant="
                                    req.status === 'disetujui'
                                        ? 'default'
                                        : req.status === 'ditolak'
                                          ? 'destructive'
                                          : 'outline'
                                "
                                class="px-2.5 py-0.5 text-[10px] font-semibold uppercase"
                                :class="{
                                    'border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400':
                                        req.status === 'menunggu',
                                    'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400':
                                        req.status === 'disetujui',
                                }"
                            >
                                {{
                                    req.status === 'menunggu'
                                        ? 'Pending Approval'
                                        : req.status === 'disetujui'
                                          ? 'Disetujui'
                                          : 'Ditolak'
                                }}
                            </Badge>

                            <Badge
                                variant="outline"
                                class="text-[10px] font-semibold"
                            >
                                {{ req.type }}
                            </Badge>
                        </div>

                        <div>
                            <p class="text-xs font-bold text-foreground">
                                {{ req.tanggal_mulai }} —
                                {{ req.tanggal_selesai }}
                            </p>
                            <p class="mt-0.5 text-[11px] text-muted-foreground">
                                Alasan: {{ req.alasan }}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </AppLayout>
</template>
