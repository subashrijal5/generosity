import { UserCookieKey } from "~/enums/common";
import type { TChangePasswordForm, TLoginForm, TSignupForm, TUser } from "~/schema/authSchema";
import type { THttpError, THttpResponse } from "~/types/common";

export const useAuth = () => {
  const {
    public: { apiBaseUrl },
  } = useRuntimeConfig();
  const userCookie = useCookie<TUser | null>(UserCookieKey);
  const user = computed(() => userCookie.value);

  const accessToken = computed(() => user.value?.token);
  const refreshToken = computed(() => user.value?.refreshToken);
  const isAuthenticated = computed(() => !!user.value);

  const signIn = async (data: TLoginForm) => {
    await $fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      onResponseError: (e) => {
        toast({
          title: "エラー",
          description: e.response._data.message,
          variant: "destructive",
          duration: 5000,
        });
      },
      onResponse: (e) => {
        if (e.response.ok) {
          if (import.meta.client) {
            navigateTo("/dashboard", { external: true });
          }
          toast({
            title: "成功",
            description: "正常にログインしました",
            variant: "success",
            duration: 5000,
          });
        }
      },
    });
  };

  const signUp = async (data: TSignupForm) => {
    await $fetch(`/auth/register`, {
      baseURL: apiBaseUrl,
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      onResponseError: (e) => {
        toast({
          title: "エラー",
          description: e.response._data.message,
          variant: "destructive",
          duration: 5000,
        });
      },
      onResponse: (e) => {
        if (e.response.ok) {
          navigateTo("/auth/login");
          toast({
            title: "成功",
            description: "正常に登録されました。ログインしてください",
            variant: "success",
            duration: 5000,
          });
        }
      },
    });
  };

  const logout = async () => {
    await $fetch("/auth/logout", {
      method: "POST",
      baseURL: apiBaseUrl,
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": accessToken.value!,
        "x-refresh-token": refreshToken.value!,
      },
      onResponse: async () => {
        userCookie.value = null;
        navigateTo("/auth/login", { external: true });
        toast({
          title: "成功",
          description: "正常にログアウトしました",
          variant: "success",
          duration: 5000,
        });
      },
      onResponseError: (e) => {
        toast({
          title: "エラー",
          description: e.response._data.message,
          variant: "destructive",
          duration: 5000,
        });
      },
    });
  };

  const changePassword = async (data: TChangePasswordForm) => {
    const {
      data: response,
      status,
      error,
    } = await useAsyncData<THttpResponse<null>, THttpError>("ChangePassword", () =>
      $fetch(`/auth/change-password`, {
        baseURL: apiBaseUrl,
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": accessToken.value!,
          "x-refresh-token": refreshToken.value!,
        },
        method: "POST",
        body: JSON.stringify(data),
      })
    );

    if (status.value === "error") {
      toast({
        title: "エラー",
        description: error.value?.data?.message,
        variant: "destructive",
        duration: 5000,
      });
    }
    if (status.value === "success") {
      toast({
        title: "成功",
        description: response.value?.message,
        variant: "success",
        duration: 5000,
      });
    }
    return {
      status,
    };
  };

  const refreshAccessToken = async () => {
    try {
      $fetch("/api/auth/refresh-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": accessToken.value!,
          "x-refresh-token": refreshToken.value!,
        },

        onResponseError: async (e) => {
          userCookie.value = null;
          navigateTo("/auth/login", { external: true });
        },
      });

      return true;
    } catch (error) {
      userCookie.value = null;
      navigateTo("/auth/login", { external: true });
    }
  };

  return {
    signIn,
    signUp,
    logout,
    changePassword,
    refreshAccessToken,
    isAuthenticated,
    user,
  };
};
