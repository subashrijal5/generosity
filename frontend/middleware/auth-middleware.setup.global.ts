const protectedRoutes = ["/dashboard*", "/uth/logout", "/auth/change-password", "/auth/user"];
const onlyUnprotected = ["/auth/login", "/auth/register"];

function matchProtectedRoute(path: string) {
  return protectedRoutes.some((route) => {
    if (route.endsWith("*")) {
      const baseRoute = route.slice(0, -1);
      return path.startsWith(baseRoute);
    }

    return route === path;
  });
}

export default defineNuxtRouteMiddleware(async (to) => {
  // const authStore = useUserSession();
  const { refreshAccessToken, isAuthenticated, user } = useAuth();
  
  // Check if the route is protected
  if (matchProtectedRoute(to.path)) {
    if (!isAuthenticated.value) {
      return navigateTo("/auth/login");
    }
    const expirationDate = new Date(user.value?.tokenExpiration!);
    // if expiration date is in the past, refresh token
    if (expirationDate < new Date()) {
      await refreshAccessToken();
    }
  }
  if (onlyUnprotected.includes(to.path)) {
    if (isAuthenticated.value) {
      return navigateTo("/dashboard");
    }
  }
});
