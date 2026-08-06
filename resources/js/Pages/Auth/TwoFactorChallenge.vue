<script setup lang="ts">
import { ref } from 'vue';
import { useForm, Head } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { ShieldCheck, KeyRound, Loader2 } from '@lucide/vue';

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

    <div class="relative min-h-screen flex items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-300">
        <div class="relative w-full max-w-md space-y-6">
            <!-- Branding -->
            <div class="text-center space-y-2">
                <div class="inline-flex p-2 rounded-2xl bg-teal-500/10 border border-teal-500/30 dark:bg-teal-500/20 shadow-lg backdrop-blur-md">
                    <img src="/images/logo.png" alt="Logo SIMPATI" class="w-14 h-14 rounded-xl object-cover" />
                </div>
                <h1 class="text-2xl font-bold tracking-tight text-foreground">Otentikasi Dua Langkah (2FA)</h1>
            </div>

            <!-- Card -->
            <Card class="border-border/60 shadow-2xl backdrop-blur-xl bg-card/95">
                <CardHeader class="space-y-1 pb-4">
                    <CardTitle class="text-xl font-bold tracking-tight flex items-center justify-between">
                        <span>{{ recovery ? 'Gunakan Kode Pemulihan' : 'Verifikasi Aplikasi Authenticator' }}</span>
                        <ShieldCheck class="w-5 h-5 text-teal-600 dark:text-teal-400" />
                    </CardTitle>
                    <CardDescription>
                        <template v-if="!recovery">
                            Masukkan 6 digit kode dari aplikasi otentikator Anda (Google Authenticator / Authy).
                        </template>
                        <template v-else>
                            Masukkan salah satu kode pemulihan darurat Anda.
                        </template>
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form @submit.prevent="submit" class="space-y-4">
                        <div v-if="!recovery" class="space-y-2">
                            <Label for="code" class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Kode Otentikator (6-Digit)</Label>
                            <Input
                                id="code"
                                v-model="form.code"
                                type="text"
                                inputmode="numeric"
                                placeholder="123456"
                                autofocus
                                autocomplete="one-time-code"
                                class="h-12 text-center text-lg font-mono tracking-widest transition-all focus-visible:ring-teal-500"
                                :class="{ 'border-destructive focus-visible:ring-destructive': form.errors.code }"
                            />
                            <p v-if="form.errors.code" class="text-xs font-medium text-destructive mt-1">
                                {{ form.errors.code }}
                            </p>
                        </div>

                        <div v-else class="space-y-2">
                            <Label for="recovery_code" class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Kode Pemulihan Darurat</Label>
                            <Input
                                id="recovery_code"
                                v-model="form.recovery_code"
                                type="text"
                                placeholder="abcdef-123456"
                                autofocus
                                class="h-11 font-mono transition-all focus-visible:ring-teal-500"
                                :class="{ 'border-destructive focus-visible:ring-destructive': form.errors.recovery_code }"
                            />
                            <p v-if="form.errors.recovery_code" class="text-xs font-medium text-destructive mt-1">
                                {{ form.errors.recovery_code }}
                            </p>
                        </div>

                        <Button
                            type="submit"
                            :disabled="form.processing"
                            class="w-full h-11 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-semibold shadow-lg shadow-teal-600/20 transition-all rounded-xl cursor-pointer"
                        >
                            <Loader2 v-if="form.processing" class="w-4 h-4 mr-2 animate-spin" />
                            <span v-if="!form.processing">Verifikasi & Masuk</span>
                            <span v-else>Memverifikasi...</span>
                        </Button>
                    </form>

                    <div class="mt-4 text-center">
                        <button
                            type="button"
                            @click="toggleRecovery"
                            class="text-xs font-medium text-teal-600 hover:text-teal-500 dark:text-teal-400 flex items-center justify-center gap-1.5 mx-auto transition-colors"
                        >
                            <KeyRound class="w-3.5 h-3.5" />
                            <span>{{ recovery ? 'Gunakan Kode Otentikator' : 'Gunakan Kode Pemulihan Darurat' }}</span>
                        </button>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
</template>
