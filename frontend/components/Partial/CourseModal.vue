<template>
  <div class="flex w-full items-center justify-center">
    <UiDialog v-model:open="dialog">
      <UiDialogTrigger as-child>
        <slot></slot>
      </UiDialogTrigger>

      <UiDialogContent class="sm:max-w-[425px]">
        <div class="mt-2">
          <PartialCourseCard
            :course="course"
            :status="enrollmentStatus(course)"
          ></PartialCourseCard>
        </div>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<script lang="ts" setup>
  import type { TCourse } from "~/schema/courseSchema";

  const { enrollmentStatus } = useCourses();
  const dialog = ref(false);

  defineProps<{
    course: TCourse;
  }>();
</script>
