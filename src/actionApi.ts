import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import * as featauth from '@/features/auth';

import * as dto from '@/dto';

import { api } from "./api";

export const actionApi = <T>(endpoint: string, init?: RequestInit & {
  checkSessionCookie?: boolean;
}): Promise<dto.ApiSuccessResponse<T>> => {
  const checkSessionCookie = init?.checkSessionCookie ?? true;
  if (checkSessionCookie) {
    const session = cookies().get(featauth.SESSION_COOKIE_KEY);
    if (!session) {
      redirect('/login');
    }
  }

  return api<T>(endpoint, init).catch((res: dto.ApiFailResponse) => {
    const errors = res!.errors!;
    if (errors.length === 1 && errors[0].type === 'Not Authenticated') {
      cookies().delete(featauth.SESSION_COOKIE_KEY);
      redirect('/login');
    }

    throw res;
  });
};
