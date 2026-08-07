import { ref } from 'vue';

export interface ConfirmOptions {
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'warning' | 'info' | 'success';
}

const isOpen = ref(false);
const options = ref<ConfirmOptions>({});
const loading = ref(false);
let resolvePromise: ((value: boolean) => void) | null = null;

export function useConfirm() {
    const confirm = (opts: ConfirmOptions): Promise<boolean> => {
        options.value = {
            title: 'Konfirmasi Aksi',
            description: 'Apakah Anda yakin ingin melanjutkan aksi ini?',
            confirmText: 'Ya, Lanjutkan',
            cancelText: 'Batal',
            variant: 'danger',
            ...opts,
        };
        isOpen.value = true;
        loading.value = false;

        return new Promise((resolve) => {
            resolvePromise = resolve;
        });
    };

    const handleConfirm = () => {
        if (resolvePromise) {
            resolvePromise(true);
            resolvePromise = null;
        }
        isOpen.value = false;
    };

    const handleCancel = () => {
        if (resolvePromise) {
            resolvePromise(false);
            resolvePromise = null;
        }
        isOpen.value = false;
    };

    return {
        isOpen,
        options,
        loading,
        confirm,
        handleConfirm,
        handleCancel,
    };
}
