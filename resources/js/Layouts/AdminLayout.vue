<script setup lang="ts">
import { Link, Head, usePage } from '@inertiajs/vue3';
import { Sun, Moon, LogOut, ShieldCheck, Search } from '@lucide/vue';
import { computed, ref, onMounted } from 'vue';
import CommandPalette from '@/Components/CommandPalette.vue';
import ConfirmDialog from '@/Components/ConfirmDialog.vue';
import SidebarLink from '@/Components/SidebarLink.vue';
import Toaster from '@/Components/ui/sonner/Sonner.vue';
import { useConfirm } from '@/composables/useConfirm';
import { useFlashToast } from '@/composables/useFlashToast';
import * as webRoutes from '@/routes';
import * as adminRoutes from '@/routes/admin';
import { toggleTheme as utilToggleTheme, currentTheme } from '@/Utils/theme';

defineProps<{
    title?: string;
    subtitle?: string;
}>();

useFlashToast();
const {
    isOpen: isConfirmOpen,
    options: confirmOptions,
    loading: isConfirmLoading,
    handleConfirm,
    handleCancel,
} = useConfirm();

const commandPaletteRef = ref();

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

    <div
        class="flex min-h-screen bg-background text-foreground transition-colors duration-300"
    >
        <!-- Sidebar Navigation -->
        <aside
            class="fixed z-20 flex h-full w-64 flex-col border-r border-sidebar-border bg-sidebar transition-colors duration-300"
        >
            <!-- Sidebar Header / Logo -->
            <div
                class="flex h-18 shrink-0 items-center border-b border-sidebar-border px-2"
            >
                <Link
                    :href="adminRoutes.dashboard.url()"
                    class="group flex cursor-pointer items-center gap-3.5"
                >
                    <div
                        class="relative flex shrink-0 items-center justify-center"
                    >
                        <div
                            class="-inset-0.2 absolute rounded-full bg-emerald-500/25 blur-md transition-all group-hover:bg-emerald-500/40"
                        ></div>
                        <img
                            src="/images/logo-removebg.png"
                            class="relative h-14 w-14 shrink-0 object-contain drop-shadow-[0_4px_12px_rgba(16,185,129,0.4)] filter transition-transform duration-200 group-hover:scale-105"
                            alt="SIMPATI Logo"
                        />
                    </div>
                    <div>
                        <h2
                            class="bg-linear-to-r from-emerald-500 via-emerald-700 to-teal-400 bg-clip-text font-sans text-2xl leading-none font-black tracking-wider text-transparent uppercase transition-all group-hover:from-emerald-700 group-hover:to-teal-700"
                        >
                            SIMPATI
                        </h2>
                        <div class="mt-1 flex items-center gap-1.5">
                            <!--                            <span class="h-1 w-1 animate-pulse rounded-full bg-emerald-500"></span>-->
                            <span
                                class="font-mono text-[10px] font-bold tracking-normal text-muted-foreground"
                            >
                                Kabupaten Soppeng</span
                            >
                            <!--                            <span class="h-1 w-1 animate-pulse rounded-full bg-emerald-500"></span>-->
                        </div>
                    </div>
                </Link>
            </div>

            <!-- Navigation Links -->
            <nav class="flex-1 space-y-1 overflow-y-auto p-4">
                <p
                    class="mb-2 px-3 text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
                >
                    Menu Utama
                </p>
                <SidebarLink
                    :href="adminRoutes.dashboard.url()"
                    :active="$page.url === adminRoutes.dashboard.url()"
                    icon="home"
                >
                    Dashboard
                </SidebarLink>

                <p
                    class="mt-5 mb-2 px-3 text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
                >
                    Data Master
                </p>
                <SidebarLink
                    :href="adminRoutes.offices.url()"
                    :active="$page.url.startsWith(adminRoutes.offices.url())"
                    icon="building"
                >
                    Kantor / OPD
                </SidebarLink>
                <SidebarLink
                    :href="adminRoutes.users.url()"
                    :active="$page.url.startsWith(adminRoutes.users.url())"
                    icon="users"
                >
                    Pengguna ASN
                </SidebarLink>
                <SidebarLink
                    :href="adminRoutes.schedules.url()"
                    :active="$page.url.startsWith(adminRoutes.schedules.url())"
                    icon="clock"
                >
                    Jam Kerja
                </SidebarLink>

                <p
                    class="mt-5 mb-2 px-3 text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
                >
                    Monitoring
                </p>
                <SidebarLink
                    :href="adminRoutes.attendances.url()"
                    :active="
                        $page.url.startsWith(adminRoutes.attendances.url())
                    "
                    icon="clipboard"
                >
                    Rekap Presensi
                </SidebarLink>
                <SidebarLink
                    :href="adminRoutes.leaveRequests.url()"
                    :active="
                        $page.url.startsWith(adminRoutes.leaveRequests.url())
                    "
                    icon="file-text"
                >
                    Pengajuan Izin
                </SidebarLink>
                <SidebarLink
                    :href="adminRoutes.shiftSwaps.url()"
                    :active="$page.url.startsWith(adminRoutes.shiftSwaps.url())"
                    icon="swap"
                >
                    Tukar Shift ASN
                </SidebarLink>
                <SidebarLink
                    href="/admin/attendance-corrections"
                    :active="
                        $page.url.startsWith('/admin/attendance-corrections')
                    "
                    icon="clock"
                >
                    Koreksi Presensi
                </SidebarLink>
                <SidebarLink
                    href="/admin/events"
                    :active="$page.url.startsWith('/admin/events')"
                    icon="calendar"
                >
                    Presensi Apel / Upacara
                </SidebarLink>
                <SidebarLink
                    :href="adminRoutes.announcements.url()"
                    :active="
                        $page.url.startsWith(adminRoutes.announcements.url())
                    "
                    icon="megaphone"
                >
                    Broadcast Edaran
                </SidebarLink>
                <SidebarLink
                    :href="adminRoutes.auditLogs.url()"
                    :active="$page.url.startsWith(adminRoutes.auditLogs.url())"
                    icon="shield"
                >
                    Audit Log Keamanan
                </SidebarLink>
                <SidebarLink
                    :href="adminRoutes.peringkat.url()"
                    :active="$page.url.startsWith(adminRoutes.peringkat.url())"
                    icon="trophy"
                >
                    Peringkat Kehadiran
                </SidebarLink>

                <p
                    class="mt-5 mb-2 px-3 text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
                >
                    Sistem & Konfigurasi
                </p>
                <SidebarLink
                    :href="adminRoutes.settings.url()"
                    :active="$page.url.startsWith(adminRoutes.settings.url())"
                    icon="cog"
                >
                    Pengaturan Sistem
                </SidebarLink>
            </nav>

            <!-- Sidebar Footer User Profile -->
            <div class="border-t border-sidebar-border bg-sidebar/50 p-4">
                <div class="flex items-center gap-3">
                    <Link
                        href="/admin/profil"
                        class="group flex min-w-0 flex-1 cursor-pointer items-center gap-3"
                    >
                        <div
                            class="flex h-9 w-9 items-center justify-center rounded-none border border-primary/30 bg-primary/10 font-mono text-xs font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
                        >
                            {{ initials }}
                        </div>
                        <div class="min-w-0 flex-1">
                            <p
                                class="truncate text-xs font-bold text-foreground transition-colors group-hover:text-primary"
                            >
                                {{ $page.props.auth?.user?.name }}
                            </p>
                            <p
                                class="flex items-center gap-1 text-[11px] font-medium text-muted-foreground"
                            >
                                <ShieldCheck class="h-3 w-3 text-emerald-500" />
                                <span>Administrator</span>
                            </p>
                        </div>
                    </Link>
                    <Link
                        method="post"
                        :href="webRoutes.logout.url()"
                        as="button"
                        class="cursor-pointer rounded-none p-2 text-muted-foreground transition-all hover:bg-destructive/10 hover:text-destructive"
                        title="Keluar / Logout"
                    >
                        <LogOut class="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </aside>

        <!-- Main Workspace Area -->
        <main
            class="ml-64 flex min-h-screen flex-1 flex-col bg-background transition-colors duration-300"
        >
            <!-- Top Header Bar (Preset Sera Style) -->
            <header
                class="sticky top-0 z-10 flex h-18 shrink-0 items-center border-b border-border bg-background/90 px-8 backdrop-blur-xl"
            >
                <div class="flex w-full items-center justify-between">
                    <div>
                        <div class="flex items-center gap-2.5">
                            <h1
                                class="text-xl font-extrabold tracking-tight text-foreground"
                            >
                                {{ title }}
                            </h1>
                            <span
                                class="rounded-none border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[11px] font-bold tracking-wider text-emerald-600 uppercase dark:text-emerald-400"
                            >
                                OPERATIONAL
                            </span>
                        </div>
                        <p
                            v-if="subtitle"
                            class="mt-0.5 text-xs text-muted-foreground"
                        >
                            {{ subtitle }}
                        </p>
                    </div>
                    <div class="flex items-center gap-3">
                        <button
                            @click="commandPaletteRef?.toggleOpen()"
                            class="flex cursor-pointer items-center gap-2 rounded-none border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground shadow-xs transition-all hover:border-emerald-500/50 hover:text-emerald-500"
                            title="Pencarian Pintar (Ctrl + K)"
                        >
                            <Search class="h-3.5 w-3.5" />
                            <span class="hidden font-medium sm:inline"
                                >Cari menu...</span
                            >
                            <kbd
                                class="pointer-events-none hidden h-4 items-center gap-0.5 rounded border border-border bg-muted px-1 font-mono text-[10px] font-medium opacity-100 select-none sm:flex"
                            >
                                Ctrl K
                            </kbd>
                        </button>
                        <div
                            class="hidden items-center gap-2 rounded-none border border-border bg-card px-3 py-1.5 font-mono text-xs text-muted-foreground shadow-xs md:flex"
                        >
                            <span
                                class="h-2 w-2 animate-pulse rounded-none bg-emerald-500"
                            ></span>
                            {{ currentDate }}
                        </div>
                        <button
                            @click="toggleTheme"
                            class="cursor-pointer rounded-none border border-border bg-card p-2 text-muted-foreground shadow-xs transition-all hover:text-emerald-600 dark:hover:text-emerald-400"
                            title="Switch Light/Dark Mode"
                        >
                            <Sun v-if="theme === 'dark'" class="h-4 w-4" />
                            <Moon v-else class="h-4 w-4" />
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

        <!-- Command Palette (Ctrl+K) & Global Toast Notifications & Shadcn Confirm Dialog -->
        <CommandPalette ref="commandPaletteRef" />
        <Toaster richColors position="top-right" closeButton />
        <ConfirmDialog
            v-model:open="isConfirmOpen"
            :title="confirmOptions.title"
            :description="confirmOptions.description"
            :confirm-text="confirmOptions.confirmText"
            :cancel-text="confirmOptions.cancelText"
            :variant="confirmOptions.variant"
            :loading="isConfirmLoading"
            @confirm="handleConfirm"
            @cancel="handleCancel"
        />
    </div>
</template>
