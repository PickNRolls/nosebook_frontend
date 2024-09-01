import { redirect } from "next/navigation";

import * as dto from '@/dto';

import { api } from "./api";

export const serverRenderApi = <T>(endpoint: string, init?: RequestInit): Promise<dto.ApiResponse<T>> => {
  return api<T>(endpoint, init).catch((res: dto.ApiResponse<T>) => {
    const errors = res!.errors!;
    if (errors.length && errors.find(err => err.type === 'Not Authenticated')) {
      redirect('/logout');
    }

    return res;
  });
};
