import { cookies } from "next/headers";
import { ApiResponse } from "./typings/ApiResponse";
import { SESSION_COOKIE_KEY, SESSION_HEADER_KEY } from "./const/auth";

export const api = <T>(endpoint: string, init?: RequestInit): Promise<ApiResponse<T>> => {
  return fetch(`http://backend:8080${endpoint}`, {
    ...init,
    headers: {
      ...init?.headers,
      [SESSION_HEADER_KEY]: cookies().get(SESSION_COOKIE_KEY)?.value ?? '',
    },
  }).then(async res => {
    const json = await res.json();
    if (json && Array.isArray(json.errors) && json.errors.length) {
      throw json;
    }

    return json;
  });
};
