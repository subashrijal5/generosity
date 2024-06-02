<template>
  <aside class="sticky top-0 hidden h-screen border-r lg:block">
    <UiScrollArea class="size-full">
      <div class="flex h-screen flex-col pt-7">
        <NuxtLink to="/" class="flex w-full items-center gap-3 px-5">
          <span class="text-xl font-bold">寛大さ</span>
        </NuxtLink>
        <div class="my-6 px-5">
          <!-- <UiVeeInput v-model="search" placeholder="検索..." icon="lucide:search" /> -->
        </div>
        <div class="flex h-full grow flex-col pb-8">
          <div class="mb-10 flex flex-col gap-10">
            <nav class="flex flex-col gap-1">
              <template v-for="(n, i) in topNav" :key="i">
                <UiButton
                  :to="n.link"
                  size="default"
                  variant="ghost"
                  class="justify-start gap-4 px-3"
                >
                  <Icon v-if="n.icon" :name="n.icon" class="size-4 text-muted-foreground" />
                  <span>{{ n.title }}</span>
                </UiButton>
              </template>
            </nav>
          </div>
        </div>
      </div>
    </UiScrollArea>
  </aside>
</template>

<script lang="ts" setup>
  const topNav = [
    { title: "ダッシュボード", icon: "lucide:layout-dashboard", link: "/dashboard" },
    { title: "コース", icon: "lucide:book", link: "/dashboard/courses" },
    { title: "時間割", icon: "lucide:clock", link: "/dashboard/timetable" },
  ];
</script>
