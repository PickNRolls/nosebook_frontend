'use server';

import { api } from "@/api";
import { Post } from "@/typings/posts/Post";

export const like = async (postId: string): Promise<Post> => {
  return api('/posts/like', {
    body: JSON.stringify({
      id: postId,
    }),
    method: 'POST'
  }).then(r =>
    r.json()
  ).then((res) => {
    return res;
  }).catch(err => {
    console.error(err);
  })
}
