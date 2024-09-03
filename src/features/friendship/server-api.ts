import { actionApi } from "@/actionApi";
import { serverRenderApi } from "@/serverRenderApi";

import { Relation } from "./model";

export const relationBetween = (sourceId: string, targetIds: string[]) => {
  const query = new URLSearchParams({
    sourceUserId: sourceId,
  });
  for (let i = 0; i < targetIds.length; i++) {
    query.append('targetUserIds', targetIds[i])
  }

  return serverRenderApi<Relation>(`/friendship/relation-between?${query.toString()}`, {
    method: 'GET'
  });
};

export const sendRequest = (toUserId: string) => {
  return actionApi(`/friendship/send-request`, {
    method: 'POST',
    body: JSON.stringify({
      responderId: toUserId,
    }),
  });
};

export const acceptRequest = (fromUserId: string) => {
  return actionApi(`/friendship/accept-request`, {
    method: 'POST',
    body: JSON.stringify({
      requesterId: fromUserId,
    }),
  })
};

export const denyRequest = (fromUserId: string) => {
  return actionApi(`/friendship/deny-request`, {
    method: 'POST',
    body: JSON.stringify({
      requesterId: fromUserId,
    }),
  })
};

export const removeFriend = (userId: string) => {
  return actionApi(`/friendship/remove-friend`, {
    method: 'POST',
    body: JSON.stringify({
      friendId: userId,
    }),
  })
};

