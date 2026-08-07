import { usePage } from '@inertiajs/vue3';
import { watch } from 'vue';
import { toast } from 'vue-sonner';

export function useFlashToast() {
    const page = usePage();

    watch(
        () => page.props.flash,
        (flash: any) => {
            if (!flash) {
                return;
            }

            if (flash.success) {
                toast.success('Berhasil', {
                    description: flash.success,
                });
            }

            if (flash.error) {
                toast.error('Gagal', {
                    description: flash.error,
                });
            }

            if (flash.warning) {
                toast.warning('Peringatan', {
                    description: flash.warning,
                });
            }

            if (flash.info || flash.message) {
                toast.info('Informasi', {
                    description: flash.info || flash.message,
                });
            }
        },
        { deep: true, immediate: true },
    );
}
