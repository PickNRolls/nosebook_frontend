import { FC } from "react";

import { Link } from "@/components/link";

import * as featuser from '@/features/user/client';

import { Model } from '@/features/friendship/client';


export type ProfileBlockRowProps = {
  title: string;
  row: Model;
  href: string;
  canShowOnlineMarker?: boolean;
};

export const ProfileBlockRow: FC<ProfileBlockRowProps> = async (props) => {
  const { title, row, canShowOnlineMarker } = props;

  return (
    <div>
      <Link className="font-medium text-[14px] leading-[18px] flex gap-[6px] py-[8px] mb-[6px]" view="no-style" href={props.href}>
        {title}
        <span className="text-[13px] text-gray-500">
          {row.totalCount}
        </span>
      </Link>
      <div className="flex -mx-3">
        {row.data.map(friend => {
          return (
            <Link key={friend.id} href={featuser.profilePageHref(friend.id)} className="px-3 text-center flex flex-col items-center">
              <featuser.components.Avatar
                user={friend}
                className="size-[64px] border-none mb-[5px]"
                onlineMarkerClassName="!size-[16px]"
                canShowOnlineMarker={canShowOnlineMarker}
                showOnlyOnlineMarker
              />
              <span className="text-[13px] text-black font-normal pb-[8px]">{friend.firstName}</span>
            </Link>
          )
        })}
      </div>
    </div>
  );
}
