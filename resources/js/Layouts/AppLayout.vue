<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { usePage, Link, Head } from '@inertiajs/vue3';
import NavItem from '@/Components/NavItem.vue';
import { toggleTheme as utilToggleTheme, currentTheme } from '@/Utils/theme';
import { Sun, Moon } from '@lucide/vue';
import * as routes from '@/routes';

defineProps<{
    title?: string;
}>();

const theme = ref('dark');
onMounted(() => {
    theme.value = currentTheme();
});

const toggleTheme = () => {
    theme.value = utilToggleTheme();
};

const page = usePage();

const navItems = [
    { icon: 'home', label: 'Dashboard', route: routes.dashboard.url() },
    { icon: 'history', label: 'Riwayat', route: routes.riwayat.url() },
    { icon: 'fingerprint', label: 'Presensi', route: routes.presensi.url(), center: true },
    { icon: 'trophy', label: 'Peringkat', route: routes.peringkat.url() },
    { icon: 'user', label: 'Profil', route: routes.profil.url() },
];

const isActive = (route: string) => {
    return page.url.startsWith(route);
};
</script>

<template>
    <Head :title="title || 'SIMPATI - Presensi ASN'" />
    <div class="min-h-screen bg-background text-foreground flex flex-col transition-colors duration-300">
        <!-- Page Content -->
        <main class="flex-1 pb-20">
            <slot />
        </main>

        <!-- Bottom Navigation Bar -->
        <nav class="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-xl border-t border-border px-2 py-2 z-50 transition-colors duration-300">
            <div class="max-w-lg mx-auto flex items-center justify-around relative">
                <!-- Theme Toggle Floating Button -->
                <button
                    @click="toggleTheme"
                    class="absolute -top-16 right-4 p-3 rounded-full bg-card border border-border shadow-lg text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400 transition-colors z-50 cursor-pointer"
                >
                    <Sun v-if="theme === 'dark'" class="w-5 h-5" />
                    <Moon v-else class="w-5 h-5" />
                </button>

                <NavItem
                    v-for="item in navItems"
                    :key="item.route"
                    :icon="item.icon"
                    :label="item.label"
                    :route="item.route"
                    :active="isActive(item.route)"
                    :center="item.center"
                />
            </div>
        </nav>
    </div>
</template>
