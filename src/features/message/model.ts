import * as featuser from '@/features/user/model';

export type Model = {
  id: string;
  author: featuser.Model;
  text: string;
  createdAt: string;
  chatId: string;
};
