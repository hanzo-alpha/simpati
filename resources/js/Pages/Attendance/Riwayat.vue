<script setup lang="ts">
import {
    Calendar,
    ChevronLeft,
    ChevronRight,
    Clock,
    Filter,
    CheckCircle2,
    AlertTriangle,
} from '@lucide/vue';
import { ref, computed } from 'vue';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/Components/ui/card';
import AppLayout from '@/Layouts/AppLayout.vue';

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
    summary?: {
        totalDays?: number;
        hadir?: number;
        terlambat?: number;
        izin?: number;
    };
    month?: number;
    year?: number;
}>();

const showFilter = ref(false);
const expandedDates = ref<Record<string, boolean>>({});

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
        <div class="mx-auto max-w-2xl space-y-6 pb-8">
            <!-- Page Header & Month Navigator Card -->
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
                            <Calendar
                                class="h-5 w-5 text-teal-600 dark:text-teal-400"
                            />
                            <span>Riwayat Kehadiran</span>
                        </CardTitle>
                        <p class="mt-0.5 text-xs text-muted-foreground">
                            Catatan presensi harian ASN
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

                <CardContent class="mt-2 border-t border-border/40 pt-0">
                    <div
                        class="flex items-center justify-around pt-3 text-xs font-semibold text-muted-foreground"
                    >
                        <span
                            class="font-bold text-emerald-600 dark:text-emerald-400"
                            >Hadir: {{ summary?.hadir || 0 }}</span
                        >
                        <span
                            class="font-bold text-amber-600 dark:text-amber-400"
                            >Terlambat: {{ summary?.terlambat || 0 }}</span
                        >
                        <span class="font-bold text-sky-600 dark:text-sky-400"
                            >Izin/Cuti: {{ summary?.izin || 0 }}</span
                        >
                    </div>
                </CardContent>
            </Card>

            <!-- Attendance Records List -->
            <div class="space-y-3">
                <div
                    v-if="!attendances || Object.keys(attendances).length === 0"
                    class="space-y-2 py-12 text-center text-muted-foreground"
                >
                    <Clock class="mx-auto h-10 w-10 text-muted-foreground/40" />
                    <p class="text-sm font-medium">
                        Belum ada catatan presensi bulan ini.
                    </p>
                </div>

                <Card
                    v-for="(records, date) in attendances"
                    :key="date"
                    class="overflow-hidden border-border/60 bg-card/95 shadow-sm backdrop-blur-xl transition-all hover:shadow-md"
                >
                    <CardHeader
                        @click="toggleExpand(date)"
                        class="cursor-pointer flex-row items-center justify-between space-y-0 p-4 transition-colors hover:bg-muted/30"
                    >
                        <div class="flex items-center gap-3">
                            <div
                                class="flex h-9 w-9 items-center justify-center rounded-xl border border-teal-500/30 bg-teal-500/15 font-bold text-teal-600 dark:text-teal-400"
                            >
                                <Clock class="h-4 w-4" />
                            </div>
                            <div>
                                <CardTitle
                                    class="text-xs font-bold text-foreground"
                                >
                                    {{ formatDate(date) }}
                                </CardTitle>
                                <p
                                    class="font-mono text-[10px] text-muted-foreground"
                                >
                                    {{ date }}
                                </p>
                            </div>
                        </div>

                        <Badge
                            variant="outline"
                            class="bg-muted/60 text-[10px] font-semibold"
                        >
                            {{ records.length }} Log Presensi
                        </Badge>
                    </CardHeader>

                    <CardContent
                        class="space-y-2 border-t border-border/40 bg-muted/20 p-4 pt-0"
                    >
                        <div
                            v-for="r in records"
                            :key="r.id"
                            class="flex items-center justify-between rounded-xl border border-border/40 bg-card p-2.5 text-xs"
                        >
                            <div class="flex items-center gap-2">
                                <span
                                    class="font-semibold text-foreground capitalize"
                                    >{{ r.jenis }}</span
                                >
                                <span
                                    class="font-mono font-bold text-teal-600 dark:text-teal-400"
                                    >@ {{ r.waktu }}</span
                                >
                            </div>
                            <Badge
                                :variant="r.is_late ? 'outline' : 'default'"
                                class="px-2 py-0.5 text-[10px] font-semibold uppercase"
                                :class="{
                                    'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400':
                                        !r.is_late,
                                    'border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400':
                                        r.is_late,
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
