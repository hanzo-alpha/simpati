<script setup lang="ts">
import { ref, computed } from 'vue';
import { useForm } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import Pagination from '@/Components/Pagination.vue';
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
    is_active: true,
});

const filteredUsers = computed(() => {
    return props.users.filter((u) => {
        if (activeFilter.value === 'active' && !u.is_active) return false;
        if (activeFilter.value === 'inactive' && u.is_active) return false;
        if (activeFilter.value === 'locked' && !u.device_id) return false;

        if (searchQuery.value) {
            const q = searchQuery.value.toLowerCase();
            return (
                u.name.toLowerCase().includes(q) ||
                u.nip.includes(q) ||
                (u.office?.opd_name && u.office.opd_name.toLowerCase().includes(q))
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
    if (confirm(`Apakah Anda yakin ingin mengganti status keaktifan ${user.name}?`)) {
        form.put(`/admin/users/${user.id}/toggle`, { preserveScroll: true });
    }
};

const resetDevice = (user: UserItem) => {
    if (confirm(`Reset Device Binding HP untuk pegawai ${user.name}?`)) {
        form.put(`/admin/users/${user.id}/reset-device`, { preserveScroll: true });
    }
};
</script>

<template>
    <AdminLayout title="Kelola Pengguna ASN" subtitle="Manajemen Data Pegawai ASN, OPD, Role, & Binding Device HP">
        <!-- Header Toolbar -->
        <template #actions>
            <Button
                @click="showForm = true"
                class="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-semibold text-xs shadow-md shadow-teal-600/20 rounded-xl cursor-pointer"
            >
                <UserPlus class="w-4 h-4 mr-2" />
                <span>Tambah ASN Baru</span>
            </Button>
        </template>

        <!-- Search & Filter Card -->
        <Card class="border-border/60 shadow-md backdrop-blur-xl bg-card/95 mb-6">
            <CardContent class="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div class="relative w-full md:w-80">
                    <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    <Input
                        v-model="searchQuery"
                        type="text"
                        placeholder="Cari NIP, Nama, atau OPD..."
                        class="pl-9 h-9 text-xs transition-all focus-visible:ring-teal-500"
                    />
                </div>

                <div class="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
                    <Button
                        v-for="f in filters"
                        :key="f.value"
                        size="sm"
                        :variant="activeFilter === f.value ? 'default' : 'outline'"
                        @click="activeFilter = f.value"
                        class="text-xs h-8 cursor-pointer rounded-lg"
                        :class="{ 'bg-teal-600 hover:bg-teal-700 text-white': activeFilter === f.value }"
                    >
                        {{ f.label }}
                    </Button>
                </div>
            </CardContent>
        </Card>

        <!-- Table Card -->
        <Card class="border-border/60 shadow-md backdrop-blur-xl bg-card/95">
            <CardContent class="p-0">
                <div class="overflow-x-auto">
                    <table class="w-full text-xs">
                        <thead>
                            <tr class="text-left text-muted-foreground border-b border-border bg-muted/30">
                                <th class="px-4 py-3.5 font-semibold text-center w-10">#</th>
                                <th class="px-4 py-3.5 font-semibold">Pegawai ASN</th>
                                <th class="px-4 py-3.5 font-semibold">OPD & Unit Kerja</th>
                                <th class="px-4 py-3.5 font-semibold text-center">Role Akses</th>
                                <th class="px-4 py-3.5 font-semibold text-center">Device Binding</th>
                                <th class="px-4 py-3.5 font-semibold text-center">Status</th>
                                <th class="px-4 py-3.5 font-semibold text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-border/40">
                            <tr
                                v-for="(user, i) in paginatedUsers"
                                :key="user.id"
                                class="hover:bg-muted/40 transition-colors"
                            >
                                <td class="px-4 py-3.5 text-center font-mono text-muted-foreground">{{ (currentPage - 1) * itemsPerPage + i + 1 }}</td>
                                <td class="px-4 py-3.5">
                                    <div class="flex items-center gap-3">
                                        <div class="w-8 h-8 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold flex items-center justify-center text-xs shrink-0">
                                            {{ user.name[0].toUpperCase() }}
                                        </div>
                                        <div>
                                            <p class="font-bold text-foreground">{{ user.name }}</p>
                                            <p class="text-[10px] font-mono text-teal-600 dark:text-teal-400 font-semibold">NIP. {{ user.nip }}</p>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-4 py-3.5 text-muted-foreground">
                                    <p class="font-semibold text-foreground">{{ user.office?.opd_name || 'Tanpa OPD' }}</p>
                                    <p class="text-[11px]">{{ user.profile?.jabatan || '-' }}</p>
                                </td>
                                <td class="px-4 py-3.5 text-center">
                                    <Badge variant="outline" class="text-[10px] uppercase font-semibold px-2 py-0.5">
                                        {{ user.role?.display_name || 'ASN' }}
                                    </Badge>
                                </td>
                                <td class="px-4 py-3.5 text-center">
                                    <span v-if="user.device_id" class="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                                        <Smartphone class="w-3 h-3" />
                                        <span>Locked</span>
                                    </span>
                                    <span v-else class="text-[10px] text-muted-foreground font-mono">Unlocked</span>
                                </td>
                                <td class="px-4 py-3.5 text-center">
                                    <Badge
                                        :variant="user.is_active ? 'default' : 'outline'"
                                        class="text-[10px] uppercase font-semibold px-2 py-0.5"
                                        :class="{
                                            'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30': user.is_active,
                                            'bg-rose-500/10 text-rose-500 border-rose-500/30': !user.is_active,
                                        }"
                                    >
                                        {{ user.is_active ? 'Aktif' : 'Nonaktif' }}
                                    </Badge>
                                </td>
                                <td class="px-4 py-3.5 text-right">
                                    <div class="flex items-center justify-end gap-1">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            @click="openCardModal(user)"
                                            class="h-7 w-7 p-0 text-teal-600 dark:text-teal-400 hover:bg-teal-500/10 cursor-pointer"
                                            title="ID Card Digital ASN"
                                        >
                                            <CreditCard class="w-3.5 h-3.5" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            @click="editUser(user)"
                                            class="h-7 w-7 p-0 text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer"
                                            title="Edit Data ASN"
                                        >
                                            <Edit3 class="w-3.5 h-3.5" />
                                        </Button>
                                        <Button
                                            v-if="user.device_id"
                                            variant="ghost"
                                            size="sm"
                                            @click="resetDevice(user)"
                                            class="h-7 w-7 p-0 text-amber-500 hover:bg-amber-500/10 cursor-pointer"
                                            title="Reset Device Binding"
                                        >
                                            <Smartphone class="w-3.5 h-3.5" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            @click="toggleUserStatus(user)"
                                            class="h-7 w-7 p-0 cursor-pointer"
                                            :class="user.is_active ? 'text-rose-500 hover:bg-rose-500/10' : 'text-emerald-500 hover:bg-emerald-500/10'"
                                            :title="user.is_active ? 'Nonaktifkan Akun' : 'Aktifkan Akun'"
                                        >
                                            <Power class="w-3.5 h-3.5" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div v-if="!filteredUsers.length" class="text-center text-muted-foreground py-10 space-y-2">
                        <UsersIcon class="w-8 h-8 mx-auto text-muted-foreground/50" />
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
            <DialogContent class="sm:max-w-lg bg-card/95 border-border/80 backdrop-blur-2xl">
                <DialogHeader>
                    <DialogTitle class="text-base font-bold flex items-center gap-2">
                        <UserPlus class="w-4 h-4 text-teal-600 dark:text-teal-400" />
                        <span>{{ form.id ? 'Edit Data Pegawai ASN' : 'Tambah Pegawai ASN Baru' }}</span>
                    </DialogTitle>
                </DialogHeader>

                <form @submit.prevent="submitForm" class="space-y-4 pt-2">
                    <div class="grid grid-cols-2 gap-3">
                        <div class="space-y-1.5">
                            <Label for="nip" class="text-xs">NIP Pegawai</Label>
                            <Input id="nip" v-model="form.nip" required placeholder="19850101..." class="h-9 text-xs" />
                        </div>
                        <div class="space-y-1.5">
                            <Label for="name" class="text-xs">Nama Lengkap</Label>
                            <Input id="name" v-model="form.name" required placeholder="Nama & Gelar" class="h-9 text-xs" />
                        </div>
                    </div>

                    <div class="space-y-1.5">
                        <Label for="email" class="text-xs">Email Status</Label>
                        <Input id="email" v-model="form.email" type="email" placeholder="email@soppengkab.go.id" class="h-9 text-xs" />
                    </div>

                    <div class="grid grid-cols-2 gap-3">
                        <div class="space-y-1.5">
                            <Label class="text-xs">OPD / Kantor</Label>
                            <Select v-model="form.office_id">
                                <SelectTrigger class="h-9 text-xs bg-background">
                                    <SelectValue placeholder="Pilih OPD" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem v-for="o in offices" :key="o.id" :value="String(o.id)">
                                        {{ o.opd_name }}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div class="space-y-1.5">
                            <Label class="text-xs">Role Hak Akses</Label>
                            <Select v-model="form.role_id">
                                <SelectTrigger class="h-9 text-xs bg-background">
                                    <SelectValue placeholder="Pilih Role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem v-for="r in roles" :key="r.id" :value="String(r.id)">
                                        {{ r.display_name }}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-3">
                        <div class="space-y-1.5">
                            <Label for="jabatan" class="text-xs">Jabatan</Label>
                            <Input id="jabatan" v-model="form.jabatan" placeholder="Kepala Bidang..." class="h-9 text-xs" />
                        </div>
                        <div class="space-y-1.5">
                            <Label for="unit_kerja" class="text-xs">Sub OPD / Unit Kerja</Label>
                            <Input id="unit_kerja" v-model="form.unit_kerja" placeholder="Sekretariat / Bidang..." class="h-9 text-xs" />
                        </div>
                    </div>

                    <div class="flex items-center justify-end gap-2 pt-3 border-t border-border">
                        <Button type="button" variant="outline" size="sm" @click="resetForm" class="cursor-pointer">
                            Batal
                        </Button>
                        <Button type="submit" size="sm" class="bg-teal-600 hover:bg-teal-700 text-white cursor-pointer">
                            {{ form.id ? 'Simpan Perubahan' : 'Tambah ASN' }}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>

        <!-- Shadcn Dialog ID Card Digital ASN -->
        <Dialog v-model:open="showCardModal">
            <DialogContent class="sm:max-w-sm bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 text-white border-teal-500/30">
                <div v-if="selectedCardUser" class="text-center space-y-3 pt-2">
                    <div class="flex items-center justify-center gap-2">
                        <img src="/images/logo.png" class="w-8 h-8 object-contain" alt="Logo Pemda" />
                        <div class="text-left">
                            <h4 class="text-xs font-black tracking-wider text-teal-400">PEMKAB SOPPENG</h4>
                            <p class="text-[9px] text-slate-300 font-medium">KARTU IDENTITAS DIGITAL ASN</p>
                        </div>
                    </div>

                    <div class="w-20 h-20 rounded-full bg-teal-500/20 border-2 border-teal-400 mx-auto flex items-center justify-center text-xl font-bold text-teal-300 shadow-inner my-3">
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
                        <h3 class="font-extrabold text-base">{{ selectedCardUser.name }}</h3>
                        <p class="text-xs font-mono text-teal-300">NIP. {{ selectedCardUser.nip }}</p>
                    </div>

                    <div class="pt-2 border-t border-slate-700/60 text-xs space-y-1">
                        <p class="text-slate-300 font-semibold">{{ selectedCardUser.office?.opd_name || 'PEMKAB SOPPENG' }}</p>
                        <p class="text-[11px] text-slate-400">{{ selectedCardUser.profile?.jabatan || 'Aparatur Sipil Negara' }}</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    </AdminLayout>
</template>
