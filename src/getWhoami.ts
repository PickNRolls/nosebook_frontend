import { api } from "@/api";
import { cache } from "react";
import { User } from "./typings/User";
import { ApiResponse } from "./typings/ApiResponse";
import { cookies } from "next/headers";
import { SESSION_COOKIE_KEY } from "./const/auth";

export const getWhoami = cache((): Promise<ApiResponse<User> | null> => {
  const sessionCookie = cookies().get(SESSION_COOKIE_KEY);
  if (!sessionCookie) {
    return Promise.resolve(null);
  }

  return api<User>('/whoami', {
    method: 'GET'
  })
})
