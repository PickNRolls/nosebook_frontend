import * as featuser from '@/features/user/model';
import * as featmessage from '@/features/message/model';

export type Model = {
  id: string;
  interlocutor: featuser.Model;
  lastMessage: featmessage.Model;
  createdAt: string;
};

export function listPageHref() {
  return `/chats`;
}

export function chatPageHref(opts: {
  chatId?: string;
  interlocutorId?: string;
}) {
  if (opts.chatId) {
    return `/chats/${opts.chatId}`;
  }

  return `/chats?interlocutorId=${opts.interlocutorId}`
}

