'use client';

import { FC } from "react";

import * as featuser from '@/features/user/client';

import { Link } from "@/components/link";
import { Button } from "@/components/button";

import * as featfriend from '@/features/friendship/model';
import { useRouter } from "next/navigation";
import { PopupOptions } from "@/components/popup-options";

export type ListBlockRowProps = {
  id: string;
  request: featfriend.Model;
  onAcceptClick: (request: featfriend.Model) => Promise<boolean>;
  onRemoveClick: (request: featfriend.Model) => Promise<boolean>;
};

export const ListBlockRow: FC<ListBlockRowProps> = (props) => {
  const { request } = props;

  const router = useRouter();

  return (
    <div key={request.user.id} className="flex gap-3">
      <Link href={featuser.profilePageHref(request.user.id)}>
        <featuser.components.Avatar
          user={request.user}
          className="size-[80px] border-none"
          onlineMarkerClassName="!size-[16px] right-1 bottom-1"
          canShowLastOnlineMarker
          showOnlyOnlineMarker
        />
      </Link>
      <div className="pt-1 flex w-full">
        <div>
          <featuser.components.Link user={request.user} />
          {!request.accepted && request.type === 'incoming' && (
            <div className="flex gap-2 pt-2">
              <Button view="primary" width="auto" className="h-[28px]" onClick={async () => {
                const ok = await props.onAcceptClick(request)
                if (!ok) {
                  return;
                }

                router.refresh();
              }}>
                Принять заявку
              </Button>
              <Button view="default" width="auto" className="h-[28px] !text-sky-600 !bg-transparent">
                Отклонить
              </Button>
            </div>
          )}
        </div>
        {request.accepted && (
          <PopupOptions
            className="ml-auto"
            options={[
              {
                id: 'remove',
                type: 'button',
                children: 'Удалить из друзей',
                onClick: async () => {
                  const ok = await props.onRemoveClick(request)
                  if (!ok) {
                    return;
                  }

                  router.refresh();
                },
              },
              {
                id: 'list',
                type: 'link',
                children: 'Просмотреть друзей',
                href: featfriend.listPageHref(request.user.id)
              }
            ]}
          >
            <svg className="text-slate-400" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="more_horizontal_24__Page-2" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="more_horizontal_24__more_horizontal_24"><path id="more_horizontal_24__Bounds" d="M24 0H0v24h24z"></path><path d="M18 10a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2c0-1.1.9-2 2-2Zm-6 4a2 2 0 0 1-2-2c0-1.1.9-2 2-2a2 2 0 0 1 2 2 2 2 0 0 1-2 2Zm-6 0a2 2 0 0 1-2-2c0-1.1.9-2 2-2a2 2 0 0 1 2 2 2 2 0 0 1-2 2Z" fill="currentColor"></path></g></g></svg>
          </PopupOptions>
        )}
      </div>
    </div>
  );
}
