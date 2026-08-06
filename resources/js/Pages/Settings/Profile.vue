<script setup lang="ts">
import { usePage, useForm, Link } from '@inertiajs/vue3';
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
import { ref, computed } from 'vue';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
    CardFooter,
} from '@/Components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/Components/ui/dialog';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import SettingsLayout from '@/Layouts/SettingsLayout.vue';

const props = defineProps<{
    isAdmin?: boolean;
    status?: string;
    mustVerifyEmail?: boolean;
}>();

const page = usePage();
const user = computed<any>(() => page.props.auth?.user || {});

const initials = computed(() => {
    const name = user.value.name || 'A';

    return name
        .split(' ')
        .map((n: string) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
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
            <Card
                class="rounded-none border border-t-2 border-border border-t-emerald-500 bg-card text-card-foreground shadow-xs"
            >
                <CardContent
                    class="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center"
                >
                    <div class="flex items-center gap-4">
                        <div
                            class="flex h-16 w-16 shrink-0 items-center justify-center rounded-none border border-primary/30 bg-primary/10 font-mono text-xl font-bold text-primary"
                        >
                            {{ initials }}
                        </div>
                        <div class="space-y-1">
                            <h2
                                class="text-lg font-bold tracking-tight text-foreground"
                            >
                                {{ user.name }}
                            </h2>
                            <p
                                class="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400"
                            >
                                NIP. {{ user.nip }}
                            </p>
                            <div class="flex items-center gap-2 pt-0.5">
                                <Badge
                                    variant="outline"
                                    class="rounded-none border-emerald-500/30 bg-emerald-500/10 text-[10px] font-semibold text-emerald-600 uppercase dark:text-emerald-400"
                                >
                                    {{
                                        user.role?.display_name ||
                                        'Aparatur Sipil Negara'
                                    }}
                                </Badge>
                                <Badge
                                    variant="outline"
                                    class="rounded-none border-border bg-muted text-[10px] text-muted-foreground uppercase"
                                >
                                    Status: Aktif
                                </Badge>
                            </div>
                        </div>
                    </div>

                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        class="w-full shrink-0 sm:w-auto"
                    >
                        <Button
                            variant="outline"
                            class="w-full cursor-pointer rounded-none border-border text-xs font-semibold sm:w-auto"
                        >
                            <LogOut class="mr-2 h-4 w-4" />
                            <span>Keluar dari Akun</span>
                        </Button>
                    </Link>
                </CardContent>
            </Card>

            <!-- Form Update Informasi Profil -->
            <Card
                class="rounded-none border border-border bg-card text-card-foreground shadow-xs"
            >
                <CardHeader class="border-b border-border/60 p-5">
                    <CardTitle
                        class="flex items-center gap-2 text-xs font-bold tracking-wider text-foreground uppercase"
                    >
                        <User class="h-4 w-4 text-emerald-500" />
                        <span>Informasi Profil</span>
                    </CardTitle>
                    <CardDescription class="text-xs text-muted-foreground">
                        Perbarui nama lengkap dan alamat email akun Anda.
                    </CardDescription>
                </CardHeader>
                <form @submit.prevent="updateProfile">
                    <CardContent class="space-y-4 p-5">
                        <div class="space-y-1.5">
                            <Label for="name" class="text-xs font-semibold"
                                >Nama Lengkap ASN</Label
                            >
                            <Input
                                id="name"
                                v-model="profileForm.name"
                                type="text"
                                class="h-9 rounded-none text-xs"
                                required
                                autocomplete="name"
                            />
                            <p
                                v-if="profileForm.errors.name"
                                class="text-[11px] font-medium text-destructive"
                            >
                                {{ profileForm.errors.name }}
                            </p>
                        </div>

                        <div class="space-y-1.5">
                            <Label for="email" class="text-xs font-semibold"
                                >Alamat Email Kedinasan</Label
                            >
                            <Input
                                id="email"
                                v-model="profileForm.email"
                                type="email"
                                class="h-9 rounded-none font-mono text-xs"
                                autocomplete="username"
                            />
                            <p
                                v-if="profileForm.errors.email"
                                class="text-[11px] font-medium text-destructive"
                            >
                                {{ profileForm.errors.email }}
                            </p>
                        </div>

                        <div
                            v-if="status === 'profile-updated'"
                            class="flex items-center gap-2 rounded-none border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs font-medium text-emerald-600 dark:text-emerald-400"
                        >
                            <CheckCircle2 class="h-4 w-4 shrink-0" />
                            <span
                                >Informasi profil Anda telah berhasil
                                diperbarui.</span
                            >
                        </div>
                    </CardContent>
                    <CardFooter
                        class="mt-2 flex justify-end border-t border-border/40 p-5 pt-0"
                    >
                        <Button
                            type="submit"
                            :disabled="profileForm.processing"
                            class="cursor-pointer rounded-none bg-primary text-xs font-bold text-primary-foreground"
                        >
                            <Save class="mr-1.5 h-3.5 w-3.5" />
                            <span>Simpan Perubahan</span>
                        </Button>
                    </CardFooter>
                </form>
            </Card>

            <!-- Kepegawaian & Geofence Details -->
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card
                    class="rounded-none border border-border bg-card text-card-foreground shadow-xs"
                >
                    <CardHeader class="border-b border-border/60 p-5 pb-3">
                        <CardTitle
                            class="flex items-center gap-2 text-xs font-bold tracking-wider text-foreground uppercase"
                        >
                            <Briefcase class="h-4 w-4 text-emerald-500" />
                            <span>Informasi Kepegawaian</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent class="space-y-3 p-5 text-xs">
                        <div
                            class="flex justify-between border-b border-border/40 py-1.5"
                        >
                            <span class="font-medium text-muted-foreground"
                                >OPD Utama</span
                            >
                            <span class="font-bold text-foreground">{{
                                user.office?.opd_name || 'Sekretariat Daerah'
                            }}</span>
                        </div>
                        <div
                            class="flex justify-between border-b border-border/40 py-1.5"
                        >
                            <span class="font-medium text-muted-foreground"
                                >Jabatan</span
                            >
                            <span class="font-bold text-foreground">{{
                                user.profile?.jabatan ||
                                'Pranata Komputer Ahli Muda'
                            }}</span>
                        </div>
                        <div
                            class="flex justify-between border-b border-border/40 py-1.5"
                        >
                            <span class="font-medium text-muted-foreground"
                                >Pangkat / Golongan</span
                            >
                            <span class="font-bold text-foreground">{{
                                user.profile?.pangkat_golongan ||
                                'Penata / III/c'
                            }}</span>
                        </div>
                        <div class="flex justify-between py-1.5">
                            <span class="font-medium text-muted-foreground"
                                >Sisa Cuti Tahunan</span
                            >
                            <span
                                class="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400"
                                >{{
                                    user.profile?.sisa_cuti_tahunan ?? 12
                                }}
                                Hari</span
                            >
                        </div>
                    </CardContent>
                </Card>

                <Card
                    class="rounded-none border border-border bg-card text-card-foreground shadow-xs"
                >
                    <CardHeader class="border-b border-border/60 p-5 pb-3">
                        <CardTitle
                            class="flex items-center gap-2 text-xs font-bold tracking-wider text-foreground uppercase"
                        >
                            <MapPin class="h-4 w-4 text-emerald-500" />
                            <span>Lokasi Kantor & Geofence</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent class="space-y-3 p-5 text-xs">
                        <div
                            class="flex justify-between border-b border-border/40 py-1.5"
                        >
                            <span class="font-medium text-muted-foreground"
                                >Nama Kantor OPD</span
                            >
                            <span class="font-bold text-foreground">{{
                                user.office?.name || 'Kantor Bupati Soppeng'
                            }}</span>
                        </div>
                        <div
                            class="flex justify-between border-b border-border/40 py-1.5"
                        >
                            <span class="font-medium text-muted-foreground"
                                >Radius Geofence Presensi</span
                            >
                            <span
                                class="font-mono font-bold text-emerald-600 dark:text-emerald-400"
                                >{{
                                    user.office?.radius_meters || 200
                                }}
                                Meter</span
                            >
                        </div>
                        <div class="flex justify-between py-1.5">
                            <span class="font-medium text-muted-foreground"
                                >Binding Perangkat Mobile</span
                            >
                            <Badge
                                variant="outline"
                                class="rounded-none border-emerald-500/30 bg-emerald-500/10 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400"
                            >
                                <ShieldCheck class="mr-1 h-3 w-3" />
                                Terikat (Secured)
                            </Badge>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <!-- Danger Zone -->
            <Card
                class="rounded-none border border-t-2 border-rose-500/40 border-t-rose-500 bg-card text-card-foreground shadow-xs"
            >
                <CardHeader class="border-b border-border/60 p-5">
                    <CardTitle
                        class="flex items-center gap-2 text-xs font-bold tracking-wider text-rose-600 uppercase dark:text-rose-400"
                    >
                        <AlertTriangle class="h-4 w-4" />
                        <span>Danger Zone (Hapus Akun Saya)</span>
                    </CardTitle>
                    <CardDescription class="text-xs text-muted-foreground">
                        Setelah akun Anda dihapus, semua data presensi dan
                        informasi kepegawaian Anda akan dihapus secara permanen.
                    </CardDescription>
                </CardHeader>
                <CardContent class="p-5">
                    <Button
                        variant="destructive"
                        @click="confirmUserDeletion"
                        class="cursor-pointer rounded-none text-xs font-semibold"
                    >
                        <Trash2 class="mr-1.5 h-3.5 w-3.5" />
                        <span>Hapus Akun Permanen</span>
                    </Button>
                </CardContent>
            </Card>
        </div>

        <!-- Dialog Modal Konfirmasi Hapus Akun -->
        <Dialog :open="confirmingUserDeletion" @update:open="closeModal">
            <DialogContent
                class="rounded-none border border-border sm:max-w-md"
            >
                <DialogHeader>
                    <DialogTitle
                        class="flex items-center gap-2 text-base font-bold text-destructive"
                    >
                        <AlertTriangle class="h-5 w-5" />
                        <span>Apakah Anda yakin ingin menghapus akun?</span>
                    </DialogTitle>
                    <DialogDescription
                        class="mt-1 text-xs text-muted-foreground"
                    >
                        Tindakan ini tidak dapat dibatalkan. Masukkan kata sandi
                        Anda untuk mengonfirmasi bahwa Anda ingin menghapus akun
                        ini secara permanen.
                    </DialogDescription>
                </DialogHeader>

                <form @submit.prevent="deleteUser" class="space-y-4 pt-2">
                    <div class="space-y-1.5">
                        <Label
                            for="delete_password"
                            class="text-xs font-semibold"
                            >Password Konfirmasi</Label
                        >
                        <Input
                            id="delete_password"
                            v-model="deleteForm.password"
                            type="password"
                            placeholder="Masukkan password Anda..."
                            class="h-9 rounded-none text-xs"
                            required
                        />
                        <p
                            v-if="deleteForm.errors.password"
                            class="text-[11px] font-medium text-destructive"
                        >
                            {{ deleteForm.errors.password }}
                        </p>
                    </div>

                    <DialogFooter class="flex justify-end gap-2 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            @click="closeModal"
                            class="cursor-pointer rounded-none text-xs font-semibold"
                        >
                            Batal
                        </Button>
                        <Button
                            type="submit"
                            variant="destructive"
                            :disabled="deleteForm.processing"
                            class="cursor-pointer rounded-none text-xs font-semibold"
                        >
                            Konfirmasi Hapus Akun
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    </SettingsLayout>
</template>
