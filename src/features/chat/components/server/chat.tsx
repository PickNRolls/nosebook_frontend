import { FC } from "react";

import * as featmessage from '@/features/message/server';
import * as featchat from '@/features/chat/server';
import { ChatClient } from "./chat-client";

export type ChatProps = {
  id: string;
}

export const Chat: FC<ChatProps> = async (props) => {
  const { id } = props;

  const [
    chat,
    messages,
  ] = await Promise.all([
    featchat.api.findById(id),
    featmessage.api.findByFilter({
      chatId: id,
      limit: 20,
    }),
  ]);

  if (!chat.data) {
    return null;
  }

  const handleMessageSubmit = async (text: string) => {
    'use server';

    return featchat.api.sendMessage({
      recipientId: chat.data!.interlocutor.id,
      text,
    });
  };

  const handleFetch = async (next: string) => {
    'use server';

    return featmessage.api.findByFilter({
      chatId: id,
      next,
    }).then(res => res.data);
  };

  if (!messages.data) {
    return null;
  }

  return (
    <ChatClient
      chat={chat.data}
      messages={messages.data}
      onMessageSubmit={handleMessageSubmit}
      onFetch={handleFetch}
    />
  )
};
