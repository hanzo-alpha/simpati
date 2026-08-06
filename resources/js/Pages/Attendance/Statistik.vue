<script setup lang="ts">
import { ref, computed } from 'vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart3, ChevronLeft, ChevronRight, TrendingUp, Wallet, Percent, CheckCircle2, AlertTriangle, XCircle, FileText } from '@lucide/vue';

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
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

const currentMonthIndex = ref(props.month ? props.month - 1 : new Date().getMonth());
const currentYearNum = ref(props.year || new Date().getFullYear());

const monthLabel = computed(() => {
    return `${monthNames[currentMonthIndex.value]} ${currentYearNum.value}`;
});

const prevMonth = () => {
    if (currentMonthIndex.value === 0) {
        currentMonthIndex.value = 11;
        currentYearNum.value--;
    } else {
        currentMonthIndex.value--;
    }
};

const nextMonth = () => {
    if (currentMonthIndex.value === 11) {
        currentMonthIndex.value = 0;
        currentYearNum.value++;
    } else {
        currentMonthIndex.value++;
    }
};
</script>

<template>
    <AppLayout>
        <div class="max-w-2xl mx-auto space-y-6 pb-8">
            <!-- Page Header & Month Selector Card -->
            <Card class="border-border/60 shadow-md backdrop-blur-xl bg-card/95">
                <CardHeader class="pb-3 flex-row items-center justify-between space-y-0">
                    <div>
                        <CardTitle class="text-xl font-extrabold flex items-center gap-2">
                            <BarChart3 class="w-5 h-5 text-teal-600 dark:text-teal-400" />
                            <span>Statistik Kehadiran</span>
                        </CardTitle>
                        <p class="text-xs text-muted-foreground mt-0.5">Rekapitulasi performa presensi ASN</p>
                    </div>

                    <div class="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            @click="prevMonth"
                            class="h-8 w-8 rounded-xl cursor-pointer"
                        >
                            <ChevronLeft class="w-4 h-4" />
                        </Button>
                        <span class="text-xs font-bold font-mono min-w-[120px] text-center text-foreground">
                            {{ monthLabel }}
                        </span>
                        <Button
                            variant="outline"
                            size="icon"
                            @click="nextMonth"
                            class="h-8 w-8 rounded-xl cursor-pointer"
                        >
                            <ChevronRight class="w-4 h-4" />
                        </Button>
                    </div>
                </CardHeader>
            </Card>

            <!-- Summary KPI Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Card class="border-border/60 shadow-sm backdrop-blur-xl bg-card/95">
                    <CardContent class="p-4 text-center space-y-1">
                        <CheckCircle2 class="w-5 h-5 text-emerald-500 mx-auto" />
                        <p class="text-2xl font-black text-emerald-600 dark:text-emerald-400">{{ stats.hadir }}</p>
                        <p class="text-[11px] font-semibold text-muted-foreground">Hadir Tepat Waktu</p>
                    </CardContent>
                </Card>

                <Card class="border-border/60 shadow-sm backdrop-blur-xl bg-card/95">
                    <CardContent class="p-4 text-center space-y-1">
                        <AlertTriangle class="w-5 h-5 text-amber-500 mx-auto" />
                        <p class="text-2xl font-black text-amber-600 dark:text-amber-400">{{ stats.terlambat }}</p>
                        <p class="text-[11px] font-semibold text-muted-foreground">Terlambat</p>
                    </CardContent>
                </Card>

                <Card class="border-border/60 shadow-sm backdrop-blur-xl bg-card/95">
                    <CardContent class="p-4 text-center space-y-1">
                        <FileText class="w-5 h-5 text-sky-500 mx-auto" />
                        <p class="text-2xl font-black text-sky-600 dark:text-sky-400">{{ stats.izin }}</p>
                        <p class="text-[11px] font-semibold text-muted-foreground">Izin / Cuti</p>
                    </CardContent>
                </Card>

                <Card class="border-border/60 shadow-sm backdrop-blur-xl bg-card/95">
                    <CardContent class="p-4 text-center space-y-1">
                        <XCircle class="w-5 h-5 text-rose-500 mx-auto" />
                        <p class="text-2xl font-black text-rose-600 dark:text-rose-400">{{ stats.alpha }}</p>
                        <p class="text-[11px] font-semibold text-muted-foreground">Tanpa Keterangan</p>
                    </CardContent>
                </Card>
            </div>

            <!-- TPP Calculator Widget Card -->
            <Card v-if="tppSummary" class="border-teal-500/30 shadow-md backdrop-blur-xl bg-teal-500/10 dark:bg-teal-500/15">
                <CardHeader class="pb-3 flex-row items-center justify-between space-y-0">
                    <div class="flex items-center gap-2">
                        <Wallet class="w-5 h-5 text-teal-600 dark:text-teal-400" />
                        <CardTitle class="text-base font-bold text-teal-700 dark:text-teal-300">
                            Kalkulasi TPP Tambahan Penghasilan Pegawai
                        </CardTitle>
                    </div>
                    <Badge variant="outline" class="bg-teal-500/20 text-teal-600 dark:text-teal-300 border-teal-500/40 text-xs font-black">
                        Skor: {{ tppSummary.performance_score_percent }}%
                    </Badge>
                </CardHeader>
                <CardContent class="space-y-2 pt-0 text-xs text-muted-foreground">
                    <div class="flex items-center justify-between p-2.5 rounded-xl bg-background/80 border border-teal-500/20">
                        <span>Potongan TPP Terlambat</span>
                        <span class="font-mono font-bold text-amber-600 dark:text-amber-400">
                            -{{ tppSummary.late_deduction_percent }}%
                        </span>
                    </div>
                    <div class="flex items-center justify-between p-2.5 rounded-xl bg-background/80 border border-teal-500/20">
                        <span>Potongan TPP Alpha</span>
                        <span class="font-mono font-bold text-rose-600 dark:text-rose-400">
                            -{{ tppSummary.absent_deduction_percent }}%
                        </span>
                    </div>
                    <div class="flex items-center justify-between p-2.5 rounded-xl bg-teal-500/20 border border-teal-500/40 font-bold text-foreground">
                        <span>Total Akumulasi Potongan TPP</span>
                        <span class="font-mono text-sm" :class="tppSummary.total_deduction_percent > 0 ? 'text-rose-500' : 'text-emerald-500'">
                            -{{ tppSummary.total_deduction_percent }}%
                        </span>
                    </div>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>
