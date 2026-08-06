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
import { Mail, Lock, Eye, EyeOff, KeyRound, Loader2 } from '@lucide/vue';

const props = defineProps<{
    email: string;
    token: string;
}>();

const showPassword = ref(false);

const form = useForm({
    token: props.token,
    email: props.email,
    password: '',
    password_confirmation: '',
});

const submit = () => {
    form.post('/reset-password', {
        onFinish: () => form.reset('password', 'password_confirmation'),
    });
};
</script>

<template>
    <Head title="Atur Ulang Kata Sandi - SIMPATI" />

    <div class="relative min-h-screen flex items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-300">
        <div class="relative w-full max-w-md space-y-6">
            <!-- Header -->
            <div class="text-center space-y-2">
                <div class="inline-flex p-2 rounded-2xl bg-teal-500/10 border border-teal-500/30 dark:bg-teal-500/20 shadow-lg backdrop-blur-md">
                    <img src="/images/logo.png" alt="Logo SIMPATI" class="w-14 h-14 rounded-xl object-cover" />
                </div>
                <h1 class="text-2xl font-bold tracking-tight text-foreground">Atur Ulang Kata Sandi</h1>
            </div>

            <!-- Card -->
            <Card class="border-border/60 shadow-2xl backdrop-blur-xl bg-card/95">
                <CardHeader class="space-y-1 pb-4">
                    <CardTitle class="text-xl font-bold tracking-tight flex items-center justify-between">
                        <span>Buat Kata Sandi Baru</span>
                        <KeyRound class="w-5 h-5 text-teal-600 dark:text-teal-400" />
                    </CardTitle>
                    <CardDescription>
                        Kata sandi baru minimal 8 karakter.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form @submit.prevent="submit" class="space-y-4">
                        <!-- Email -->
                        <div class="space-y-2">
                            <Label for="email" class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</Label>
                            <div class="relative">
                                <Mail class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                                <Input
                                    id="email"
                                    v-model="form.email"
                                    type="email"
                                    required
                                    readonly
                                    class="pl-9 h-11 bg-muted/50"
                                />
                            </div>
                        </div>

                        <!-- New Password -->
                        <div class="space-y-2">
                            <Label for="password" class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Kata Sandi Baru</Label>
                            <div class="relative">
                                <Lock class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                                <Input
                                    id="password"
                                    v-model="form.password"
                                    :type="showPassword ? 'text' : 'password'"
                                    placeholder="••••••••••••"
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

                        <!-- Confirm Password -->
                        <div class="space-y-2">
                            <Label for="password_confirmation" class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Konfirmasi Kata Sandi</Label>
                            <div class="relative">
                                <Lock class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                                <Input
                                    id="password_confirmation"
                                    v-model="form.password_confirmation"
                                    :type="showPassword ? 'text' : 'password'"
                                    placeholder="••••••••••••"
                                    required
                                    class="pl-9 h-11 transition-all focus-visible:ring-teal-500"
                                    :class="{ 'border-destructive focus-visible:ring-destructive': form.errors.password_confirmation }"
                                />
                            </div>
                            <p v-if="form.errors.password_confirmation" class="text-xs font-medium text-destructive mt-1">
                                {{ form.errors.password_confirmation }}
                            </p>
                        </div>

                        <Button
                            type="submit"
                            :disabled="form.processing"
                            class="w-full h-11 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-semibold shadow-lg shadow-teal-600/20 transition-all rounded-xl cursor-pointer"
                        >
                            <Loader2 v-if="form.processing" class="w-4 h-4 mr-2 animate-spin" />
                            <span v-if="!form.processing">Simpan Kata Sandi Baru</span>
                            <span v-else>Menyimpan...</span>
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    </div>
</template>
