<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import {
    BarChart3,
    ChevronLeft,
    ChevronRight,
    TrendingUp,
    Wallet,
    Percent,
    CheckCircle2,
    AlertTriangle,
    XCircle,
    FileText,
} from '@lucide/vue';
import { ref, computed } from 'vue';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/Components/ui/card';
import AppLayout from '@/Layouts/AppLayout.vue';

interface StatsProps {
    hadir: number;
    terlambat: number;
    izin: number;
    alpha: number;
    wfh?: number;
    totalDays?: number;
}

interface TppSummaryProps {
    performance_score_percent: number;
    total_deduction_percent: number;
    late_deduction_percent: number;
    absent_deduction_percent: number;
}

const props = defineProps<{
    stats: StatsProps;
    tppSummary?: TppSummaryProps;
    month?: number;
    year?: number;
}>();

const monthNames = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
];

const currentMonthIndex = ref(
    props.month ? props.month - 1 : new Date().getMonth(),
);
const currentYearNum = ref(props.year || new Date().getFullYear());

const monthLabel = computed(() => {
    return `${monthNames[currentMonthIndex.value]} ${currentYearNum.value}`;
});

const fetchMonthData = () => {
    router.get(
        '/statistik',
        {
            month: currentMonthIndex.value + 1,
            year: currentYearNum.value,
        },
        { preserveState: true, preserveScroll: true, replace: true },
    );
};

const prevMonth = () => {
    if (currentMonthIndex.value === 0) {
        currentMonthIndex.value = 11;
        currentYearNum.value--;
    } else {
        currentMonthIndex.value--;
    }

    fetchMonthData();
};

const nextMonth = () => {
    if (currentMonthIndex.value === 11) {
        currentMonthIndex.value = 0;
        currentYearNum.value++;
    } else {
        currentMonthIndex.value++;
    }

    fetchMonthData();
};
</script>

<template>
    <AppLayout>
        <div class="mx-auto max-w-2xl space-y-6 pb-8">
            <!-- Page Header & Month Selector Card -->
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
                            <BarChart3
                                class="h-5 w-5 text-teal-600 dark:text-teal-400"
                            />
                            <span>Statistik Kehadiran</span>
                        </CardTitle>
                        <p class="mt-0.5 text-xs text-muted-foreground">
                            Rekapitulasi performa presensi ASN
                        </p>
                    </div>

                    <div class="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            @click="prevMonth"
                            class="h-8 w-8 cursor-pointer rounded-xl"
                        >
                            <ChevronLeft class="h-4 w-4" />
                        </Button>
                        <span
                            class="min-w-[120px] text-center font-mono text-xs font-bold text-foreground"
                        >
                            {{ monthLabel }}
                        </span>
                        <Button
                            variant="outline"
                            size="icon"
                            @click="nextMonth"
                            class="h-8 w-8 cursor-pointer rounded-xl"
                        >
                            <ChevronRight class="h-4 w-4" />
                        </Button>
                    </div>
                </CardHeader>
            </Card>

            <!-- Summary KPI Grid -->
            <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Card
                    class="border-border/60 bg-card/95 shadow-sm backdrop-blur-xl"
                >
                    <CardContent class="space-y-1 p-4 text-center">
                        <CheckCircle2
                            class="mx-auto h-5 w-5 text-emerald-500"
                        />
                        <p
                            class="text-2xl font-black text-emerald-600 dark:text-emerald-400"
                        >
                            {{ stats.hadir }}
                        </p>
                        <p
                            class="text-[11px] font-semibold text-muted-foreground"
                        >
                            Hadir Tepat Waktu
                        </p>
                    </CardContent>
                </Card>

                <Card
                    class="border-border/60 bg-card/95 shadow-sm backdrop-blur-xl"
                >
                    <CardContent class="space-y-1 p-4 text-center">
                        <AlertTriangle class="mx-auto h-5 w-5 text-amber-500" />
                        <p
                            class="text-2xl font-black text-amber-600 dark:text-amber-400"
                        >
                            {{ stats.terlambat }}
                        </p>
                        <p
                            class="text-[11px] font-semibold text-muted-foreground"
                        >
                            Terlambat
                        </p>
                    </CardContent>
                </Card>

                <Card
                    class="border-border/60 bg-card/95 shadow-sm backdrop-blur-xl"
                >
                    <CardContent class="space-y-1 p-4 text-center">
                        <FileText class="mx-auto h-5 w-5 text-sky-500" />
                        <p
                            class="text-2xl font-black text-sky-600 dark:text-sky-400"
                        >
                            {{ stats.izin }}
                        </p>
                        <p
                            class="text-[11px] font-semibold text-muted-foreground"
                        >
                            Izin / Cuti
                        </p>
                    </CardContent>
                </Card>

                <Card
                    class="border-border/60 bg-card/95 shadow-sm backdrop-blur-xl"
                >
                    <CardContent class="space-y-1 p-4 text-center">
                        <XCircle class="mx-auto h-5 w-5 text-rose-500" />
                        <p
                            class="text-2xl font-black text-rose-600 dark:text-rose-400"
                        >
                            {{ stats.alpha }}
                        </p>
                        <p
                            class="text-[11px] font-semibold text-muted-foreground"
                        >
                            Tanpa Keterangan
                        </p>
                    </CardContent>
                </Card>
            </div>

            <!-- TPP Calculator Widget Card -->
            <Card
                v-if="tppSummary"
                class="border-teal-500/30 bg-teal-500/10 shadow-md backdrop-blur-xl dark:bg-teal-500/15"
            >
                <CardHeader
                    class="flex-row items-center justify-between space-y-0 pb-3"
                >
                    <div class="flex items-center gap-2">
                        <Wallet
                            class="h-5 w-5 text-teal-600 dark:text-teal-400"
                        />
                        <CardTitle
                            class="text-base font-bold text-teal-700 dark:text-teal-300"
                        >
                            Kalkulasi TPP Tambahan Penghasilan Pegawai
                        </CardTitle>
                    </div>
                    <Badge
                        variant="outline"
                        class="border-teal-500/40 bg-teal-500/20 text-xs font-black text-teal-600 dark:text-teal-300"
                    >
                        Skor: {{ tppSummary.performance_score_percent }}%
                    </Badge>
                </CardHeader>
                <CardContent
                    class="space-y-2 pt-0 text-xs text-muted-foreground"
                >
                    <div
                        class="flex items-center justify-between rounded-xl border border-teal-500/20 bg-background/80 p-2.5"
                    >
                        <span>Potongan TPP Terlambat</span>
                        <span
                            class="font-mono font-bold text-amber-600 dark:text-amber-400"
                        >
                            -{{ tppSummary.late_deduction_percent }}%
                        </span>
                    </div>
                    <div
                        class="flex items-center justify-between rounded-xl border border-teal-500/20 bg-background/80 p-2.5"
                    >
                        <span>Potongan TPP Alpha</span>
                        <span
                            class="font-mono font-bold text-rose-600 dark:text-rose-400"
                        >
                            -{{ tppSummary.absent_deduction_percent }}%
                        </span>
                    </div>
                    <div
                        class="flex items-center justify-between rounded-xl border border-teal-500/40 bg-teal-500/20 p-2.5 font-bold text-foreground"
                    >
                        <span>Total Akumulasi Potongan TPP</span>
                        <span
                            class="font-mono text-sm"
                            :class="
                                tppSummary.total_deduction_percent > 0
                                    ? 'text-rose-500'
                                    : 'text-emerald-500'
                            "
                        >
                            -{{ tppSummary.total_deduction_percent }}%
                        </span>
                    </div>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>
