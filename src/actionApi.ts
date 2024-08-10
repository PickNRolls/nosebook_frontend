import { redirect } from "next/navigation";
import { api } from "./api";
import { ApiResponse } from "./typings/ApiResponse";
import { cookies } from "next/headers";
import { SESSION_COOKIE_KEY } from "./const/auth";

export const actionApi = <T>(endpoint: string, init?: RequestInit & {
  checkSessionCookie?: boolean;
}): Promise<ApiResponse<T>> => {
  const checkSessionCookie = init?.checkSessionCookie ?? true;
  if (checkSessionCookie) {
    const session = cookies().get(SESSION_COOKIE_KEY);
    if (!session) {
      redirect('/login');
    }
  }

  return api<T>(endpoint, init).catch((res: ApiResponse<T>) => {
    const errors = res!.errors!;
    if (errors.length && errors.find(err => err.type === 'NotAuthorized')) {
      cookies().delete(SESSION_COOKIE_KEY);
      redirect('/login');
    }

    return res;
  });
};
