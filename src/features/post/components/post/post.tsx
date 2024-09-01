'use client';

import { useRef, useState } from "react";

import * as featcurrentuser from '@/features/current-user';
import * as featuser from '@/features/user';
import * as featcomment from '@/features/comment';
import * as featrealtimedate from '@/features/realtime-date';
import * as dto from '@/dto';

import { ProfileBlock } from "@/components/profile-block";
import { Link } from "@/components/link";
import { PostCommentInput } from "@/components/post-comment-input";
import { Button } from "@/components/button";

import { LikeButton } from "./like-button";
import { CommentButton } from "./comment-button";
import { RepostButton } from "./repost-button";
import { Model } from "../../model";

export type PostProps = {
  me: featcurrentuser.Model;
  post: Model;
  publishedComments?: featcomment.Model[];
  onLikeClick: (post: Model) => Promise<boolean>;
  onRemoveClick: (post: Model) => void;

  onCommentLike: (comment: featcomment.Model) => Promise<boolean>;
  onCommentRemove: (comment: featcomment.Model) => Promise<boolean>;
  onCommentSubmit: (post: Model, comment: string) => void;
  onCommentFetch?: (next: string) => Promise<dto.FindResult<featcomment.Model>>;
}

export const Post = (props: PostProps) => {
  const [newerPost, setNewerPost] = useState<Model>();
  const [commentSectionVisible, setCommentSectionVisible] = useState(false);
  const [comment, setComment] = useState('');
  const focusCommentAfterRenderRef = useRef(false);
  const commentTextareaRef = useRef<HTMLTextAreaElement>();

  const post = newerPost ? newerPost : props.post;

  const [fetchedComments, setFetchedComments] = useState<featcomment.Model[]>([]);
  const [nextCursor, setNextCursor] = useState(post.recentComments.next);

  const handleCommentClick = () => {
    setCommentSectionVisible(true);
    focusCommentAfterRenderRef.current = true;
    commentTextareaRef.current?.focus();
  };

  const handleCommentSubmit = () => {
    props.onCommentSubmit(post, comment);
    setComment('');
    focusCommentAfterRenderRef.current = true;
    commentTextareaRef.current?.focus();
  };

  const handleShowMoreClick = async () => {
    const onCommentFetch = props.onCommentFetch;
    if (nextCursor && onCommentFetch) {
      const findResult = await onCommentFetch(nextCursor);
      setFetchedComments(prev => [...prev, ...findResult.data]);
      setNextCursor(findResult.next);
    }
  };

  const comments = post.recentComments.data
    .concat(fetchedComments)
    .concat(props.publishedComments || []);

  return <ProfileBlock className="flex flex-col">
    <div className="flex px-3 pt-3">
      <featuser.components.Avatar className="-mt-[6px] -ml-[6px] mr-1" user={post.author} size="sm" outline={false} />
      <div className="flex flex-col">
        <Link href={featuser.profilePageHref(post.author)} className="text-[13px] text-blue-600 font-medium leading-[16px] mt-[2px]">
          {post.author.firstName} {post.author.lastName}
        </Link>
        <div className="text-[13px] text-gray-500 leading-[17px]">
          <featrealtimedate.components.RealtimeDate date={new Date(post.createdAt)} />
        </div>
      </div>

      {/*post.canBeRemovedByUser */false && (
        <span
          className="h-full flex items-center justify-center text-slate-400 hover:text-slate-500 w-[32px] ml-auto cursor-pointer"
          onClick={() => props.onRemoveClick(post)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentColor" d="M12.74 3.26a.9.9 0 0 1 0 1.28L9.27 8l3.47 3.46a.9.9 0 0 1 .08 1.18l-.08.1a.9.9 0 0 1-1.28 0L8 9.27l-3.46 3.47a.9.9 0 0 1-1.28-1.28L6.73 8 3.26 4.54a.9.9 0 0 1-.08-1.18l.08-.1a.9.9 0 0 1 1.28 0L8 6.73l3.46-3.47a.9.9 0 0 1 1.28 0Z"></path></svg>
        </span>
      )}
    </div>

    <div className="min-h-10 px-3 pt-1 pb-2 text-[13px]">
      {post.message}
    </div>

    <div className="pb-1 px-2 flex gap-2">
      <LikeButton
        likedByUser={post.likes.liked}
        likesCount={post.likes.count}
        onClick={async () => {
          const ok = await props.onLikeClick(post);
          if (ok) {
            const newLikes = { ...post.likes };
            if (newLikes.liked) {
              newLikes.count--
            } else {
              newLikes.count++
            }
            newLikes.liked = !newLikes.liked

            setNewerPost({
              ...post,
              likes: newLikes,
            })
          }
        }}
      />
      <CommentButton onClick={handleCommentClick} />
      <RepostButton />
    </div>

    {commentSectionVisible && (
      <PostCommentInput
        me={props.me}
        comment={comment}
        onCommentChange={setComment}
        onSubmit={handleCommentSubmit}
        submitDisabled={!comment}
        textareaRef={textarea => {
          commentTextareaRef.current = textarea;
          if (focusCommentAfterRenderRef.current && textarea) {
            textarea.focus();
            focusCommentAfterRenderRef.current = false;
          }
        }}
      />
    )}

    {comments.map(comment => {
      return (
        <featcomment.components.Comment
          key={comment.id}
          comment={comment}
          me={props.me}
          onLikeClick={props.onCommentLike}
          onRemoveClick={props.onCommentRemove}
        />
      )
    })}

    {Boolean(nextCursor) && (
      <Button view="ghost" onClick={handleShowMoreClick}>
        Показать следующие комментарии
      </Button>
    )}
  </ProfileBlock>;
};

