<script setup lang="ts">
import { usePage, useForm } from '@inertiajs/vue3';
import {
    KeyRound,
    ShieldCheck,
    CheckCircle2,
    Smartphone,
    Lock,
    ShieldAlert,
    Clock,
} from '@lucide/vue';
import { computed } from 'vue';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
    CardFooter,
} from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import SettingsLayout from '@/Layouts/SettingsLayout.vue';

const props = defineProps<{
    isAdmin?: boolean;
    status?: string;
}>();

const page = usePage();
const user = computed<any>(() => page.props.auth?.user || {});

// Password Form
const passwordForm = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
});

const updatePassword = () => {
    passwordForm.put('/profil/password', {
        preserveScroll: true,
        onSuccess: () => passwordForm.reset(),
    });
};
</script>

<template>
    <SettingsLayout :is-admin="isAdmin">
        <div class="space-y-6">
            <!-- Form Update Password (Sera Style) -->
            <Card
                class="rounded-none border border-border bg-card text-card-foreground shadow-xs"
            >
                <CardHeader class="border-b border-border/60 p-5">
                    <CardTitle
                        class="flex items-center gap-2 text-xs font-bold tracking-wider text-foreground uppercase"
                    >
                        <KeyRound class="h-4 w-4 text-emerald-500" />
                        <span>Perbarui Kata Sandi Akun</span>
                    </CardTitle>
                    <CardDescription class="text-xs text-muted-foreground">
                        Pastikan akun Anda menggunakan kata sandi yang kuat dan
                        acak demi keamanan akses SIMPATI.
                    </CardDescription>
                </CardHeader>
                <form @submit.prevent="updatePassword">
                    <CardContent class="space-y-4 p-5">
                        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div class="space-y-1.5">
                                <Label
                                    for="current_password"
                                    class="text-xs font-semibold"
                                    >Password Saat Ini</Label
                                >
                                <Input
                                    id="current_password"
                                    v-model="passwordForm.current_password"
                                    type="password"
                                    placeholder="••••••••"
                                    class="h-9 rounded-none text-xs"
                                    autocomplete="current-password"
                                />
                                <p
                                    v-if="passwordForm.errors.current_password"
                                    class="text-[11px] font-medium text-destructive"
                                >
                                    {{ passwordForm.errors.current_password }}
                                </p>
                            </div>

                            <div class="space-y-1.5">
                                <Label
                                    for="password"
                                    class="text-xs font-semibold"
                                    >Password Baru</Label
                                >
                                <Input
                                    id="password"
                                    v-model="passwordForm.password"
                                    type="password"
                                    placeholder="••••••••"
                                    class="h-9 rounded-none text-xs"
                                    autocomplete="new-password"
                                />
                                <p
                                    v-if="passwordForm.errors.password"
                                    class="text-[11px] font-medium text-destructive"
                                >
                                    {{ passwordForm.errors.password }}
                                </p>
                            </div>

                            <div class="space-y-1.5">
                                <Label
                                    for="password_confirmation"
                                    class="text-xs font-semibold"
                                    >Konfirmasi Password Baru</Label
                                >
                                <Input
                                    id="password_confirmation"
                                    v-model="passwordForm.password_confirmation"
                                    type="password"
                                    placeholder="••••••••"
                                    class="h-9 rounded-none text-xs"
                                    autocomplete="new-password"
                                />
                                <p
                                    v-if="
                                        passwordForm.errors
                                            .password_confirmation
                                    "
                                    class="text-[11px] font-medium text-destructive"
                                >
                                    {{
                                        passwordForm.errors
                                            .password_confirmation
                                    }}
                                </p>
                            </div>
                        </div>

                        <div
                            v-if="status === 'password-updated'"
                            class="flex items-center gap-2 rounded-none border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs font-medium text-emerald-600 dark:text-emerald-400"
                        >
                            <CheckCircle2 class="h-4 w-4 shrink-0" />
                            <span
                                >Password Anda telah berhasil diperbarui.</span
                            >
                        </div>
                    </CardContent>
                    <CardFooter
                        class="mt-2 flex justify-end border-t border-border/40 p-5 pt-0"
                    >
                        <Button
                            type="submit"
                            :disabled="passwordForm.processing"
                            class="cursor-pointer rounded-none bg-primary text-xs font-bold text-primary-foreground"
                        >
                            <KeyRound class="mr-1.5 h-3.5 w-3.5" />
                            <span>Simpan Password Baru</span>
                        </Button>
                    </CardFooter>
                </form>
            </Card>

            <!-- Security & Device Binding Grid Cards -->
            <Card
                class="rounded-none border border-border bg-card text-card-foreground shadow-xs"
            >
                <CardHeader class="border-b border-border/60 p-5">
                    <CardTitle
                        class="flex items-center gap-2 text-xs font-bold tracking-wider text-foreground uppercase"
                    >
                        <Smartphone class="h-4 w-4 text-emerald-500" />
                        <span
                            >Status Keamanan & Binding Perangkat (Mobile Device
                            Binding)</span
                        >
                    </CardTitle>
                </CardHeader>
                <CardContent class="p-5">
                    <div
                        class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
                    >
                        <!-- Stat 1 -->
                        <div
                            class="space-y-1 rounded-none border border-border bg-muted/30 p-4"
                        >
                            <div
                                class="flex items-center justify-between text-muted-foreground"
                            >
                                <span
                                    class="text-[10px] font-bold tracking-wider uppercase"
                                    >Device ID Binding</span
                                >
                                <ShieldCheck class="h-4 w-4 text-emerald-500" />
                            </div>
                            <p
                                class="font-mono text-sm font-bold text-foreground"
                            >
                                Terikat (Active)
                            </p>
                            <p class="text-[10px] text-muted-foreground">
                                Perangkat Mobile Terverifikasi
                            </p>
                        </div>

                        <!-- Stat 2 -->
                        <div
                            class="space-y-1 rounded-none border border-border bg-muted/30 p-4"
                        >
                            <div
                                class="flex items-center justify-between text-muted-foreground"
                            >
                                <span
                                    class="text-[10px] font-bold tracking-wider uppercase"
                                    >Status Sesi Login</span
                                >
                                <Lock class="h-4 w-4 text-emerald-500" />
                            </div>
                            <p
                                class="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400"
                            >
                                Terverifikasi
                            </p>
                            <p class="text-[10px] text-muted-foreground">
                                Sesi Login Terenkripsi
                            </p>
                        </div>

                        <!-- Stat 3 -->
                        <div
                            class="space-y-1 rounded-none border border-border bg-muted/30 p-4"
                        >
                            <div
                                class="flex items-center justify-between text-muted-foreground"
                            >
                                <span
                                    class="text-[10px] font-bold tracking-wider uppercase"
                                    >Proteksi Geofence</span
                                >
                                <ShieldAlert class="h-4 w-4 text-sky-500" />
                            </div>
                            <p class="font-mono text-sm font-bold text-sky-500">
                                Aktif & Presisi
                            </p>
                            <p class="text-[10px] text-muted-foreground">
                                Radius 200m Kantor OPD
                            </p>
                        </div>

                        <!-- Stat 4 -->
                        <div
                            class="space-y-1 rounded-none border border-border bg-muted/30 p-4"
                        >
                            <div
                                class="flex items-center justify-between text-muted-foreground"
                            >
                                <span
                                    class="text-[10px] font-bold tracking-wider uppercase"
                                    >Throttle Protection</span
                                >
                                <Clock class="h-4 w-4 text-amber-500" />
                            </div>
                            <p
                                class="font-mono text-sm font-bold text-amber-500"
                            >
                                Aktif (Rate Limit)
                            </p>
                            <p class="text-[10px] text-muted-foreground">
                                Maks 6 percobaan / menit
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    </SettingsLayout>
</template>
