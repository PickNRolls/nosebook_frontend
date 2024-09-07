import { serverRenderApi } from "@/serverRenderApi";

import * as dto from '@/dto';

import { Model } from "./model";
import { actionApi } from "@/actionApi";

export const findByFilter = (filter?: {
  next?: string;
  limit?: number;
}): Promise<dto.ApiResponse<dto.FindResult<Model>>> => {
  const query = new URLSearchParams();
  if (filter?.limit != null) {
    query.set('limit', filter.limit.toString());
  }
  if (filter?.next != null) {
    query.set('next', filter.next);
  }

  return serverRenderApi<dto.FindResult<Model>>(`/chats?${query.toString()}`)
}

export const findById = (id: string) => {
  return serverRenderApi<Model>(`/chats/${id}`);
};

export const sendMessage = (opts: {
  recipientId: string;
  text: string;
}) => {
  return actionApi('/conversations/send-message', {
    method: 'POST',
    body: JSON.stringify(opts)
  }).then(res => {
    return res.ok;
  });
};

