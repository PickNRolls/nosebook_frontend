import { FC } from "react";

import * as featuser from '@/features/user/client';

import { join } from '@/lib/array/join';
import { serverRenderApi } from "@/serverRenderApi";
import { Link } from "@/components/link";
import { PageBlock } from "@/components/page-block";
import { Divider } from "@/components/divider";

import { listPageHref, Model, PageSection } from '@/features/friendship/client';

export type ListBlockProps = {
  id: string;
  section: PageSection;
};

export const ListBlock: FC<ListBlockProps> = async (props) => {
  const { id, section } = props;

  const isAll = section === 'all' || section == null;
  const isOnline = section === 'online';

  const [
    all,
    online
  ] = await Promise.all([
    serverRenderApi<Model>(`/friendship?userId=${id}`, {
      method: 'GET'
    }),
    serverRenderApi<Model>(`/friendship?userId=${id}&onlyOnline`, {
      method: 'GET'
    }),
  ]);

  const data = isAll ? all.data : online.data;

  return (
    <PageBlock>
      <div className="p-3 pb-1">
        <header className="flex gap-[6px] mb-5">
          <Link view="button" selected={isAll} href={listPageHref(id, {
            section: 'all',
          })}>
            Все друзья <span className="text-neutral-500 pl-1">{all.data?.totalCount}</span>
          </Link>

          <Link view="button" selected={isOnline} href={listPageHref(id, {
            section: 'online',
          })}>
            Друзья онлайн <span className="text-neutral-500 pl-1">{online.data?.totalCount}</span>
          </Link>
        </header>

        {join(data?.data.map(friend => {
          return (
            <div key={friend.id} className="flex gap-3">
              <Link href={featuser.profilePageHref(friend.id)}>
                <featuser.components.Avatar
                  user={friend}
                  className="size-[80px] border-none"
                  canShowOnlineMarker
                  showOnlyOnlineMarker
                />
              </Link>
              <div className="pt-1">
                <featuser.components.Link user={friend} />
              </div>
            </div>
          );
        }) || [], <Divider key="divider" />)}
      </div>
    </PageBlock>
  );
}
