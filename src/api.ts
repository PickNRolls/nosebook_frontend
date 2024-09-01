import { cookies } from "next/headers";

import * as dto from '@/dto';

import { SESSION_COOKIE_KEY, SESSION_HEADER_KEY } from "./const/auth";

export const api = async <T>(endpoint: string, init?: RequestInit): Promise<dto.ApiSuccessResponse<T>> => {
  const res = await fetch(`http://backend:8080${endpoint}`, {
    ...init,
    headers: {
      ...init?.headers,
      [SESSION_HEADER_KEY]: cookies().get(SESSION_COOKIE_KEY)?.value ?? '',
    },
  });
  const json: dto.ApiResponse<T> = await res.json();
  if (json && Array.isArray(json.errors) && json.errors.length) {
    throw json;
  }

  return json as dto.ApiSuccessResponse<T>;
};
