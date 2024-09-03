import { FC } from "react";

import { join } from '@/lib/array/join';
import { Link } from "@/components/link";
import { PageBlock } from "@/components/page-block";
import { Divider } from "@/components/divider";

import * as featfriend from '@/features/friendship/server';
import { ListBlockRow } from "./list-block-row";

export type ListBlockProps = {
  id: string;
  section: featfriend.PageSection;
};

export const ListBlock: FC<ListBlockProps> = async (props) => {
  const { id, section } = props;

  const isAll = section === 'all' || section == null;
  const isOnline = section === 'online';
  const isIncomingRequests = section === 'incoming_requests';

  const [
    all,
    online,
    incomingRequests,
  ] = await Promise.all([
    featfriend.api.findByFilter({
      userId: id,
      accepted: true,
    }),
    featfriend.api.findByFilter({
      userId: id,
      accepted: true,
      onlyOnline: true,
    }),
    featfriend.api.findByFilter({
      userId: id,
      accepted: false,
      viewed: false,
      onlyIncoming: true,
      limit: 10,
    }),
  ]);

  let data = all.data;
  if (isOnline) {
    data = online.data;
  }
  if (isIncomingRequests) {
    data = incomingRequests.data;
  }

  let header = (
    <header className="flex gap-[6px] mb-5">
      <Link view="button" selected={isAll} href={featfriend.listPageHref(id, {
        section: 'all',
      })}>
        Все друзья <span className="text-slate-400 pl-1">{all.data?.totalCount}</span>
      </Link>

      <Link view="button" selected={isOnline} href={featfriend.listPageHref(id, {
        section: 'online',
      })}>
        Друзья онлайн <span className="text-slate-400 pl-1">{online.data?.totalCount}</span>
      </Link>
    </header>
  );

  if (section === 'incoming_requests') {
    header = (
      <header className="flex gap-[6px] mb-5">
        <Link
          view="button"
          selected={isIncomingRequests}
          href={featfriend.listPageHref(id, {
            section: 'incoming_requests',
          })}
        >
          Входящие <span className="text-slate-400 pl-1">{incomingRequests.data?.totalCount}</span>
        </Link>
      </header>
    );
  }

  const handleAcceptClick = async (request: featfriend.Model) => {
    'use server';

    const res = await featfriend.api.acceptRequest(request.user.id);
    return res.ok;
  }

  return (
    <PageBlock>
      <div className="p-3 pb-1">
        {header}

        {join(data?.data.map(request => {
          return (
            <ListBlockRow
              key={request.user.id}
              id={props.id}
              request={request}
              onAcceptClick={handleAcceptClick}
            />
          );
        }) || [], <Divider key="divider" />)}
      </div>
    </PageBlock>
  );
}
