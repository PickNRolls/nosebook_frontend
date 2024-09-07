'use client';

import { useState } from "react";

import * as featcurrentuser from '@/features/current-user';
import * as featpost from '@/features/post';
import * as featcomment from '@/features/comment';
import * as dto from '@/dto';

import { useCursorFetch } from "@/components/use-cursor-fetch";
import { Spinner } from "@/components/spinner";


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

  const { data: fetchedPosts, observer, loading } = useCursorFetch({
    initial: initialPostsQueryResult,
    onFetch,
  });
  const [publishedPosts, setPublishedPosts] = useState<featpost.Model[]>([]);
  const [removedPostMap, setRemovedPostMap] = useState<Record<string, boolean | undefined>>({});
  const [publishedPostComments, setPublishedPostComments] = useState<Record<string, featcomment.Model[]>>({})

  const handleSubmit = async (message: string) => {
    const publishedPost = await onPostPublish(message);

    if (publishedPost) {
      setPublishedPosts(posts => [publishedPost, ...posts]);
    }

    return Boolean(publishedPost);
  };

  const handleCommentSubmit = async (post: featpost.Model, comment: string) => {
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
    setRemovedPostMap(prev => ({ ...prev, [post.id]: true }))
  };

  const posts = publishedPosts.concat(fetchedPosts).filter(post => !removedPostMap[post.id]);

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
      {observer}
      {loading && <Spinner />}
    </>
  )
}
