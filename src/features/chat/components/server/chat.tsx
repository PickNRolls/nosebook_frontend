import { FC } from "react";

import * as featmessage from '@/features/message/server';
import * as featchat from '@/features/chat/server';

import { Link } from "@/components/link";
import { ChatFooter } from "./chat-footer";

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
    })
  };

  const data = messages.data?.data.slice();
  data?.reverse();

  return (
    <div className="h-full flex flex-col">
      <header className="flex h-[56px] border-b border-slate-200 items-center px-2">
        <Link
          view="button-link"
          className="text-slate-400 !size-[32px] !p-0 mr-auto hover:bg-slate-100 hover:!text-slate-400 flex justify-center items-center"
          href={featchat.listPageHref()}
        >
          <svg aria-hidden="true" display="block" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M7.536 6.264a.9.9 0 0 0-1.272 1.272L10.727 12l-4.463 4.464a.9.9 0 0 0 1.272 1.272L12 13.273l4.464 4.463a.9.9 0 1 0 1.272-1.272L13.273 12l4.463-4.464a.9.9 0 1 0-1.272-1.272L12 10.727z"></path>
          </svg>
        </Link>
      </header>
      <div className="flex flex-col gap-[2px] px-5 pt-3 pb-10 mt-auto">
        {data?.map(message => {
          return (
            <featmessage.components.Message key={message.id} message={message} />
          )
        })}
      </div>
      <ChatFooter onChange={handleMessageSubmit} />
    </div>
  )
};
