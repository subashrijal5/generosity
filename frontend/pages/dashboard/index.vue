<template>
  <UiContainer class="py-16 text-center lg:py-24">
    <slot name="headline">
      <p class="font-semibold text-primary">ようこそ</p>
    </slot>
    <slot name="title">
      <h2 class="mb-4 mt-2 text-4xl font-bold lg:mb-6 lg:mt-3 lg:text-5xl">{{ title }}</h2>
    </slot>
    <slot name="description">
      <p class="mx-auto max-w-[800px] text-lg text-muted-foreground lg:text-xl">
        {{ description }}
      </p>
    </slot>
    <div class="mt-5 flex w-full flex-col-reverse justify-center gap-3 md:w-auto md:flex-row">
      <slot>
        <UiButton to="dashboard/courses" variant="outline">コース一覧</UiButton>
        <UiButton to="/dashboard/timetable">タイムテーブルを見る</UiButton>
      </slot>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  definePageMeta({
    layout: "dashboard",
  });

  const { user } = useAuth();
  const title = `ようこそ ${user.value?.name}`;
  const description =
    "寛大大学です。ここでは、コースに登録することができます。また、授業のスケジュールを確認したり、講義状況を更新することもできます。";
</script>
