<script setup lang="ts">
import { computed } from 'vue';
import { Card, CardContent } from '@/components/ui/card';
import { Users, CheckCircle2, AlertTriangle, FileText, type LucideIcon } from '@lucide/vue';

const props = defineProps<{
    icon: string;
    label: string;
    value: number | string;
    sub?: string;
    color?: 'teal' | 'green' | 'yellow' | 'blue' | 'red';
}>();

const iconComponent = computed<LucideIcon>(() => {
    switch (props.icon) {
        case 'users':
            return Users;
        case 'check':
            return CheckCircle2;
        case 'alert':
            return AlertTriangle;
        case 'file':
            return FileText;
        default:
            return Users;
    }
});

const colorClasses = computed(() => {
    const map = {
        teal: { iconBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30', borderTop: 'border-t-2 border-t-emerald-500' },
        green: { iconBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30', borderTop: 'border-t-2 border-t-emerald-500' },
        yellow: { iconBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30', borderTop: 'border-t-2 border-t-amber-500' },
        blue: { iconBg: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30', borderTop: 'border-t-2 border-t-sky-500' },
        red: { iconBg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30', borderTop: 'border-t-2 border-t-rose-500' },
    };
    return map[props.color || 'teal'] || map.teal;
});
</script>

<template>
    <!-- Neaten Stat Widget Card with Sera Top Border Accent -->
    <Card class="rounded-none border border-border bg-card text-card-foreground shadow-xs transition-colors hover:border-border/80" :class="colorClasses.borderTop">
        <CardContent class="p-5 flex items-center justify-between gap-3">
            <div class="space-y-1">
                <p class="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    {{ label }}
                </p>
                <p class="text-2xl font-bold font-mono text-foreground tracking-tight">
                    {{ value }}
                </p>
                <p v-if="sub" class="text-[10px] text-muted-foreground font-medium">
                    {{ sub }}
                </p>
            </div>
            <div
                class="w-10 h-10 rounded-none flex items-center justify-center border shrink-0"
                :class="colorClasses.iconBg"
            >
                <component :is="iconComponent" class="w-5 h-5" />
            </div>
        </CardContent>
    </Card>
</template>
