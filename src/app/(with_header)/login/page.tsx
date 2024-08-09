import { api } from "@/api";
import { Auth } from "@/components/Auth";
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

        return api<AuthResult>('/login', {
          method: 'POST',
          body: JSON.stringify(data)
        }).then(res => {
          const { user, session } = res.data!;

          const now = new Date();
          cookies().set(SESSION_COOKIE_KEY, session.sessionId, {
            path: '/',
            domain: 'localhost',
            expires: now.setHours(now.getHours() + 48),
            httpOnly: true
          })

          userId = user.id;
          redirect(`/users/${user.id}`);
        }).finally(() => {
          if (userId) {
            redirect(`/users/${userId}`)
          }
        });
      }}

      onRegister={async (data) => {
        'use server';

        let userId: null | string = null;

        return api<AuthResult>('/register', {
          method: 'POST',
          body: JSON.stringify(data)
        }).then(res => {
          const { user, session } = res.data!;

          const now = new Date();
          cookies().set(SESSION_COOKIE_KEY, session.sessionId, {
            path: '/',
            domain: 'localhost',
            expires: now.setHours(now.getHours() + 48),
            httpOnly: true
          })

          userId = user.id;
        }).finally(() => {
          if (userId) {
            redirect(`/users/${userId}`)
          }
        })
      }}
    />
  );
}
