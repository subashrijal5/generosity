<template>
  <UiContainer class="mx-auto w-full max-w-5xl px-4 py-8 md:px-6 md:py-12">
    <div class="grid gap-8">
      <div class="flex justify-between">
        <div>
          <h1 class="text-3xl font-bold">{{ course?.name }}</h1>
          <p class="mt-2 text-gray-500 dark:text-gray-400">
            {{ course?.description }}
          </p>
        </div>
        <div class="flex gap-2 min-w-72">
          <UiButton
            variant="default"
            @click="handleMarkCompleted(course?.id!)"
            class="w-full"
            size="sm"
            v-if="enrollmentStatus === EnrollmentStatus.enrolled"
          >
            <Icon name="lucide:check-circle" class="h-5 w-5" />
            完成
          </UiButton>
          <PartialEnrollLeave :status="enrollmentStatus" @click="handleEnroll"></PartialEnrollLeave>
          <UiButton  class="w-full" @click="router.back()" variant="ghost">戻る</UiButton>
        </div>
      </div>
      <UiDivider />
      <div class="grid gap-8 md:grid-cols-2">
        <div class="grid gap-4">
          <div class="grid gap-1">
            <UiLabel class="text-gray-500 dark:text-gray-400">講師</UiLabel>
            <div class="flex items-center gap-4">
              <span class="relative flex h-12 w-12 shrink-0 overflow-hidden rounded-full border">
                <Icon name="lucide:user" class="aspect-square h-full w-full" />
              </span>
              <div>
                <div class="font-medium">{{ course?.instructor.name }}</div>

                <UiLabel class="text-sm text-gray-500 dark:text-gray-400">
                  {{ course?.instructor.designation }}
                </UiLabel>
              </div>
            </div>
          </div>
          <div class="grid gap-1">
            <UiLabel class="text-gray-500 dark:text-gray-400">コース詳細</UiLabel>
            <div class="grid gap-2 text-sm">
              <div class="flex justify-between">
                <div>学期</div>
                <UiBadge class="capitalize">{{ course?.semester }}</UiBadge>
              </div>
              <div class="flex justify-between">
                <div>タイムスロット</div>
                <div>{{ course?.timeslot }}</div>
              </div>
              <div class="flex justify-between">
                <div>クレジット</div>
                <UiBadge class="bg-green-500">{{ course?.credits }}</UiBadge>
              </div>
              <div class="flex justify-between">
                <div>作成</div>
                <div>{{ formatDate(course?.createdAt!) }}</div>
              </div>
              <div
                class="flex justify-between"
                v-if="enrollmentStatus !== EnrollmentStatus.pending"
              >
                <div>在籍日</div>
                <div>{{ formatDate(enrollment?.enrolledAt!) }}</div>
              </div>
              <div
                class="flex justify-between"
                v-if="enrollmentStatus === EnrollmentStatus.completed"
              >
                <div>完了</div>
                <div>{{ formatDate(enrollment?.completedAt!) }}</div>
              </div>
              <div class="flex justify-between">
                <div>ステータス</div>

                <UiBadge :class="enrollmentStatusStyles[enrollmentStatus]">
                  {{ enrollmentStatus }}
                </UiBadge>
              </div>
            </div>
          </div>
        </div>
        <div class="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
          <div class="flex flex-col space-y-1.5 p-6">
            <h3 class="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
              講師略歴
            </h3>
          </div>
          <div class="p-6 text-sm">
            <p>
              {{ course?.instructor.bio }}
            </p>
          </div>
        </div>
      </div>
      <UiDivider />
      <div>
        <UiCollapsible default-open>
          <UiCollapsibleTrigger
            className="flex items-center justify-between w-full bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-md font-medium [&[data-state=open]>svg]:rotate-90"
          >
            <div>講義</div>
            <Icon name="lucide:chevron-right" className="w-7 h-7 transition-transform" />
          </UiCollapsibleTrigger>
          <UiCollapsibleContent className="px-4 py-6 grid gap-4">
            <PartialLectureCard
              v-for="lecture in course?.lectures"
              :lecture="lecture"
              :key="lecture.id"
              :isEnrolled="enrollmentStatus === EnrollmentStatus.enrolled"
            ></PartialLectureCard>
          </UiCollapsibleContent>
        </UiCollapsible>
      </div>
    </div>
    <!-- </main> -->
  </UiContainer>
</template>
<script lang="ts" setup>
  import { EnrollmentStatus } from "~/enums/common";
  import type { TCourse } from "~/schema/courseSchema";

  const route = useRoute();
  const router = useRouter();
  const courseId = parseInt(route.params.id as string);
  const course = ref<TCourse>();
  definePageMeta({
    layout: "dashboard",
  });
  const {
    showCourse,
    enrollmentStatus: enrollmentStatusFunc,
    handleEnroll: enroll,
    markCompleted,
  } = useCourses();

  course.value = await showCourse(courseId);

  const enrollment = computed(() => course.value?.enrollments[0] ?? undefined);

  const enrollmentStatus = computed(() => enrollmentStatusFunc(course.value!));

  const handleEnroll = async () => {
    await enroll(course.value!, enrollmentStatus.value);
    course.value = await showCourse(courseId);
  };

  const handleMarkCompleted = async (coursdId: number) => {
    markCompleted(coursdId).then(async () => (course.value = await showCourse(courseId)));
  };
</script>
