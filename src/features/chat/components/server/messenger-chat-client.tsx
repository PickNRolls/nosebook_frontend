'use client';

import { FC } from "react";
import cn from 'classnames';

import { Link } from "@/components/link";
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import { formatISO } from 'date-fns/formatISO';

import * as featuser from '@/features/user/client';
import * as featchat from '@/features/chat/client';

import locale from '@/components/date-fns/ru-short';
import { useParams, useSearchParams } from "next/navigation";
import { NoSsr } from "@/components/no-ssr";

export type MessengerChatClientProps = {
  chat: featchat.Model;
};

function format(lastOnlineAt: string): string {
  const msDiff = new Date().getTime() - new Date(lastOnlineAt).getTime();
  const daysDiff = msDiff / 1000 / 60 / 60 / 24;
  if (daysDiff > 31) {
    return formatISO(lastOnlineAt);
  }

  return formatDistanceToNow(lastOnlineAt, {
    locale,
  });
}

export const MessengerChatClient: FC<MessengerChatClientProps> = (props) => {
  const { chat } = props;

  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();

  const isSelected = params.id === chat.id || searchParams.get('interlocutorId') === chat.interlocutor.id;

  return (
    <Link
      className={cn("flex gap-3 px-2 py-[6px] rounded-lg hover:bg-slate-100", isSelected && "bg-slate-100")}
      view="no-style"
      href={featchat.chatPageHref({
        chatId: chat.id
      })}
    >
      <featuser.components.Avatar user={chat.interlocutor} className="size-[48px] shrink-0" outline={false} />
      <div className="pt-1 w-full min-w-0">
        <featuser.components.Link user={chat.interlocutor} dropHref view="dark" />
        <div className="flex gap-[3px] items-baseline pt-[7px]">
          <div className="text-slate-500 text-ellipsis overflow-hidden whitespace-nowrap">
            {chat.lastMessage.text}
          </div>
          <span className="text-slate-400">·</span>
          <NoSsr><span className="text-slate-400 shrink-0">{format(chat.lastMessage.createdAt)}</span></NoSsr>
        </div>
      </div>
    </Link>
  );
};
