'use client';

import cn from 'classnames';

import * as featuser from '@/features/user/client';
import * as featrealtimedate from '@/features/realtime-date';
import * as featcurrentuser from '@/features/current-user';

import { Model } from "../model";
import { useState } from 'react';

export type CommentProps = {
  me: featcurrentuser.Model;
  comment: Model;
  className?: string;
  borderBottom?: boolean;
  onLikeClick: (comment: Model) => Promise<boolean>;
  onRemoveClick: (comment: Model) => Promise<void>;
}

export const Comment = (props: CommentProps) => {
  const { comment } = props;
  const author = comment.author;

  const [liked, setLiked] = useState(comment.likes.liked);
  const [count, setCount] = useState(comment.likes.count);

  const handleLikeClick = async () => {
    const ok = await props.onLikeClick(comment);
    if (ok) {
      setLiked(prev => !prev);
      setCount(prev => prev + (liked ? -1 : 1))
    }
  }

  return (
    <div className={cn("flex w-full px-5 group cursor-pointer", props.className)}>
      <div className="pt-[7px] mr-[8px]">
        <featuser.components.Avatar user={comment.author} size="sm" className="size-[36px]" />
      </div>
      <div className={cn("flex flex-col w-full relative py-[7px]", props.borderBottom && "border-b border-slate-200")}>
        <div className="flex w-full items-center">
          <featuser.components.Link user={author} />
          {comment.permissions.remove && (
            <span className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-slate-500 ml-auto" onClick={() => props.onRemoveClick(comment)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentColor" d="M12.74 3.26a.9.9 0 0 1 0 1.28L9.27 8l3.47 3.46a.9.9 0 0 1 .08 1.18l-.08.1a.9.9 0 0 1-1.28 0L8 9.27l-3.46 3.47a.9.9 0 0 1-1.28-1.28L6.73 8 3.26 4.54a.9.9 0 0 1-.08-1.18l.08-.1a.9.9 0 0 1 1.28 0L8 6.73l3.46-3.47a.9.9 0 0 1 1.28 0Z"></path></svg>
            </span>
          )}
        </div>
        <span className="text-[13px] leading-[18px]">{comment.message}</span>
        <span className="flex items-center text-[12.5px] text-gray-500 pt-[4px] leading-[14px]">
          <featrealtimedate.components.RealtimeDate date={new Date(comment.createdAt)} />
          <span
            className={cn(
              "flex items-center gap-1 opacity-0 group-hover:opacity-100 ml-auto p-2 -m-2",
              liked ? "text-red-500" : "text-slate-400",
              (count > 0 || liked) && "opacity-100",
            )}
            onClick={handleLikeClick}
          >
            {liked ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g id="like_16__Page-2" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="like_16__like_16"><path id="like_16__Bounds" d="M0 0h16v16H0z" /><path d="M11.08 2.5A3.92 3.92 0 0115 6.42c0 2.19-.88 3.28-4.6 6.18L8.73 13.9c-.43.33-1.01.33-1.44 0L5.6 12.6C1.88 9.7 1 8.6 1 6.42A3.92 3.92 0 014.92 2.5c1.16 0 2.2.55 3.08 1.6.89-1.05 1.92-1.6 3.08-1.6z" id="like_16__Mask" fill="currentColor" fillRule="nonzero" /></g></g></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"><path fill="currentColor" d="M10.96 2.5A4.036 4.036 0 0115 6.534c0 2.211-.884 3.316-4.52 6.14l-1.099.853a2.252 2.252 0 01-2.762 0l-1.099-.853C1.884 9.85 1 8.745 1 6.534A4.036 4.036 0 015.04 2.5c1.111 0 2.103.481 2.96 1.402.857-.92 1.849-1.402 2.96-1.402zM5.04 3.998A2.538 2.538 0 002.5 6.534c0 1.588.653 2.404 3.94 4.957l1.1.854c.27.21.65.21.92 0l1.1-.854c3.287-2.553 3.94-3.37 3.94-4.957 0-1.4-1.137-2.536-2.54-2.536-.848 0-1.618.482-2.343 1.528l-.206.297a.5.5 0 01-.822 0l-.206-.297C6.658 4.48 5.888 3.998 5.04 3.998z" /></svg>
            )}
            {count > 0 && count}
          </span>
        </span>
      </div>
    </div>
  )
};

