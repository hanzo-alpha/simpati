<script setup lang="ts">
import { useForm, Head, Link } from '@inertiajs/vue3';
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
import { ref } from 'vue';
import { Button } from '@/Components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import { Checkbox } from '@/Components/ui/checkbox';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';

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

    <div
        class="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-12 transition-colors duration-300 sm:px-6 lg:px-8"
    >
        <!-- Background Ambient Glow & Patterns -->
        <div class="pointer-events-none absolute inset-0 overflow-hidden">
            <div
                class="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-teal-500/15 blur-3xl dark:bg-teal-500/10"
            ></div>
            <div
                class="absolute -right-40 -bottom-40 h-96 w-96 rounded-full bg-emerald-500/15 blur-3xl dark:bg-emerald-500/10"
            ></div>
        </div>

        <div class="relative w-full max-w-md space-y-6">
            <!-- Header Logo & Branding -->
            <div class="space-y-3 text-center">
                <div
                    class="inline-flex rounded-2xl border border-teal-500/30 bg-teal-500/10 p-2 shadow-lg shadow-teal-500/10 backdrop-blur-md transition-all hover:scale-105 dark:border-teal-400/40 dark:bg-teal-500/20"
                >
                    <img
                        src="/images/logo.png"
                        alt="Logo SIMPATI"
                        class="h-16 w-16 rounded-xl object-cover"
                    />
                </div>
                <div>
                    <h1
                        class="flex items-center justify-center gap-2 text-3xl font-extrabold tracking-tight text-foreground"
                    >
                        <span
                            class="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent dark:from-teal-400 dark:to-emerald-400"
                        >
                            SIMPATI
                        </span>
                    </h1>
                    <p class="mt-1 text-sm font-medium text-muted-foreground">
                        Sistem Presensi Digital ASN Kabupaten Soppeng
                    </p>
                </div>
            </div>

            <!-- Login Card -->
            <Card
                class="border-border/60 bg-card/95 shadow-2xl backdrop-blur-xl"
            >
                <CardHeader class="space-y-1 pb-4">
                    <CardTitle
                        class="flex items-center justify-between text-xl font-bold tracking-tight"
                    >
                        <span>Masuk Portal Presensi</span>
                        <ShieldCheck
                            class="h-5 w-5 text-teal-600 dark:text-teal-400"
                        />
                    </CardTitle>
                    <CardDescription>
                        Masukkan NIP dan Kata Sandi terdaftar untuk melanjutkan
                        presensi.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <!-- Status Flash Banner -->
                    <div
                        v-if="status"
                        class="mb-4 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs font-semibold text-emerald-600 dark:text-emerald-400"
                    >
                        <CheckCircle2 class="h-4 w-4 shrink-0" />
                        <span>{{ status }}</span>
                    </div>

                    <form @submit.prevent="submit" class="space-y-4">
                        <!-- NIP Input Field -->
                        <div class="space-y-2">
                            <Label
                                for="nip"
                                class="text-xs font-semibold tracking-wider text-muted-foreground uppercase"
                            >
                                Nomor Induk Pegawai (NIP)
                            </Label>
                            <div class="relative">
                                <User
                                    class="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                                />
                                <Input
                                    id="nip"
                                    v-model="form.nip"
                                    type="text"
                                    placeholder="Contoh: 198501012010011001"
                                    autocomplete="username"
                                    required
                                    class="h-11 pl-9 transition-all focus-visible:ring-teal-500"
                                    :class="{
                                        'border-destructive focus-visible:ring-destructive':
                                            form.errors.nip,
                                    }"
                                />
                            </div>
                            <p
                                v-if="form.errors.nip"
                                class="mt-1 text-xs font-medium text-destructive"
                            >
                                {{ form.errors.nip }}
                            </p>
                        </div>

                        <!-- Password Input Field -->
                        <div class="space-y-2">
                            <div class="flex items-center justify-between">
                                <Label
                                    for="password"
                                    class="text-xs font-semibold tracking-wider text-muted-foreground uppercase"
                                >
                                    Kata Sandi
                                </Label>
                                <Link
                                    v-if="canResetPassword"
                                    href="/forgot-password"
                                    class="text-xs font-medium text-teal-600 transition-colors hover:text-teal-500 dark:text-teal-400"
                                >
                                    Lupa Kata Sandi?
                                </Link>
                            </div>
                            <div class="relative">
                                <Lock
                                    class="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                                />
                                <Input
                                    id="password"
                                    v-model="form.password"
                                    :type="showPassword ? 'text' : 'password'"
                                    placeholder="••••••••••••"
                                    autocomplete="current-password"
                                    required
                                    class="h-11 pr-10 pl-9 transition-all focus-visible:ring-teal-500"
                                    :class="{
                                        'border-destructive focus-visible:ring-destructive':
                                            form.errors.password,
                                    }"
                                />
                                <button
                                    type="button"
                                    @click="showPassword = !showPassword"
                                    class="absolute top-1/2 right-3 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    <EyeOff
                                        v-if="showPassword"
                                        class="h-4 w-4"
                                    />
                                    <Eye v-else class="h-4 w-4" />
                                </button>
                            </div>
                            <p
                                v-if="form.errors.password"
                                class="mt-1 text-xs font-medium text-destructive"
                            >
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
                            <Label
                                for="remember"
                                class="cursor-pointer text-xs text-muted-foreground"
                            >
                                Ingat Saya di Perangkat Ini
                            </Label>
                        </div>

                        <!-- Submit Button -->
                        <Button
                            type="submit"
                            :disabled="form.processing"
                            class="h-11 w-full cursor-pointer rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 font-semibold text-white shadow-lg shadow-teal-600/20 transition-all hover:from-teal-700 hover:to-emerald-700"
                        >
                            <Loader2
                                v-if="form.processing"
                                class="mr-2 h-4 w-4 animate-spin"
                            />
                            <span v-if="!form.processing"
                                >Masuk Portal SIMPATI</span
                            >
                            <span v-else>Memverifikasi...</span>
                        </Button>
                    </form>
                </CardContent>

                <CardFooter
                    class="justify-center border-t border-border/40 pt-2 pb-6"
                >
                    <p
                        class="flex items-center gap-1.5 text-center text-xs text-muted-foreground"
                    >
                        <Sparkles class="h-3.5 w-3.5 text-amber-500" />
                        <span
                            >Terintegrasi dengan SIMPEG Kabupaten Soppeng</span
                        >
                    </p>
                </CardFooter>
            </Card>
        </div>
    </div>
</template>
