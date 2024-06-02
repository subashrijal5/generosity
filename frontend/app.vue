<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UiToastToaster />
  </div>
</template>

<script lang="ts" setup>
  useHead({
    htmlAttrs: {
      lang: "en",
    },
    link: [{ rel: "icon", type: "image/png", href: "/favicon.ico" }],
  });
</script>
