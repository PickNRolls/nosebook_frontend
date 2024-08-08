'use server';

import { api } from "@/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logout = async (): Promise<void> => {
  let ok = false;
  return api('/logout', {
    method: 'POST'
  }).then(r =>
    r.json()
  ).then((res) => {
    cookies().delete('nosebook_session');
    ok = true;
  }).catch(err => {
    console.error(err);
  }).finally(() => {
    if (ok) {
      redirect('/login');
    }
  })
}
