'use client';

import React, { FC, useEffect } from 'react';

import * as featchat from '@/features/chat/client';
import * as featcurrentuser from '@/features/current-user';
import * as featws from '@/features/websocket/client';

import { PageBlock } from '@/components/page-block';
import { MessengerChatClient } from './messenger-chat-client';
import { useRouter } from 'next/navigation';

export type MessengerClientProps = {
  chats: featchat.Model[];
  currentUser: featcurrentuser.Model;
  children?: React.ReactNode;
};

export const MessengerClient: FC<MessengerClientProps> = (props) => {
  const { children, chats } = props;

  const router = useRouter();

  useEffect(() => {
    const unsub = featws.ws().onMessage('new_message', () => {
      router.refresh();
    });

    return unsub;
  }, []);

  return (
    <PageBlock className="flex !p-0 h-[calc(100vh-80px)]">
      <div className="basis-1/3 shrink-0 grow-0 border-r border-slate-200 h-full min-w-0 px-2 pt-2 flex flex-col gap-[4px]">
        {chats.length > 0 && chats.map(chat => {
          return (
            <MessengerChatClient key={chat.id} chat={chat} />
          );
        })}

        {chats.length == 0 && (
          <div className="text-lg text-slate-400 font-medium flex items-center justify-center w-full h-full">
            У вас пока нет чатов
          </div>
        )}
      </div>
      <div className="basis-2/3 shrink-0 grow-0">
        {children}
      </div>
    </PageBlock>
  );
};

