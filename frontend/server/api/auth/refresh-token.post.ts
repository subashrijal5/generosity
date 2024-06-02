import { UserCookieKey } from "~/enums/common";
import { TUser } from "~/schema/authSchema";
import { THttpResponse } from "~/types/common";

export default defineEventHandler(async (event) => {
  try {
    // Get request email and password
    const reqUserCookie = getCookie(event, UserCookieKey);
    const reqUser = JSON.parse(reqUserCookie!) as TUser;
    console.log("🚀 ~ defineEventHandler ~ reqUser:", reqUser, typeof reqUser)
    const refreshToken = reqUser?.refreshToken;
    const accessToken = reqUser?.token;

    if (!refreshToken || !accessToken) {
      throw createError({ statusCode: 401, statusMessage: "Invalid credentials" });
    }

    // Make the external API call
    const response = await fetch(`${process.env.API_BASE_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-auth-token": accessToken!,
        "x-refresh-token": refreshToken!,
      },
    });

    // Log the response status
    const jsonResponse = (await response.json()) as THttpResponse<TUser>;

    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        message: jsonResponse.message || "API request failed",
      });
    }

    const user = jsonResponse.responseObject;

    // Set the user session
    setCookie(event, UserCookieKey, JSON.stringify(user), {
      httpOnly: process.env.NODE_ENV === 'production',
      maxAge: user.maxAge,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "none",
    });

    return true;
  } catch (error) {
    throw createError({ statusCode: 401, statusMessage: "Invalid credentials" });
  }
});
