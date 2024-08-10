import { redirect } from "next/navigation";
import { api } from "./api";
import { ApiResponse } from "./typings/ApiResponse";

export const serverRenderApi = <T>(endpoint: string, init?: RequestInit): Promise<ApiResponse<T>> => {
  return api<T>(endpoint, init).catch((res: ApiResponse<T>) => {
    const errors = res!.errors!;
    if (errors.length && errors.find(err => err.type === 'NotAuthorized')) {
      redirect('/logout');
    }

    return res;
  });
};
