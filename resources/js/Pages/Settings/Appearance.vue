<script setup lang="ts">
import { ref } from 'vue';
import SettingsLayout from '@/Layouts/SettingsLayout.vue';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Palette, Sun, Moon, Monitor, CheckCircle2 } from '@lucide/vue';

const props = defineProps<{
    isAdmin?: boolean;
}>();

const currentTheme = ref<'light' | 'dark' | 'system'>('dark');

const setTheme = (theme: 'light' | 'dark' | 'system') => {
    currentTheme.value = theme;
    const html = document.documentElement;

    if (theme === 'dark') {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else if (theme === 'light') {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
        localStorage.removeItem('theme');
    }
};
</script>

<template>
    <SettingsLayout :is-admin="isAdmin">
        <div class="space-y-6">
            <Card class="rounded-none border border-border bg-card text-card-foreground shadow-xs">
                <CardHeader class="p-5 border-b border-border/60">
                    <CardTitle class="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                        <Palette class="w-4 h-4 text-emerald-500" />
                        <span>Tampilan & Tema Antarmuka</span>
                    </CardTitle>
                    <CardDescription class="text-xs text-muted-foreground">
                        Pilih preferensi tema antarmuka (Mode Gelap Mist atau Mode Terang).
                    </CardDescription>
                </CardHeader>
                <CardContent class="p-5 space-y-4">
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <!-- Mode Gelap (Preset Mist Dark) -->
                        <button
                            @click="setTheme('dark')"
                            class="p-4 rounded-none border text-left transition-all cursor-pointer flex flex-col justify-between gap-3"
                            :class="
                                currentTheme === 'dark'
                                    ? 'border-primary bg-primary/10 text-primary font-bold'
                                    : 'border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted/40'
                            "
                        >
                            <div class="flex items-center justify-between">
                                <Moon class="w-5 h-5 text-emerald-500" />
                                <CheckCircle2 v-if="currentTheme === 'dark'" class="w-4 h-4 text-emerald-500" />
                            </div>
                            <div>
                                <p class="text-xs font-bold text-foreground">Mode Gelap (Mist Dark)</p>
                                <p class="text-[10px] text-muted-foreground mt-0.5">Warna charcoal slate sesuai preset a35OIr3g</p>
                            </div>
                        </button>

                        <!-- Mode Terang (Preset Mist Light) -->
                        <button
                            @click="setTheme('light')"
                            class="p-4 rounded-none border text-left transition-all cursor-pointer flex flex-col justify-between gap-3"
                            :class="
                                currentTheme === 'light'
                                    ? 'border-primary bg-primary/10 text-primary font-bold'
                                    : 'border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted/40'
                            "
                        >
                            <div class="flex items-center justify-between">
                                <Sun class="w-5 h-5 text-amber-500" />
                                <CheckCircle2 v-if="currentTheme === 'light'" class="w-4 h-4 text-emerald-500" />
                            </div>
                            <div>
                                <p class="text-xs font-bold text-foreground">Mode Terang (Mist Light)</p>
                                <p class="text-[10px] text-muted-foreground mt-0.5">Tampilan bersih dengan latar belakang murni</p>
                            </div>
                        </button>

                        <!-- Sesuai Sistem -->
                        <button
                            @click="setTheme('system')"
                            class="p-4 rounded-none border text-left transition-all cursor-pointer flex flex-col justify-between gap-3"
                            :class="
                                currentTheme === 'system'
                                    ? 'border-primary bg-primary/10 text-primary font-bold'
                                    : 'border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted/40'
                            "
                        >
                            <div class="flex items-center justify-between">
                                <Monitor class="w-5 h-5 text-sky-500" />
                                <CheckCircle2 v-if="currentTheme === 'system'" class="w-4 h-4 text-emerald-500" />
                            </div>
                            <div>
                                <p class="text-xs font-bold text-foreground">Ikuti Sistem</p>
                                <p class="text-[10px] text-muted-foreground mt-0.5">Otomatis mengikuti preferensi OS perangkat</p>
                            </div>
                        </button>
                    </div>
                </CardContent>
            </Card>
        </div>
    </SettingsLayout>
</template>
