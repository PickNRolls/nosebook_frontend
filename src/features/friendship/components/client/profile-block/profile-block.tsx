import React, { FC } from "react";

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
    <ProfileBlockComponent className="sticky top-16">
      {friendship.data.map(friend => {
        return (
          <Link key={friend.id} href={featuser.profilePageHref(friend.id)} className="w-full">
            <featuser.components.Avatar user={friend} />
            <span>{friend.firstName}</span>
          </Link>
        )
      })}
    </ProfileBlockComponent>
  );
}
