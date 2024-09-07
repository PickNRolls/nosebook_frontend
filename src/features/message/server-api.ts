import { serverRenderApi } from "@/serverRenderApi";

import * as dto from '@/dto';

import { Model } from "./model";

export const findByFilter = (filter: {
  chatId: string;
  next?: string;
  limit?: number;
}): Promise<dto.ApiResponse<dto.FindResult<Model>>> => {
  const query = new URLSearchParams({
    chatId: filter?.chatId,
  });
  if (filter?.limit != null) {
    query.set('limit', filter.limit.toString());
  }
  if (filter?.next != null) {
    query.set('next', filter.next);
  }

  return serverRenderApi<dto.FindResult<Model>>(`/messages?${query.toString()}`)
}

