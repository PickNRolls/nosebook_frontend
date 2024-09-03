import { actionApi } from "@/actionApi";
import { serverRenderApi } from "@/serverRenderApi";

import * as dto from '@/dto';

import { Model, Relation } from "./model";


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

export const findByFilter = (filter: {
  userId: string;
  accepted: boolean;
  viewed?: boolean;
  onlyIncoming?: boolean;
  onlyOutcoming?: boolean;
  onlyOnline?: boolean;
  limit?: number;
}): Promise<dto.ApiResponse<dto.FindResult<Model>>> => {
  const query = new URLSearchParams({
    userId: filter.userId,
  });
  if (filter.limit != null) {
    query.set('limit', filter.limit.toString());
  }
  if (filter.accepted) {
    query.set('accepted', '');
  }
  if (filter.viewed) {
    query.set('viewed', String(filter.viewed));
  }
  if (filter.onlyIncoming) {
    query.set('onlyIncoming', '');
  }
  if (filter.onlyOutcoming) {
    query.set('onlyOutcoming', '')
  }
  if (filter.onlyOnline) {
    query.set('onlyOnline', '');
  }

  return serverRenderApi<dto.FindResult<Model>>(`/friendship?${query.toString()}`)
}

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

