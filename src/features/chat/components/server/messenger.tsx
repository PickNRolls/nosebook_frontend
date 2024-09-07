import React, { FC } from 'react';

import * as featchat from '@/features/chat/server';
import * as featcurrentuser from '@/features/current-user';

import { MessengerClient } from './messenger-client';

export type MessengerProps = {
  children?: React.ReactNode;
};

export const Messenger: FC<MessengerProps> = async (props) => {
  const { children } = props;

  const [
    currentUser,
    chats,
  ] = await Promise.all([
    featcurrentuser.api.get(),
    featchat.api.findByFilter(),
  ]);

  if (!chats.data?.data || !currentUser?.data) {
    return;
  }

  return (
    <MessengerClient chats={chats.data.data} currentUser={currentUser.data}>
      {children}
    </MessengerClient>
  );
};

