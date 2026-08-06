<script setup lang="ts">
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from '@lucide/vue';
import { computed } from 'vue';
import { Button } from '@/Components/ui/button';

const props = withDefaults(
    defineProps<{
        currentPage: number;
        totalItems: number;
        itemsPerPage?: number;
        maxPageButtons?: number;
    }>(),
    {
        itemsPerPage: 10,
        maxPageButtons: 5,
    },
);

const emit = defineEmits<{
    (e: 'update:currentPage', page: number): void;
}>();

const totalPages = computed(() =>
    Math.max(1, Math.ceil(props.totalItems / props.itemsPerPage)),
);

const fromItem = computed(() =>
    props.totalItems === 0
        ? 0
        : (props.currentPage - 1) * props.itemsPerPage + 1,
);
const toItem = computed(() =>
    Math.min(props.currentPage * props.itemsPerPage, props.totalItems),
);

const visiblePages = computed(() => {
    const pages: number[] = [];
    const max = props.maxPageButtons;
    let start = Math.max(1, props.currentPage - Math.floor(max / 2));
    const end = Math.min(totalPages.value, start + max - 1);

    if (end - start + 1 < max) {
        start = Math.max(1, end - max + 1);
    }

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    return pages;
});

const setPage = (p: number) => {
    if (p >= 1 && p <= totalPages.value && p !== props.currentPage) {
        emit('update:currentPage', p);
    }
};
</script>

<template>
    <div
        class="flex flex-col items-center justify-between gap-3 border-t border-border/50 px-4 py-3 text-xs text-muted-foreground sm:flex-row"
    >
        <div>
            <span>Menampilkan </span>
            <span class="font-bold text-foreground">{{ fromItem }}</span>
            <span> s/d </span>
            <span class="font-bold text-foreground">{{ toItem }}</span>
            <span> dari </span>
            <span class="font-bold text-foreground">{{ totalItems }}</span>
            <span> data</span>
        </div>

        <div v-if="totalPages > 1" class="flex items-center gap-1">
            <Button
                variant="outline"
                size="sm"
                :disabled="currentPage === 1"
                @click="setPage(1)"
                class="h-8 w-8 cursor-pointer p-0"
                title="Halaman Pertama"
            >
                <ChevronsLeft class="h-3.5 w-3.5" />
            </Button>
            <Button
                variant="outline"
                size="sm"
                :disabled="currentPage === 1"
                @click="setPage(currentPage - 1)"
                class="h-8 w-8 cursor-pointer p-0"
                title="Halaman Sebelumnya"
            >
                <ChevronLeft class="h-3.5 w-3.5" />
            </Button>

            <Button
                v-for="p in visiblePages"
                :key="p"
                size="sm"
                :variant="currentPage === p ? 'default' : 'outline'"
                @click="setPage(p)"
                class="h-8 w-8 cursor-pointer p-0 text-xs font-semibold"
                :class="{
                    'bg-teal-600 text-white hover:bg-teal-700':
                        currentPage === p,
                }"
            >
                {{ p }}
            </Button>

            <Button
                variant="outline"
                size="sm"
                :disabled="currentPage === totalPages"
                @click="setPage(currentPage + 1)"
                class="h-8 w-8 cursor-pointer p-0"
                title="Halaman Selanjutnya"
            >
                <ChevronRight class="h-3.5 w-3.5" />
            </Button>
            <Button
                variant="outline"
                size="sm"
                :disabled="currentPage === totalPages"
                @click="setPage(totalPages)"
                class="h-8 w-8 cursor-pointer p-0"
                title="Halaman Terakhir"
            >
                <ChevronsRight class="h-3.5 w-3.5" />
            </Button>
        </div>
    </div>
</template>
