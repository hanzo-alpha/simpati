<script setup lang="ts">
defineProps<{
    message?: string;
}>();
</script>

<template>
    <div v-show="message">
        <p class="mt-1 text-xs font-medium text-destructive">
            {{ message }}
        </p>
    </div>
</template>
