<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { Link, Head, usePage } from '@inertiajs/vue3';
import SidebarLink from '@/Components/SidebarLink.vue';
import { toggleTheme as utilToggleTheme, currentTheme } from '@/Utils/theme';
import { Sun, Moon, LogOut, ShieldCheck } from '@lucide/vue';

import * as adminRoutes from '@/routes/admin';
import * as webRoutes from '@/routes';

defineProps<{
    title?: string;
    subtitle?: string;
}>();

const theme = ref('dark');
onMounted(() => {
    theme.value = currentTheme();
});

const toggleTheme = () => {
    theme.value = utilToggleTheme();
};

const page = usePage();

const currentDate = computed(() => {
    return new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
});

const initials = computed(() => {
    const name = page.props.auth?.user?.name || 'A';
    return name
        .split(' ')
        .map((n: string) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
});
</script>

<template>
    <Head :title="title || 'Admin Panel'" />

    <div class="min-h-screen flex bg-background text-foreground transition-colors duration-300">
        <!-- Sidebar Navigation -->
        <aside class="w-64 bg-sidebar border-r border-sidebar-border flex flex-col fixed h-full z-20 transition-colors duration-300">
            <!-- Sidebar Header / Logo -->
            <div class="h-18 px-5 flex items-center border-b border-sidebar-border shrink-0">
                <Link :href="adminRoutes.dashboard.url()" class="flex items-center gap-3.5 group cursor-pointer">
                    <div class="relative flex items-center justify-center shrink-0">
                        <div class="absolute -inset-1.5 bg-emerald-500/25 rounded-full blur-md group-hover:bg-emerald-500/40 transition-all"></div>
                        <img src="/images/logo-removebg.png" class="relative w-14 h-14 object-contain shrink-0 filter drop-shadow-[0_4px_12px_rgba(16,185,129,0.4)] transition-transform duration-200 group-hover:scale-105" alt="SIMPATI Logo" />
                    </div>
                    <div>
                        <h2 class="font-black text-xl tracking-widest font-sans uppercase bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-400 bg-clip-text text-transparent group-hover:from-emerald-300 group-hover:to-teal-300 transition-all leading-none">
                            SIMPATI
                        </h2>
                        <div class="flex items-center gap-1.5 mt-1">
                            <span class="w-1.5 h-1.5 rounded-none bg-emerald-500 animate-pulse"></span>
                            <span class="text-[10px] font-mono text-muted-foreground uppercase tracking-widest font-bold">Kab. Soppeng</span>
                        </div>
                    </div>
                </Link>
            </div>

            <!-- Navigation Links -->
            <nav class="flex-1 p-4 space-y-1 overflow-y-auto">
                <p class="text-[10px] text-muted-foreground uppercase tracking-wider font-bold mb-2 px-3">
                    Menu Utama
                </p>
                <SidebarLink :href="adminRoutes.dashboard.url()" :active="$page.url === adminRoutes.dashboard.url()" icon="home">
                    Dashboard
                </SidebarLink>

                <p class="text-[10px] text-muted-foreground uppercase tracking-wider font-bold mt-5 mb-2 px-3">
                    Data Master
                </p>
                <SidebarLink :href="adminRoutes.offices.url()" :active="$page.url.startsWith(adminRoutes.offices.url())" icon="building">
                    Kantor / OPD
                </SidebarLink>
                <SidebarLink :href="adminRoutes.users.url()" :active="$page.url.startsWith(adminRoutes.users.url())" icon="users">
                    Pengguna ASN
                </SidebarLink>
                <SidebarLink :href="adminRoutes.schedules.url()" :active="$page.url.startsWith(adminRoutes.schedules.url())" icon="clock">
                    Jam Kerja
                </SidebarLink>

                <p class="text-[10px] text-muted-foreground uppercase tracking-wider font-bold mt-5 mb-2 px-3">
                    Monitoring
                </p>
                <SidebarLink :href="adminRoutes.attendances.url()" :active="$page.url.startsWith(adminRoutes.attendances.url())" icon="clipboard">
                    Rekap Presensi
                </SidebarLink>
                <SidebarLink :href="adminRoutes.leaveRequests.url()" :active="$page.url.startsWith(adminRoutes.leaveRequests.url())" icon="file-text">
                    Pengajuan Izin
                </SidebarLink>
                <SidebarLink :href="adminRoutes.shiftSwaps.url()" :active="$page.url.startsWith(adminRoutes.shiftSwaps.url())" icon="swap">
                    Tukar Shift ASN
                </SidebarLink>
                <SidebarLink :href="adminRoutes.announcements.url()" :active="$page.url.startsWith(adminRoutes.announcements.url())" icon="megaphone">
                    Broadcast Edaran
                </SidebarLink>
                <SidebarLink :href="adminRoutes.auditLogs.url()" :active="$page.url.startsWith(adminRoutes.auditLogs.url())" icon="shield">
                    Audit Log Keamanan
                </SidebarLink>
                <SidebarLink :href="adminRoutes.peringkat.url()" :active="$page.url.startsWith(adminRoutes.peringkat.url())" icon="trophy">
                    Peringkat Kehadiran
                </SidebarLink>

                <p class="text-[10px] text-muted-foreground uppercase tracking-wider font-bold mt-5 mb-2 px-3">
                    Sistem & Konfigurasi
                </p>
                <SidebarLink :href="adminRoutes.settings.url()" :active="$page.url.startsWith(adminRoutes.settings.url())" icon="cog">
                    Pengaturan Sistem
                </SidebarLink>
            </nav>

            <!-- Sidebar Footer User Profile -->
            <div class="p-4 border-t border-sidebar-border bg-sidebar/50">
                <div class="flex items-center gap-3">
                    <Link href="/admin/profil" class="flex items-center gap-3 flex-1 min-w-0 group cursor-pointer">
                        <div class="w-9 h-9 rounded-none bg-primary/10 text-primary flex items-center justify-center text-xs font-mono font-bold border border-primary/30 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            {{ initials }}
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="text-xs font-bold truncate text-foreground group-hover:text-primary transition-colors">{{ $page.props.auth?.user?.name }}</p>
                            <p class="text-[10px] text-muted-foreground font-medium flex items-center gap-1">
                                <ShieldCheck class="w-3 h-3 text-emerald-500" />
                                <span>Administrator</span>
                            </p>
                        </div>
                    </Link>
                    <Link
                        method="post"
                        :href="webRoutes.logout.url()"
                        as="button"
                        class="p-2 rounded-none text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all cursor-pointer"
                        title="Keluar / Logout"
                    >
                        <LogOut class="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </aside>

        <!-- Main Workspace Area -->
        <main class="flex-1 ml-64 bg-background min-h-screen transition-colors duration-300 flex flex-col">
            <!-- Top Header Bar (Preset Sera Style) -->
            <header class="h-18 sticky top-0 z-10 bg-background/90 backdrop-blur-xl border-b border-border px-8 flex items-center shrink-0">
                <div class="flex items-center justify-between w-full">
                    <div>
                        <div class="flex items-center gap-2.5">
                            <h1 class="text-xl font-extrabold tracking-tight text-foreground">{{ title }}</h1>
                            <span class="px-2 py-0.5 rounded-none text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                                OPERATIONAL
                            </span>
                        </div>
                        <p v-if="subtitle" class="text-xs text-muted-foreground mt-0.5">{{ subtitle }}</p>
                    </div>
                    <div class="flex items-center gap-3">
                        <div class="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-none bg-card border border-border text-xs text-muted-foreground font-mono shadow-xs">
                            <span class="w-2 h-2 rounded-none bg-emerald-500 animate-pulse"></span>
                            {{ currentDate }}
                        </div>
                        <button
                            @click="toggleTheme"
                            class="p-2 rounded-none bg-card border border-border text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-all shadow-xs cursor-pointer"
                            title="Switch Light/Dark Mode"
                        >
                            <Sun v-if="theme === 'dark'" class="w-4 h-4" />
                            <Moon v-else class="w-4 h-4" />
                        </button>
                        <slot name="actions" />
                    </div>
                </div>
            </header>

            <!-- Main Page Content Slot -->
            <div class="flex-1 p-8">
                <slot />
            </div>
        </main>
    </div>
</template>
