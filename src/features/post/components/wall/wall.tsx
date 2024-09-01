import cn from 'classnames';

import * as featcurrentuser from '@/features/current-user';
import * as featcomment from '@/features/comment';
import * as dto from '@/dto';

import { likePost } from "@/components/like";

import { Model } from '../../model';
import { Post } from '../post';

export type WallProps = {
  className?: string;
  me: featcurrentuser.Model;
  posts: Model[];
  publishedComments: Record<string, featcomment.Model[] | undefined>;
  onPostRemove: (post: Model) => void;

  onCommentSubmit: (post: Model, comment: string) => void;
  onCommentFetch: (postId: string, next: string) => Promise<dto.FindResult<featcomment.Model>>;
  onCommentLike: (comment: featcomment.Model) => Promise<boolean>;
  onCommentRemove: (comment: featcomment.Model) => Promise<boolean>;
}

export const Wall = (props: WallProps) => {
  return (
    <div className={cn("flex flex-col gap-4", props.className)}>
      {props.posts.map((post) => (
        <Post
          key={post.id}
          me={props.me}
          post={post}
          publishedComments={props.publishedComments[post.id]}
          onLikeClick={async (post) => {
            const res = await likePost(post.id);
            return res.ok
          }}
          onRemoveClick={props.onPostRemove}

          onCommentSubmit={props.onCommentSubmit}
          onCommentFetch={(next) => props.onCommentFetch(post.id, next)}
          onCommentLike={props.onCommentLike}
          onCommentRemove={props.onCommentRemove}
        />
      ))}
    </div>
  );
};

