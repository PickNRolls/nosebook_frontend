import { FC } from "react";

import * as featuser from '@/features/user/client';

import { join } from '@/lib/array/join';
import { serverRenderApi } from "@/serverRenderApi";
import { Link } from "@/components/link";
import { PageBlock } from "@/components/page-block";
import { Divider } from "@/components/divider";
import { Button } from "@/components/button";

import { listPageHref, Model, PageSection } from '@/features/friendship/client';

import * as dto from '@/dto';

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
    serverRenderApi<dto.FindResult<Model>>(`/friendship?userId=${id}&accepted`, {
      method: 'GET'
    }),
    serverRenderApi<dto.FindResult<Model>>(`/friendship?userId=${id}&accepted&onlyOnline`, {
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
            Все друзья <span className="text-slate-400 pl-1">{all.data?.totalCount}</span>
          </Link>

          <Link view="button" selected={isOnline} href={listPageHref(id, {
            section: 'online',
          })}>
            Друзья онлайн <span className="text-slate-400 pl-1">{online.data?.totalCount}</span>
          </Link>
        </header>

        {join(data?.data.map(request => {
          return (
            <div key={request.user.id} className="flex gap-3">
              <Link href={featuser.profilePageHref(request.user.id)}>
                <featuser.components.Avatar
                  user={request.user}
                  className="size-[80px] border-none"
                  canShowOnlineMarker
                  showOnlyOnlineMarker
                />
              </Link>
              <div className="pt-1 flex w-full">
                <div>
                  <featuser.components.Link user={request.user} />
                </div>
                <Button view="ghost" width="auto" className="ml-auto">
                  <svg className="text-slate-400" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="more_horizontal_24__Page-2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="more_horizontal_24__more_horizontal_24"><path id="more_horizontal_24__Bounds" d="M24 0H0v24h24z"></path><path d="M18 10a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2c0-1.1.9-2 2-2Zm-6 4a2 2 0 0 1-2-2c0-1.1.9-2 2-2a2 2 0 0 1 2 2 2 2 0 0 1-2 2Zm-6 0a2 2 0 0 1-2-2c0-1.1.9-2 2-2a2 2 0 0 1 2 2 2 2 0 0 1-2 2Z" fill="currentColor"></path></g></g></svg>
                </Button>
              </div>
            </div>
          );
        }) || [], <Divider key="divider" />)}
      </div>
    </PageBlock>
  );
}
