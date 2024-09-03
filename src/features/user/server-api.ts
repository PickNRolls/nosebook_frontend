import { serverRenderApi } from "@/serverRenderApi"
import { Model } from "./model"

export const findById = (id: string) => {
  return serverRenderApi<Model>(`/users/${id}`, {
    method: 'GET'
  });
}

