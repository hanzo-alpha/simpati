<script setup lang="ts">
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Pagination from '@/Components/Pagination.vue';
import { ShieldAlert, Smartphone, AlertTriangle, MapPin, ShieldCheck } from '@lucide/vue';
import { ref, computed } from 'vue';

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
    }
);

const currentPage = ref(1);
const itemsPerPage = 10;

const paginatedLogs = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return props.outOfRadiusAtts.slice(start, start + itemsPerPage);
});
</script>

<template>
    <AdminLayout title="Audit Log Keamanan" subtitle="Monitoring riwayat kecurangan & integritas presensi">
        <!-- Security Summary Cards -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card class="border-border/60 shadow-md backdrop-blur-xl bg-card/95">
                <CardContent class="p-5 flex items-center justify-between">
                    <div>
                        <p class="text-xs text-muted-foreground font-semibold">Perangkat HP Terikat</p>
                        <p class="text-2xl font-black text-teal-600 dark:text-teal-400 mt-1">
                            {{ summary.total_bound_devices }}
                        </p>
                        <p class="text-[10px] text-muted-foreground mt-0.5 font-medium">Single Device Lock Active</p>
                    </div>
                    <div class="w-10 h-10 rounded-2xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-600 dark:text-teal-400">
                        <Smartphone class="w-5 h-5" />
                    </div>
                </CardContent>
            </Card>

            <Card class="border-border/60 shadow-md backdrop-blur-xl bg-card/95">
                <CardContent class="p-5 flex items-center justify-between">
                    <div>
                        <p class="text-xs text-muted-foreground font-semibold">HP Belum Terikat</p>
                        <p class="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">
                            {{ summary.unbound_devices }}
                        </p>
                        <p class="text-[10px] text-muted-foreground mt-0.5 font-medium">Free Login Device</p>
                    </div>
                    <div class="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                        <AlertTriangle class="w-5 h-5" />
                    </div>
                </CardContent>
            </Card>

            <Card class="border-border/60 shadow-md backdrop-blur-xl bg-card/95">
                <CardContent class="p-5 flex items-center justify-between">
                    <div>
                        <p class="text-xs text-muted-foreground font-semibold">Presensi Luar Radius</p>
                        <p class="text-2xl font-black text-rose-600 dark:text-rose-400 mt-1">
                            {{ summary.out_of_radius_count }}
                        </p>
                        <p class="text-[10px] text-muted-foreground mt-0.5 font-medium">Di Luar Geofence Kantor</p>
                    </div>
                    <div class="w-10 h-10 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-600 dark:text-rose-400">
                        <ShieldAlert class="w-5 h-5" />
                    </div>
                </CardContent>
            </Card>

            <Card class="border-border/60 shadow-md backdrop-blur-xl bg-card/95">
                <CardContent class="p-5 flex items-center justify-between">
                    <div>
                        <p class="text-xs text-muted-foreground font-semibold">Pending Approval Atasan</p>
                        <p class="text-2xl font-black text-sky-600 dark:text-sky-400 mt-1">
                            {{ summary.pending_approval_count }}
                        </p>
                        <p class="text-[10px] text-muted-foreground mt-0.5 font-medium">Dinas Luar / WFH</p>
                    </div>
                    <div class="w-10 h-10 rounded-2xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-600 dark:text-sky-400">
                        <ShieldCheck class="w-5 h-5" />
                    </div>
                </CardContent>
            </Card>
        </div>

        <!-- Logs Table Card -->
        <Card class="border-border/60 shadow-md backdrop-blur-xl bg-card/95">
            <CardHeader class="pb-3 flex-row items-center justify-between space-y-0 border-b border-border">
                <CardTitle class="text-base font-bold flex items-center gap-2">
                    <ShieldAlert class="w-4 h-4 text-rose-500" />
                    <span>Riwayat Presensi Di Luar Radius Geofence</span>
                </CardTitle>
                <Badge variant="outline" class="bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30 text-[10px] uppercase font-bold">
                    Audit System Active
                </Badge>
            </CardHeader>
            <CardContent class="p-0">
                <div class="overflow-x-auto">
                    <table class="w-full text-xs">
                        <thead>
                            <tr class="text-left text-muted-foreground border-b border-border bg-muted/30">
                                <th class="px-5 py-3.5 font-semibold text-center w-12">#</th>
                                <th class="px-5 py-3.5 font-semibold">Waktu Presensi</th>
                                <th class="px-5 py-3.5 font-semibold">Nama Pegawai ASN</th>
                                <th class="px-5 py-3.5 font-semibold">OPD Utama</th>
                                <th class="px-5 py-3.5 font-semibold text-center">Jenis</th>
                                <th class="px-5 py-3.5 font-semibold text-center">Status Audit</th>
                                <th class="px-5 py-3.5 font-semibold text-center">Koordinat GPS</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-border/40">
                            <tr
                                v-for="(att, i) in paginatedLogs"
                                :key="att.id"
                                class="hover:bg-muted/40 transition-colors"
                            >
                                <td class="px-5 py-3.5 text-center font-mono text-muted-foreground">{{ (currentPage - 1) * itemsPerPage + i + 1 }}</td>
                                <td class="px-5 py-3.5 font-mono text-muted-foreground text-[11px]">{{ att.tanggal }} {{ att.waktu }}</td>
                                <td class="px-5 py-3.5">
                                    <p class="font-bold text-foreground">{{ att.user?.name || 'ASN' }}</p>
                                </td>
                                <td class="px-5 py-3.5 text-muted-foreground">{{ att.user?.office?.opd_name || '-' }}</td>
                                <td class="px-5 py-3.5 text-center">
                                    <Badge variant="outline" class="uppercase text-[10px] font-semibold">
                                        {{ att.jenis }}
                                    </Badge>
                                </td>
                                <td class="px-5 py-3.5 text-center">
                                    <Badge variant="destructive" class="uppercase text-[10px] font-semibold">
                                        {{ att.status }}
                                    </Badge>
                                </td>
                                <td class="px-5 py-3.5 text-center font-mono text-muted-foreground text-[11px]">
                                    <span v-if="att.latitude && att.longitude" class="flex items-center justify-center gap-1">
                                        <MapPin class="w-3 h-3 text-rose-500 shrink-0" />
                                        <span>{{ att.latitude }}, {{ att.longitude }}</span>
                                    </span>
                                    <span v-else>-</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div v-if="!outOfRadiusAtts.length" class="text-center text-muted-foreground py-10 space-y-2">
                        <ShieldCheck class="w-8 h-8 mx-auto text-emerald-500/50" />
                        <p>Tidak ditemukan indikasi presensi di luar radius kantor hari ini.</p>
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
