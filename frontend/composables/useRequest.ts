import { UserCookieKey } from "~/enums/common";
import type { TUser } from "~/schema/authSchema";

export const useRequest = () => {
  const {
    public: { apiBaseUrl },
  } = useRuntimeConfig();

  const user = useCookie<TUser>(UserCookieKey);
  const accessToken = computed(() => user.value?.token);
  const refreshToken = computed(() => user.value?.refreshToken);

  const headers = computed(() => ({
    "Content-Type": "application/json",
    "x-auth-token": accessToken.value!,
    "x-refresh-token": refreshToken.value!,
  }));

  return { apiBaseUrl, headers, user };
};
