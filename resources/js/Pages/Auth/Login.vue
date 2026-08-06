<script setup lang="ts">
import { ref } from 'vue';
import { useForm, Head, Link } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    User,
    Lock,
    Eye,
    EyeOff,
    Sparkles,
    ShieldCheck,
    Loader2,
    CheckCircle2,
} from '@lucide/vue';

defineProps<{
    canResetPassword?: boolean;
    status?: string;
}>();

const showPassword = ref(false);

const form = useForm({
    nip: '',
    password: '',
    remember: false,
});

const submit = () => {
    form.post('/login', {
        onFinish: () => form.reset('password'),
    });
};
</script>

<template>
    <Head title="Login Portal ASN - SIMPATI" />

    <div class="relative min-h-screen flex items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-300">
        <!-- Background Ambient Glow & Patterns -->
        <div class="absolute inset-0 pointer-events-none overflow-hidden">
            <div class="absolute -top-40 -left-40 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl dark:bg-teal-500/10"></div>
            <div class="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl dark:bg-emerald-500/10"></div>
        </div>

        <div class="relative w-full max-w-md space-y-6">
            <!-- Header Logo & Branding -->
            <div class="text-center space-y-3">
                <div class="inline-flex p-2 rounded-2xl bg-teal-500/10 border border-teal-500/30 dark:bg-teal-500/20 dark:border-teal-400/40 shadow-lg shadow-teal-500/10 backdrop-blur-md transition-all hover:scale-105">
                    <img
                        src="/images/logo.png"
                        alt="Logo SIMPATI"
                        class="w-16 h-16 rounded-xl object-cover"
                    />
                </div>
                <div>
                    <h1 class="text-3xl font-extrabold tracking-tight text-foreground flex items-center justify-center gap-2">
                        <span class="bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400 bg-clip-text text-transparent">
                            SIMPATI
                        </span>
                    </h1>
                    <p class="text-sm font-medium text-muted-foreground mt-1">
                        Sistem Presensi Digital ASN Kabupaten Soppeng
                    </p>
                </div>
            </div>

            <!-- Login Card -->
            <Card class="border-border/60 shadow-2xl backdrop-blur-xl bg-card/95">
                <CardHeader class="space-y-1 pb-4">
                    <CardTitle class="text-xl font-bold tracking-tight flex items-center justify-between">
                        <span>Masuk Portal Presensi</span>
                        <ShieldCheck class="w-5 h-5 text-teal-600 dark:text-teal-400" />
                    </CardTitle>
                    <CardDescription>
                        Masukkan NIP dan Kata Sandi terdaftar untuk melanjutkan presensi.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <!-- Status Flash Banner -->
                    <div
                        v-if="status"
                        class="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2"
                    >
                        <CheckCircle2 class="w-4 h-4 shrink-0" />
                        <span>{{ status }}</span>
                    </div>

                    <form @submit.prevent="submit" class="space-y-4">
                        <!-- NIP Input Field -->
                        <div class="space-y-2">
                            <Label for="nip" class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Nomor Induk Pegawai (NIP)
                            </Label>
                            <div class="relative">
                                <User class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                                <Input
                                    id="nip"
                                    v-model="form.nip"
                                    type="text"
                                    placeholder="Contoh: 198501012010011001"
                                    autocomplete="username"
                                    required
                                    class="pl-9 h-11 transition-all focus-visible:ring-teal-500"
                                    :class="{ 'border-destructive focus-visible:ring-destructive': form.errors.nip }"
                                />
                            </div>
                            <p v-if="form.errors.nip" class="text-xs font-medium text-destructive mt-1">
                                {{ form.errors.nip }}
                            </p>
                        </div>

                        <!-- Password Input Field -->
                        <div class="space-y-2">
                            <div class="flex items-center justify-between">
                                <Label for="password" class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                    Kata Sandi
                                </Label>
                                <Link
                                    v-if="canResetPassword"
                                    href="/forgot-password"
                                    class="text-xs font-medium text-teal-600 hover:text-teal-500 dark:text-teal-400 transition-colors"
                                >
                                    Lupa Kata Sandi?
                                </Link>
                            </div>
                            <div class="relative">
                                <Lock class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                                <Input
                                    id="password"
                                    v-model="form.password"
                                    :type="showPassword ? 'text' : 'password'"
                                    placeholder="••••••••••••"
                                    autocomplete="current-password"
                                    required
                                    class="pl-9 pr-10 h-11 transition-all focus-visible:ring-teal-500"
                                    :class="{ 'border-destructive focus-visible:ring-destructive': form.errors.password }"
                                />
                                <button
                                    type="button"
                                    @click="showPassword = !showPassword"
                                    class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md"
                                >
                                    <EyeOff v-if="showPassword" class="w-4 h-4" />
                                    <Eye v-else class="w-4 h-4" />
                                </button>
                            </div>
                            <p v-if="form.errors.password" class="text-xs font-medium text-destructive mt-1">
                                {{ form.errors.password }}
                            </p>
                        </div>

                        <!-- Remember Me Option using shadcn Checkbox -->
                        <div class="flex items-center gap-2 pt-1">
                            <Checkbox
                                id="remember"
                                :checked="form.remember"
                                @update:checked="form.remember = $event"
                            />
                            <Label for="remember" class="text-xs text-muted-foreground cursor-pointer">
                                Ingat Saya di Perangkat Ini
                            </Label>
                        </div>

                        <!-- Submit Button -->
                        <Button
                            type="submit"
                            :disabled="form.processing"
                            class="w-full h-11 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-semibold shadow-lg shadow-teal-600/20 transition-all rounded-xl cursor-pointer"
                        >
                            <Loader2 v-if="form.processing" class="w-4 h-4 mr-2 animate-spin" />
                            <span v-if="!form.processing">Masuk Portal SIMPATI</span>
                            <span v-else>Memverifikasi...</span>
                        </Button>
                    </form>
                </CardContent>

                <CardFooter class="pt-2 pb-6 border-t border-border/40 justify-center">
                    <p class="text-xs text-center text-muted-foreground flex items-center gap-1.5">
                        <Sparkles class="w-3.5 h-3.5 text-amber-500" />
                        <span>Terintegrasi dengan SIMPEG Kabupaten Soppeng</span>
                    </p>
                </CardFooter>
            </Card>
        </div>
    </div>
</template>
