<script setup lang="ts">
import { ref, computed } from 'vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, ChevronLeft, ChevronRight, Clock, Filter, CheckCircle2, AlertTriangle } from '@lucide/vue';

interface AttendanceRecord {
    id: number;
    jenis: string;
    waktu: string;
    status: string;
    is_late: boolean;
    status_label: string;
}

const props = defineProps<{
    attendances: Record<string, AttendanceRecord[]>;
    summary?: { totalDays?: number; hadir?: number; terlambat?: number; izin?: number };
    month?: number;
    year?: number;
}>();

const showFilter = ref(false);
const expandedDates = ref<Record<string, boolean>>({});

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

const toggleExpand = (date: string) => {
    expandedDates.value[date] = !expandedDates.value[date];
};

const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
    });
};
</script>

<template>
    <AppLayout>
        <div class="max-w-2xl mx-auto space-y-6 pb-8">
            <!-- Page Header & Month Navigator Card -->
            <Card class="border-border/60 shadow-md backdrop-blur-xl bg-card/95">
                <CardHeader class="pb-3 flex-row items-center justify-between space-y-0">
                    <div>
                        <CardTitle class="text-xl font-extrabold flex items-center gap-2">
                            <Calendar class="w-5 h-5 text-teal-600 dark:text-teal-400" />
                            <span>Riwayat Kehadiran</span>
                        </CardTitle>
                        <p class="text-xs text-muted-foreground mt-0.5">Catatan presensi harian ASN</p>
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

                <CardContent class="pt-0 border-t border-border/40 mt-2">
                    <div class="flex items-center justify-around text-xs text-muted-foreground pt-3 font-semibold">
                        <span class="text-emerald-600 dark:text-emerald-400 font-bold">Hadir: {{ summary?.hadir || 0 }}</span>
                        <span class="text-amber-600 dark:text-amber-400 font-bold">Terlambat: {{ summary?.terlambat || 0 }}</span>
                        <span class="text-sky-600 dark:text-sky-400 font-bold">Izin/Cuti: {{ summary?.izin || 0 }}</span>
                    </div>
                </CardContent>
            </Card>

            <!-- Attendance Records List -->
            <div class="space-y-3">
                <div v-if="!attendances || Object.keys(attendances).length === 0" class="text-center py-12 text-muted-foreground space-y-2">
                    <Clock class="w-10 h-10 mx-auto text-muted-foreground/40" />
                    <p class="text-sm font-medium">Belum ada catatan presensi bulan ini.</p>
                </div>

                <Card
                    v-for="(records, date) in attendances"
                    :key="date"
                    class="border-border/60 shadow-sm hover:shadow-md transition-all backdrop-blur-xl bg-card/95 overflow-hidden"
                >
                    <CardHeader
                        @click="toggleExpand(date)"
                        class="p-4 cursor-pointer hover:bg-muted/30 transition-colors flex-row items-center justify-between space-y-0"
                    >
                        <div class="flex items-center gap-3">
                            <div class="w-9 h-9 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-600 dark:text-teal-400 font-bold">
                                <Clock class="w-4 h-4" />
                            </div>
                            <div>
                                <CardTitle class="text-xs font-bold text-foreground">
                                    {{ formatDate(date) }}
                                </CardTitle>
                                <p class="text-[10px] text-muted-foreground font-mono">{{ date }}</p>
                            </div>
                        </div>

                        <Badge variant="outline" class="text-[10px] font-semibold bg-muted/60">
                            {{ records.length }} Log Presensi
                        </Badge>
                    </CardHeader>

                    <CardContent class="p-4 pt-0 border-t border-border/40 space-y-2 bg-muted/20">
                        <div
                            v-for="r in records"
                            :key="r.id"
                            class="flex items-center justify-between p-2.5 rounded-xl bg-card border border-border/40 text-xs"
                        >
                            <div class="flex items-center gap-2">
                                <span class="capitalize font-semibold text-foreground">{{ r.jenis }}</span>
                                <span class="font-mono text-teal-600 dark:text-teal-400 font-bold">@ {{ r.waktu }}</span>
                            </div>
                            <Badge
                                :variant="r.is_late ? 'outline' : 'default'"
                                class="text-[10px] font-semibold uppercase px-2 py-0.5"
                                :class="{
                                    'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30': !r.is_late,
                                    'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30': r.is_late,
                                }"
                            >
                                {{ r.status_label || r.status }}
                            </Badge>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </AppLayout>
</template>
