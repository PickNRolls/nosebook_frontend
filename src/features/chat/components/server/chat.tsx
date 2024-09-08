import { FC } from "react";

import * as featmessage from '@/features/message/server';
import * as featchat from '@/features/chat/server';
import * as featuser from '@/features/user/server';

import { ChatClient } from "./chat-client";

export type ChatProps = {
  id?: string;
  newChatWithInterlocutorId?: string;
}

export const Chat: FC<ChatProps> = async (props) => {
  const { id, newChatWithInterlocutorId } = props;

  const [
    chatRes,
    messagesRes,
    newInterlocutorRes,
  ] = await Promise.all([
    id ? featchat.api.findById(id) : null,
    id ? featmessage.api.findByFilter({
      chatId: id,
      limit: 20,
    }) : null,
    newChatWithInterlocutorId != null ? featuser.api.findById(newChatWithInterlocutorId) : null,
  ]);

  if (!chatRes?.data && !newChatWithInterlocutorId) {
    return null;
  }

  let interlocutor = chatRes?.data ? chatRes.data.interlocutor : null;
  let messages = messagesRes?.data;

  if (newChatWithInterlocutorId && newInterlocutorRes?.data) {
    interlocutor = newInterlocutorRes.data;
    messages = {
      data: [],
      totalCount: 0,
    };
  }


  const handleMessageSubmit = async (text: string) => {
    'use server';

    return featchat.api.sendMessage({
      recipientId: interlocutor!.id,
      text,
    });
  };

  const handleFetch = async (next: string) => {
    'use server';

    if (!id) {
      return;
    }

    return featmessage.api.findByFilter({
      chatId: id,
      next,
    }).then(res => res.data);
  };

  if (!messages?.data) {
    return null;
  }

  return (
    <ChatClient
      interlocutor={interlocutor!}
      messages={messages}
      onMessageSubmit={handleMessageSubmit}
      onFetch={handleFetch}
    />
  )
};
