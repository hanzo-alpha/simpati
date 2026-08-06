<script setup lang="ts">
import { ref, computed } from 'vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import StatCard from '@/Components/StatCard.vue';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy, Award, Medal, Crown, Star, CheckCircle2, Clock, Users } from '@lucide/vue';

interface RankUser {
    id: number;
    name: string;
    opd?: string;
    rank: number;
    score: number;
    badge: string;
    hadir?: number;
    terlambat?: number;
    isMe?: boolean;
    details?: {
        kehadiran?: number;
        ketepatan?: number;
        kelengkapan?: number;
        durasi?: number;
        hadir_count?: number;
        terlambat_count?: number;
    };
}

const props = defineProps<{
    rankings: RankUser[];
    myRank: { rank: number; totalAsn: number; score: number; badge: string };
    isAdmin?: boolean;
}>();

const activePeriod = ref('month');

const periodTabs = [
    { label: 'Bulan Ini', value: 'month' },
    { label: 'Bulan Lalu', value: 'last_month' },
    { label: 'Tahun 2026', value: 'year' },
];

const topThree = computed(() => {
    return props.rankings.slice(0, 3);
});
</script>

<template>
    <component :is="isAdmin ? AdminLayout : AppLayout" title="Peringkat Kehadiran" subtitle="Leaderboard disiplin & performa presensi ASN Kabupaten Soppeng">
        <template #actions>
            <div class="flex items-center gap-1 bg-card p-1 rounded-none border border-border shadow-xs">
                <button
                    v-for="tab in periodTabs"
                    :key="tab.value"
                    @click="activePeriod = tab.value"
                    class="px-3.5 py-1.5 rounded-none text-xs font-semibold transition-all cursor-pointer"
                    :class="
                        activePeriod === tab.value
                            ? 'bg-primary text-primary-foreground font-bold'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    "
                >
                    {{ tab.label }}
                </button>
            </div>
        </template>

        <div class="space-y-6 pb-8">
            <!-- 1. KPI Stats Summary Cards (Sera Preset Stat Widgets) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    icon="alert"
                    label="Peringkat Presensi Anda"
                    :value="`#${myRank.rank}`"
                    :sub="`dari total ${myRank.totalAsn} ASN`"
                    color="teal"
                />
                <StatCard
                    icon="check"
                    label="Skor Performa Anda"
                    :value="`${myRank.score} Pts`"
                    sub="Skor komposit presensi"
                    color="green"
                />
                <StatCard
                    icon="file"
                    label="Lencana Disiplin"
                    :value="myRank.badge"
                    sub="Status evaluasi bulanan"
                    color="yellow"
                />
                <StatCard
                    icon="users"
                    label="Total ASN Evaluasi"
                    :value="`${myRank.totalAsn} ASN`"
                    sub="Pemkab Soppeng"
                    color="blue"
                />
            </div>

            <!-- 2. Podium Top 3 ASN Cards -->
            <div v-if="topThree.length > 0" class="space-y-3">
                <p class="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Podium 3 Terbaik Kehadiran ASN
                </p>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <!-- Juara 1 -->
                    <Card v-if="topThree[0]" class="rounded-none border border-amber-500/50 bg-card text-card-foreground shadow-xs border-t-2 border-t-amber-500 relative">
                        <div class="absolute -top-3 left-4 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider rounded-none shadow-xs flex items-center gap-1">
                            <Trophy class="w-3 h-3" />
                            <span>Peringkat #1 (Juara Utama)</span>
                        </div>
                        <CardContent class="p-5 pt-6 space-y-3">
                            <div class="flex items-center justify-between gap-2">
                                <div>
                                    <h4 class="text-sm font-bold text-foreground">{{ topThree[0].name }}</h4>
                                    <p class="text-xs text-muted-foreground">{{ topThree[0].opd || 'Pemkab Soppeng' }}</p>
                                </div>
                                <span class="text-xl font-bold font-mono text-amber-500">{{ topThree[0].score }} Pts</span>
                            </div>

                            <div class="flex items-center justify-between text-xs border-t border-border/50 pt-2.5 font-mono text-muted-foreground">
                                <span>Hadir Tepat Waktu: <strong class="text-emerald-500 font-bold">{{ topThree[0].hadir ?? topThree[0].details?.hadir_count ?? 0 }} Hari</strong></span>
                                <span>Terlambat: <strong class="text-amber-500 font-bold">{{ topThree[0].terlambat ?? topThree[0].details?.terlambat_count ?? 0 }} Hari</strong></span>
                            </div>
                        </CardContent>
                    </Card>

                    <!-- Juara 2 -->
                    <Card v-if="topThree[1]" class="rounded-none border border-slate-400/50 bg-card text-card-foreground shadow-xs border-t-2 border-t-slate-400 relative">
                        <div class="absolute -top-3 left-4 bg-slate-400 text-slate-950 text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider rounded-none shadow-xs flex items-center gap-1">
                            <Medal class="w-3 h-3" />
                            <span>Peringkat #2</span>
                        </div>
                        <CardContent class="p-5 pt-6 space-y-3">
                            <div class="flex items-center justify-between gap-2">
                                <div>
                                    <h4 class="text-sm font-bold text-foreground">{{ topThree[1].name }}</h4>
                                    <p class="text-xs text-muted-foreground">{{ topThree[1].opd || 'Pemkab Soppeng' }}</p>
                                </div>
                                <span class="text-xl font-bold font-mono text-slate-300">{{ topThree[1].score }} Pts</span>
                            </div>

                            <div class="flex items-center justify-between text-xs border-t border-border/50 pt-2.5 font-mono text-muted-foreground">
                                <span>Hadir Tepat Waktu: <strong class="text-emerald-500 font-bold">{{ topThree[1].hadir ?? topThree[1].details?.hadir_count ?? 0 }} Hari</strong></span>
                                <span>Terlambat: <strong class="text-amber-500 font-bold">{{ topThree[1].terlambat ?? topThree[1].details?.terlambat_count ?? 0 }} Hari</strong></span>
                            </div>
                        </CardContent>
                    </Card>

                    <!-- Juara 3 -->
                    <Card v-if="topThree[2]" class="rounded-none border border-amber-700/50 bg-card text-card-foreground shadow-xs border-t-2 border-t-amber-700 relative">
                        <div class="absolute -top-3 left-4 bg-amber-700 text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider rounded-none shadow-xs flex items-center gap-1">
                            <Award class="w-3 h-3" />
                            <span>Peringkat #3</span>
                        </div>
                        <CardContent class="p-5 pt-6 space-y-3">
                            <div class="flex items-center justify-between gap-2">
                                <div>
                                    <h4 class="text-sm font-bold text-foreground">{{ topThree[2].name }}</h4>
                                    <p class="text-xs text-muted-foreground">{{ topThree[2].opd || 'Pemkab Soppeng' }}</p>
                                </div>
                                <span class="text-xl font-bold font-mono text-amber-600">{{ topThree[2].score }} Pts</span>
                            </div>

                            <div class="flex items-center justify-between text-xs border-t border-border/50 pt-2.5 font-mono text-muted-foreground">
                                <span>Hadir Tepat Waktu: <strong class="text-emerald-500 font-bold">{{ topThree[2].hadir ?? topThree[2].details?.hadir_count ?? 0 }} Hari</strong></span>
                                <span>Terlambat: <strong class="text-amber-500 font-bold">{{ topThree[2].terlambat ?? topThree[2].details?.terlambat_count ?? 0 }} Hari</strong></span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <!-- 3. Full Leaderboard Data Table (Sera Style) -->
            <Card class="rounded-none border border-border bg-card text-card-foreground shadow-xs">
                <CardHeader class="p-5 border-b border-border/60">
                    <CardTitle class="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                        <Trophy class="w-4 h-4 text-emerald-500" />
                        <span>Daftar Leaderboard Peringkat Kehadiran ASN (Top 50)</span>
                    </CardTitle>
                </CardHeader>
                <CardContent class="p-0">
                    <div class="overflow-x-auto">
                        <table class="w-full text-xs">
                            <thead>
                                <tr class="text-left text-muted-foreground border-b border-border bg-muted/30">
                                    <th class="px-5 py-3.5 font-bold uppercase text-xs tracking-wider text-center w-20">Peringkat</th>
                                    <th class="px-5 py-3.5 font-bold uppercase text-xs tracking-wider">Nama Pegawai ASN</th>
                                    <th class="px-5 py-3.5 font-bold uppercase text-xs tracking-wider">OPD Utama</th>
                                    <th class="px-5 py-3.5 font-bold uppercase text-xs tracking-wider text-center">Hadir Tepat Waktu</th>
                                    <th class="px-5 py-3.5 font-bold uppercase text-xs tracking-wider text-center">Terlambat</th>
                                    <th class="px-5 py-3.5 font-bold uppercase text-xs tracking-wider text-center">Lencana</th>
                                    <th class="px-5 py-3.5 font-bold uppercase text-xs tracking-wider text-center">Skor Poin</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-border/40">
                                <tr
                                    v-for="(person, index) in rankings"
                                    :key="person.id"
                                    class="hover:bg-muted/40 transition-colors"
                                    :class="{ 'bg-emerald-500/10 dark:bg-emerald-500/15 font-bold': person.isMe }"
                                >
                                    <td class="px-5 py-3.5 text-center">
                                        <div
                                            class="w-8 h-7 mx-auto rounded-none flex items-center justify-center font-bold font-mono text-xs border"
                                            :class="
                                                index === 0
                                                    ? 'bg-amber-500 text-white border-amber-600'
                                                    : index === 1
                                                    ? 'bg-slate-300 dark:bg-slate-700 text-slate-900 dark:text-white border-slate-400'
                                                    : index === 2
                                                    ? 'bg-amber-700 text-white border-amber-800'
                                                    : 'bg-muted text-muted-foreground border-border'
                                            "
                                        >
                                            <Trophy v-if="index === 0" class="w-3.5 h-3.5" />
                                            <span v-else>#{{ index + 1 }}</span>
                                        </div>
                                    </td>
                                    <td class="px-5 py-3.5">
                                        <div class="flex items-center gap-2">
                                            <span class="font-bold text-foreground text-xs">{{ person.name }}</span>
                                            <Badge v-if="person.isMe" variant="default" class="text-[9px] px-1.5 py-0 rounded-none bg-emerald-600">Anda</Badge>
                                        </div>
                                    </td>
                                    <td class="px-5 py-3.5 text-muted-foreground text-xs">{{ person.opd || 'Pemkab Soppeng' }}</td>
                                    <td class="px-5 py-3.5 text-center font-mono font-bold text-emerald-600 dark:text-emerald-400 text-xs">
                                        {{ person.hadir ?? person.details?.hadir_count ?? 0 }} Hari
                                    </td>
                                    <td class="px-5 py-3.5 text-center font-mono font-bold text-amber-600 dark:text-amber-400 text-xs">
                                        {{ person.terlambat ?? person.details?.terlambat_count ?? 0 }} Hari
                                    </td>
                                    <td class="px-5 py-3.5 text-center">
                                        <Badge
                                            variant="outline"
                                            class="text-[10px] font-semibold px-2 py-0.5 rounded-none"
                                            :class="person.badge.includes('Sangat Baik') || person.badge.includes('Unggul') ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'border-border text-muted-foreground'"
                                        >
                                            {{ person.badge || 'Baik' }}
                                        </Badge>
                                    </td>
                                    <td class="px-5 py-3.5 text-center font-mono font-bold text-primary text-sm">
                                        {{ person.score }} Pts
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    </component>
</template>
