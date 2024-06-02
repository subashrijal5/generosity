<template>
  <div class="grid gap-2 mt-6">
    <div class="flex items-center justify-between">
      <div class="font-medium">
        {{ lecture.name }}
        <UiBadge :class="badgeColorMap[lectureStatusRef]">{{ lectureStatusRef }}</UiBadge>
      </div>
      <div v-if="isEnrolled">
        <div class="flex justify-center">
          <UiSelect v-model="lectureStatusRef">
            <UiSelectTrigger placeholder="ステータスを変更" />
            <UiSelectContent>
              <UiSelectGroup>
                <UiSelectItem class="text-yellow-500" value="pending" text="保留中" />
                <UiSelectItem class="text-green-500" value="completed" text="完了" />
                <UiSelectItem class="text-red-500" value="missed" text="欠席" />
              </UiSelectGroup>
            </UiSelectContent>
          </UiSelect>
        </div>
      </div>
    </div>
    <p class="text-sm text-gray-500 dark:text-gray-400">
      {{ lecture.description }}
    </p>
  </div>
</template>
<script lang="ts" setup>
  import { UserCookieKey } from "~/enums/common";
  import type { LectureStatusEnum } from "~/enums/common";
  import type { TUser } from "~/schema/authSchema";
  import type { Lecture } from "~/schema/courseSchema";

  const { lecture } = defineProps<{
    lecture: Lecture;
    isEnrolled: boolean;
  }>();

  const user = useCookie<TUser>(UserCookieKey);
  const { updateStatus } = useLectures();

  const lectureStatus = computed(() => {
    const student = lecture.studentLectures?.find((l) => l.userId === user.value?.id);
    return student?.status ?? "pending";
  });
  const lectureStatusRef = ref<LectureStatusEnum>(lectureStatus.value as LectureStatusEnum);

  const badgeColorMap = {
    pending: "bg-yellow-500",
    completed: "bg-green-500",
    missed: "bg-red-500",
  };

  watch(lectureStatusRef, async (currentStatus) => {
    await updateStatus(lecture.id, currentStatus);
  });
</script>
