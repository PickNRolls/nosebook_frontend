'use client';

import React, { FC } from 'react';

import * as featchat from '@/features/chat/client';
import * as featcurrentuser from '@/features/current-user';

import { PageBlock } from '@/components/page-block';
import { MessengerChatClient } from './messenger-chat-client';

export type MessengerClientProps = {
  chats: featchat.Model[];
  currentUser: featcurrentuser.Model;
  children?: React.ReactNode;
};

export const MessengerClient: FC<MessengerClientProps> = (props) => {
  const { children, chats } = props;

  return (
    <PageBlock className="flex !p-0 h-full">
      <div className="basis-1/3 shrink-0 grow-0 border-r border-slate-200 h-full min-w-0 px-2 pt-2 flex flex-col gap-[4px]">
        {chats.map(chat => {
          return (
            <MessengerChatClient key={chat.id} chat={chat} />
          );
        })}
      </div>

      <div className="basis-2/3 shrink-0 grow-0">
        {children}
      </div>
    </PageBlock>
  );
};

