<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import { ArrowLeftRight, Check, X } from '@lucide/vue';
import { ref, computed } from 'vue';
import Pagination from '@/Components/Pagination.vue';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import AdminLayout from '@/Layouts/AdminLayout.vue';

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
    },
);

const currentPage = ref(1);
const itemsPerPage = 10;

const paginatedSwaps = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;

    return props.swaps.slice(start, start + itemsPerPage);
});

const updateStatus = (swap: ShiftSwapItem, status: string) => {
    router.put(
        `/admin/shift-swaps/${swap.id}`,
        { status },
        { preserveScroll: true },
    );
};
</script>

<template>
    <AdminLayout
        title="Kelola Tukar Shift ASN"
        :subtitle="`${swaps.length} pengajuan pertukaran jadwal`"
    >
        <!-- Swaps Table Card -->
        <Card class="border-border/60 bg-card/95 shadow-md backdrop-blur-xl rounded-2xl overflow-hidden">
            <CardContent class="p-0">
                <div class="overflow-x-auto">
                    <table class="w-full text-xs">
                        <thead>
                            <tr
                                class="border-b border-border/60 bg-muted/40 text-left text-xs uppercase tracking-wider font-semibold text-muted-foreground"
                            >
                                <th class="px-5 py-3.5 font-semibold">
                                    Pemohon (ASN)
                                </th>
                                <th class="px-5 py-3.5 font-semibold">
                                    Pengganti (ASN)
                                </th>
                                <th class="px-5 py-3.5 font-semibold">
                                    OPD Utama
                                </th>
                                <th
                                    class="px-5 py-3.5 text-center font-semibold"
                                >
                                    Tanggal Asal
                                </th>
                                <th
                                    class="px-5 py-3.5 text-center font-semibold"
                                >
                                    Tanggal Tukar
                                </th>
                                <th class="px-5 py-3.5 font-semibold">
                                    Alasan
                                </th>
                                <th
                                    class="px-5 py-3.5 text-center font-semibold"
                                >
                                    Status
                                </th>
                                <th
                                    class="px-5 py-3.5 text-center font-semibold"
                                >
                                    Aksi Decision
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-border/40">
                            <tr
                                v-for="swap in paginatedSwaps"
                                :key="swap.id"
                                class="transition-colors hover:bg-muted/40"
                            >
                                <td
                                    class="px-5 py-3.5 font-bold text-foreground"
                                >
                                    {{
                                        swap.requester?.name ||
                                        'Pegawai Pemohon'
                                    }}
                                </td>
                                <td class="px-5 py-3.5 text-muted-foreground">
                                    {{
                                        swap.target_user?.name ||
                                        'Pegawai Pengganti'
                                    }}
                                </td>
                                <td class="px-5 py-3.5 text-muted-foreground">
                                    {{
                                        swap.requester?.office?.opd_name || '-'
                                    }}
                                </td>
                                <td
                                    class="px-5 py-3.5 text-center font-mono font-bold text-teal-600 dark:text-teal-400"
                                >
                                    {{ swap.original_date }}
                                </td>
                                <td
                                    class="px-5 py-3.5 text-center font-mono font-bold text-purple-600 dark:text-purple-400"
                                >
                                    {{ swap.target_date }}
                                </td>
                                <td
                                    class="max-w-xs truncate px-5 py-3.5 text-muted-foreground"
                                >
                                    {{ swap.reason }}
                                </td>
                                <td class="px-5 py-3.5 text-center">
                                    <Badge
                                        :variant="
                                            swap.status === 'approved'
                                                ? 'default'
                                                : 'outline'
                                        "
                                        class="text-[10px] font-semibold uppercase"
                                        :class="{
                                            'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400':
                                                swap.status === 'approved',
                                            'border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400':
                                                swap.status === 'pending',
                                            'border-rose-500/30 bg-rose-500/10 text-rose-500':
                                                swap.status === 'rejected',
                                        }"
                                    >
                                        {{ swap.status }}
                                    </Badge>
                                </td>
                                <td class="px-5 py-3.5 text-center">
                                    <div
                                        v-if="swap.status === 'pending'"
                                        class="flex items-center justify-center gap-1"
                                    >
                                        <Button
                                            size="sm"
                                            @click="
                                                updateStatus(swap, 'approved')
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
                                                updateStatus(swap, 'rejected')
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
                        v-if="!swaps.length"
                        class="space-y-2 py-10 text-center text-muted-foreground"
                    >
                        <ArrowLeftRight
                            class="mx-auto h-8 w-8 text-muted-foreground/50"
                        />
                        <p>
                            Belum ada pengajuan tukar shift ASN yang perlu
                            diproses.
                        </p>
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
