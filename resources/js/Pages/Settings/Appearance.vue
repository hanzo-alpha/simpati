<script setup lang="ts">
import { Palette, Sun, Moon, Monitor, CheckCircle2 } from '@lucide/vue';
import { ref } from 'vue';
import { Button } from '@/Components/ui/button';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
} from '@/Components/ui/card';
import SettingsLayout from '@/Layouts/SettingsLayout.vue';

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
            <Card
                class="rounded-none border border-border bg-card text-card-foreground shadow-xs"
            >
                <CardHeader class="border-b border-border/60 p-5">
                    <CardTitle
                        class="flex items-center gap-2 text-xs font-bold tracking-wider text-foreground uppercase"
                    >
                        <Palette class="h-4 w-4 text-emerald-500" />
                        <span>Tampilan & Tema Antarmuka</span>
                    </CardTitle>
                    <CardDescription class="text-xs text-muted-foreground">
                        Pilih preferensi tema antarmuka (Mode Gelap Mist atau
                        Mode Terang).
                    </CardDescription>
                </CardHeader>
                <CardContent class="space-y-4 p-5">
                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <!-- Mode Gelap (Preset Mist Dark) -->
                        <button
                            @click="setTheme('dark')"
                            class="flex cursor-pointer flex-col justify-between gap-3 rounded-none border p-4 text-left transition-all"
                            :class="
                                currentTheme === 'dark'
                                    ? 'border-primary bg-primary/10 font-bold text-primary'
                                    : 'border-border bg-card text-muted-foreground hover:bg-muted/40 hover:text-foreground'
                            "
                        >
                            <div class="flex items-center justify-between">
                                <Moon class="h-5 w-5 text-emerald-500" />
                                <CheckCircle2
                                    v-if="currentTheme === 'dark'"
                                    class="h-4 w-4 text-emerald-500"
                                />
                            </div>
                            <div>
                                <p class="text-xs font-bold text-foreground">
                                    Mode Gelap (Mist Dark)
                                </p>
                                <p
                                    class="mt-0.5 text-[10px] text-muted-foreground"
                                >
                                    Warna charcoal slate sesuai preset a35OIr3g
                                </p>
                            </div>
                        </button>

                        <!-- Mode Terang (Preset Mist Light) -->
                        <button
                            @click="setTheme('light')"
                            class="flex cursor-pointer flex-col justify-between gap-3 rounded-none border p-4 text-left transition-all"
                            :class="
                                currentTheme === 'light'
                                    ? 'border-primary bg-primary/10 font-bold text-primary'
                                    : 'border-border bg-card text-muted-foreground hover:bg-muted/40 hover:text-foreground'
                            "
                        >
                            <div class="flex items-center justify-between">
                                <Sun class="h-5 w-5 text-amber-500" />
                                <CheckCircle2
                                    v-if="currentTheme === 'light'"
                                    class="h-4 w-4 text-emerald-500"
                                />
                            </div>
                            <div>
                                <p class="text-xs font-bold text-foreground">
                                    Mode Terang (Mist Light)
                                </p>
                                <p
                                    class="mt-0.5 text-[10px] text-muted-foreground"
                                >
                                    Tampilan bersih dengan latar belakang murni
                                </p>
                            </div>
                        </button>

                        <!-- Sesuai Sistem -->
                        <button
                            @click="setTheme('system')"
                            class="flex cursor-pointer flex-col justify-between gap-3 rounded-none border p-4 text-left transition-all"
                            :class="
                                currentTheme === 'system'
                                    ? 'border-primary bg-primary/10 font-bold text-primary'
                                    : 'border-border bg-card text-muted-foreground hover:bg-muted/40 hover:text-foreground'
                            "
                        >
                            <div class="flex items-center justify-between">
                                <Monitor class="h-5 w-5 text-sky-500" />
                                <CheckCircle2
                                    v-if="currentTheme === 'system'"
                                    class="h-4 w-4 text-emerald-500"
                                />
                            </div>
                            <div>
                                <p class="text-xs font-bold text-foreground">
                                    Ikuti Sistem
                                </p>
                                <p
                                    class="mt-0.5 text-[10px] text-muted-foreground"
                                >
                                    Otomatis mengikuti preferensi OS perangkat
                                </p>
                            </div>
                        </button>
                    </div>
                </CardContent>
            </Card>
        </div>
    </SettingsLayout>
</template>
