import { cookies } from "next/headers";

import * as featauth from '@/features/auth';
import * as dto from '@/dto';

import { parseSessionCookie } from "./features/auth";

export const api = async <T>(endpoint: string, init?: RequestInit): Promise<dto.ApiSuccessResponse<T>> => {
  const [sessionId, _] = parseSessionCookie(cookies().get(featauth.SESSION_COOKIE_KEY)?.value)
  const res = await fetch(`http://backend:8080${endpoint}`, {
    ...init,
    headers: {
      ...init?.headers,
      [featauth.SESSION_HEADER_KEY]: sessionId ?? '',
    },
  });
  const json: dto.ApiResponse<T> = await res.json();
  if (json && Array.isArray(json.errors) && json.errors.length) {
    throw json;
  }

  return json as dto.ApiSuccessResponse<T>;
};
