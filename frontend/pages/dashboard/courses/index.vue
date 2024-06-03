<template>
  <UiContainer>
    <div class="w-full py-5">
      <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">受講可能クラス一覧</h1>
      <p class="mt-1 text-muted-foreground">ここでは、利用可能なクラスのリストを見ることができます。</p>
      <UiDivider class="mb-8"></UiDivider>
      <div class="flex flex-wrap gap-4">
        <PartialCourseCard
          @enroll-leave="handleEnroll"
          v-for="course in courses"
          :key="course.id"
          class="max-w-sm"
          :course="course"
          :status="enrollmentStatus(course)"
        >
        </PartialCourseCard>
      </div>
    </div>
  </UiContainer>
</template>
<script lang="ts" setup>
  import type { TCourse } from "~/schema/courseSchema";

  definePageMeta({
    layout: "dashboard",
  });
  const { courses, loadData, enrollmentStatus, handleEnroll: enroll } = useCourses();

  await loadData();

  const handleEnroll = async (course: TCourse) => {
    enroll(course, enrollmentStatus(course));
  };
</script>
