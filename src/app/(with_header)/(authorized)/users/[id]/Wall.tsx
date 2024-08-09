'use client';

import { PostForm } from "@/components/PostForm";
import { PostWall } from "@/components/PostWall";
import { Post } from "@/typings/posts/Post";
import { User } from "@/typings/User";
import { useState } from "react";

export type WallProps = {
  me: User;
  initialPosts: Post[];
  onPostPublish: (message: string) => Promise<Post>;
};

export const Wall: React.FC<WallProps> = (props) => {
  const { me, initialPosts, onPostPublish } = props;

  const [posts, setPosts] = useState(initialPosts);

  const handleSubmit = async (message: string) => {
    const publishedPost = await onPostPublish(message);
    setPosts((posts) => [publishedPost, ...posts]);
    return true;
  }

  return (
    <>
      <PostForm
        me={me}
        onSubmit={handleSubmit}
      />
      <PostWall posts={posts} />
    </>
  )
}
