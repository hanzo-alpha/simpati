<script setup lang="ts">
import { ref, computed } from 'vue';
import { usePage, useForm, Link } from '@inertiajs/vue3';
import SettingsLayout from '@/Layouts/SettingsLayout.vue';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import {
    User,
    Briefcase,
    Mail,
    MapPin,
    LogOut,
    ShieldCheck,
    AlertTriangle,
    CheckCircle2,
    Save,
    Trash2,
} from '@lucide/vue';

const props = defineProps<{
    isAdmin?: boolean;
    status?: string;
    mustVerifyEmail?: boolean;
}>();

const page = usePage();
const user = computed<any>(() => page.props.auth?.user || {});

const initials = computed(() => {
    const name = user.value.name || 'A';
    return name.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase();
});

// Profile Form
const profileForm = useForm({
    name: user.value.name || '',
    email: user.value.email || '',
});

const updateProfile = () => {
    profileForm.patch('/profil', {
        preserveScroll: true,
    });
};

// Delete Account Modal
const confirmingUserDeletion = ref(false);
const deleteForm = useForm({
    password: '',
});

const confirmUserDeletion = () => {
    confirmingUserDeletion.value = true;
};

const deleteUser = () => {
    deleteForm.delete('/profil', {
        preserveScroll: true,
        onSuccess: () => closeModal(),
        onError: () => deleteForm.reset(),
    });
};

const closeModal = () => {
    confirmingUserDeletion.value = false;
    deleteForm.reset();
};
</script>

<template>
    <SettingsLayout :is-admin="isAdmin">
        <div class="space-y-6">
            <!-- User Header Card -->
            <Card class="rounded-none border border-border bg-card text-card-foreground shadow-xs border-t-2 border-t-emerald-500">
                <CardContent class="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div class="flex items-center gap-4">
                        <div class="w-16 h-16 rounded-none bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-xl shrink-0 border border-primary/30">
                            {{ initials }}
                        </div>
                        <div class="space-y-1">
                            <h2 class="text-lg font-bold text-foreground tracking-tight">{{ user.name }}</h2>
                            <p class="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">NIP. {{ user.nip }}</p>
                            <div class="flex items-center gap-2 pt-0.5">
                                <Badge variant="outline" class="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-[10px] rounded-none font-semibold uppercase">
                                    {{ user.role?.display_name || 'Aparatur Sipil Negara' }}
                                </Badge>
                                <Badge variant="outline" class="bg-muted text-muted-foreground border-border text-[10px] rounded-none uppercase">
                                    Status: Aktif
                                </Badge>
                            </div>
                        </div>
                    </div>

                    <Link href="/logout" method="post" as="button" class="shrink-0 w-full sm:w-auto">
                        <Button variant="outline" class="w-full sm:w-auto text-xs font-semibold rounded-none cursor-pointer border-border">
                            <LogOut class="w-4 h-4 mr-2" />
                            <span>Keluar dari Akun</span>
                        </Button>
                    </Link>
                </CardContent>
            </Card>

            <!-- Form Update Informasi Profil -->
            <Card class="rounded-none border border-border bg-card text-card-foreground shadow-xs">
                <CardHeader class="p-5 border-b border-border/60">
                    <CardTitle class="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                        <User class="w-4 h-4 text-emerald-500" />
                        <span>Informasi Profil</span>
                    </CardTitle>
                    <CardDescription class="text-xs text-muted-foreground">
                        Perbarui nama lengkap dan alamat email akun Anda.
                    </CardDescription>
                </CardHeader>
                <form @submit.prevent="updateProfile">
                    <CardContent class="p-5 space-y-4">
                        <div class="space-y-1.5">
                            <Label for="name" class="text-xs font-semibold">Nama Lengkap ASN</Label>
                            <Input
                                id="name"
                                v-model="profileForm.name"
                                type="text"
                                class="h-9 text-xs rounded-none"
                                required
                                autocomplete="name"
                            />
                            <p v-if="profileForm.errors.name" class="text-[11px] text-destructive font-medium">
                                {{ profileForm.errors.name }}
                            </p>
                        </div>

                        <div class="space-y-1.5">
                            <Label for="email" class="text-xs font-semibold">Alamat Email Kedinasan</Label>
                            <Input
                                id="email"
                                v-model="profileForm.email"
                                type="email"
                                class="h-9 text-xs rounded-none font-mono"
                                autocomplete="username"
                            />
                            <p v-if="profileForm.errors.email" class="text-[11px] text-destructive font-medium">
                                {{ profileForm.errors.email }}
                            </p>
                        </div>

                        <div v-if="status === 'profile-updated'" class="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2 font-medium rounded-none">
                            <CheckCircle2 class="w-4 h-4 shrink-0" />
                            <span>Informasi profil Anda telah berhasil diperbarui.</span>
                        </div>
                    </CardContent>
                    <CardFooter class="p-5 pt-0 border-t border-border/40 mt-2 flex justify-end">
                        <Button
                            type="submit"
                            :disabled="profileForm.processing"
                            class="bg-primary text-primary-foreground text-xs font-bold rounded-none cursor-pointer"
                        >
                            <Save class="w-3.5 h-3.5 mr-1.5" />
                            <span>Simpan Perubahan</span>
                        </Button>
                    </CardFooter>
                </form>
            </Card>

            <!-- Kepegawaian & Geofence Details -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card class="rounded-none border border-border bg-card text-card-foreground shadow-xs">
                    <CardHeader class="p-5 border-b border-border/60 pb-3">
                        <CardTitle class="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                            <Briefcase class="w-4 h-4 text-emerald-500" />
                            <span>Informasi Kepegawaian</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent class="p-5 space-y-3 text-xs">
                        <div class="flex justify-between py-1.5 border-b border-border/40">
                            <span class="text-muted-foreground font-medium">OPD Utama</span>
                            <span class="font-bold text-foreground">{{ user.office?.opd_name || 'Sekretariat Daerah' }}</span>
                        </div>
                        <div class="flex justify-between py-1.5 border-b border-border/40">
                            <span class="text-muted-foreground font-medium">Jabatan</span>
                            <span class="font-bold text-foreground">{{ user.profile?.jabatan || 'Pranata Komputer Ahli Muda' }}</span>
                        </div>
                        <div class="flex justify-between py-1.5 border-b border-border/40">
                            <span class="text-muted-foreground font-medium">Pangkat / Golongan</span>
                            <span class="font-bold text-foreground">{{ user.profile?.pangkat_golongan || 'Penata / III/c' }}</span>
                        </div>
                        <div class="flex justify-between py-1.5">
                            <span class="text-muted-foreground font-medium">Sisa Cuti Tahunan</span>
                            <span class="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">{{ user.profile?.sisa_cuti_tahunan ?? 12 }} Hari</span>
                        </div>
                    </CardContent>
                </Card>

                <Card class="rounded-none border border-border bg-card text-card-foreground shadow-xs">
                    <CardHeader class="p-5 border-b border-border/60 pb-3">
                        <CardTitle class="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                            <MapPin class="w-4 h-4 text-emerald-500" />
                            <span>Lokasi Kantor & Geofence</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent class="p-5 space-y-3 text-xs">
                        <div class="flex justify-between py-1.5 border-b border-border/40">
                            <span class="text-muted-foreground font-medium">Nama Kantor OPD</span>
                            <span class="font-bold text-foreground">{{ user.office?.name || 'Kantor Bupati Soppeng' }}</span>
                        </div>
                        <div class="flex justify-between py-1.5 border-b border-border/40">
                            <span class="text-muted-foreground font-medium">Radius Geofence Presensi</span>
                            <span class="font-mono font-bold text-emerald-600 dark:text-emerald-400">{{ user.office?.radius_meters || 200 }} Meter</span>
                        </div>
                        <div class="flex justify-between py-1.5">
                            <span class="text-muted-foreground font-medium">Binding Perangkat Mobile</span>
                            <Badge variant="outline" class="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-[10px] rounded-none font-semibold">
                                <ShieldCheck class="w-3 h-3 mr-1" />
                                Terikat (Secured)
                            </Badge>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <!-- Danger Zone -->
            <Card class="rounded-none border border-rose-500/40 bg-card text-card-foreground shadow-xs border-t-2 border-t-rose-500">
                <CardHeader class="p-5 border-b border-border/60">
                    <CardTitle class="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-2">
                        <AlertTriangle class="w-4 h-4" />
                        <span>Danger Zone (Hapus Akun Saya)</span>
                    </CardTitle>
                    <CardDescription class="text-xs text-muted-foreground">
                        Setelah akun Anda dihapus, semua data presensi dan informasi kepegawaian Anda akan dihapus secara permanen.
                    </CardDescription>
                </CardHeader>
                <CardContent class="p-5">
                    <Button
                        variant="destructive"
                        @click="confirmUserDeletion"
                        class="text-xs font-semibold rounded-none cursor-pointer"
                    >
                        <Trash2 class="w-3.5 h-3.5 mr-1.5" />
                        <span>Hapus Akun Permanen</span>
                    </Button>
                </CardContent>
            </Card>
        </div>

        <!-- Dialog Modal Konfirmasi Hapus Akun -->
        <Dialog :open="confirmingUserDeletion" @update:open="closeModal">
            <DialogContent class="sm:max-w-md rounded-none border border-border">
                <DialogHeader>
                    <DialogTitle class="text-base font-bold text-destructive flex items-center gap-2">
                        <AlertTriangle class="w-5 h-5" />
                        <span>Apakah Anda yakin ingin menghapus akun?</span>
                    </DialogTitle>
                    <DialogDescription class="text-xs text-muted-foreground mt-1">
                        Tindakan ini tidak dapat dibatalkan. Masukkan kata sandi Anda untuk mengonfirmasi bahwa Anda ingin menghapus akun ini secara permanen.
                    </DialogDescription>
                </DialogHeader>

                <form @submit.prevent="deleteUser" class="space-y-4 pt-2">
                    <div class="space-y-1.5">
                        <Label for="delete_password" class="text-xs font-semibold">Password Konfirmasi</Label>
                        <Input
                            id="delete_password"
                            v-model="deleteForm.password"
                            type="password"
                            placeholder="Masukkan password Anda..."
                            class="h-9 text-xs rounded-none"
                            required
                        />
                        <p v-if="deleteForm.errors.password" class="text-[11px] text-destructive font-medium">
                            {{ deleteForm.errors.password }}
                        </p>
                    </div>

                    <DialogFooter class="flex gap-2 justify-end pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            @click="closeModal"
                            class="text-xs font-semibold rounded-none cursor-pointer"
                        >
                            Batal
                        </Button>
                        <Button
                            type="submit"
                            variant="destructive"
                            :disabled="deleteForm.processing"
                            class="text-xs font-semibold rounded-none cursor-pointer"
                        >
                            Konfirmasi Hapus Akun
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    </SettingsLayout>
</template>
