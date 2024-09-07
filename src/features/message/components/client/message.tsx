'use client';

import React, { FC } from 'react';

import * as featuser from '@/features/user/client';
import * as featmessage from '@/features/message/client';

import { Link } from '@/components/link';
import { NoSsr } from '@/components/no-ssr';

export type MessageProps = {
  message: featmessage.Model;
}

export const Message: FC<MessageProps> = (props) => {
  const { message } = props;
  const date = new Date(message.createdAt);

  return (
    <div className="flex flex-col w-full hover:bg-slate-50 rounded-xl transition-colors duration-300 text-[13px] py-2 px-2 mt-auto">
      <span className="flex gap-2 -mb-[20px]">
        <Link href={featuser.profilePageHref(message.author.id)}>
          <featuser.components.Avatar user={message.author} className="size-[36px]" outline={false} />
        </Link>
        <span className="flex items-baseline w-full">
          <featuser.components.Link user={message.author} className="text-[12.5px]" />
          <NoSsr>
            <span className="text-[11px] text-slate-400 font-normal ml-auto">{date.toLocaleTimeString('ru', {
              hour: 'numeric',
              minute: 'numeric',
            })}</span>
          </NoSsr>
        </span>
      </span>
      <span className="pl-[44px]">
        {message.text}
      </span>
    </div>
  );
};

