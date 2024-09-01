import * as comment from '@/features/comment';
import * as user from '@/features/user';
import * as like from '@/features/like';
import * as dto from '@/dto'

export type Model = {
  id: string;
  author: user.Model;
  owner: user.Model;
  message: string;
  likes: like.Model;
  recentComments: dto.FindResult<comment.Model>;
  createdAt: string;
};

