<script setup lang="ts">
import { useForm, Head } from '@inertiajs/vue3';
import { ShieldAlert, Lock, Eye, EyeOff, Loader2 } from '@lucide/vue';
import { ref } from 'vue';
import { Button } from '@/Components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';

const showPassword = ref(false);

const form = useForm({
    password: '',
});

const submit = () => {
    form.post('/user/confirm-password', {
        onFinish: () => form.reset('password'),
    });
};
</script>

<template>
    <Head title="Konfirmasi Kata Sandi - SIMPATI" />

    <div
        class="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-12 transition-colors duration-300 sm:px-6 lg:px-8"
    >
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
                    Konfirmasi Keamanan
                </h1>
            </div>

            <!-- Card -->
            <Card
                class="border-border/60 bg-card/95 shadow-2xl backdrop-blur-xl"
            >
                <CardHeader class="space-y-1 pb-4">
                    <CardTitle
                        class="flex items-center justify-between text-xl font-bold tracking-tight"
                    >
                        <span>Verifikasi Akses Sensitif</span>
                        <ShieldAlert class="h-5 w-5 text-amber-500" />
                    </CardTitle>
                    <CardDescription>
                        Ini adalah area aman aplikasi. Harap konfirmasi kata
                        sandi Anda sebelum melanjutkan.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form @submit.prevent="submit" class="space-y-4">
                        <div class="space-y-2">
                            <Label
                                for="password"
                                class="text-xs font-semibold tracking-wider text-muted-foreground uppercase"
                                >Kata Sandi Anda</Label
                            >
                            <div class="relative">
                                <Lock
                                    class="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                                />
                                <Input
                                    id="password"
                                    v-model="form.password"
                                    :type="showPassword ? 'text' : 'password'"
                                    placeholder="••••••••••••"
                                    required
                                    autofocus
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

                        <Button
                            type="submit"
                            :disabled="form.processing"
                            class="h-11 w-full cursor-pointer rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 font-semibold text-white shadow-lg shadow-teal-600/20 transition-all hover:from-teal-700 hover:to-emerald-700"
                        >
                            <Loader2
                                v-if="form.processing"
                                class="mr-2 h-4 w-4 animate-spin"
                            />
                            <span v-if="!form.processing">Konfirmasi</span>
                            <span v-else>Memverifikasi...</span>
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    </div>
</template>
