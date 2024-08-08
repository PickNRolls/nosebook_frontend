import { api } from "@/api";
import { cache } from "react";

export const getWhoami = cache(() => {
  return api('/whoami', {
    method: 'GET'
  }).then(res => res.json())
})
