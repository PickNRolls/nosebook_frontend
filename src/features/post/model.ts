import * as featcomment from '@/features/comment';
import * as featuser from '@/features/user/client';
import * as featlike from '@/features/like';
import * as featpermissions from '@/features/permissions';

import * as dto from '@/dto'

export type Model = {
  id: string;
  author: featuser.Model;
  owner: featuser.Model;
  message: string;
  likes: featlike.Model;
  recentComments: dto.FindResult<featcomment.Model>;
  permissions: featpermissions.Model;
  createdAt: string;
};

