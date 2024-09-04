import { FC } from "react";

import * as featfriend from '@/features/friendship/server';

import { join } from '@/lib/array/join';
import { PageBlock } from "@/components/page-block";
import { Divider } from "@/components/divider";

import { ProfileBlockRow } from "./profile-block-row";

export type ProfileBlockProps = {
  userId: string;
};

export const ProfileBlock: FC<ProfileBlockProps> = async (props) => {
  const { userId } = props;

  const [anyFriends, onlineFriends] = await Promise.all([
    featfriend.api.findByFilter({
      userId,
      accepted: true,
      limit: 4,
    }),
    featfriend.api.findByFilter({
      userId,
      accepted: true,
      limit: 4,
      onlyOnline: true,
    }),
  ]);

  const rows: React.ReactNode[] = []
  if (onlineFriends.data && onlineFriends.data.totalCount > 0) {
    rows.push(
      <ProfileBlockRow
        key="online"
        title="Друзья онлайн"
        row={onlineFriends.data}
        canShowOnlineMarker
        href={featfriend.listPageHref(userId, {
          section: 'online',
        })}
      />
    )
  }

  if (anyFriends.data && anyFriends.data.totalCount > 0) {
    rows.push(
      <ProfileBlockRow
        key="all"
        title="Друзья"
        row={anyFriends.data}
        href={featfriend.listPageHref(userId)}
      />
    )
  }

  if (!rows.length) {
    return null;
  }

  return (
    <PageBlock className="sticky top-16 flex flex-col px-5 py-3">
      {join(rows, <Divider key="divider" />)}
    </PageBlock>
  );
}
