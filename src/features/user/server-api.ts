import { serverRenderApi } from "@/serverRenderApi"
import { Model } from "./model"
import { FindResult } from "@/dto";

export const findById = (id: string) => {
  return serverRenderApi<Model>(`/users/${id}`, {
    method: 'GET'
  });
}

export const findByText = (text: string) => {
  return serverRenderApi<FindResult<Model>>(`/users?text=${encodeURIComponent(text)}`, {
    method: 'GET',
  })
};

