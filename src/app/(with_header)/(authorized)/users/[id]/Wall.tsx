'use client';

import { PostForm } from "@/components/PostForm";
import { PostWall } from "@/components/PostWall";
import { Comment } from "@/typings/Comment";
import { Post } from "@/typings/posts/Post";
import { PostQueryResult } from "@/typings/posts/PostQueryResult";
import { User } from "@/typings/User";
import { useEffect, useRef, useState } from "react";

export type WallProps = {
  me: User;
  initialPostsQueryResult: PostQueryResult | undefined;
  onPostPublish: (message: string) => Promise<Post | undefined>;
  onPostRemove: (post: Post) => Promise<void>;
  onCommentSubmit: (comment: string) => Promise<Comment | undefined>;
  onFetch: (cursor: string) => Promise<PostQueryResult | undefined>;
};

export const Wall: React.FC<WallProps> = (props) => {
  const { me, initialPostsQueryResult, onPostPublish, onPostRemove, onCommentSubmit, onFetch } = props;

  const currentQuery = useRef(initialPostsQueryResult);
  const [posts, setPosts] = useState(initialPostsQueryResult?.data || []);
  const observableRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (message: string) => {
    const publishedPost = await onPostPublish(message);

    if (publishedPost) {
      setPosts(posts => [publishedPost, ...posts]);
    }

    return Boolean(publishedPost);
  };

  const handleCommentSubmit = async (post: Post, comment: string) => {
    const publishedComment = await onCommentSubmit(comment);

    // if (publishedComment) {
    //   setPosts(posts => {
    //     return posts.map(p => {
    //       if (p.id === post.id) {
    //         return {
    //           ...p,
    //           comments: [...p.comments, publishedComment]
    //         };
    //       }
    //
    //       return p;
    //     });
    //   });
    // }

    return Boolean(publishedComment);
  };

  const handlePostRemove = async (post: Post) => {
    await onPostRemove(post);
    setPosts((posts) => posts.filter(p => p.id !== post.id))
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
      <PostWall
        me={me}
        posts={posts}
        onPostRemove={handlePostRemove}
        onCommentSubmit={handleCommentSubmit}
      />
      <div className="relative -top-[500px]" ref={observableRef} />
    </>
  )
}
