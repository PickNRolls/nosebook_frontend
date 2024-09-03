import { FC, ReactNode } from 'react';

import * as featfriend from '@/features/friendship/server';
import * as featuser from '@/features/user/server';
import * as featcurrentuser from '@/features/current-user';

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
      onlyIncoming: true,
      limit: 1,
    }),
  ]);

  return (
    <aside className="basis-[15%] pt-4 mr-1">
      <SidebarLink href={featuser.profilePageHref(me.data.id)}>
        <svg className="text-sky-600" fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M5.84 15.63a6.97 6.97 0 0 0 8.32 0 8.2 8.2 0 0 0-8.32 0zM4.7 14.57a7 7 0 1 1 10.6 0 9.7 9.7 0 0 0-10.6 0zM10 1.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17zm-1.5 7a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0zm1.5-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" fill="currentColor" fillRule="evenodd"></path></svg>
        Моя страница
      </SidebarLink>

      <SidebarLink href={featfriend.listPageHref(me.data.id)}>
        <svg className="text-sky-600" fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor"><g clipRule="evenodd" fillRule="evenodd"><path d="M6.25 3.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm-1.5 3a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0zm-2.06 5.07c.96-.55 2.22-.82 3.56-.82s2.6.27 3.56.82c.98.56 1.69 1.47 1.69 2.68 0 .7-.28 1.3-.78 1.71-.48.39-1.1.54-1.72.54H3.5c-.61 0-1.24-.15-1.72-.54-.5-.4-.78-1-.78-1.71 0-1.21.71-2.12 1.69-2.68zm.75 1.3c-.65.37-.94.84-.94 1.38 0 .3.1.44.22.54.14.11.4.21.78.21H9c.39 0 .64-.1.78-.21.12-.1.22-.25.22-.54 0-.54-.29-1-.94-1.38-.66-.39-1.65-.62-2.81-.62s-2.15.23-2.81.62zM13.75 3.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm-1.5 3a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0z"></path></g><path d="M13.75 12.25c-.23 0-.45.01-.68.03a.75.75 0 1 1-.14-1.49c.27-.03.54-.04.82-.04 1.34 0 2.6.27 3.56.82.98.56 1.69 1.47 1.69 2.68 0 .7-.28 1.3-.78 1.71-.48.39-1.1.54-1.72.54h-3a.75.75 0 0 1 0-1.5h3c.39 0 .64-.1.78-.21.12-.1.22-.25.22-.54 0-.54-.29-1-.94-1.38a5.77 5.77 0 0 0-2.81-.62z"></path></g></svg>
        Друзья <Count className="ml-auto">{incomingFriendRequests.data?.totalCount}</Count>
      </SidebarLink>
    </aside>
  )
};

