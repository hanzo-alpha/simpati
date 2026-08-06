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
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/ui/table';
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
const opdFormSearch = ref('');
const showForm = ref(false);
const showCardModal = ref(false);
const selectedCardUser = ref<UserItem | null>(null);

const filteredFormOffices = computed(() => {
    if (!opdFormSearch.value.trim()) {
        return props.offices;
    }

    const q = opdFormSearch.value.toLowerCase();

    return props.offices.filter((o) => o.opd_name.toLowerCase().includes(q));
});

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
                class="flex h-10 cursor-pointer items-center gap-2 rounded-none bg-primary px-4 text-xs font-bold tracking-wider text-primary-foreground uppercase shadow-none hover:bg-primary/90"
            >
                <UserPlus class="h-4 w-4" />
                <span>Tambah ASN Baru</span>
            </Button>
        </template>

        <!-- Search & Filter Card -->
        <Card
            class="mb-6 rounded-none border border-border bg-card text-card-foreground shadow-xs"
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
                        class="h-9 pl-9 text-xs"
                    />
                </div>

                <div
                    class="flex w-full items-center gap-1.5 overflow-x-auto md:w-auto"
                >
                    <Button
                        v-for="f in filters"
                        :key="f.value"
                        :variant="
                            activeFilter === f.value ? 'default' : 'outline'
                        "
                        size="sm"
                        @click="activeFilter = f.value"
                        class="cursor-pointer rounded-none text-[11px] font-bold tracking-wider uppercase transition-all"
                        :class="
                            activeFilter === f.value
                                ? 'bg-primary text-primary-foreground shadow-none'
                                : 'text-muted-foreground hover:text-foreground'
                        "
                    >
                        {{ f.label }}
                    </Button>
                </div>
            </CardContent>
        </Card>

        <!-- Table Card -->
        <Card
            class="overflow-hidden rounded-none border border-border bg-card text-card-foreground shadow-xs"
        >
            <CardContent class="p-0">
                <div class="overflow-x-auto">
                    <table class="w-full text-xs">
                        <thead>
                            <tr
                                class="border-b border-border bg-muted/40 text-left text-[11px] font-bold tracking-wider text-foreground uppercase"
                            >
                                <th
                                    class="w-10 px-4 py-3.5 text-center font-bold"
                                >
                                    #
                                </th>
                                <th class="px-4 py-3.5 font-bold">
                                    Pegawai ASN
                                </th>
                                <th class="px-4 py-3.5 font-bold">
                                    OPD & Unit Kerja
                                </th>
                                <th class="px-4 py-3.5 text-center font-bold">
                                    Role Akses
                                </th>
                                <th class="px-4 py-3.5 text-center font-bold">
                                    Device Binding
                                </th>
                                <th class="px-4 py-3.5 text-center font-bold">
                                    Status
                                </th>
                                <th class="px-4 py-3.5 text-right font-bold">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-border/40">
                            <tr
                                v-for="(user, i) in paginatedUsers"
                                :key="user.id"
                                class="border-b border-border/40 transition-colors hover:bg-muted/30"
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
                                            class="flex h-8 w-8 shrink-0 items-center justify-center rounded-none border border-emerald-500/30 bg-emerald-500/10 text-xs font-bold text-emerald-600 dark:text-emerald-400"
                                        >
                                            {{ user.name.charAt(0) }}
                                        </div>
                                        <div>
                                            <p
                                                class="font-bold text-foreground"
                                            >
                                                {{ user.name }}
                                            </p>
                                            <p
                                                class="font-mono text-[11px] text-muted-foreground"
                                            >
                                                NIP. {{ user.nip }}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-4 py-3.5">
                                    <p class="font-medium text-foreground">
                                        {{ user.office?.opd_name || '-' }}
                                    </p>
                                    <div class="flex items-center gap-2">
                                        <p
                                            class="text-[11px] text-muted-foreground"
                                        >
                                            {{
                                                user.profile?.jabatan ||
                                                'Analis Kepegawaian'
                                            }}
                                        </p>
                                        <Badge
                                            variant="outline"
                                            class="rounded-none border-emerald-500/30 bg-emerald-500/10 text-[10px] font-bold tracking-wider text-emerald-700 uppercase dark:text-emerald-400"
                                        >
                                            Cuti:
                                            {{
                                                user.profile
                                                    ?.sisa_cuti_tahunan ?? 12
                                            }}
                                            Hari
                                        </Badge>
                                    </div>
                                </td>
                                <td class="px-4 py-3.5 text-center">
                                    <Badge
                                        variant="outline"
                                        class="rounded-none font-mono text-[10px] font-bold tracking-wider uppercase"
                                    >
                                        {{
                                            user.role?.display_name ||
                                            user.role?.name ||
                                            'ASN'
                                        }}
                                    </Badge>
                                </td>
                                <td class="px-4 py-3.5 text-center">
                                    <span
                                        v-if="user.device_id"
                                        class="font-mono text-[11px] font-medium text-amber-600 dark:text-amber-400"
                                    >
                                        Locked
                                    </span>
                                    <span
                                        v-else
                                        class="font-mono text-[11px] text-muted-foreground"
                                    >
                                        Unlocked
                                    </span>
                                </td>
                                <td class="px-4 py-3.5 text-center">
                                    <Badge
                                        :variant="
                                            user.is_active
                                                ? 'default'
                                                : 'secondary'
                                        "
                                        class="rounded-none text-[10px] font-bold tracking-wider uppercase"
                                        :class="
                                            user.is_active
                                                ? 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 shadow-none dark:text-emerald-400'
                                                : ''
                                        "
                                    >
                                        {{
                                            user.is_active
                                                ? 'AKTIF'
                                                : 'NONAKTIF'
                                        }}
                                    </Badge>
                                </td>
                                <td class="px-4 py-3.5 text-right">
                                    <div
                                        class="flex items-center justify-end gap-1"
                                    >
                                        <Button
                                            v-if="user.device_id"
                                            variant="ghost"
                                            size="sm"
                                            @click="resetDevice(user)"
                                            class="h-8 w-8 cursor-pointer rounded-none p-0 text-amber-600 hover:border-border hover:bg-amber-500/10 dark:text-amber-400"
                                            title="Reset Device Binding HP"
                                        >
                                            <Smartphone class="h-3.5 w-3.5" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            @click="openCardModal(user)"
                                            class="h-8 w-8 cursor-pointer rounded-none p-0 text-muted-foreground hover:border-border hover:bg-muted/50 hover:text-foreground"
                                            title="Lihat KARTU ASN Digital"
                                        >
                                            <CreditCard class="h-3.5 w-3.5" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            @click="editUser(user)"
                                            class="h-8 w-8 cursor-pointer rounded-none p-0 text-muted-foreground hover:border-border hover:bg-muted/50 hover:text-foreground"
                                            title="Edit Data ASN"
                                        >
                                            <Edit3 class="h-3.5 w-3.5" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            @click="toggleUserStatus(user)"
                                            class="h-8 w-8 cursor-pointer rounded-none p-0 text-rose-500 hover:bg-rose-500/10"
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
                        <UserPlus
                            class="mx-auto h-8 w-8 text-muted-foreground/50"
                        />
                        <p>Tidak ada data Pegawai ASN yang ditemukan.</p>
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
                class="rounded-none border border-border bg-card p-6 text-card-foreground shadow-xl sm:max-w-3xl"
            >
                <DialogHeader class="border-b border-border/60 pb-3">
                    <DialogTitle
                        class="flex items-center gap-2.5 text-base font-bold tracking-wider text-foreground uppercase"
                    >
                        <div
                            class="flex h-7 w-7 items-center justify-center rounded-none border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        >
                            <UserPlus class="h-4 w-4" />
                        </div>
                        <span>{{
                            form.id
                                ? 'Edit Data Pegawai ASN'
                                : 'Tambah Pegawai ASN Baru'
                        }}</span>
                    </DialogTitle>
                </DialogHeader>

                <form @submit.prevent="submitForm" class="space-y-4 pt-2">
                    <!-- Row 1: Identitas utama (2 cols) -->
                    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div class="space-y-1.5">
                            <Label
                                for="nip"
                                class="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
                                >NIP Pegawai</Label
                            >
                            <Input
                                id="nip"
                                v-model="form.nip"
                                required
                                placeholder="19850101..."
                                class="h-10 rounded-none text-xs sm:text-sm"
                            />
                        </div>
                        <div class="space-y-1.5">
                            <Label
                                for="name"
                                class="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
                                >Nama Lengkap & Gelar</Label
                            >
                            <Input
                                id="name"
                                v-model="form.name"
                                required
                                placeholder="Nama & Gelar"
                                class="h-10 rounded-none text-xs sm:text-sm"
                            />
                        </div>
                    </div>

                    <!-- Row 2: Email & Password (2 cols) -->
                    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div class="space-y-1.5">
                            <Label
                                for="email"
                                class="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
                                >Email Kedinasan</Label
                            >
                            <Input
                                id="email"
                                v-model="form.email"
                                type="email"
                                placeholder="email@soppengkab.go.id"
                                class="h-10 rounded-none text-xs sm:text-sm"
                            />
                        </div>
                        <div class="space-y-1.5">
                            <Label
                                for="password"
                                class="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
                            >
                                {{
                                    form.id
                                        ? 'Password Baru (Opsional)'
                                        : 'Password Akun'
                                }}
                            </Label>
                            <Input
                                id="password"
                                v-model="form.password"
                                type="password"
                                :required="!form.id"
                                placeholder="••••••••"
                                class="h-10 rounded-none text-xs sm:text-sm"
                            />
                        </div>
                    </div>

                    <!-- Row 3: Struktur Penugasan & Role (2 cols) -->
                    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div class="space-y-1.5">
                            <Label
                                class="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
                                >OPD / Instansi Kantor</Label
                            >
                            <Select v-model="form.office_id">
                                <SelectTrigger
                                    class="h-10 rounded-none text-xs sm:text-sm"
                                >
                                    <SelectValue
                                        placeholder="Pilih OPD / Kantor"
                                    />
                                </SelectTrigger>
                                <SelectContent
                                    class="rounded-none border-border"
                                >
                                    <div
                                        class="sticky top-0 z-10 border-b border-border bg-popover p-2"
                                    >
                                        <div class="relative">
                                            <Search
                                                class="pointer-events-none absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground"
                                            />
                                            <Input
                                                v-model="opdFormSearch"
                                                type="text"
                                                placeholder="Cari OPD / Kantor..."
                                                class="h-8 rounded-none border-input bg-background pl-8 text-xs"
                                                @keydown.stop
                                            />
                                        </div>
                                    </div>
                                    <div class="max-h-56 overflow-y-auto pt-1">
                                        <SelectItem
                                            v-for="o in filteredFormOffices"
                                            :key="o.id"
                                            :value="String(o.id)"
                                        >
                                            {{ o.opd_name }}
                                        </SelectItem>
                                        <div
                                            v-if="!filteredFormOffices.length"
                                            class="p-3 text-center text-xs text-muted-foreground"
                                        >
                                            OPD tidak ditemukan
                                        </div>
                                    </div>
                                </SelectContent>
                            </Select>
                        </div>
                        <div class="space-y-1.5">
                            <Label
                                class="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
                                >Role Hak Akses System</Label
                            >
                            <Select v-model="form.role_id">
                                <SelectTrigger
                                    class="h-10 rounded-none text-xs sm:text-sm"
                                >
                                    <SelectValue
                                        placeholder="Pilih Role System"
                                    />
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
                    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div class="space-y-1.5">
                            <Label
                                for="jabatan"
                                class="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
                                >Jabatan Pegawai</Label
                            >
                            <Input
                                id="jabatan"
                                v-model="form.jabatan"
                                placeholder="Kepala Bidang..."
                                class="h-10 rounded-none text-xs sm:text-sm"
                            />
                        </div>
                        <div class="space-y-1.5">
                            <Label
                                for="unit_kerja"
                                class="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
                                >Sub OPD / Unit Kerja</Label
                            >
                            <Input
                                id="unit_kerja"
                                v-model="form.unit_kerja"
                                placeholder="Sekretariat / Bidang..."
                                class="h-10 rounded-none text-xs sm:text-sm"
                            />
                        </div>
                        <div class="space-y-1.5">
                            <Label
                                for="sisa_cuti_tahunan"
                                class="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
                                >Sisa Cuti Tahunan (Hari)</Label
                            >
                            <Input
                                id="sisa_cuti_tahunan"
                                v-model.number="form.sisa_cuti_tahunan"
                                type="number"
                                min="0"
                                max="100"
                                placeholder="12"
                                class="h-10 rounded-none font-mono text-xs font-bold text-emerald-600 sm:text-sm dark:text-emerald-400"
                            />
                        </div>
                    </div>

                    <div
                        class="mt-6 flex items-center justify-end gap-2 border-t border-border pt-4"
                    >
                        <Button
                            type="button"
                            variant="outline"
                            @click="resetForm"
                            class="h-10 cursor-pointer rounded-none px-5 text-xs font-bold tracking-wider uppercase"
                        >
                            Batal
                        </Button>
                        <Button
                            type="submit"
                            class="h-10 cursor-pointer rounded-none bg-primary px-6 text-xs font-bold tracking-wider text-primary-foreground uppercase shadow-none hover:bg-primary/90"
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
