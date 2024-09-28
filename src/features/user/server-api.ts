import { serverRenderApi } from "@/serverRenderApi"
import { FindResult } from "@/dto";
import { actionApi } from "@/actionApi";
import { Model } from "./model"

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

export const changeAvatar = (formData: FormData) => {
  return actionApi('/users/change-avatar', {
    method: 'POST',
    body: formData,
  });
};

