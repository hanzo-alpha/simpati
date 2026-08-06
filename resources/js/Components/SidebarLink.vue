<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import {
    LayoutDashboard,
    Building2,
    Users,
    Clock,
    ClipboardList,
    FileText,
    ArrowLeftRight,
    Megaphone,
    ShieldCheck,
    Trophy,
    Settings,
} from '@lucide/vue';
import type { LucideIcon } from '@lucide/vue';
import { computed } from 'vue';

const props = defineProps<{
    href: string;
    active?: boolean;
    icon?: string;
}>();

const iconComponent = computed<LucideIcon>(() => {
    switch (props.icon) {
        case 'home':
            return LayoutDashboard;
        case 'building':
            return Building2;
        case 'users':
            return Users;
        case 'clock':
            return Clock;
        case 'clipboard':
            return ClipboardList;
        case 'file-text':
            return FileText;
        case 'swap':
            return ArrowLeftRight;
        case 'megaphone':
        case 'bell':
            return Megaphone;
        case 'shield':
            return ShieldCheck;
        case 'trophy':
            return Trophy;
        case 'cog':
        case 'settings':
            return Settings;
        default:
            return LayoutDashboard;
    }
});
</script>

<template>
    <Link
        :href="href"
        class="group relative flex cursor-pointer items-center gap-3 rounded-none px-3 py-2.5 text-sm font-bold transition-all duration-200"
        :class="[
            active
                ? 'border-y border-r border-l-2 border-primary/30 border-l-primary bg-primary/10 font-bold text-primary shadow-xs'
                : 'border border-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground',
        ]"
    >
        <component
            :is="iconComponent"
            class="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110"
            :class="
                active
                    ? 'text-primary'
                    : 'text-muted-foreground group-hover:text-foreground'
            "
        />
        <span class="truncate">
            <slot />
        </span>
    </Link>
</template>
