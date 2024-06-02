<template>
  <div class="flex items-center justify-between rounded-lg border p-3">
    <div class="flex gap-3">
      <div class="shrink-0 self-start">
        <Icon :name="`lucide:${icon}`" class="h-5 w-5" />
      </div>
      <UiLabel for="push" class="flex gap-2 text-sm">
        <p class="font-medium">{{ label }}:</p>
      </UiLabel>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
  defineProps<{
    label: string;
    icon: string;
  }>();
</script>
