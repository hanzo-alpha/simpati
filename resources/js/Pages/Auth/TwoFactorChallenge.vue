<script setup lang="ts">
import { useForm, Head } from '@inertiajs/vue3';
import { ShieldCheck, KeyRound, Loader2 } from '@lucide/vue';
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

const recovery = ref(false);

const form = useForm({
    code: '',
    recovery_code: '',
});

const submit = () => {
    form.post('/two-factor-challenge');
};

const toggleRecovery = () => {
    recovery.value = !recovery.value;
    form.code = '';
    form.recovery_code = '';
};
</script>

<template>
    <Head title="Verifikasi 2FA - SIMPATI" />

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
                    Otentikasi Dua Langkah (2FA)
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
                        <span>{{
                            recovery
                                ? 'Gunakan Kode Pemulihan'
                                : 'Verifikasi Aplikasi Authenticator'
                        }}</span>
                        <ShieldCheck
                            class="h-5 w-5 text-teal-600 dark:text-teal-400"
                        />
                    </CardTitle>
                    <CardDescription>
                        <template v-if="!recovery">
                            Masukkan 6 digit kode dari aplikasi otentikator Anda
                            (Google Authenticator / Authy).
                        </template>
                        <template v-else>
                            Masukkan salah satu kode pemulihan darurat Anda.
                        </template>
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form @submit.prevent="submit" class="space-y-4">
                        <div v-if="!recovery" class="space-y-2">
                            <Label
                                for="code"
                                class="text-xs font-semibold tracking-wider text-muted-foreground uppercase"
                                >Kode Otentikator (6-Digit)</Label
                            >
                            <Input
                                id="code"
                                v-model="form.code"
                                type="text"
                                inputmode="numeric"
                                placeholder="123456"
                                autofocus
                                autocomplete="one-time-code"
                                class="h-12 text-center font-mono text-lg tracking-widest transition-all focus-visible:ring-teal-500"
                                :class="{
                                    'border-destructive focus-visible:ring-destructive':
                                        form.errors.code,
                                }"
                            />
                            <p
                                v-if="form.errors.code"
                                class="mt-1 text-xs font-medium text-destructive"
                            >
                                {{ form.errors.code }}
                            </p>
                        </div>

                        <div v-else class="space-y-2">
                            <Label
                                for="recovery_code"
                                class="text-xs font-semibold tracking-wider text-muted-foreground uppercase"
                                >Kode Pemulihan Darurat</Label
                            >
                            <Input
                                id="recovery_code"
                                v-model="form.recovery_code"
                                type="text"
                                placeholder="abcdef-123456"
                                autofocus
                                class="h-11 font-mono transition-all focus-visible:ring-teal-500"
                                :class="{
                                    'border-destructive focus-visible:ring-destructive':
                                        form.errors.recovery_code,
                                }"
                            />
                            <p
                                v-if="form.errors.recovery_code"
                                class="mt-1 text-xs font-medium text-destructive"
                            >
                                {{ form.errors.recovery_code }}
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
                                >Verifikasi & Masuk</span
                            >
                            <span v-else>Memverifikasi...</span>
                        </Button>
                    </form>

                    <div class="mt-4 text-center">
                        <button
                            type="button"
                            @click="toggleRecovery"
                            class="mx-auto flex items-center justify-center gap-1.5 text-xs font-medium text-teal-600 transition-colors hover:text-teal-500 dark:text-teal-400"
                        >
                            <KeyRound class="h-3.5 w-3.5" />
                            <span>{{
                                recovery
                                    ? 'Gunakan Kode Otentikator'
                                    : 'Gunakan Kode Pemulihan Darurat'
                            }}</span>
                        </button>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
</template>
