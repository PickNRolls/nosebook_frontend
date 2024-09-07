import * as featuser from '@/features/user/client';

export const SESSION_HEADER_KEY = 'X-Auth-Session-Id';
export const SESSION_COOKIE_KEY = 'nosebook_session';

export type Model = {
  user: featuser.Model;
  session: {
    sessionId: string;
  }
}
