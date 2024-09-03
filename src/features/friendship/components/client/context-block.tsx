import { FC } from "react";

import * as featuser from '@/features/user/server';
import * as featcurrentuser from '@/features/current-user';
import * as featfriend from '@/features/friendship/server';

import { Link } from "@/components/link";
import { PageBlock } from "@/components/page-block";
import { Divider } from "@/components/divider";
import { Count } from "@/components/count";


export type ContextBlockProps = {
  id: string;
  section: featfriend.PageSection;
};

export const ContextBlock: FC<ContextBlockProps> = async (props) => {
  const [
    currentUser,
    incomingRequests,
    user,
  ] = await Promise.all([
    featcurrentuser.api.get(),
    featfriend.api.findByFilter({
      userId: props.id,
      onlyIncoming: true,
      viewed: false,
      accepted: false,
      limit: 1,
    }),
    featuser.api.findById(props.id),
  ]);

  if (!user.data || !currentUser?.data) {
    return null;
  }

  return (
    <PageBlock>
      <Link view="button-link" href={featuser.profilePageHref(props.id)} className="flex px-[15px] gap-2">
        <featuser.components.Avatar user={user.data} className="border-none size-[34px]" />
        <div className="flex flex-col">
          <featuser.components.Link user={user.data} dropHref />
          <span className="text-neutral-500 text-[12.5px]">перейти к странице</span>
        </div>
      </Link>

      <Divider />

      <Link
        view="button-link"
        className="h-[36px] px-[15px] flex items-center leading-[18px] mb-[2px]"
        href={featfriend.listPageHref(props.id)}
        selected={['all', 'online', null, '', undefined].includes(props.section)}
      >
        Мои друзья
      </Link>
      <Link
        view="button-link"
        className="h-[36px] px-[15px] flex items-center leading-[18px]"
        href={featfriend.listPageHref(props.id, {
          section: 'incoming_requests',
        })}
        selected={props.section === 'incoming_requests'}
      >
        Заявки в друзья <Count className="ml-4">{incomingRequests.data?.totalCount}</Count>
      </Link>
    </PageBlock>
  );
}
