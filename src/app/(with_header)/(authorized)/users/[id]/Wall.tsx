'use client';

import { PostForm } from "@/components/PostForm";
import { PostWall } from "@/components/PostWall";
import { Post } from "@/typings/posts/Post";
import { PostQueryResult } from "@/typings/posts/PostQueryResult";
import { User } from "@/typings/User";
import { useEffect, useMemo, useRef, useState } from "react";

export type WallProps = {
  me: User;
  initialPostsQueryResult: PostQueryResult | undefined;
  onPostPublish: (message: string) => Promise<Post | undefined>;
  onFetch: (cursor: string) => Promise<PostQueryResult | undefined>;
};

export const Wall: React.FC<WallProps> = (props) => {
  const { me, initialPostsQueryResult, onPostPublish, onFetch } = props;

  const currentQuery = useRef(initialPostsQueryResult);
  const [posts, setPosts] = useState(initialPostsQueryResult?.data || []);
  const observableRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (message: string) => {
    const publishedPost = await onPostPublish(message);
    if (publishedPost) {
      setPosts((posts) => [publishedPost, ...posts]);
      return true;
    }
    return false;
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(async entry => {
        if (entry.intersectionRatio === 0) {
          return;
        }

        if (!currentQuery.current?.next) {
          return;
        }

        const res = await onFetch(currentQuery.current.next);
        if (res) {
          currentQuery.current = res;
          setPosts((posts) => [...posts, ...res.data])
        }
      });
    }, {
      threshold: 0.1
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
      <div className="relative -top-[500px]" ref={observableRef} />
    </>
  )
}
