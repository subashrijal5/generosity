import type { LectureStatusEnum } from "~/enums/common";
import type { THttpError, THttpResponse } from "~/types/common";

export const useLectures = () => {
  const { apiBaseUrl, headers } = useRequest();

  const updateStatus = async (lectureId: number, status: LectureStatusEnum) => {
    const {
      status: responseStatus,
      error,
    } = await useAsyncData<THttpResponse<null>, THttpError>("UpdateStatus", () =>
      $fetch(`/lectures/${lectureId}/update-status`, {
        baseURL: apiBaseUrl,
        headers: headers.value,
        method: "PUT",
        body: { status },
      })
    );
    if (responseStatus.value === "error") {
      errorToast(error.value?.message);
      return;
    }
    successToast("ステータスが更新されました");
  };
  return { updateStatus };
};
