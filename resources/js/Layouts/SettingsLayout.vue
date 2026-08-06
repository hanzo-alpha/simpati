<script setup lang="ts">
import { computed } from 'vue';
import { usePage, Link } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { User, ShieldCheck, KeyRound, Palette } from '@lucide/vue';

const props = defineProps<{
    isAdmin?: boolean;
}>();

const page = usePage();

const navItems = [
    {
        title: 'Profil Pegawai',
        description: 'Nama, email & data kepegawaian',
        href: '/profil',
        icon: User,
        match: (url: string) => url === '/profil' || url.startsWith('/profil?'),
    },
    {
        title: 'Keamanan Akun',
        description: 'Ubah password & device binding',
        href: '/settings/security',
        icon: KeyRound,
        match: (url: string) => url.startsWith('/settings/security'),
    },
    {
        title: 'Tampilan & Tema',
        description: 'Pilihan mode gelap & terang',
        href: '/settings/appearance',
        icon: Palette,
        match: (url: string) => url.startsWith('/settings/appearance'),
    },
];
</script>

<template>
    <component :is="isAdmin ? AdminLayout : AppLayout" :title="isAdmin ? 'Pengaturan Akun' : undefined">
        <div class="w-full space-y-6 pb-8">
            <!-- Header Card for Non-Admin -->
            <Card v-if="!isAdmin" class="rounded-none border border-border bg-card text-card-foreground shadow-xs">
                <CardHeader class="p-5 flex-row items-center justify-between space-y-0">
                    <div>
                        <CardTitle class="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                            <User class="w-4 h-4 text-emerald-500" />
                            <span>Pengaturan Akun & Profil</span>
                        </CardTitle>
                        <p class="text-xs text-muted-foreground mt-0.5">Kelola data diri, keamanan kata sandi, dan preferensi tampilan</p>
                    </div>
                </CardHeader>
            </Card>

            <!-- Horizontal Tab Bar Nav (Sera Preset Tab Style) -->
            <div class="flex items-center gap-1.5 bg-card p-1 rounded-none border border-border shadow-xs w-full overflow-x-auto">
                <Link
                    v-for="item in navItems"
                    :key="item.href"
                    :href="item.href"
                    class="px-4 py-2 rounded-none text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap border"
                    :class="
                        item.match(page.url)
                            ? 'bg-primary text-primary-foreground font-bold border-primary'
                            : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    "
                >
                    <component :is="item.icon" class="w-4 h-4 shrink-0" />
                    <span>{{ item.title }}</span>
                </Link>
            </div>

            <!-- Main Content Tab Area -->
            <div class="w-full">
                <slot />
            </div>
        </div>
    </component>
</template>
