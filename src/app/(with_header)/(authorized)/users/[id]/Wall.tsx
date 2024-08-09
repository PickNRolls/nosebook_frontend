'use client';

import { PostForm } from "@/components/PostForm";
import { PostWall } from "@/components/PostWall";
import { Post } from "@/typings/posts/Post";
import { PostQueryResult } from "@/typings/posts/PostQueryResult";
import { User } from "@/typings/User";
import { useEffect, useMemo, useRef, useState } from "react";

export type WallProps = {
  me: User;
  initialPostsQueryResult: PostQueryResult;
  onPostPublish: (message: string) => Promise<Post>;
  onFetch: (cursor: string) => Promise<PostQueryResult>;
};

export const Wall: React.FC<WallProps> = (props) => {
  const { me, initialPostsQueryResult, onPostPublish, onFetch } = props;

  const currentQuery = useRef(initialPostsQueryResult);
  const [posts, setPosts] = useState(initialPostsQueryResult.data);
  const observableRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (message: string) => {
    const publishedPost = await onPostPublish(message);
    setPosts((posts) => [publishedPost, ...posts]);
    return true;
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(async entry => {
        if (entry.intersectionRatio === 0) {
          return;
        }

        if (!currentQuery.current.next) {
          return;
        }

        const res = await onFetch(currentQuery.current.next);
        currentQuery.current = res;
        setPosts((posts) => [...posts, ...res.data])
      });
    }, {
      threshold: 0.5
    });

    observer.observe(observableRef.current!);
    return () => {
      observer.disconnect();
    };
  }, [onFetch]);

  return (
    <>
      <PostForm
        me={me}
        onSubmit={handleSubmit}
      />
      <PostWall posts={posts} />
      <div ref={observableRef} />
    </>
  )
}
