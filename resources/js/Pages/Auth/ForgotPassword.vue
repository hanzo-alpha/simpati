<script setup lang="ts">
import { useForm, Head, Link } from '@inertiajs/vue3';
import { Mail, ArrowLeft, Loader2, CheckCircle2, KeyRound } from '@lucide/vue';
import { Button } from '@/Components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';

defineProps<{
    status?: string;
}>();

const form = useForm({
    email: '',
});

const submit = () => {
    form.post('/forgot-password');
};
</script>

<template>
    <Head title="Lupa Kata Sandi - SIMPATI" />

    <div
        class="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-12 transition-colors duration-300 sm:px-6 lg:px-8"
    >
        <!-- Ambient Glow -->
        <div class="pointer-events-none absolute inset-0 overflow-hidden">
            <div
                class="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-teal-500/15 blur-3xl dark:bg-teal-500/10"
            ></div>
            <div
                class="absolute -right-40 -bottom-40 h-96 w-96 rounded-full bg-emerald-500/15 blur-3xl dark:bg-emerald-500/10"
            ></div>
        </div>

        <div class="relative w-full max-w-md space-y-6">
            <!-- Branding -->
            <div class="space-y-2 text-center">
                <div
                    class="inline-flex rounded-2xl border border-teal-500/30 bg-teal-500/10 p-2 shadow-lg backdrop-blur-md dark:bg-teal-500/20"
                >
                    <img
                        src="/images/logo.png"
                        alt="Logo SIMPATI"
                        class="h-14 w-14 rounded-xl object-cover"
                    />
                </div>
                <h1 class="text-2xl font-bold tracking-tight text-foreground">
                    SIMPATI Kab. Soppeng
                </h1>
            </div>

            <!-- Fortify Status Alert -->
            <div
                v-if="status"
                class="flex items-center gap-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3.5 text-sm text-emerald-600 dark:text-emerald-400"
            >
                <CheckCircle2 class="h-4 w-4 shrink-0" />
                <span>{{ status }}</span>
            </div>

            <!-- Card -->
            <Card
                class="border-border/60 bg-card/95 shadow-2xl backdrop-blur-xl"
            >
                <CardHeader class="space-y-1 pb-4">
                    <CardTitle
                        class="flex items-center justify-between text-xl font-bold tracking-tight"
                    >
                        <span>Lupa Kata Sandi?</span>
                        <KeyRound
                            class="h-5 w-5 text-teal-600 dark:text-teal-400"
                        />
                    </CardTitle>
                    <CardDescription>
                        Masukkan alamat email terdaftar untuk menerima tautan
                        pemulihan kata sandi.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form @submit.prevent="submit" class="space-y-4">
                        <div class="space-y-2">
                            <Label
                                for="email"
                                class="text-xs font-semibold tracking-wider text-muted-foreground uppercase"
                            >
                                Alamat Email Terdaftar
                            </Label>
                            <div class="relative">
                                <Mail
                                    class="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                                />
                                <Input
                                    id="email"
                                    v-model="form.email"
                                    type="email"
                                    placeholder="nama@soppengkab.go.id"
                                    required
                                    class="h-11 pl-9 transition-all focus-visible:ring-teal-500"
                                    :class="{
                                        'border-destructive focus-visible:ring-destructive':
                                            form.errors.email,
                                    }"
                                />
                            </div>
                            <p
                                v-if="form.errors.email"
                                class="mt-1 text-xs font-medium text-destructive"
                            >
                                {{ form.errors.email }}
                            </p>
                        </div>

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
                                >Kirim Tautan Pemulihan</span
                            >
                            <span v-else>Mengirim...</span>
                        </Button>
                    </form>
                </CardContent>

                <CardFooter
                    class="justify-center border-t border-border/40 pt-2 pb-6"
                >
                    <Link
                        href="/login"
                        class="flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <ArrowLeft class="h-3.5 w-3.5" />
                        <span>Kembali ke Halaman Login</span>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    </div>
</template>
