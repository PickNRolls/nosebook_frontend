import { cache } from "react";
import { User } from "./typings/User";
import { ApiResponse } from "./typings/ApiResponse";
import { cookies } from "next/headers";
import { SESSION_COOKIE_KEY } from "./const/auth";
import { serverRenderApi } from "./serverRenderApi";

export const getWhoami = cache((): Promise<ApiResponse<User> | null> => {
  const sessionCookie = cookies().get(SESSION_COOKIE_KEY);
  if (!sessionCookie) {
    return Promise.resolve(null);
  }

  return serverRenderApi<User>('/whoami', {
    method: 'GET'
  })
})
