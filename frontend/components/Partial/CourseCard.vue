<template>
  <UiCard class="max-w-sm" :title="course.name" :description="course.description">
    <template #content>
      <UiCardContent class="flex flex-col gap-3">
        <SingleInnerCard label="時間帯" icon="clock">
          <p class="text-muted-foreground">{{ course.timeslot }}</p>
        </SingleInnerCard>
        <SingleInnerCard label="学期" icon="book-check">
          <p class="text-muted-foreground">{{ course.semester }}</p>
        </SingleInnerCard>
        <SingleInnerCard label="単位" icon="user">
          <UiBadge class="bg-green-500">{{ course.credits }}</UiBadge>
        </SingleInnerCard>
      </UiCardContent>
    </template>

    <template #footer>
      <UiCardFooter class="flex gap-4">
        <UiButton :to="`/dashboard/courses/${course.id}`" class="w-full">
          <Icon class="h-5 w-5" name="lucide:eye" /> 詳細を見る
        </UiButton>
       
        <PartialEnrollLeave :status="status" @click="$emit('enroll-leave', course)"></PartialEnrollLeave>
      </UiCardFooter>
    </template>
  </UiCard>
</template>
<script lang="ts" setup>
  import type { TCourse } from "~/schema/courseSchema";

  import SingleInnerCard from "./SingleInnerCard.vue";
  import type { EnrollmentStatus } from "~/enums/common";

  defineProps<{
    course: TCourse;
    status: EnrollmentStatus;
  }>();
  defineEmits<{
    (e: "enroll-leave", course: TCourse): void;
  }>();
</script>
