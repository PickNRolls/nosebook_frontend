import * as featuser from '@/features/user/client';

export type Model = {
  count: number;
  randomFiveLikers: featuser.Model[];
  liked: boolean;
}
