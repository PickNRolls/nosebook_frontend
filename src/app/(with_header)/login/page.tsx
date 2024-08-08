import { api } from "@/api";
import { Auth } from "@/components/Auth";
import { RegisterResponse } from "@/typings/Register";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Page() {
  return (
    <Auth onRegister={async (data) => {
      'use server';

      return api('/register', {
        method: 'POST',
        body: JSON.stringify(data)
      }).then(res => {
        return res.json();
      }).then((res: RegisterResponse) => {
        const { user, session } = res;

        const now = new Date();
        cookies().set('nosebook_session', session.sessionId, {
          path: '/',
          domain: 'localhost',
          expires: now.setHours(now.getHours() + 48),
          httpOnly: true
        })

        redirect(`/users/${user.id}`);
      })
    }} />
  );
}
