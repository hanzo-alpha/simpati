<script setup lang="ts">
import { usePage, Link } from '@inertiajs/vue3';
import { User, ShieldCheck, KeyRound, Palette } from '@lucide/vue';
import { computed } from 'vue';
import { Card, CardHeader, CardTitle } from '@/Components/ui/card';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import AppLayout from '@/Layouts/AppLayout.vue';

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
    <component
        :is="isAdmin ? AdminLayout : AppLayout"
        :title="isAdmin ? 'Pengaturan Akun' : undefined"
    >
        <div class="w-full space-y-6 pb-8">
            <!-- Header Card for Non-Admin -->
            <Card
                v-if="!isAdmin"
                class="rounded-none border border-border bg-card text-card-foreground shadow-xs"
            >
                <CardHeader
                    class="flex-row items-center justify-between space-y-0 p-5"
                >
                    <div>
                        <CardTitle
                            class="flex items-center gap-2 text-sm font-bold tracking-wider text-foreground uppercase"
                        >
                            <User class="h-4 w-4 text-emerald-500" />
                            <span>Pengaturan Akun & Profil</span>
                        </CardTitle>
                        <p class="mt-0.5 text-xs text-muted-foreground">
                            Kelola data diri, keamanan kata sandi, dan
                            preferensi tampilan
                        </p>
                    </div>
                </CardHeader>
            </Card>

            <!-- Horizontal Tab Bar Nav (Sera Preset Tab Style) -->
            <div
                class="flex w-full items-center gap-1.5 overflow-x-auto rounded-none border border-border bg-card p-1 shadow-xs"
            >
                <Link
                    v-for="item in navItems"
                    :key="item.href"
                    :href="item.href"
                    class="flex cursor-pointer items-center gap-2 rounded-none border px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all"
                    :class="
                        item.match(page.url)
                            ? 'border-primary bg-primary font-bold text-primary-foreground'
                            : 'border-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    "
                >
                    <component :is="item.icon" class="h-4 w-4 shrink-0" />
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
