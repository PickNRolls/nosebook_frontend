import * as featuser from '@/features/user';

export type Model = {
  user: featuser.Model;
  session: {
    sessionId: string;
  }
}
