<template>
  <div class="my-4">
    <h1 class="text-2xl font-bold tracking-tight lg:text-2xl">{{ title }}.</h1>
    <p class="mt-1 text-muted-foreground"><slot></slot></p>
  </div>
</template>

<script lang="ts" setup>
  defineProps<{
    title: string;
  }>();
</script>
