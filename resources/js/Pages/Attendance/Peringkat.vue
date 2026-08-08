<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import {
    Trophy,
    Award,
    Medal,
    Crown,
    Star,
    CheckCircle2,
    Clock,
    Users,
    Search,
} from '@lucide/vue';
import { ref, computed } from 'vue';
import Pagination from '@/Components/Pagination.vue';
import StatCard from '@/Components/StatCard.vue';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import AppLayout from '@/Layouts/AppLayout.vue';

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
    filters?: { period?: string; month?: number; year?: number };
    isAdmin?: boolean;
}>();

const activePeriod = ref(props.filters?.period || 'month');
const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(10);

const periodTabs = [
    { label: 'Bulan Ini', value: 'month' },
    { label: 'Bulan Lalu', value: 'last_month' },
    { label: 'Tahun 2026', value: 'year' },
];

const changePeriod = (val: string) => {
    activePeriod.value = val;
    currentPage.value = 1;
    const path = typeof window !== 'undefined' ? window.location.pathname : '/peringkat';
    router.get(
        path,
        { period: val },
        { preserveState: true, preserveScroll: true, replace: true },
    );
};

const filteredRankings = computed(() => {
    let result = props.rankings;
    if (searchQuery.value.trim()) {
        const query = searchQuery.value.toLowerCase();
        result = result.filter(
            (p) =>
                p.name.toLowerCase().includes(query) ||
                (p.opd && p.opd.toLowerCase().includes(query)),
        );
    }
    return result;
});

const paginatedRankings = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return filteredRankings.value.slice(start, end);
});

const topThree = computed(() => {
    return props.rankings.slice(0, 3);
});
</script>

<template>
    <component
        :is="isAdmin ? AdminLayout : AppLayout"
        title="Peringkat Kehadiran"
        subtitle="Leaderboard disiplin & performa presensi ASN Kabupaten Soppeng"
    >
        <template #actions>
            <div
                class="flex items-center gap-1 rounded-none border border-border bg-card p-1 shadow-xs"
            >
                <button
                    v-for="tab in periodTabs"
                    :key="tab.value"
                    @click="changePeriod(tab.value)"
                    class="cursor-pointer rounded-none px-3.5 py-1.5 text-xs font-semibold transition-all"
                    :class="
                        activePeriod === tab.value
                            ? 'bg-primary font-bold text-primary-foreground'
                            : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    "
                >
                    {{ tab.label }}
                </button>
            </div>
        </template>

        <div class="space-y-6 pb-6">
            <!-- 1. KPI Stats Summary Cards (Sera Preset Stat Widgets) -->
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
                <p
                    class="text-xs font-bold tracking-wider text-muted-foreground uppercase"
                >
                    Podium 3 Terbaik Kehadiran ASN
                </p>

                <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <!-- Juara 1 -->
                    <Card
                        v-if="topThree[0]"
                        class="relative rounded-none border border-t-2 border-amber-500/50 border-t-amber-500 bg-card text-card-foreground shadow-xs"
                    >
                        <div
                            class="absolute -top-3 left-4 flex items-center gap-1 rounded-none bg-amber-500 px-2 py-0.5 text-[10px] font-bold tracking-wider text-white uppercase shadow-xs"
                        >
                            <Trophy class="h-3 w-3" />
                            <span>Peringkat #1 (Juara Utama)</span>
                        </div>
                        <CardContent class="space-y-3 p-5 pt-6">
                            <div
                                class="flex items-center justify-between gap-2"
                            >
                                <div>
                                    <h4
                                        class="text-sm font-bold text-foreground"
                                    >
                                        {{ topThree[0].name }}
                                    </h4>
                                    <p class="text-xs text-muted-foreground">
                                        {{
                                            topThree[0].opd || 'Pemkab Soppeng'
                                        }}
                                    </p>
                                </div>
                                <span
                                    class="font-mono text-xl font-bold text-amber-500"
                                    >{{ topThree[0].score }} Pts</span
                                >
                            </div>

                            <div
                                class="flex items-center justify-between border-t border-border/50 pt-2.5 font-mono text-xs text-muted-foreground"
                            >
                                <span
                                    >Hadir Tepat Waktu:
                                    <strong class="font-bold text-emerald-500"
                                        >{{
                                            topThree[0].hadir ??
                                            topThree[0].details?.hadir_count ??
                                            0
                                        }}
                                        Hari</strong
                                    ></span
                                >
                                <span
                                    >Terlambat:
                                    <strong class="font-bold text-amber-500"
                                        >{{
                                            topThree[0].terlambat ??
                                            topThree[0].details
                                                ?.terlambat_count ??
                                            0
                                        }}
                                        Hari</strong
                                    ></span
                                >
                            </div>
                        </CardContent>
                    </Card>

                    <!-- Juara 2 -->
                    <Card
                        v-if="topThree[1]"
                        class="relative rounded-none border border-t-2 border-slate-400/50 border-t-slate-400 bg-card text-card-foreground shadow-xs"
                    >
                        <div
                            class="absolute -top-3 left-4 flex items-center gap-1 rounded-none bg-slate-400 px-2 py-0.5 text-[10px] font-bold tracking-wider text-slate-950 uppercase shadow-xs"
                        >
                            <Medal class="h-3 w-3" />
                            <span>Peringkat #2</span>
                        </div>
                        <CardContent class="space-y-3 p-5 pt-6">
                            <div
                                class="flex items-center justify-between gap-2"
                            >
                                <div>
                                    <h4
                                        class="text-sm font-bold text-foreground"
                                    >
                                        {{ topThree[1].name }}
                                    </h4>
                                    <p class="text-xs text-muted-foreground">
                                        {{
                                            topThree[1].opd || 'Pemkab Soppeng'
                                        }}
                                    </p>
                                </div>
                                <span
                                    class="font-mono text-xl font-bold text-slate-300"
                                    >{{ topThree[1].score }} Pts</span
                                >
                            </div>

                            <div
                                class="flex items-center justify-between border-t border-border/50 pt-2.5 font-mono text-xs text-muted-foreground"
                            >
                                <span
                                    >Hadir Tepat Waktu:
                                    <strong class="font-bold text-emerald-500"
                                        >{{
                                            topThree[1].hadir ??
                                            topThree[1].details?.hadir_count ??
                                            0
                                        }}
                                        Hari</strong
                                    ></span
                                >
                                <span
                                    >Terlambat:
                                    <strong class="font-bold text-amber-500"
                                        >{{
                                            topThree[1].terlambat ??
                                            topThree[1].details
                                                ?.terlambat_count ??
                                            0
                                        }}
                                        Hari</strong
                                    ></span
                                >
                            </div>
                        </CardContent>
                    </Card>

                    <!-- Juara 3 -->
                    <Card
                        v-if="topThree[2]"
                        class="relative rounded-none border border-t-2 border-amber-700/50 border-t-amber-700 bg-card text-card-foreground shadow-xs"
                    >
                        <div
                            class="absolute -top-3 left-4 flex items-center gap-1 rounded-none bg-amber-700 px-2 py-0.5 text-[10px] font-bold tracking-wider text-white uppercase shadow-xs"
                        >
                            <Award class="h-3 w-3" />
                            <span>Peringkat #3</span>
                        </div>
                        <CardContent class="space-y-3 p-5 pt-6">
                            <div
                                class="flex items-center justify-between gap-2"
                            >
                                <div>
                                    <h4
                                        class="text-sm font-bold text-foreground"
                                    >
                                        {{ topThree[2].name }}
                                    </h4>
                                    <p class="text-xs text-muted-foreground">
                                        {{
                                            topThree[2].opd || 'Pemkab Soppeng'
                                        }}
                                    </p>
                                </div>
                                <span
                                    class="font-mono text-xl font-bold text-amber-600"
                                    >{{ topThree[2].score }} Pts</span
                                >
                            </div>

                            <div
                                class="flex items-center justify-between border-t border-border/50 pt-2.5 font-mono text-xs text-muted-foreground"
                            >
                                <span
                                    >Hadir Tepat Waktu:
                                    <strong class="font-bold text-emerald-500"
                                        >{{
                                            topThree[2].hadir ??
                                            topThree[2].details?.hadir_count ??
                                            0
                                        }}
                                        Hari</strong
                                    ></span
                                >
                                <span
                                    >Terlambat:
                                    <strong class="font-bold text-amber-500"
                                        >{{
                                            topThree[2].terlambat ??
                                            topThree[2].details
                                                ?.terlambat_count ??
                                            0
                                        }}
                                        Hari</strong
                                    ></span
                                >
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <!-- 3. Full Leaderboard Data Table (Sera Style) -->
            <Card
                class="rounded-none border border-border bg-card text-card-foreground shadow-xs"
            >
                <CardHeader
                    class="flex flex-col gap-4 border-b border-border/60 p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                    <CardTitle
                        class="flex items-center gap-2 text-xs font-bold tracking-wider text-foreground uppercase"
                    >
                        <Trophy class="h-4 w-4 text-emerald-500" />
                        <span
                            >Daftar Leaderboard Peringkat Kehadiran ASN ({{ filteredRankings.length }} Pegawai)</span
                        >
                    </CardTitle>

                    <div class="relative w-full sm:w-64">
                        <Search
                            class="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground"
                        />
                        <Input
                            v-model="searchQuery"
                            placeholder="Cari nama ASN / OPD..."
                            class="h-8 rounded-none border-border bg-background pl-9 text-xs"
                            @input="currentPage = 1"
                        />
                    </div>
                </CardHeader>
                <CardContent class="p-0">
                    <div class="overflow-x-auto">
                        <table class="w-full text-xs">
                            <thead>
                                <tr
                                    class="border-b border-border bg-muted/30 text-left text-muted-foreground"
                                >
                                    <th
                                        class="w-20 px-5 py-3.5 text-center text-xs font-bold tracking-wider uppercase"
                                    >
                                        Peringkat
                                    </th>
                                    <th
                                        class="px-5 py-3.5 text-xs font-bold tracking-wider uppercase"
                                    >
                                        Nama Pegawai ASN
                                    </th>
                                    <th
                                        class="px-5 py-3.5 text-xs font-bold tracking-wider uppercase"
                                    >
                                        OPD Utama
                                    </th>
                                    <th
                                        class="px-5 py-3.5 text-center text-xs font-bold tracking-wider uppercase"
                                    >
                                        Hadir Tepat Waktu
                                    </th>
                                    <th
                                        class="px-5 py-3.5 text-center text-xs font-bold tracking-wider uppercase"
                                    >
                                        Terlambat
                                    </th>
                                    <th
                                        class="px-5 py-3.5 text-center text-xs font-bold tracking-wider uppercase"
                                    >
                                        Lencana
                                    </th>
                                    <th
                                        class="px-5 py-3.5 text-center text-xs font-bold tracking-wider uppercase"
                                    >
                                        Skor Poin
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-border/40">
                                <tr
                                    v-for="(person, index) in paginatedRankings"
                                    :key="person.id"
                                    class="transition-colors hover:bg-muted/40"
                                    :class="{
                                        'bg-emerald-500/10 font-bold dark:bg-emerald-500/15':
                                            person.isMe,
                                    }"
                                >
                                    <td class="px-5 py-3.5 text-center">
                                        <div
                                            class="mx-auto flex h-7 w-8 items-center justify-center rounded-none border font-mono text-xs font-bold"
                                            :class="
                                                (currentPage - 1) * itemsPerPage + index === 0
                                                    ? 'border-amber-600 bg-amber-500 text-white'
                                                    : (currentPage - 1) * itemsPerPage + index === 1
                                                      ? 'border-slate-400 bg-slate-300 text-slate-900 dark:bg-slate-700 dark:text-white'
                                                      : (currentPage - 1) * itemsPerPage + index === 2
                                                        ? 'border-amber-800 bg-amber-700 text-white'
                                                        : 'border-border bg-muted text-muted-foreground'
                                            "
                                        >
                                            <Trophy
                                                v-if="(currentPage - 1) * itemsPerPage + index === 0"
                                                class="h-3.5 w-3.5"
                                            />
                                            <span v-else>#{{ (currentPage - 1) * itemsPerPage + index + 1 }}</span>
                                        </div>
                                    </td>
                                    <td class="px-5 py-3.5">
                                        <div class="flex items-center gap-2">
                                            <span
                                                class="text-xs font-bold text-foreground"
                                                >{{ person.name }}</span
                                            >
                                            <Badge
                                                v-if="person.isMe"
                                                variant="default"
                                                class="rounded-none bg-emerald-600 px-1.5 py-0 text-[9px]"
                                                >Anda</Badge
                                            >
                                        </div>
                                    </td>
                                    <td
                                        class="px-5 py-3.5 text-xs text-muted-foreground"
                                    >
                                        {{ person.opd || 'Pemkab Soppeng' }}
                                    </td>
                                    <td
                                        class="px-5 py-3.5 text-center font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400"
                                    >
                                        {{
                                            person.hadir ??
                                            person.details?.hadir_count ??
                                            0
                                        }}
                                        Hari
                                    </td>
                                    <td
                                        class="px-5 py-3.5 text-center font-mono text-xs font-bold text-amber-600 dark:text-amber-400"
                                    >
                                        {{
                                            person.terlambat ??
                                            person.details?.terlambat_count ??
                                            0
                                        }}
                                        Hari
                                    </td>
                                    <td class="px-5 py-3.5 text-center">
                                        <Badge
                                            variant="outline"
                                            class="rounded-none px-2 py-0.5 text-[10px] font-semibold"
                                            :class="
                                                person.badge.includes(
                                                    'Sangat Baik',
                                                ) ||
                                                person.badge.includes('Unggul')
                                                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                                    : 'border-border text-muted-foreground'
                                            "
                                        >
                                            {{ person.badge || 'Baik' }}
                                        </Badge>
                                    </td>
                                    <td
                                        class="px-5 py-3.5 text-center font-mono text-sm font-bold text-primary"
                                    >
                                        {{ person.score }} Pts
                                    </td>
                                </tr>

                                <tr v-if="!filteredRankings.length">
                                    <td
                                        colspan="7"
                                        class="py-10 text-center text-xs text-muted-foreground"
                                    >
                                        Tidak ada data peringkat ASN yang sesuai pencarian.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div
                        v-if="filteredRankings.length > 0"
                        class="border-t border-border p-4"
                    >
                        <Pagination
                            v-model:currentPage="currentPage"
                            :totalItems="filteredRankings.length"
                            :itemsPerPage="itemsPerPage"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    </component>
</template>
