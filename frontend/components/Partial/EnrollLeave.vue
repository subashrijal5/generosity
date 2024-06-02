<template>
  <UiButton
    v-if="status !== EnrollmentStatus.completed"
    variant="default"
    @click="$emit('click')"
    class="w-full"
    :class="status === EnrollmentStatus.enrolled ? 'bg-red-500 text-white hover:bg-red-600' : ''"
    size="sm"
  >
    <Icon
      :name="status === EnrollmentStatus.enrolled ? 'lucide:circle-x' : 'lucide:check-circle'"
      class="h-5 w-5"
    />
    {{ status === EnrollmentStatus.enrolled ? "退会" : "登録" }}
  </UiButton>
  <UiButton v-else variant="default" class="w-full bg-green-500 text-white" size="sm" disabled>
    <Icon name="lucide:check-circle" class="h-5 w-5" />
    完了
  </UiButton>
</template>
<script lang="ts" setup>
  import { EnrollmentStatus } from "~/enums/common";

  defineProps<{
    status: EnrollmentStatus;
  }>();
  defineEmits<{
    (e: "click"): void;
  }>();
</script>
