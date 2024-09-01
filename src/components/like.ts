'use server';

import { actionApi } from "@/actionApi";

import * as dto from '@/dto';

export const likePost = async (id: string): Promise<dto.ApiResponse> => {
  return actionApi<null>('/like/post', {
    body: JSON.stringify({
      id,
    }),
    method: 'POST'
  });
}

export const likeComment = async (id: string): Promise<dto.ApiResponse> => {
  return actionApi<null>('/like/comment', {
    body: JSON.stringify({
      id,
    }),
    method: 'POST'
  });
}
