<script setup lang="ts">
import { useForm } from '@inertiajs/vue3';
import {
    UserPlus,
    Search,
    Edit3,
    CreditCard,
    Smartphone,
    Power,
    Users as UsersIcon,
    ShieldCheck,
    Check,
    X,
} from '@lucide/vue';
import { ref, computed } from 'vue';
import Pagination from '@/Components/Pagination.vue';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/Components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/Components/ui/dialog';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/Components/ui/select';
import AdminLayout from '@/Layouts/AdminLayout.vue';

interface Office {
    id: number;
    opd_name: string;
}

interface Role {
    id: number;
    name: string;
    display_name: string;
}

interface UserProfile {
    jabatan?: string;
    golongan?: string;
    unit_kerja?: string;
    sisa_cuti_tahunan?: number;
}

interface UserItem {
    id: number;
    nip: string;
    name: string;
    email?: string;
    office_id?: number;
    role_id?: number;
    supervisor_id?: number;
    is_active: boolean;
    device_id?: string;
    office?: Office;
    role?: Role;
    profile?: UserProfile;
}

const props = defineProps<{
    users: UserItem[];
    offices: Office[];
    roles: Role[];
    supervisors: UserItem[];
}>();

const activeFilter = ref('all');
const searchQuery = ref('');
const showForm = ref(false);
const showCardModal = ref(false);
const selectedCardUser = ref<UserItem | null>(null);

const filters = [
    { label: 'Semua', value: 'all' },
    { label: 'Aktif', value: 'active' },
    { label: 'Nonaktif', value: 'inactive' },
    { label: 'Locked Device', value: 'locked' },
];

const form = useForm({
    id: null as number | null,
    nip: '',
    name: '',
    email: '',
    password: '',
    office_id: '' as number | string,
    role_id: '' as number | string,
    supervisor_id: '' as number | string,
    jabatan: '',
    golongan: '',
    unit_kerja: '',
    sisa_cuti_tahunan: 12,
    is_active: true,
});

const filteredUsers = computed(() => {
    return props.users.filter((u) => {
        if (activeFilter.value === 'active' && !u.is_active) {
return false;
}

        if (activeFilter.value === 'inactive' && u.is_active) {
return false;
}

        if (activeFilter.value === 'locked' && !u.device_id) {
return false;
}

        if (searchQuery.value) {
            const q = searchQuery.value.toLowerCase();

            return (
                u.name.toLowerCase().includes(q) ||
                u.nip.includes(q) ||
                (u.office?.opd_name &&
                    u.office.opd_name.toLowerCase().includes(q))
            );
        }

        return true;
    });
});

const currentPage = ref(1);
const itemsPerPage = 10;

const paginatedUsers = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;

    return filteredUsers.value.slice(start, start + itemsPerPage);
});

const editUser = (user: UserItem) => {
    form.id = user.id;
    form.nip = user.nip;
    form.name = user.name;
    form.email = user.email || '';
    form.password = '';
    form.office_id = user.office_id ? String(user.office_id) : '';
    form.role_id = user.role_id ? String(user.role_id) : '';
    form.supervisor_id = user.supervisor_id ? String(user.supervisor_id) : '';
    form.jabatan = user.profile?.jabatan || '';
    form.golongan = user.profile?.golongan || '';
    form.unit_kerja = user.profile?.unit_kerja || '';
    form.sisa_cuti_tahunan = user.profile?.sisa_cuti_tahunan ?? 12;
    form.is_active = user.is_active;

    showForm.value = true;
};

const openCardModal = (user: UserItem) => {
    selectedCardUser.value = user;
    showCardModal.value = true;
};

const resetForm = () => {
    form.reset();
    form.id = null;
    showForm.value = false;
};

const submitForm = () => {
    if (form.id) {
        form.put(`/admin/users/${form.id}`, {
            onSuccess: () => resetForm(),
        });
    } else {
        form.post('/admin/users', {
            onSuccess: () => resetForm(),
        });
    }
};

const toggleUserStatus = (user: UserItem) => {
    if (
        confirm(
            `Apakah Anda yakin ingin mengganti status keaktifan ${user.name}?`,
        )
    ) {
        form.put(`/admin/users/${user.id}/toggle`, { preserveScroll: true });
    }
};

const resetDevice = (user: UserItem) => {
    if (confirm(`Reset Device Binding HP untuk pegawai ${user.name}?`)) {
        form.put(`/admin/users/${user.id}/reset-device`, {
            preserveScroll: true,
        });
    }
};
</script>

<template>
    <AdminLayout
        title="Kelola Pengguna ASN"
        subtitle="Manajemen Data Pegawai ASN, OPD, Role, & Binding Device HP"
    >
        <!-- Header Toolbar -->
        <template #actions>
            <Button
                @click="showForm = true"
                class="cursor-pointer rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-xs font-semibold text-white shadow-md shadow-teal-600/20 hover:from-teal-700 hover:to-emerald-700"
            >
                <UserPlus class="mr-2 h-4 w-4" />
                <span>Tambah ASN Baru</span>
            </Button>
        </template>

        <!-- Search & Filter Card -->
        <Card
            class="mb-6 border-border/60 bg-card/95 shadow-md backdrop-blur-xl"
        >
            <CardContent
                class="flex flex-col items-center justify-between gap-4 p-4 md:flex-row"
            >
                <div class="relative w-full md:w-80">
                    <Search
                        class="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                        v-model="searchQuery"
                        type="text"
                        placeholder="Cari NIP, Nama, atau OPD..."
                        class="h-9 pl-9 text-xs transition-all focus-visible:ring-teal-500"
                    />
                </div>

                <div
                    class="flex w-full items-center gap-1.5 overflow-x-auto md:w-auto"
                >
                    <Button
                        v-for="f in filters"
                        :key="f.value"
                        size="sm"
                        :variant="
                            activeFilter === f.value ? 'default' : 'outline'
                        "
                        @click="activeFilter = f.value"
                        class="h-8 cursor-pointer rounded-lg text-xs"
                        :class="{
                            'bg-teal-600 text-white hover:bg-teal-700':
                                activeFilter === f.value,
                        }"
                    >
                        {{ f.label }}
                    </Button>
                </div>
            </CardContent>
        </Card>

        <!-- Table Card -->
        <Card class="border-border/60 bg-card/95 shadow-md backdrop-blur-xl">
            <CardContent class="p-0">
                <div class="overflow-x-auto">
                    <table class="w-full text-xs">
                        <thead>
                            <tr
                                class="border-b border-border bg-muted/30 text-left text-muted-foreground"
                            >
                                <th
                                    class="w-10 px-4 py-3.5 text-center font-semibold"
                                >
                                    #
                                </th>
                                <th class="px-4 py-3.5 font-semibold">
                                    Pegawai ASN
                                </th>
                                <th class="px-4 py-3.5 font-semibold">
                                    OPD & Unit Kerja
                                </th>
                                <th
                                    class="px-4 py-3.5 text-center font-semibold"
                                >
                                    Role Akses
                                </th>
                                <th
                                    class="px-4 py-3.5 text-center font-semibold"
                                >
                                    Device Binding
                                </th>
                                <th
                                    class="px-4 py-3.5 text-center font-semibold"
                                >
                                    Status
                                </th>
                                <th
                                    class="px-4 py-3.5 text-right font-semibold"
                                >
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-border/40">
                            <tr
                                v-for="(user, i) in paginatedUsers"
                                :key="user.id"
                                class="transition-colors hover:bg-muted/40"
                            >
                                <td
                                    class="px-4 py-3.5 text-center font-mono text-muted-foreground"
                                >
                                    {{
                                        (currentPage - 1) * itemsPerPage + i + 1
                                    }}
                                </td>
                                <td class="px-4 py-3.5">
                                    <div class="flex items-center gap-3">
                                        <div
                                            class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-500/10 text-xs font-bold text-teal-600 dark:text-teal-400"
                                        >
                                            {{ user.name[0].toUpperCase() }}
                                        </div>
                                        <div>
                                            <p
                                                class="font-bold text-foreground"
                                            >
                                                {{ user.name }}
                                            </p>
                                            <p
                                                class="font-mono text-[10px] font-semibold text-teal-600 dark:text-teal-400"
                                            >
                                                NIP. {{ user.nip }}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-4 py-3.5 text-muted-foreground">
                                    <p class="font-semibold text-foreground">
                                        {{
                                            user.office?.opd_name || 'Tanpa OPD'
                                        }}
                                    </p>
                                    <div class="flex items-center gap-1.5 mt-0.5">
                                        <span class="text-[11px]">
                                            {{ user.profile?.jabatan || '-' }}
                                        </span>
                                        <Badge
                                            variant="outline"
                                            class="border-teal-500/30 bg-teal-500/10 text-[10px] font-semibold text-teal-600 dark:text-teal-400"
                                        >
                                            Cuti: {{ user.profile?.sisa_cuti_tahunan ?? 12 }} Hari
                                        </Badge>
                                    </div>
                                </td>
                                <td class="px-4 py-3.5 text-center">
                                    <Badge
                                        variant="outline"
                                        class="px-2 py-0.5 text-[10px] font-semibold uppercase"
                                    >
                                        {{ user.role?.display_name || 'ASN' }}
                                    </Badge>
                                </td>
                                <td class="px-4 py-3.5 text-center">
                                    <span
                                        v-if="user.device_id"
                                        class="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-600 dark:text-emerald-400"
                                    >
                                        <Smartphone class="h-3 w-3" />
                                        <span>Locked</span>
                                    </span>
                                    <span
                                        v-else
                                        class="font-mono text-[10px] text-muted-foreground"
                                        >Unlocked</span
                                    >
                                </td>
                                <td class="px-4 py-3.5 text-center">
                                    <Badge
                                        :variant="
                                            user.is_active
                                                ? 'default'
                                                : 'outline'
                                        "
                                        class="px-2 py-0.5 text-[10px] font-semibold uppercase"
                                        :class="{
                                            'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400':
                                                user.is_active,
                                            'border-rose-500/30 bg-rose-500/10 text-rose-500':
                                                !user.is_active,
                                        }"
                                    >
                                        {{
                                            user.is_active
                                                ? 'Aktif'
                                                : 'Nonaktif'
                                        }}
                                    </Badge>
                                </td>
                                <td class="px-4 py-3.5 text-right">
                                    <div
                                        class="flex items-center justify-end gap-1"
                                    >
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            @click="openCardModal(user)"
                                            class="h-7 w-7 cursor-pointer p-0 text-teal-600 hover:bg-teal-500/10 dark:text-teal-400"
                                            title="ID Card Digital ASN"
                                        >
                                            <CreditCard class="h-3.5 w-3.5" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            @click="editUser(user)"
                                            class="h-7 w-7 cursor-pointer p-0 text-muted-foreground hover:bg-muted hover:text-foreground"
                                            title="Edit Data ASN"
                                        >
                                            <Edit3 class="h-3.5 w-3.5" />
                                        </Button>
                                        <Button
                                            v-if="user.device_id"
                                            variant="ghost"
                                            size="sm"
                                            @click="resetDevice(user)"
                                            class="h-7 w-7 cursor-pointer p-0 text-amber-500 hover:bg-amber-500/10"
                                            title="Reset Device Binding"
                                        >
                                            <Smartphone class="h-3.5 w-3.5" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            @click="toggleUserStatus(user)"
                                            class="h-7 w-7 cursor-pointer p-0"
                                            :class="
                                                user.is_active
                                                    ? 'text-rose-500 hover:bg-rose-500/10'
                                                    : 'text-emerald-500 hover:bg-emerald-500/10'
                                            "
                                            :title="
                                                user.is_active
                                                    ? 'Nonaktifkan Akun'
                                                    : 'Aktifkan Akun'
                                            "
                                        >
                                            <Power class="h-3.5 w-3.5" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div
                        v-if="!filteredUsers.length"
                        class="space-y-2 py-10 text-center text-muted-foreground"
                    >
                        <UsersIcon
                            class="mx-auto h-8 w-8 text-muted-foreground/50"
                        />
                        <p>Tidak ada data pegawai ASN yang ditemukan.</p>
                    </div>

                    <Pagination
                        v-if="filteredUsers.length > 0"
                        v-model:currentPage="currentPage"
                        :totalItems="filteredUsers.length"
                        :itemsPerPage="itemsPerPage"
                    />
                </div>
            </CardContent>
        </Card>

        <!-- Shadcn Dialog Add/Edit ASN -->
        <Dialog v-model:open="showForm">
            <DialogContent
                class="border-border/60 bg-card/98 shadow-2xl backdrop-blur-2xl sm:max-w-3xl rounded-2xl p-6 sm:p-8"
            >
                <DialogHeader class="pb-2">
                    <DialogTitle
                        class="flex items-center gap-3 text-lg font-bold text-foreground"
                    >
                        <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                            <UserPlus class="h-5 w-5" />
                        </div>
                        <span>{{
                            form.id
                                ? 'Edit Data Pegawai ASN'
                                : 'Tambah Pegawai ASN Baru'
                        }}</span>
                    </DialogTitle>
                </DialogHeader>

                <form @submit.prevent="submitForm" class="space-y-5 pt-2">
                    <!-- Row 1: Identitas utama (2 cols) -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="space-y-1.5">
                            <Label for="nip" class="text-xs font-semibold text-foreground/80">NIP Pegawai</Label>
                            <Input
                                id="nip"
                                v-model="form.nip"
                                required
                                placeholder="19850101..."
                                class="h-10 text-xs sm:text-sm rounded-xl"
                            />
                        </div>
                        <div class="space-y-1.5">
                            <Label for="name" class="text-xs font-semibold text-foreground/80">Nama Lengkap & Gelar</Label>
                            <Input
                                id="name"
                                v-model="form.name"
                                required
                                placeholder="Nama & Gelar"
                                class="h-10 text-xs sm:text-sm rounded-xl"
                            />
                        </div>
                    </div>

                    <!-- Row 2: Email & Password (2 cols) -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="space-y-1.5">
                            <Label for="email" class="text-xs font-semibold text-foreground/80">Email Kedinasan</Label>
                            <Input
                                id="email"
                                v-model="form.email"
                                type="email"
                                placeholder="email@soppengkab.go.id"
                                class="h-10 text-xs sm:text-sm rounded-xl"
                            />
                        </div>
                        <div class="space-y-1.5">
                            <Label for="password" class="text-xs font-semibold text-foreground/80">
                                {{ form.id ? 'Password Baru (Opsional)' : 'Password Akun' }}
                            </Label>
                            <Input
                                id="password"
                                v-model="form.password"
                                type="password"
                                :required="!form.id"
                                placeholder="••••••••"
                                class="h-10 text-xs sm:text-sm rounded-xl"
                            />
                        </div>
                    </div>

                    <!-- Row 3: Struktur Penugasan & Role (2 cols) -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="space-y-1.5">
                            <Label class="text-xs font-semibold text-foreground/80">OPD / Instansi Kantor</Label>
                            <Select v-model="form.office_id">
                                <SelectTrigger
                                    class="h-10 bg-background text-xs sm:text-sm rounded-xl"
                                >
                                    <SelectValue placeholder="Pilih OPD / Kantor" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem
                                        v-for="o in offices"
                                        :key="o.id"
                                        :value="String(o.id)"
                                    >
                                        {{ o.opd_name }}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div class="space-y-1.5">
                            <Label class="text-xs font-semibold text-foreground/80">Role Hak Akses System</Label>
                            <Select v-model="form.role_id">
                                <SelectTrigger
                                    class="h-10 bg-background text-xs sm:text-sm rounded-xl"
                                >
                                    <SelectValue placeholder="Pilih Role System" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem
                                        v-for="r in roles"
                                        :key="r.id"
                                        :value="String(r.id)"
                                    >
                                        {{ r.display_name }}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <!-- Row 4: Jabatan, Sub OPD, & Kuota Cuti (3 cols) -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div class="space-y-1.5">
                            <Label for="jabatan" class="text-xs font-semibold text-foreground/80">Jabatan Pegawai</Label>
                            <Input
                                id="jabatan"
                                v-model="form.jabatan"
                                placeholder="Kepala Bidang..."
                                class="h-10 text-xs sm:text-sm rounded-xl"
                            />
                        </div>
                        <div class="space-y-1.5">
                            <Label for="unit_kerja" class="text-xs font-semibold text-foreground/80">Sub OPD / Unit Kerja</Label>
                            <Input
                                id="unit_kerja"
                                v-model="form.unit_kerja"
                                placeholder="Sekretariat / Bidang..."
                                class="h-10 text-xs sm:text-sm rounded-xl"
                            />
                        </div>
                        <div class="space-y-1.5">
                            <Label for="sisa_cuti_tahunan" class="text-xs font-semibold text-foreground/80">Sisa Cuti Tahunan (Hari)</Label>
                            <Input
                                id="sisa_cuti_tahunan"
                                v-model.number="form.sisa_cuti_tahunan"
                                type="number"
                                min="0"
                                max="100"
                                placeholder="12"
                                class="h-10 text-xs sm:text-sm font-bold text-teal-600 dark:text-teal-400 rounded-xl"
                            />
                        </div>
                    </div>

                    <div
                        class="flex items-center justify-end gap-3 border-t border-border/60 pt-4 mt-6"
                    >
                        <Button
                            type="button"
                            variant="outline"
                            @click="resetForm"
                            class="h-10 px-5 rounded-xl cursor-pointer text-xs sm:text-sm"
                        >
                            Batal
                        </Button>
                        <Button
                            type="submit"
                            class="h-10 px-6 rounded-xl cursor-pointer bg-teal-600 text-white hover:bg-teal-700 shadow-md font-semibold text-xs sm:text-sm"
                        >
                            {{ form.id ? 'Simpan Perubahan' : 'Tambah ASN' }}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>

        <!-- Shadcn Dialog ID Card Digital ASN -->
        <Dialog v-model:open="showCardModal">
            <DialogContent
                class="border-teal-500/30 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 text-white sm:max-w-sm"
            >
                <div v-if="selectedCardUser" class="space-y-3 pt-2 text-center">
                    <div class="flex items-center justify-center gap-2">
                        <img
                            src="/images/logo.png"
                            class="h-8 w-8 object-contain"
                            alt="Logo Pemda"
                        />
                        <div class="text-left">
                            <h4
                                class="text-xs font-black tracking-wider text-teal-400"
                            >
                                PEMKAB SOPPENG
                            </h4>
                            <p class="text-[9px] font-medium text-slate-300">
                                KARTU IDENTITAS DIGITAL ASN
                            </p>
                        </div>
                    </div>

                    <div
                        class="mx-auto my-3 flex h-20 w-20 items-center justify-center rounded-full border-2 border-teal-400 bg-teal-500/20 text-xl font-bold text-teal-300 shadow-inner"
                    >
                        {{
                            selectedCardUser.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')
                                .substring(0, 2)
                                .toUpperCase()
                        }}
                    </div>

                    <div>
                        <h3 class="text-base font-extrabold">
                            {{ selectedCardUser.name }}
                        </h3>
                        <p class="font-mono text-xs text-teal-300">
                            NIP. {{ selectedCardUser.nip }}
                        </p>
                    </div>

                    <div
                        class="space-y-1 border-t border-slate-700/60 pt-2 text-xs"
                    >
                        <p class="font-semibold text-slate-300">
                            {{
                                selectedCardUser.office?.opd_name ||
                                'PEMKAB SOPPENG'
                            }}
                        </p>
                        <p class="text-[11px] text-slate-400">
                            {{
                                selectedCardUser.profile?.jabatan ||
                                'Aparatur Sipil Negara'
                            }}
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    </AdminLayout>
</template>
