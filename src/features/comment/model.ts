import * as featuser from '@/features/user/client';
import * as featlike from '@/features/like';
import * as featpermissions from '@/features/permissions';

export type Model = {
  id: string;
  author: featuser.Model;
  message: string;
  likes: featlike.Model;
  permissions: featpermissions.Model;
  createdAt: string;
};

