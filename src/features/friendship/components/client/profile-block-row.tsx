import { FC } from "react";

import { Link } from "@/components/link";

import * as featuser from '@/features/user/client';
import { Model } from '@/features/friendship/client';

import * as dto from '@/dto';


export type ProfileBlockRowProps = {
  title: string;
  row: dto.FindResult<Model>;
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
        {row.data.map(request => {
          return (
            <Link key={request.user.id} href={featuser.profilePageHref(request.user.id)} className="px-3 text-center flex flex-col items-center">
              <featuser.components.Avatar
                user={request.user}
                className="size-[64px] border-none mb-[5px]"
                onlineMarkerClassName="!size-[16px]"
                canShowLastOnlineMarker={canShowOnlineMarker}
                showOnlyOnlineMarker
              />
              <span className="text-[13px] text-black font-normal pb-[8px]">{request.user.firstName}</span>
            </Link>
          )
        })}
      </div>
    </div>
  );
}
