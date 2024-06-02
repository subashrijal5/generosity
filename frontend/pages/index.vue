<template>
  <div>
    <UiContainer as="section" class="max-w-4xl py-5">
      <div class="flex items-center justify-between gap-5">
        <div>
          <h1 class="text-2xl font-semibold">Users</h1>
          <p class="mt-1 text-muted-foreground">Manage users here</p>
        </div>
        <!-- <UiButton @click="loadData" size="sm">Load users</UiButton> -->
      </div>
      <UiDivider class="my-10" />
    </UiContainer>
  </div>
</template>

<script lang="ts" setup>
  const { user } = useAuth();

  const headers = ["ID", "Name", "Email"];

  useHead({
    title: "Users",
    meta: [
      {
        name: "description",
        content: "Manage users here",
      },
    ],
  });
</script>
