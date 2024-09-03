import { FC } from "react";

import { join } from '@/lib/array/join';
import { serverRenderApi } from "@/serverRenderApi";
import { ProfileBlock as ProfileBlockComponent } from "@/components/profile-block";
import { Divider } from "@/components/divider";

import { Model } from '@/features/friendship/client';
import { ProfileBlockRow } from "./profile-block-row";


export type ProfileBlockProps = {
  userId: string;
};

export const ProfileBlock: FC<ProfileBlockProps> = async (props) => {
  const { userId } = props;

  const [anyFriends, onlineFriends] = await Promise.all([
    serverRenderApi<Model>(`/friendship?userId=${userId}&limit=4`, {
      method: 'GET',
    }),
    serverRenderApi<Model>(`/friendship?userId=${userId}&limit=4&onlyOnline`, {
      method: 'GET',
    }),
  ]);

  const rows: React.ReactNode[] = []
  if (onlineFriends.data && onlineFriends.data.totalCount > 0) {
    rows.push(<ProfileBlockRow key="online" title="Друзья онлайн" row={onlineFriends.data} canShowOnlineMarker />)
  }

  if (anyFriends.data && anyFriends.data.totalCount > 0) {
    rows.push(<ProfileBlockRow key="all" title="Друзья" row={anyFriends.data} />)
  }

  if (!rows.length) {
    return null;
  }

  return (
    <ProfileBlockComponent className="sticky top-16 flex flex-col px-5 py-3">
      {join(rows, <Divider key="divider" />)}
    </ProfileBlockComponent>
  );
}
