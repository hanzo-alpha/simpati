<template>
    <Link
        :href="route"
        class="flex flex-col items-center gap-0.5 rounded-xl px-3 py-1 transition-colors"
        :class="
            center
                ? 'relative -mt-5'
                : active
                  ? 'text-teal-400'
                  : 'text-(--text-muted) hover:text-(--text-body)'
        "
    >
        <!-- Center (Presensi) button -->
        <template v-if="center">
            <div
                class="flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-teal-500 to-teal-700 shadow-lg shadow-teal-500/30"
            >
                <svg
                    class="h-6 w-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        d="M12 11c1.7 0 3-1.3 3-3V4c0-1.7-1.3-3-3-3S9 2.3 9 4v4c0 1.7 1.3 3 3 3zm5.3-3c0 2.9-2.4 5.3-5.3 5.3S6.7 10.9 6.7 8H5c0 3.4 2.7 6.2 6 6.7V18H9v2h6v-2h-2v-3.3c3.3-.5 6-3.3 6-6.7h-1.7z"
                    />
                </svg>
            </div>
            <span class="mt-1 text-[10px] text-(--text-muted)">{{
                label
            }}</span>
        </template>

        <!-- Regular nav items -->
        <template v-else>
            <!-- Home -->
            <svg
                v-if="icon === 'home'"
                class="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
            </svg>

            <!-- History -->
            <svg
                v-else-if="icon === 'history'"
                class="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>

            <!-- Trophy -->
            <svg
                v-else-if="icon === 'trophy'"
                class="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 3h14l-1 9H6L5 3zm2 9v3a5 5 0 0010 0v-3M9 21h6m-3-6v6"
                />
            </svg>

            <!-- User -->
            <svg
                v-else-if="icon === 'user'"
                class="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
            </svg>

            <span class="text-[10px]">{{ label }}</span>
        </template>
    </Link>
</template>

<script setup lang="ts">
import { Link } from '@inertiajs/vue3';

defineProps({
    icon: String,
    label: String,
    route: String,
    active: Boolean,
    center: Boolean,
});
</script>
