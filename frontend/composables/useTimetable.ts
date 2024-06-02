import type { WeekDaysEnum } from "~/enums/common";
import type { TCourse } from "~/schema/courseSchema";
import type { THttpError, THttpResponse } from "~/types/common";

export const useTimeTable = () => {
  const { apiBaseUrl, headers } = useRequest();
  const courses = ref<TCourse[]>();

  const loadData = async () => {
    const { data, status, error } = await useAsyncData<THttpResponse<TCourse[]>, THttpError>(
      "Timetable",
      () =>
        $fetch("/courses/get-enrolled", {
          baseURL: apiBaseUrl,
          headers: headers.value,
        })
    );
    if (status.value === "error") {
      errorToast(error.value?.message);
      return;
    }
    courses.value = data.value?.responseObject.map((course) => ({
      ...course,
      days: getDaysList(course.lectureDays),
    }));
  };

  const getDaysList = (daysString: string) => {
    return daysString.split(",").map((day) => day.trim()) as WeekDaysEnum[];
  };

  return { courses, loadData };
};
