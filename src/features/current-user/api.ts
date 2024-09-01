'use server';

import { cache } from "react";
import { cookies } from "next/headers";

import * as dto from '@/dto';

import { SESSION_COOKIE_KEY } from "@/const/auth";
import { serverRenderApi } from "@/serverRenderApi";

import { Model } from './model';

export const get = cache((): Promise<dto.ApiResponse<Model> | null> => {
  const sessionCookie = cookies().get(SESSION_COOKIE_KEY);
  if (!sessionCookie) {
    return Promise.resolve(null);
  }

  return serverRenderApi<Model>('/whoami', {
    method: 'GET'
  })
})
