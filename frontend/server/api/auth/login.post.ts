import { UserCookieKey } from "~/enums/common";
import { TLoginForm, TUser } from "~/schema/authSchema";
import { THttpResponse } from "~/types/common";

export default defineEventHandler(async (event) => {
  // Get request email and password
  try {
    const body = await readBody<TLoginForm>(event);
    const { email, password } = body;

    // Make the external API call
    const response = await fetch(`${process.env.API_BASE_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    // Log the response status
    console.log("Response status:", response.status);
    const jsonResponse = (await response.json()) as THttpResponse<TUser>;

    // Check if the response is OK
    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        message: jsonResponse.message || "API request failed",
      });
    }

    // Parse the response JSON
    const user = jsonResponse.responseObject;

    // Log the received user data
    console.log("Received user:", user);

    // Handle invalid user data
    if (!user) {
      throw createError({ statusCode: 401, statusMessage: "Invalid credentials" });
    }

     setCookie(event, UserCookieKey, JSON.stringify(user), {
      // httpOnly: process.env.NODE_ENV === 'production',
      maxAge:  user.maxAge,
      // secure: process.env.NODE_ENV === 'production',
      // sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
     })

    return true;
  } catch (error) {
    console.log(error, "error");
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
      message: error as string,
    });
  }
});
