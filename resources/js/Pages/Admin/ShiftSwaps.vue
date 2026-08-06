<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Pagination from '@/Components/Pagination.vue';
import { ArrowLeftRight, Check, X } from '@lucide/vue';
import { ref, computed } from 'vue';

interface Office {
    opd_name?: string;
}

interface User {
    name?: string;
    office?: Office;
}

interface ShiftSwapItem {
    id: number;
    requester?: User;
    target_user?: User;
    original_date: string;
    target_date: string;
    reason: string;
    status: 'pending' | 'approved' | 'rejected' | string;
}

const props = withDefaults(
    defineProps<{
        swaps?: ShiftSwapItem[];
    }>(),
    {
        swaps: () => [],
    }
);

const currentPage = ref(1);
const itemsPerPage = 10;

const paginatedSwaps = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return props.swaps.slice(start, start + itemsPerPage);
});

const updateStatus = (swap: ShiftSwapItem, status: string) => {
    router.put(`/admin/shift-swaps/${swap.id}`, { status }, { preserveScroll: true });
};
</script>

<template>
    <AdminLayout title="Kelola Tukar Shift ASN" :subtitle="`${swaps.length} pengajuan pertukaran jadwal`">
        <!-- Swaps Table Card -->
        <Card class="border-border/60 shadow-md backdrop-blur-xl bg-card/95">
            <CardContent class="p-0">
                <div class="overflow-x-auto">
                    <table class="w-full text-xs">
                        <thead>
                            <tr class="text-left text-muted-foreground border-b border-border bg-muted/30">
                                <th class="px-5 py-3.5 font-semibold">Pemohon (ASN)</th>
                                <th class="px-5 py-3.5 font-semibold">Pengganti (ASN)</th>
                                <th class="px-5 py-3.5 font-semibold">OPD Utama</th>
                                <th class="px-5 py-3.5 font-semibold text-center">Tanggal Asal</th>
                                <th class="px-5 py-3.5 font-semibold text-center">Tanggal Tukar</th>
                                <th class="px-5 py-3.5 font-semibold">Alasan</th>
                                <th class="px-5 py-3.5 font-semibold text-center">Status</th>
                                <th class="px-5 py-3.5 font-semibold text-center">Aksi Decision</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-border/40">
                            <tr
                                v-for="swap in paginatedSwaps"
                                :key="swap.id"
                                class="hover:bg-muted/40 transition-colors"
                            >
                                <td class="px-5 py-3.5 font-bold text-foreground">{{ swap.requester?.name || 'Pegawai Pemohon' }}</td>
                                <td class="px-5 py-3.5 text-muted-foreground">{{ swap.target_user?.name || 'Pegawai Pengganti' }}</td>
                                <td class="px-5 py-3.5 text-muted-foreground">{{ swap.requester?.office?.opd_name || '-' }}</td>
                                <td class="px-5 py-3.5 text-center font-mono font-bold text-teal-600 dark:text-teal-400">{{ swap.original_date }}</td>
                                <td class="px-5 py-3.5 text-center font-mono font-bold text-purple-600 dark:text-purple-400">{{ swap.target_date }}</td>
                                <td class="px-5 py-3.5 text-muted-foreground max-w-xs truncate">{{ swap.reason }}</td>
                                <td class="px-5 py-3.5 text-center">
                                    <Badge
                                        :variant="swap.status === 'approved' ? 'default' : 'outline'"
                                        class="uppercase text-[10px] font-semibold"
                                        :class="{
                                            'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30': swap.status === 'approved',
                                            'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30': swap.status === 'pending',
                                            'bg-rose-500/10 text-rose-500 border-rose-500/30': swap.status === 'rejected',
                                        }"
                                    >
                                        {{ swap.status }}
                                    </Badge>
                                </td>
                                <td class="px-5 py-3.5 text-center">
                                    <div v-if="swap.status === 'pending'" class="flex items-center justify-center gap-1">
                                        <Button
                                            size="sm"
                                            @click="updateStatus(swap, 'approved')"
                                            class="h-7 text-xs bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                                        >
                                            <Check class="w-3.5 h-3.5 mr-1" />
                                            Approve
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            @click="updateStatus(swap, 'rejected')"
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

                    <div v-if="!swaps.length" class="text-center text-muted-foreground py-10 space-y-2">
                        <ArrowLeftRight class="w-8 h-8 mx-auto text-muted-foreground/50" />
                        <p>Belum ada pengajuan tukar shift ASN yang perlu diproses.</p>
                    </div>

                    <Pagination
                        v-if="swaps.length > 0"
                        v-model:currentPage="currentPage"
                        :totalItems="swaps.length"
                        :itemsPerPage="itemsPerPage"
                    />
                </div>
            </CardContent>
        </Card>
    </AdminLayout>
</template>
