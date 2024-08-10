'use server';

import { actionApi } from "@/actionApi";
import { SESSION_COOKIE_KEY } from "@/const/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logout = async (): Promise<void> => {
  return actionApi('/logout', {
    method: 'POST',
  }).then(() => {
  }).catch(() => {
  }).finally(() => {
    cookies().delete(SESSION_COOKIE_KEY);
    redirect('/login');
  })
}
