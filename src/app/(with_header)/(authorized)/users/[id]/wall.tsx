'use client';

import { useEffect, useRef, useState } from "react";

import * as featcurrentuser from '@/features/current-user';
import * as featpost from '@/features/post';
import * as featcomment from '@/features/comment';
import * as dto from '@/dto';


export type WallProps = {
  me: featcurrentuser.Model;
  initialPostsQueryResult: dto.FindResult<featpost.Model> | undefined;
  onPostPublish: (message: string) => Promise<featpost.Model>;
  onPostRemove: (post: featpost.Model) => Promise<void>;
  onFetch: (cursor: string) => Promise<dto.FindResult<featpost.Model>>;

  onCommentSubmit: (postId: string, comment: string) => Promise<featcomment.Model | undefined>;
  onCommentFetch: (postId: string, next: string) => Promise<dto.FindResult<featcomment.Model>>;
  onCommentLike: (comment: featcomment.Model) => Promise<boolean>;
  onCommentRemove: (comment: featcomment.Model) => Promise<boolean>;
};

export const Wall: React.FC<WallProps> = (props) => {
  const { me, initialPostsQueryResult, onPostPublish, onPostRemove, onCommentSubmit, onFetch } = props;

  const currentQuery = useRef(initialPostsQueryResult);
  const [posts, setPosts] = useState(initialPostsQueryResult?.data || []);
  const [publishedPostComments, setPublishedPostComments] = useState<Record<string, featcomment.Model[]>>({})
  const observableRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (message: string) => {
    const publishedPost = await onPostPublish(message);

    if (publishedPost) {
      setPosts(posts => [publishedPost, ...posts]);
    }

    return Boolean(publishedPost);
  };

  const handleCommentSubmit = async (post: featpost.Model, comment: string): Promise<boolean> => {
    const publishedComment = await onCommentSubmit(post.id, comment);

    if (publishedComment) {
      setPublishedPostComments(prev => {
        const next = { ...prev };

        if (!Array.isArray(next[post.id])) {
          next[post.id] = [];
        }
        next[post.id] = [...next[post.id], publishedComment]

        return next;
      });

      return true;
    }

    return false;
  };

  const handlePostRemove = async (post: featpost.Model) => {
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
      <featpost.components.Form
        me={me}
        onSubmit={handleSubmit}
      />
      <featpost.components.Wall
        me={me}
        posts={posts}
        publishedComments={publishedPostComments}
        onPostRemove={handlePostRemove}

        onCommentSubmit={handleCommentSubmit}
        onCommentFetch={props.onCommentFetch}
        onCommentLike={props.onCommentLike}
        onCommentRemove={props.onCommentRemove}
      />
      <div className="relative -top-[500px]" ref={observableRef} />
    </>
  )
}
