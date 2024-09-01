import * as featuser from '@/features/user/client';

export type Model = {
  user: featuser.Model;
  session: {
    sessionId: string;
  }
}
