import { api } from "@/api";
import { cache } from "react";
import { User } from "./typings/User";

export const getWhoami = cache((): Promise<{ error: string; } | User> => {
  return api('/whoami', {
    method: 'GET'
  }).then(res => res.json())
})
