import * as featuser from '@/features/user/server';
import * as featcurrentuser from '@/features/current-user';
import * as featfriend from '@/features/friendship/server';

import { ApiFailResponse } from '@/dto';

import { FriendshipClient } from './friendship-client';

export type FriendshipProps = {
  user: featuser.Model;
};

export const Friendship: React.FC<FriendshipProps> = async (props) => {
  const { user } = props;

  const res = await featcurrentuser.api.get();
  const currentUser = res?.data;
  if (!currentUser) {
    return null;
  }

  const relationRes = await featfriend.api.relationBetween(currentUser.id, [user.id])

  const isFriend = Boolean(relationRes.data?.friendIds?.find(id => id === user.id));
  const isRequester = Boolean(relationRes.data?.pendingRequesterIds?.find(id => id === user.id));
  const isResponder = Boolean(relationRes.data?.pendingResponderIds?.find(id => id === user.id));
  const isNobody = !isFriend && !isRequester && !isResponder;

  return <div className="shrink-0">
    {
      currentUser.id !== user.id && (
        <FriendshipClient
          isFriend={isFriend}
          isRequester={isRequester}
          isResponder={isResponder}
          isNobody={isNobody}

          onSend={async () => {
            'use server';

            return await featfriend.api.sendRequest(user.id)
              .then(res => {
                return res.ok;
              })
              .catch((res: ApiFailResponse) => {
                return res.ok;
              });
          }}
          onAccept={async () => {
            'use server';

            return await featfriend.api.acceptRequest(user.id)
              .then(res => {
                return res.ok;
              })
              .catch((res: ApiFailResponse) => {
                return res.ok;
              });
          }}
          onDeny={async () => {
            'use server';

            return await featfriend.api.denyRequest(user.id)
              .then(res => {
                return res.ok;
              })
              .catch((res: ApiFailResponse) => {
                return res.ok;
              });
          }}
          onRemove={async () => {
            'use server';

            return await featfriend.api.removeFriend(user.id)
              .then(res => {
                return res.ok;
              })
              .catch((res: ApiFailResponse) => {
                return res.ok;
              });
          }}
        />
      )
    }
  </div>
};
