<script setup lang="ts">
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/Components/ui/dialog';
import { Button } from '@/Components/ui/button';
import { AlertTriangle, Info, Trash2, CheckCircle2 } from '@lucide/vue';

const props = withDefaults(
    defineProps<{
        open: boolean;
        title?: string;
        description?: string;
        confirmText?: string;
        cancelText?: string;
        variant?: 'danger' | 'warning' | 'info' | 'success';
        loading?: boolean;
    }>(),
    {
        open: false,
        title: 'Konfirmasi Aksi',
        description: 'Apakah Anda yakin ingin melanjutkan aksi ini?',
        confirmText: 'Ya, Lanjutkan',
        cancelText: 'Batal',
        variant: 'danger',
        loading: false,
    }
);

const emit = defineEmits<{
    (e: 'update:open', value: boolean): void;
    (e: 'confirm'): void;
    (e: 'cancel'): void;
}>();

const handleConfirm = () => {
    emit('confirm');
};

const handleCancel = () => {
    emit('update:open', false);
    emit('cancel');
};
</script>

<template>
    <Dialog :open="open" @update:open="(val) => emit('update:open', val)">
        <DialogContent class="sm:max-w-md">
            <DialogHeader class="gap-3">
                <div class="flex items-center gap-3">
                    <div
                        v-if="variant === 'danger'"
                        class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400"
                    >
                        <Trash2 class="h-5 w-5" />
                    </div>
                    <div
                        v-else-if="variant === 'warning'"
                        class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400"
                    >
                        <AlertTriangle class="h-5 w-5" />
                    </div>
                    <div
                        v-else-if="variant === 'success'"
                        class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
                    >
                        <CheckCircle2 class="h-5 w-5" />
                    </div>
                    <div
                        v-else
                        class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400"
                    >
                        <Info class="h-5 w-5" />
                    </div>

                    <div class="space-y-0.5">
                        <DialogTitle class="text-base font-bold">{{ title }}</DialogTitle>
                        <DialogDescription class="text-xs text-muted-foreground">
                            {{ description }}
                        </DialogDescription>
                    </div>
                </div>
            </DialogHeader>

            <DialogFooter class="mt-4 flex flex-row items-center justify-end gap-2 sm:gap-2">
                <Button
                    type="button"
                    variant="outline"
                    :disabled="loading"
                    @click="handleCancel"
                >
                    {{ cancelText }}
                </Button>
                <Button
                    type="button"
                    :variant="variant === 'danger' ? 'destructive' : 'default'"
                    :disabled="loading"
                    class="font-semibold text-white"
                    :class="{
                        'bg-red-600 hover:bg-red-700 dark:bg-red-600': variant === 'danger',
                        'bg-amber-600 hover:bg-amber-700 dark:bg-amber-600': variant === 'warning',
                        'bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600': variant === 'success',
                    }"
                    @click="handleConfirm"
                >
                    <span v-if="loading" class="mr-2 animate-spin">⏳</span>
                    {{ confirmText }}
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
