'use client';

import { useRef, useState } from "react";
import cn from 'classnames';

import * as featcurrentuser from '@/features/current-user';
import * as featuser from '@/features/user/client';
import * as featcomment from '@/features/comment';
import * as featrealtimedate from '@/features/realtime-date';
import * as dto from '@/dto';

import { ProfileBlock } from "@/components/profile-block";
import { Link } from "@/components/link";
import { PostCommentInput } from "@/components/post-comment-input";

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
  onCommentSubmit: (post: Model, comment: string) => Promise<boolean>;
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

  const [removedCommentsMap, setRemovedCommentsMap] = useState<Record<string, boolean | undefined>>({});
  const [commentsCount, setCommentsCount] = useState(post.recentComments.totalCount);

  const handleCommentClick = () => {
    setCommentSectionVisible(true);
    focusCommentAfterRenderRef.current = true;
    commentTextareaRef.current?.focus();
  };

  const handleCommentSubmit = async () => {
    const ok = await props.onCommentSubmit(post, comment);
    if (!ok) {
      return;
    }

    setComment('');
    setCommentsCount(prev => prev + 1);
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

  const handleCommentRemove = async (comment: featcomment.Model) => {
    const ok = await props.onCommentRemove(comment);
    if (!ok) {
      return;
    }

    setCommentsCount(prev => prev - 1);
    setRemovedCommentsMap(prev => {
      return {
        ...prev,
        [comment.id]: true,
      };
    })
  };

  const comments = post.recentComments.data
    .concat(fetchedComments)
    .concat(props.publishedComments || [])
    .filter(c => !removedCommentsMap[c.id]);

  const showCommentForm = commentSectionVisible || comments.length > 0

  return <ProfileBlock className="flex flex-col">
    <div className="flex px-3 pt-3 items-center">
      <featuser.components.Avatar
        className="mr-3 size-[40px]"
        onlineMarkerClassName="!size-[12px] !border-[2px]"
        user={post.author}
        outline={false}
        canShowOnlineMarker
        showOnlyOnlineMarker
      />
      <div className="flex flex-col">
        <Link href={featuser.profilePageHref(post.author.id)} className="text-[13px] text-sky-600 font-medium leading-[16px]">
          {post.author.firstName} {post.author.lastName}
        </Link>
        <div className="text-[13px] text-gray-500 leading-[17px]">
          <featrealtimedate.components.RealtimeDate date={new Date(post.createdAt)} />
        </div>
      </div>

      {post.permissions.remove && (
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
      <CommentButton count={commentsCount} onClick={handleCommentClick} />
      {false && <RepostButton />}
    </div>

    {comments.length > 0 && (
      <div className="-mx-2 -mb-2 rouned-b-lg border-t border-slate-200 mt-2 pt-[10px]">
        {comments.map((comment, i) => {
          return (
            <featcomment.components.Comment
              key={comment.id}
              comment={comment}
              me={props.me}
              borderBottom={i < comments.length - 1}
              onLikeClick={props.onCommentLike}
              onRemoveClick={handleCommentRemove}
            />
          )
        })}

        {Boolean(nextCursor) && (
          <Link onClick={handleShowMoreClick} className="px-5 my-[12px]">
            Показать следующие комментарии
          </Link>
        )}
      </div>
    )}

    {showCommentForm && (
      <PostCommentInput
        me={props.me}
        comment={comment}
        onCommentChange={setComment}
        onSubmit={handleCommentSubmit}
        className={comments.length == 0 && cn("border-t border-slate-200") || ''}
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
  </ProfileBlock>;
};

