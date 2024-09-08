'use client';

import { FC, useRef } from "react";

import * as featuser from '@/features/user/client';
import * as featchat from '@/features/chat/client';
import * as featmessage from '@/features/message/client';
import * as dto from '@/dto';

import { Link } from "@/components/link";
import { useCursorFetch, UseCursorFetchProps } from "@/components/use-cursor-fetch";
import { Spinner } from "@/components/spinner";

import { ChatFooter } from "./chat-footer";

export type ChatClientProps = {
  interlocutor: featuser.Model;
  onMessageSubmit: (message: string) => Promise<boolean>;
  onFetch: UseCursorFetchProps<featmessage.Model>['onFetch'];
  messages: dto.FindResult<featmessage.Model>;
};

export const ChatClient: FC<ChatClientProps> = (props) => {
  const { interlocutor, messages, onMessageSubmit, onFetch } = props;
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: fetchedMessages, observer, loading } = useCursorFetch({
    direction: 'up',
    initial: messages,
    onFetch: onFetch,
  });

  const data = fetchedMessages;
  const hasMessages = messages.data.length > 0;

  const handleMessageSubmit = async (message: string) => {
    const ok = await onMessageSubmit(message);
    if (ok) {
      // TODO: bug, router.refresh() is still in progress, we are already scrolled to bottom.
      // Then new message is coming in, we are one message scroll behind.
      scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
    }
    return ok;
  };

  return (
    <div className="h-full flex flex-col">
      <header className="flex min-h-0 shrink-0 h-[56px] border-b border-slate-200 items-center px-2">
        <Link
          view="button-link"
          className="text-slate-400 !size-[32px] !p-0 mr-2 hover:bg-slate-100 hover:!text-slate-400 flex justify-center items-center"
          href={featchat.listPageHref()}
        >
          <svg aria-hidden="true" display="block" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M7.536 6.264a.9.9 0 0 0-1.272 1.272L10.727 12l-4.463 4.464a.9.9 0 0 0 1.272 1.272L12 13.273l4.464 4.463a.9.9 0 1 0 1.272-1.272L13.273 12l4.463-4.464a.9.9 0 1 0-1.272-1.272L12 10.727z"></path>
          </svg>
        </Link>

        <Link
          href={featuser.profilePageHref(interlocutor.id)}
          view="no-style"
          className="mr-auto flex gap-2"
        >
          <featuser.components.Avatar
            user={interlocutor}
            className="size-[32px]"
            outline={false}
          />
          <span>
            <featuser.components.Link user={interlocutor} view="dark" dropHref />
            <featuser.components.OnlineText user={interlocutor} />
          </span>
        </Link>
      </header>

      {hasMessages && (
        <div className="flex flex-col-reverse gap-[2px] px-5 pb-10 pt-3 mt-auto overflow-auto" ref={scrollRef}>
          {data.map(message => {
            return (
              <div key={message.id}>
                <featmessage.components.Message message={message} />
              </div>
            )
          })}
          {observer}
          {loading && <Spinner />}
        </div>
      )}

      {!hasMessages && (
        <div className="mt-auto flex justify-center items-center h-full">
          <div className="flex flex-col items-center">
            <featuser.components.Avatar user={interlocutor} className="size-[80px] mb-2" outline={false} />
            <span className="text-[20px] mb-1">{featuser.fullName(interlocutor)}</span>
            <span className="text-slate-400 font-light text-[16px] mb-3">Напишите первым</span>
            <Link view="button-light" height="md" href={featuser.profilePageHref(interlocutor.id)}>Перейти на страницу</Link>
          </div>
        </div>
      )}

      <ChatFooter onChange={handleMessageSubmit} />
    </div>
  );
};

