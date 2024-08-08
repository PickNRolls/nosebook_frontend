import { cookies } from "next/headers";

export const api = (endpoint: string, init?: RequestInit) => {
  return fetch(`http://backend:8080${endpoint}`, {
    ...init,
    headers: {
      ...init?.headers,
      'X-Auth-Session-Id': cookies().get('nosebook_session')?.value ?? '',
    },
  })
};
