<script setup lang="ts">
import { usePage, Link, Head } from '@inertiajs/vue3';
import { Sun, Moon } from '@lucide/vue';
import { computed, ref, onMounted } from 'vue';
import NavItem from '@/Components/NavItem.vue';
import * as routes from '@/routes';
import { toggleTheme as utilToggleTheme, currentTheme } from '@/Utils/theme';

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
    {
        icon: 'fingerprint',
        label: 'Presensi',
        route: routes.presensi.url(),
        center: true,
    },
    { icon: 'trophy', label: 'Peringkat', route: routes.peringkat.url() },
    { icon: 'user', label: 'Profil', route: routes.profil.url() },
];

const isActive = (route: string) => {
    return page.url.startsWith(route);
};
</script>

<template>
    <Head :title="title || 'SIMPATI - Presensi ASN'" />
    <div
        class="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-300"
    >
        <!-- Page Content -->
        <main class="flex-1 pb-20">
            <slot />
        </main>

        <!-- Bottom Navigation Bar -->
        <nav
            class="fixed right-0 bottom-0 left-0 z-50 border-t border-border bg-background/95 px-2 py-2 backdrop-blur-xl transition-colors duration-300"
        >
            <div
                class="relative mx-auto flex max-w-lg items-center justify-around"
            >
                <!-- Theme Toggle Floating Button -->
                <button
                    @click="toggleTheme"
                    class="absolute -top-16 right-4 z-50 cursor-pointer rounded-full border border-border bg-card p-3 text-muted-foreground shadow-lg transition-colors hover:text-teal-600 dark:hover:text-teal-400"
                >
                    <Sun v-if="theme === 'dark'" class="h-5 w-5" />
                    <Moon v-else class="h-5 w-5" />
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
