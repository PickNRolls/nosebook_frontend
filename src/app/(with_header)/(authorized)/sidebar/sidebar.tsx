import { FC, ReactNode } from 'react';

import * as featfriend from '@/features/friendship/server';
import * as featuser from '@/features/user/server';
import * as featcurrentuser from '@/features/current-user';
import * as featchat from '@/features/chat/server';

import { Link } from "@/components/link";
import { Count } from '@/components/count';


const SidebarLink: FC<{ href: string; children: ReactNode; }> = ({ href, children }) => {
  return (
    <Link view="button-link" href={href} className="flex items-center max-h-[30px] gap-[10px] px-[6px]">
      {children}
    </Link>
  );
}

export const Sidebar = async () => {
  const me = await featcurrentuser.api.get();
  if (!me?.data) {
    return null;
  }

  const [incomingFriendRequests] = await Promise.all([
    featfriend.api.findByFilter({
      userId: me.data.id,
      accepted: false,
      viewed: false,
      onlyIncoming: true,
      limit: 1,
    }),
  ]);

  return (
    <aside className="basis-[15%] shrink-0 pt-4 mr-1">
      <SidebarLink href={featuser.profilePageHref(me.data.id)}>
        <svg className="text-sky-600" fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M5.84 15.63a6.97 6.97 0 0 0 8.32 0 8.2 8.2 0 0 0-8.32 0zM4.7 14.57a7 7 0 1 1 10.6 0 9.7 9.7 0 0 0-10.6 0zM10 1.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17zm-1.5 7a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0zm1.5-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" fill="currentColor" fillRule="evenodd"></path></svg>
        Моя страница
      </SidebarLink>

      <SidebarLink href={featchat.listPageHref()}>
        <svg className="text-sky-600" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g id="message_outline_20__Page-2" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="message_outline_20__message_outline_20"><path id="message_outline_20__Shape" opacity=".4" d="M0 0h20v20H0z"></path><path d="M6.83 15.75c.2-.23.53-.31.82-.2.81.3 1.7.45 2.6.45 3.77 0 6.75-2.7 6.75-6s-2.98-6-6.75-6S3.5 6.7 3.5 10c0 1.21.4 2.37 1.14 3.35.1.14.16.31.15.49-.04.76-.4 1.78-1.08 3.13 1.48-.11 2.5-.53 3.12-1.22ZM3.24 18.5a1.2 1.2 0 0 1-1.1-1.77A10.77 10.77 0 0 0 3.26 14 7 7 0 0 1 2 10c0-4.17 3.68-7.5 8.25-7.5S18.5 5.83 18.5 10s-3.68 7.5-8.25 7.5c-.92 0-1.81-.13-2.66-.4-1 .89-2.46 1.34-4.35 1.4Z" id="message_outline_20__Icon-Color" fill="currentColor" fillRule="nonzero"></path></g></g></svg>
        Мессенджер
      </SidebarLink>

      <SidebarLink href={featfriend.listPageHref(me.data.id)}>
        <svg className="text-sky-600" fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor"><g clipRule="evenodd" fillRule="evenodd"><path d="M6.25 3.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm-1.5 3a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0zm-2.06 5.07c.96-.55 2.22-.82 3.56-.82s2.6.27 3.56.82c.98.56 1.69 1.47 1.69 2.68 0 .7-.28 1.3-.78 1.71-.48.39-1.1.54-1.72.54H3.5c-.61 0-1.24-.15-1.72-.54-.5-.4-.78-1-.78-1.71 0-1.21.71-2.12 1.69-2.68zm.75 1.3c-.65.37-.94.84-.94 1.38 0 .3.1.44.22.54.14.11.4.21.78.21H9c.39 0 .64-.1.78-.21.12-.1.22-.25.22-.54 0-.54-.29-1-.94-1.38-.66-.39-1.65-.62-2.81-.62s-2.15.23-2.81.62zM13.75 3.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm-1.5 3a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0z"></path></g><path d="M13.75 12.25c-.23 0-.45.01-.68.03a.75.75 0 1 1-.14-1.49c.27-.03.54-.04.82-.04 1.34 0 2.6.27 3.56.82.98.56 1.69 1.47 1.69 2.68 0 .7-.28 1.3-.78 1.71-.48.39-1.1.54-1.72.54h-3a.75.75 0 0 1 0-1.5h3c.39 0 .64-.1.78-.21.12-.1.22-.25.22-.54 0-.54-.29-1-.94-1.38a5.77 5.77 0 0 0-2.81-.62z"></path></g></svg>
        Друзья <Count className="ml-auto">{incomingFriendRequests.data?.totalCount}</Count>
      </SidebarLink>
    </aside>
  )
};

