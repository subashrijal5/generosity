import { EnrollmentStatus } from "~/enums/common";
import type { TCourse } from "~/schema/courseSchema";
import type { THttpError, THttpResponse } from "~/types/common";

export const useCourses = () => {
  const courses = ref<TCourse[]>([]);

  const { apiBaseUrl, headers, user } = useRequest();

  const loadData = async () => {
    const { data, status, error } = await useAsyncData<THttpResponse<TCourse[]>>("Courses", () =>
      $fetch("/courses", {
        baseURL: apiBaseUrl,
        headers: headers.value,
      })
    );

    if (status.value === "error" || !data.value?.responseObject) {
      errorToast(error.value?.message);
      return;
    }
    courses.value = data.value.responseObject;
  };

  const enrollStudent = async (course: TCourse) => {
    const { status, error } = await useAsyncData<THttpResponse<TCourse[]>, THttpError>(
      "Enroll",
      () =>
        $fetch(`/courses/${course.id}/enroll`, {
          baseURL: apiBaseUrl,
          headers: headers.value,
          method: "POST",
        })
    );
    if (status.value === "error") {
      errorToast(error.value?.data?.message);
      return;
    }
    courses.value = courses.value.map((c) => {
      if (course.id === c.id) {
        return {
          ...c,
          enrollments: [
            {
              id: c.enrollments.length + 1,
              courseId: c.id,
              userId: user.value?.id ?? 0,
              status: EnrollmentStatus.enrolled,
              enrolledAt: new Date().toISOString(),
              completedAt: null
            },
          ],
        };
      }
      return c;
    });
    successToast("コースに登録しました");
  };

  const leaveCourse = async (course: TCourse) => {
    const { status, error } = await useAsyncData<THttpResponse<TCourse[]>, THttpError>(
      "LeaveCourse",
      () =>
        $fetch(`/courses/${course.id}/leave`, {
          baseURL: apiBaseUrl,
          headers: headers.value,
          method: "POST",
        })
    );
    if (status.value === "error") {
      errorToast(error.value?.data?.message);
      return;
    }

    courses.value = [
      ...courses.value.map((c) => {
        if (course.id === c.id) {
          return {
            ...c,
            enrollments: [],
          };
        }
        return c;
      }),
    ];
    successToast("コースから退会しました");
  };

  const enrollmentStatus = (course: TCourse) => {
    const enrollment = course.enrollments.filter((e) => e.userId === user.value?.id);
    if (enrollment.length === 0) return EnrollmentStatus.pending;
    return enrollment[0].status;
  };

  const showCourse = async (id: number) => {
    const { data, status, error } = await useAsyncData<THttpResponse<TCourse>, THttpError>(
      "Courses",
      () =>
        $fetch(`/courses/${id}`, {
          baseURL: apiBaseUrl,
          headers: headers.value,
        })
    );

    if (status.value === "error" || !data.value?.responseObject) {
      errorToast(error.value?.message);
      return;
    }

    return data.value.responseObject;
  };

  const markCompleted = async (courseId: number) => {
    const { data, status, error } = await useAsyncData<THttpResponse<null>, THttpError>(
      "Courses",
      () =>
        $fetch(`/courses/${courseId}/make-completed`, {
          baseURL: apiBaseUrl,
          headers: headers.value,
          method: "PATCH",
        })
    );
    if (status.value === "error") {
      errorToast(error.value?.message);
      return;
    }
    successToast("コースが完了としてマークされました");
    return true;
  };

  const handleEnroll = async (course: TCourse, enrollmentStatus: EnrollmentStatus) => {
    switch (enrollmentStatus) {
      case EnrollmentStatus.pending:
      case EnrollmentStatus.cancelled:
        await enrollStudent(course);
        break;
      case EnrollmentStatus.enrolled:
        if (confirm("本当にコースから退会しますか？")) {
          await leaveCourse(course);
        }
        break;
      case EnrollmentStatus.completed:
        errorToast("すでにコースを完了しています");
        break;
      default:
        break;
    }
  };

  return {
    courses,
    loadData,
    enrollStudent,
    leaveCourse,
    showCourse,
    enrollmentStatus,
    markCompleted,
    handleEnroll
  };
};
