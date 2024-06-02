<template>
  <UiContainer>
    <UiTitle title="Your TimeTable">Here you can see your weekly class Schedule.</UiTitle>
    <div class="timetable">
      <div class="timetable-header">
        <div class="timetable-header-cell"></div>
        <div v-for="day in weekDays" :key="day" class="timetable-header-cell font-bold">
          {{ day }}
        </div>
      </div>
      <UiScrollArea class="h-[30rem]">
        <div v-for="(timeslot, index) in timeSlots" :key="index" class="timetable-row">
          <div class="timetable-cell font-bold">{{ timeslot }}</div>
          <div
            v-for="day in weekDays"
            :key="day"
            class="timetable-cell"
            :class="getCourseClass(timeslot, day)"
          >
            <PartialCourseModal :course="coursesData[`${timeslot}-${day}`]" >
              <button v-if="coursesData[`${timeslot}-${day}`]" class="course-cell">
                {{ coursesData[`${timeslot}-${day}`].name }}
              </button>
            </PartialCourseModal>
          </div>
        </div>
      </UiScrollArea>
    </div>
  </UiContainer>
</template>

<script setup lang="ts">
  import { TimeSlotsEnum, WeekDaysEnum } from "~/enums/common";
  import { computed } from "vue";
  import type { TCourse } from "~/schema/courseSchema";

  definePageMeta({
    layout: "dashboard",
  });

  const { courses, loadData } = useTimeTable();
  await loadData();

  const weekDays = WeekDaysEnum;
  const timeSlots = TimeSlotsEnum;

  const coursesData = computed(() => {
    const data: Record<string, TCourse> = {};
    courses.value?.forEach((course) => {
      course.days?.forEach((day) => {
        data[`${course.timeslot}-${day}`] = course;
      });
    });
    return data;
  });

  const getCourseClass = (timeslot: string, day: WeekDaysEnum) =>
    coursesData.value[`${timeslot}-${day}`] ? "timetable-course-bg" : "";
</script>

<style scoped>
  .timetable {
    @apply w-full rounded-lg border border-gray-300 dark:border-gray-600;
  }

  .timetable-header {
    @apply flex items-center bg-gray-200 dark:bg-gray-800;
  }

  .timetable-header-cell {
    @apply flex-1 py-2 text-center font-semibold text-gray-800 dark:text-gray-200;
  }

  .timetable-row {
    @apply flex transition-colors duration-200;
  }

  .timetable-row:hover {
    @apply bg-gray-100 dark:bg-gray-700;
  }

  .timetable-cell {
    @apply flex-1 border-b border-r border-gray-300 py-2 text-center text-gray-800 last:border-r-0 dark:border-gray-600 dark:text-gray-200;
  }

  .course-cell {
    @apply cursor-pointer p-1 text-sm font-semibold text-green-800 transition-colors duration-200 dark:text-gray-200;
  }

  .timetable-course-bg {
    @apply bg-green-200 text-green-800 hover:bg-green-300 dark:bg-green-900 dark:text-gray-200 dark:hover:bg-green-700;
  }
</style>
