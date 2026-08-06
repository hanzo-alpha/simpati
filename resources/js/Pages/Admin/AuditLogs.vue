<script setup lang="ts">
import {
    ShieldAlert,
    Smartphone,
    AlertTriangle,
    MapPin,
    ShieldCheck,
} from '@lucide/vue';
import { ref, computed } from 'vue';
import Pagination from '@/Components/Pagination.vue';
import { Badge } from '@/Components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/Components/ui/card';
import AdminLayout from '@/Layouts/AdminLayout.vue';

interface Office {
    opd_name?: string;
}

interface User {
    name?: string;
    office?: Office;
}

interface AuditAttendance {
    id: number;
    tanggal: string;
    waktu: string;
    user?: User;
    jenis: string;
    status: string;
    latitude?: number;
    longitude?: number;
}

interface SummaryProps {
    total_bound_devices: number;
    unbound_devices: number;
    out_of_radius_count: number;
    pending_approval_count: number;
}

const props = withDefaults(
    defineProps<{
        summary?: SummaryProps;
        outOfRadiusAtts?: AuditAttendance[];
    }>(),
    {
        summary: () => ({
            total_bound_devices: 0,
            unbound_devices: 0,
            out_of_radius_count: 0,
            pending_approval_count: 0,
        }),
        outOfRadiusAtts: () => [],
    },
);

const currentPage = ref(1);
const itemsPerPage = 10;

const paginatedLogs = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;

    return props.outOfRadiusAtts.slice(start, start + itemsPerPage);
});
</script>

<template>
    <AdminLayout
        title="Audit Log Keamanan"
        subtitle="Monitoring riwayat kecurangan & integritas presensi"
    >
        <!-- Security Summary Cards -->
        <div class="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <Card
                class="border-border/60 bg-card/95 shadow-md backdrop-blur-xl"
            >
                <CardContent class="flex items-center justify-between p-5">
                    <div>
                        <p class="text-xs font-semibold text-muted-foreground">
                            Perangkat HP Terikat
                        </p>
                        <p
                            class="mt-1 text-2xl font-black text-teal-600 dark:text-teal-400"
                        >
                            {{ summary.total_bound_devices }}
                        </p>
                        <p
                            class="mt-0.5 text-[10px] font-medium text-muted-foreground"
                        >
                            Single Device Lock Active
                        </p>
                    </div>
                    <div
                        class="flex h-10 w-10 items-center justify-center rounded-2xl border border-teal-500/30 bg-teal-500/15 text-teal-600 dark:text-teal-400"
                    >
                        <Smartphone class="h-5 w-5" />
                    </div>
                </CardContent>
            </Card>

            <Card
                class="border-border/60 bg-card/95 shadow-md backdrop-blur-xl"
            >
                <CardContent class="flex items-center justify-between p-5">
                    <div>
                        <p class="text-xs font-semibold text-muted-foreground">
                            HP Belum Terikat
                        </p>
                        <p
                            class="mt-1 text-2xl font-black text-amber-600 dark:text-amber-400"
                        >
                            {{ summary.unbound_devices }}
                        </p>
                        <p
                            class="mt-0.5 text-[10px] font-medium text-muted-foreground"
                        >
                            Free Login Device
                        </p>
                    </div>
                    <div
                        class="flex h-10 w-10 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/15 text-amber-600 dark:text-amber-400"
                    >
                        <AlertTriangle class="h-5 w-5" />
                    </div>
                </CardContent>
            </Card>

            <Card
                class="border-border/60 bg-card/95 shadow-md backdrop-blur-xl"
            >
                <CardContent class="flex items-center justify-between p-5">
                    <div>
                        <p class="text-xs font-semibold text-muted-foreground">
                            Presensi Luar Radius
                        </p>
                        <p
                            class="mt-1 text-2xl font-black text-rose-600 dark:text-rose-400"
                        >
                            {{ summary.out_of_radius_count }}
                        </p>
                        <p
                            class="mt-0.5 text-[10px] font-medium text-muted-foreground"
                        >
                            Di Luar Geofence Kantor
                        </p>
                    </div>
                    <div
                        class="flex h-10 w-10 items-center justify-center rounded-2xl border border-rose-500/30 bg-rose-500/15 text-rose-600 dark:text-rose-400"
                    >
                        <ShieldAlert class="h-5 w-5" />
                    </div>
                </CardContent>
            </Card>

            <Card
                class="border-border/60 bg-card/95 shadow-md backdrop-blur-xl"
            >
                <CardContent class="flex items-center justify-between p-5">
                    <div>
                        <p class="text-xs font-semibold text-muted-foreground">
                            Pending Approval Atasan
                        </p>
                        <p
                            class="mt-1 text-2xl font-black text-sky-600 dark:text-sky-400"
                        >
                            {{ summary.pending_approval_count }}
                        </p>
                        <p
                            class="mt-0.5 text-[10px] font-medium text-muted-foreground"
                        >
                            Dinas Luar / WFH
                        </p>
                    </div>
                    <div
                        class="flex h-10 w-10 items-center justify-center rounded-2xl border border-sky-500/30 bg-sky-500/15 text-sky-600 dark:text-sky-400"
                    >
                        <ShieldCheck class="h-5 w-5" />
                    </div>
                </CardContent>
            </Card>
        </div>

        <!-- Logs Table Card -->
        <Card class="border-border/60 bg-card/95 shadow-md backdrop-blur-xl rounded-2xl overflow-hidden">
            <CardHeader
                class="flex-row items-center justify-between space-y-0 border-b border-border pb-3"
            >
                <CardTitle class="flex items-center gap-2 text-base font-bold">
                    <ShieldAlert class="h-4 w-4 text-rose-500" />
                    <span>Riwayat Presensi Di Luar Radius Geofence</span>
                </CardTitle>
                <Badge
                    variant="outline"
                    class="border-rose-500/30 bg-rose-500/10 text-[10px] font-bold text-rose-600 uppercase dark:text-rose-400"
                >
                    Audit System Active
                </Badge>
            </CardHeader>
            <CardContent class="p-0">
                <div class="overflow-x-auto">
                    <table class="w-full text-xs">
                        <thead>
                            <tr
                                class="border-b border-border/60 bg-muted/40 text-left text-xs uppercase tracking-wider font-semibold text-muted-foreground"
                            >
                                <th
                                    class="w-12 px-5 py-3.5 text-center font-semibold"
                                >
                                    #
                                </th>
                                <th class="px-5 py-3.5 font-semibold">
                                    Waktu Presensi
                                </th>
                                <th class="px-5 py-3.5 font-semibold">
                                    Nama Pegawai ASN
                                </th>
                                <th class="px-5 py-3.5 font-semibold">
                                    OPD Utama
                                </th>
                                <th
                                    class="px-5 py-3.5 text-center font-semibold"
                                >
                                    Jenis
                                </th>
                                <th
                                    class="px-5 py-3.5 text-center font-semibold"
                                >
                                    Status Audit
                                </th>
                                <th
                                    class="px-5 py-3.5 text-center font-semibold"
                                >
                                    Koordinat GPS
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-border/40">
                            <tr
                                v-for="(att, i) in paginatedLogs"
                                :key="att.id"
                                class="transition-colors hover:bg-muted/40"
                            >
                                <td
                                    class="px-5 py-3.5 text-center font-mono text-muted-foreground"
                                >
                                    {{
                                        (currentPage - 1) * itemsPerPage + i + 1
                                    }}
                                </td>
                                <td
                                    class="px-5 py-3.5 font-mono text-[11px] text-muted-foreground"
                                >
                                    {{ att.tanggal }} {{ att.waktu }}
                                </td>
                                <td class="px-5 py-3.5">
                                    <p class="font-bold text-foreground">
                                        {{ att.user?.name || 'ASN' }}
                                    </p>
                                </td>
                                <td class="px-5 py-3.5 text-muted-foreground">
                                    {{ att.user?.office?.opd_name || '-' }}
                                </td>
                                <td class="px-5 py-3.5 text-center">
                                    <Badge
                                        variant="outline"
                                        class="text-[10px] font-semibold uppercase"
                                    >
                                        {{ att.jenis }}
                                    </Badge>
                                </td>
                                <td class="px-5 py-3.5 text-center">
                                    <Badge
                                        variant="destructive"
                                        class="text-[10px] font-semibold uppercase"
                                    >
                                        {{ att.status }}
                                    </Badge>
                                </td>
                                <td
                                    class="px-5 py-3.5 text-center font-mono text-[11px] text-muted-foreground"
                                >
                                    <span
                                        v-if="att.latitude && att.longitude"
                                        class="flex items-center justify-center gap-1"
                                    >
                                        <MapPin
                                            class="h-3 w-3 shrink-0 text-rose-500"
                                        />
                                        <span
                                            >{{ att.latitude }},
                                            {{ att.longitude }}</span
                                        >
                                    </span>
                                    <span v-else>-</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div
                        v-if="!outOfRadiusAtts.length"
                        class="space-y-2 py-10 text-center text-muted-foreground"
                    >
                        <ShieldCheck
                            class="mx-auto h-8 w-8 text-emerald-500/50"
                        />
                        <p>
                            Tidak ditemukan indikasi presensi di luar radius
                            kantor hari ini.
                        </p>
                    </div>

                    <Pagination
                        v-if="outOfRadiusAtts.length > 0"
                        v-model:currentPage="currentPage"
                        :totalItems="outOfRadiusAtts.length"
                        :itemsPerPage="itemsPerPage"
                    />
                </div>
            </CardContent>
        </Card>
    </AdminLayout>
</template>
