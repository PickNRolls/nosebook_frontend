import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import * as dto from '@/dto';

import { SESSION_COOKIE_KEY } from "./const/auth";
import { api } from "./api";

export const actionApi = <T>(endpoint: string, init?: RequestInit & {
  checkSessionCookie?: boolean;
}): Promise<dto.ApiSuccessResponse<T>> => {
  const checkSessionCookie = init?.checkSessionCookie ?? true;
  if (checkSessionCookie) {
    const session = cookies().get(SESSION_COOKIE_KEY);
    if (!session) {
      redirect('/login');
    }
  }

  return api<T>(endpoint, init).catch((res: dto.ApiFailResponse) => {
    const errors = res!.errors!;
    if (errors.length === 1 && errors[0].type === 'Not Authenticated') {
      cookies().delete(SESSION_COOKIE_KEY);
      redirect('/login');
    }

    throw res;
  });
};
