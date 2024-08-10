'use server';

import { actionApi } from "@/actionApi";
import { ApiResponse } from "@/typings/ApiResponse";
import { Post } from "@/typings/posts/Post";

export const like = async (postId: string): Promise<ApiResponse<Post>> => {
  return actionApi<Post>('/posts/like', {
    body: JSON.stringify({
      id: postId,
    }),
    method: 'POST'
  });
}
