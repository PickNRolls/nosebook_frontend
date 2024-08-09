'use server';

import { api } from "@/api";
import { ApiResponse } from "@/typings/ApiResponse";
import { Post } from "@/typings/posts/Post";

export const like = async (postId: string): Promise<ApiResponse<Post>> => {
  return api<Post>('/posts/like', {
    body: JSON.stringify({
      id: postId,
    }),
    method: 'POST'
  }).then((res) => {
    return res;
  });
}
