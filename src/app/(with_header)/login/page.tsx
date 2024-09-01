import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import * as featauth from '@/features/auth';
import * as featuser from '@/features/user';

import { actionApi } from "@/actionApi";
import { Auth } from "@/components/auth";
import { SESSION_COOKIE_KEY } from "@/const/auth";

export default function Page() {
  return (
    <Auth
      onLogin={async (data) => {
        'use server';

        let user: null | featuser.Model = null;

        return actionApi<featauth.Model>('/login', {
          method: 'POST',
          body: JSON.stringify(data),
          checkSessionCookie: false,
        }).then(res => {
          const { user: u, session } = res!.data!;
          user = u;

          const now = new Date();
          cookies().set(SESSION_COOKIE_KEY, session.sessionId, {
            path: '/',
            domain: 'localhost',
            expires: now.setHours(now.getHours() + 48),
            httpOnly: true
          })
        }).catch(res => res).finally(() => {
          if (user) {
            redirect(featuser.profilePageHref(user))
          }
        });
      }}

      onRegister={async (data) => {
        'use server';

        let user: null | featuser.Model = null;

        return actionApi<featauth.Model>('/register', {
          method: 'POST',
          body: JSON.stringify(data),
          checkSessionCookie: false,
        }).then(res => {
          const { user: u, session } = res!.data!;

          const now = new Date();
          cookies().set(SESSION_COOKIE_KEY, session.sessionId, {
            path: '/',
            domain: 'localhost',
            expires: now.setHours(now.getHours() + 48),
            httpOnly: true
          })

          user = u;
          return res;
        }).catch(res => res).finally(() => {
          if (user) {
            redirect(featuser.profilePageHref(user))
          }
        })
      }}
    />
  );
}
