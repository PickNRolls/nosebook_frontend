import { api } from "@/api";
import { Auth } from "@/components/Auth";
import { responseCookieFromString } from "@/responseCookieFromString";
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
        const setCookies = res.headers.getSetCookie();
        const cookieStore = cookies();

        setCookies.forEach(cookie => {
          cookieStore.set(responseCookieFromString(cookie))
        });

        return res.json();
      }).then(res => {
        redirect(`/users/${res.id}`);
      })
    }} />
  );
}
