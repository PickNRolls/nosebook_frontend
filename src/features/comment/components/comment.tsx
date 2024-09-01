'use client';

import cn from 'classnames';

import * as featuser from '@/features/user';
import * as featrealtimedate from '@/features/realtime-date';
import * as featcurrentuser from '@/features/current-user';

import { Model } from "../model";
import { useState } from 'react';

export type CommentProps = {
  me: featcurrentuser.Model;
  comment: Model;
  onLikeClick: (comment: Model) => Promise<boolean>;
  onRemoveClick: (comment: Model) => Promise<boolean>;
}

export const Comment = (props: CommentProps) => {
  const { comment } = props;
  const author = comment.author;

  const [liked, setLiked] = useState(comment.likes.liked);

  const handleLikeClick = async () => {
    const ok = await props.onLikeClick(comment);
    if (ok) {
      setLiked(prev => !prev);
    }
  }

  return (
    <div className="flex w-full">
      <div>
        <featuser.components.Avatar user={comment.author} size="sm" />
      </div>
      <div className="flex flex-col w-full relative">
        <featuser.components.Link user={author} />
        <span className="text-[13px]">{comment.message}</span>
        <span className="text-[12.5px] text-gray-500">
          <featrealtimedate.components.RealtimeDate date={new Date(comment.createdAt)} />
        </span>

        <span
          className={cn(
            "absolute right-0 bottom-0 cursor-pointer",
            liked ? "text-red-500" : "text-slate-400",
          )}
          onClick={handleLikeClick}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"><path fill="currentColor" d="M10.96 2.5A4.036 4.036 0 0115 6.534c0 2.211-.884 3.316-4.52 6.14l-1.099.853a2.252 2.252 0 01-2.762 0l-1.099-.853C1.884 9.85 1 8.745 1 6.534A4.036 4.036 0 015.04 2.5c1.111 0 2.103.481 2.96 1.402.857-.92 1.849-1.402 2.96-1.402zM5.04 3.998A2.538 2.538 0 002.5 6.534c0 1.588.653 2.404 3.94 4.957l1.1.854c.27.21.65.21.92 0l1.1-.854c3.287-2.553 3.94-3.37 3.94-4.957 0-1.4-1.137-2.536-2.54-2.536-.848 0-1.618.482-2.343 1.528l-.206.297a.5.5 0 01-.822 0l-.206-.297C6.658 4.48 5.888 3.998 5.04 3.998z" /></svg>
        </span>
      </div>
    </div>
  )
};

