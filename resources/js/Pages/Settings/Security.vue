<script setup lang="ts">
import { computed } from 'vue';
import { usePage, useForm } from '@inertiajs/vue3';
import SettingsLayout from '@/Layouts/SettingsLayout.vue';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { KeyRound, ShieldCheck, CheckCircle2, Smartphone, Lock, ShieldAlert, Clock } from '@lucide/vue';

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
            <Card class="rounded-none border border-border bg-card text-card-foreground shadow-xs">
                <CardHeader class="p-5 border-b border-border/60">
                    <CardTitle class="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                        <KeyRound class="w-4 h-4 text-emerald-500" />
                        <span>Perbarui Kata Sandi Akun</span>
                    </CardTitle>
                    <CardDescription class="text-xs text-muted-foreground">
                        Pastikan akun Anda menggunakan kata sandi yang kuat dan acak demi keamanan akses SIMPATI.
                    </CardDescription>
                </CardHeader>
                <form @submit.prevent="updatePassword">
                    <CardContent class="p-5 space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div class="space-y-1.5">
                                <Label for="current_password" class="text-xs font-semibold">Password Saat Ini</Label>
                                <Input
                                    id="current_password"
                                    v-model="passwordForm.current_password"
                                    type="password"
                                    placeholder="••••••••"
                                    class="h-9 text-xs rounded-none"
                                    autocomplete="current-password"
                                />
                                <p v-if="passwordForm.errors.current_password" class="text-[11px] text-destructive font-medium">
                                    {{ passwordForm.errors.current_password }}
                                </p>
                            </div>

                            <div class="space-y-1.5">
                                <Label for="password" class="text-xs font-semibold">Password Baru</Label>
                                <Input
                                    id="password"
                                    v-model="passwordForm.password"
                                    type="password"
                                    placeholder="••••••••"
                                    class="h-9 text-xs rounded-none"
                                    autocomplete="new-password"
                                />
                                <p v-if="passwordForm.errors.password" class="text-[11px] text-destructive font-medium">
                                    {{ passwordForm.errors.password }}
                                </p>
                            </div>

                            <div class="space-y-1.5">
                                <Label for="password_confirmation" class="text-xs font-semibold">Konfirmasi Password Baru</Label>
                                <Input
                                    id="password_confirmation"
                                    v-model="passwordForm.password_confirmation"
                                    type="password"
                                    placeholder="••••••••"
                                    class="h-9 text-xs rounded-none"
                                    autocomplete="new-password"
                                />
                                <p v-if="passwordForm.errors.password_confirmation" class="text-[11px] text-destructive font-medium">
                                    {{ passwordForm.errors.password_confirmation }}
                                </p>
                            </div>
                        </div>

                        <div v-if="status === 'password-updated'" class="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2 font-medium rounded-none">
                            <CheckCircle2 class="w-4 h-4 shrink-0" />
                            <span>Password Anda telah berhasil diperbarui.</span>
                        </div>
                    </CardContent>
                    <CardFooter class="p-5 pt-0 border-t border-border/40 mt-2 flex justify-end">
                        <Button
                            type="submit"
                            :disabled="passwordForm.processing"
                            class="bg-primary text-primary-foreground text-xs font-bold rounded-none cursor-pointer"
                        >
                            <KeyRound class="w-3.5 h-3.5 mr-1.5" />
                            <span>Simpan Password Baru</span>
                        </Button>
                    </CardFooter>
                </form>
            </Card>

            <!-- Security & Device Binding Grid Cards -->
            <Card class="rounded-none border border-border bg-card text-card-foreground shadow-xs">
                <CardHeader class="p-5 border-b border-border/60">
                    <CardTitle class="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                        <Smartphone class="w-4 h-4 text-emerald-500" />
                        <span>Status Keamanan & Binding Perangkat (Mobile Device Binding)</span>
                    </CardTitle>
                </CardHeader>
                <CardContent class="p-5">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <!-- Stat 1 -->
                        <div class="p-4 bg-muted/30 border border-border rounded-none space-y-1">
                            <div class="flex items-center justify-between text-muted-foreground">
                                <span class="text-[10px] font-bold uppercase tracking-wider">Device ID Binding</span>
                                <ShieldCheck class="w-4 h-4 text-emerald-500" />
                            </div>
                            <p class="text-sm font-bold font-mono text-foreground">Terikat (Active)</p>
                            <p class="text-[10px] text-muted-foreground">Perangkat Mobile Terverifikasi</p>
                        </div>

                        <!-- Stat 2 -->
                        <div class="p-4 bg-muted/30 border border-border rounded-none space-y-1">
                            <div class="flex items-center justify-between text-muted-foreground">
                                <span class="text-[10px] font-bold uppercase tracking-wider">Status Sesi Login</span>
                                <Lock class="w-4 h-4 text-emerald-500" />
                            </div>
                            <p class="text-sm font-bold font-mono text-emerald-600 dark:text-emerald-400">Terverifikasi</p>
                            <p class="text-[10px] text-muted-foreground">Sesi Login Terenkripsi</p>
                        </div>

                        <!-- Stat 3 -->
                        <div class="p-4 bg-muted/30 border border-border rounded-none space-y-1">
                            <div class="flex items-center justify-between text-muted-foreground">
                                <span class="text-[10px] font-bold uppercase tracking-wider">Proteksi Geofence</span>
                                <ShieldAlert class="w-4 h-4 text-sky-500" />
                            </div>
                            <p class="text-sm font-bold font-mono text-sky-500">Aktif & Presisi</p>
                            <p class="text-[10px] text-muted-foreground">Radius 200m Kantor OPD</p>
                        </div>

                        <!-- Stat 4 -->
                        <div class="p-4 bg-muted/30 border border-border rounded-none space-y-1">
                            <div class="flex items-center justify-between text-muted-foreground">
                                <span class="text-[10px] font-bold uppercase tracking-wider">Throttle Protection</span>
                                <Clock class="w-4 h-4 text-amber-500" />
                            </div>
                            <p class="text-sm font-bold font-mono text-amber-500">Aktif (Rate Limit)</p>
                            <p class="text-[10px] text-muted-foreground">Maks 6 percobaan / menit</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    </SettingsLayout>
</template>
