import { actionApi } from "@/actionApi";
import { Auth } from "@/components/Auth";
import { linkUserPage } from "@/components/linkUserPage";
import { SESSION_COOKIE_KEY } from "@/const/auth";
import { AuthResult } from "@/typings/AuthResult";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Page() {
  return (
    <Auth
      onLogin={async (data) => {
        'use server';

        let userId: null | string = null;

        return actionApi<AuthResult>('/login', {
          method: 'POST',
          body: JSON.stringify(data),
          checkSessionCookie: false,
        }).then(res => {
          const { user, session } = res!.data!;

          const now = new Date();
          cookies().set(SESSION_COOKIE_KEY, session.sessionId, {
            path: '/',
            domain: 'localhost',
            expires: now.setHours(now.getHours() + 48),
            httpOnly: true
          })

          userId = user.id;
          return res;
        }).catch(res => res).finally(() => {
          if (userId) {
            redirect(linkUserPage(userId))
          }
        });
      }}

      onRegister={async (data) => {
        'use server';

        let userId: null | string = null;

        return actionApi<AuthResult>('/register', {
          method: 'POST',
          body: JSON.stringify(data),
          checkSessionCookie: false,
        }).then(res => {
          const { user, session } = res!.data!;

          const now = new Date();
          cookies().set(SESSION_COOKIE_KEY, session.sessionId, {
            path: '/',
            domain: 'localhost',
            expires: now.setHours(now.getHours() + 48),
            httpOnly: true
          })

          userId = user.id;
          return res;
        }).catch(res => res).finally(() => {
          if (userId) {
            redirect(linkUserPage(userId))
          }
        })
      }}
    />
  );
}
