<template>
  <UiContainer class="py-16 text-center lg:py-24">
    <slot name="headline">
      <p class="font-semibold text-primary">Welcome</p>
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
        <UiButton to="dashboard/courses" variant="outline">Check Courses List</UiButton>
        <UiButton to="/dashboard/timetable">View Timetable</UiButton>
      </slot>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  import Card from "~/components/Ui/Card/Card.vue";

  definePageMeta({
    layout: "dashboard",
  });

  const { user } = useAuth();
  const title = `Welcome ${user.value?.name}`;
  const description =
    "This is Generosity university. Here you can enroll to courses. You can check the class schedule also you can update your lecture status.";
</script>
