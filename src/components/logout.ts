'use server';

import { api } from "@/api";
import { SESSION_COOKIE_KEY } from "@/const/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logout = async (): Promise<void> => {
  let ok = false;
  return api('/logout', {
    method: 'POST'
  }).then((res) => {
    cookies().delete(SESSION_COOKIE_KEY);
    ok = true;
  }).catch(err => {
    console.error(err);
  }).finally(() => {
    if (ok) {
      redirect('/login');
    }
  })
}
