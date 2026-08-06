<script setup lang="ts">
import { useForm, Head, Link } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Mail, ArrowLeft, Loader2, CheckCircle2, KeyRound } from '@lucide/vue';

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

    <div class="relative min-h-screen flex items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-300">
        <!-- Ambient Glow -->
        <div class="absolute inset-0 pointer-events-none overflow-hidden">
            <div class="absolute -top-40 -left-40 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl dark:bg-teal-500/10"></div>
            <div class="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl dark:bg-emerald-500/10"></div>
        </div>

        <div class="relative w-full max-w-md space-y-6">
            <!-- Branding -->
            <div class="text-center space-y-2">
                <div class="inline-flex p-2 rounded-2xl bg-teal-500/10 border border-teal-500/30 dark:bg-teal-500/20 shadow-lg backdrop-blur-md">
                    <img src="/images/logo.png" alt="Logo SIMPATI" class="w-14 h-14 rounded-xl object-cover" />
                </div>
                <h1 class="text-2xl font-bold tracking-tight text-foreground">SIMPATI Kab. Soppeng</h1>
            </div>

            <!-- Fortify Status Alert -->
            <div v-if="status" class="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm flex items-center gap-2.5">
                <CheckCircle2 class="w-4 h-4 shrink-0" />
                <span>{{ status }}</span>
            </div>

            <!-- Card -->
            <Card class="border-border/60 shadow-2xl backdrop-blur-xl bg-card/95">
                <CardHeader class="space-y-1 pb-4">
                    <CardTitle class="text-xl font-bold tracking-tight flex items-center justify-between">
                        <span>Lupa Kata Sandi?</span>
                        <KeyRound class="w-5 h-5 text-teal-600 dark:text-teal-400" />
                    </CardTitle>
                    <CardDescription>
                        Masukkan alamat email terdaftar untuk menerima tautan pemulihan kata sandi.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form @submit.prevent="submit" class="space-y-4">
                        <div class="space-y-2">
                            <Label for="email" class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Alamat Email Terdaftar
                            </Label>
                            <div class="relative">
                                <Mail class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                                <Input
                                    id="email"
                                    v-model="form.email"
                                    type="email"
                                    placeholder="nama@soppengkab.go.id"
                                    required
                                    class="pl-9 h-11 transition-all focus-visible:ring-teal-500"
                                    :class="{ 'border-destructive focus-visible:ring-destructive': form.errors.email }"
                                />
                            </div>
                            <p v-if="form.errors.email" class="text-xs font-medium text-destructive mt-1">
                                {{ form.errors.email }}
                            </p>
                        </div>

                        <Button
                            type="submit"
                            :disabled="form.processing"
                            class="w-full h-11 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-semibold shadow-lg shadow-teal-600/20 transition-all rounded-xl cursor-pointer"
                        >
                            <Loader2 v-if="form.processing" class="w-4 h-4 mr-2 animate-spin" />
                            <span v-if="!form.processing">Kirim Tautan Pemulihan</span>
                            <span v-else>Mengirim...</span>
                        </Button>
                    </form>
                </CardContent>

                <CardFooter class="pt-2 pb-6 border-t border-border/40 justify-center">
                    <Link href="/login" class="text-xs font-medium text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors">
                        <ArrowLeft class="w-3.5 h-3.5" />
                        <span>Kembali ke Halaman Login</span>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    </div>
</template>
