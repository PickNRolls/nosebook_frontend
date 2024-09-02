import { FC } from "react";

import { ProfileBlock as ProfileBlockComponent } from "@/components/profile-block";

import * as featuser from '@/features/user/client';
import { Model } from '@/features/friendship/client';
import { Link } from "@/components/link";

export type ProfileBlockProps = {
  friendship: Model;
};

export const ProfileBlock: FC<ProfileBlockProps> = (props) => {
  const { friendship } = props;

  return (
    <ProfileBlockComponent className="sticky top-16 flex flex-col px-5 py-5 pt-3">
      <h3 className="font-medium text-[14px] leading-[18px] flex gap-[6px] py-[10px] mb-1">
        Друзья
        <span className="text-[13px] text-gray-500">
          {friendship.totalCount}
        </span>
      </h3>
      <div className="flex -mx-3">
        {friendship.data.map(friend => {
          return (
            <Link key={friend.id} href={featuser.profilePageHref(friend.id)} className="px-3 py-1 text-center flex flex-col items-center">
              <featuser.components.Avatar user={friend} className="size-[64px] border-none mb-[5px]" />
              <span className="text-[13px] text-black font-normal">{friend.firstName}</span>
            </Link>
          )
        })}
      </div>
    </ProfileBlockComponent>
  );
}
