<script setup lang="ts">
import { ChevronDown } from "@lucide/vue"
import { reactiveOmit } from "@vueuse/core"
import type { SelectTriggerProps } from "reka-ui"
import { SelectIcon, SelectTrigger, useForwardProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = withDefaults(
  defineProps<SelectTriggerProps & { class?: HTMLAttributes["class"], size?: "sm" | "default" }>(),
  { size: "default" },
)

const delegatedProps = reactiveOmit(props, "class", "size")
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <SelectTrigger
    data-slot="select-trigger"
    :data-size="size"
    v-bind="forwardedProps"
    :class="cn(
      'border-input dark:border-border/80 data-[placeholder]:text-muted-foreground/60 [&_svg:not([class*=\'text-\'])]:text-muted-foreground focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-background dark:bg-card text-foreground flex w-full items-center justify-between gap-2 rounded-none border px-3.5 py-2 text-xs sm:text-sm font-sans shadow-xs transition-colors duration-150 outline-none disabled:cursor-not-allowed disabled:opacity-50 h-10 data-[size=default]:h-10 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4',
      props.class,
    )"
  >
    <slot />
    <SelectIcon as-child>
      <ChevronDown class="size-4 opacity-50" />
    </SelectIcon>
  </SelectTrigger>
</template>
