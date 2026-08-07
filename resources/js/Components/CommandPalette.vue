<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { router } from '@inertiajs/vue3';
import {
    Dialog,
    DialogContent,
} from '@/Components/ui/dialog';
import {
    Search,
    LayoutDashboard,
    Users,
    Building2,
    Clock,
    FileText,
    CheckSquare,
    ArrowLeftRight,
    ShieldAlert,
    Settings,
    Megaphone,
    ArrowRight,
} from '@lucide/vue';

const open = ref(false);
const query = ref('');

const navigationItems = [
    { title: 'Dashboard Analytics', url: '/admin/dashboard', icon: LayoutDashboard, category: 'Menu Utama' },
    { title: 'Kelola Pengguna ASN', url: '/admin/users', icon: Users, category: 'Menu Utama' },
    { title: 'Kelola Kantor / OPD', url: '/admin/offices', icon: Building2, category: 'Menu Utama' },
    { title: 'Kelola Jam Kerja', url: '/admin/schedules', icon: Clock, category: 'Menu Utama' },
    { title: 'Monitoring Presensi Realtime', url: '/admin/attendances', icon: CheckSquare, category: 'Presensi' },
    { title: 'Pengajuan Izin / Cuti', url: '/admin/leave-requests', icon: FileText, category: 'Layanan' },
    { title: 'Koreksi Presensi', url: '/admin/attendance-corrections', icon: FileText, category: 'Layanan' },
    { title: 'Tukar Shift ASN', url: '/admin/shift-swaps', icon: ArrowLeftRight, category: 'Layanan' },
    { title: 'Broadcast Edaran', url: '/admin/announcements', icon: Megaphone, category: 'Pengumuman' },
    { title: 'Audit Log & Fake GPS', url: '/admin/audit-logs', icon: ShieldAlert, category: 'Keamanan' },
    { title: 'Pengaturan Sistem', url: '/admin/settings', icon: Settings, category: 'Sistem' },
];

const filteredItems = computed(() => {
    if (!query.value.trim()) return navigationItems;
    const q = query.value.toLowerCase();
    return navigationItems.filter(
        (item) =>
            item.title.toLowerCase().includes(q) ||
            item.category.toLowerCase().includes(q)
    );
});

const navigateTo = (url: string) => {
    open.value = false;
    query.value = '';
    router.visit(url);
};

const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        open.value = !open.value;
    }
};

onMounted(() => {
    window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown);
});

const toggleOpen = () => {
    open.value = !open.value;
};

defineExpose({ open, toggleOpen });
</script>

<template>
    <Dialog v-model:open="open">
        <DialogContent class="max-w-xl p-0 overflow-hidden shadow-2xl rounded-xl border border-border bg-card">
            <!-- Search Header -->
            <div class="relative flex items-center border-b border-border px-4 py-3 bg-card">
                <Search class="h-4 w-4 shrink-0 text-muted-foreground mr-3" />
                <input
                    v-model="query"
                    type="text"
                    placeholder="Ketik menu atau halaman pencarian (Ctrl + K)..."
                    class="flex h-10 w-full rounded-md bg-transparent text-sm outline-none placeholder:text-muted-foreground text-foreground"
                    autofocus
                />
                <kbd class="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                    ESC
                </kbd>
            </div>

            <!-- Results List -->
            <div class="max-h-80 overflow-y-auto p-2">
                <div v-if="filteredItems.length === 0" class="py-12 text-center text-xs text-muted-foreground">
                    Tidak ada menu yang sesuai dengan "{{ query }}".
                </div>

                <div v-else class="space-y-1">
                    <div
                        v-for="item in filteredItems"
                        :key="item.url"
                        @click="navigateTo(item.url)"
                        class="flex items-center justify-between rounded-lg px-3 py-2.5 text-xs text-foreground hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer transition-colors group"
                    >
                        <div class="flex items-center gap-3">
                            <div class="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10">
                                <component :is="item.icon" class="h-4 w-4" />
                            </div>
                            <div>
                                <p class="font-bold">{{ item.title }}</p>
                                <p class="text-[10px] text-muted-foreground">{{ item.category }}</p>
                            </div>
                        </div>
                        <ArrowRight class="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </div>
            </div>

            <!-- Footer Shortcut Tip -->
            <div class="flex items-center justify-between border-t border-border bg-muted/40 px-4 py-2 text-[11px] text-muted-foreground">
                <span>Pencarian Pintar SIMPATI</span>
                <div class="flex items-center gap-2">
                    <span>Pintasan: <kbd class="rounded border border-border bg-card px-1.5 py-0.5 font-mono text-[10px]">Ctrl + K</kbd></span>
                </div>
            </div>
        </DialogContent>
    </Dialog>
</template>
