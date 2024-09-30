import * as featuser from '@/features/user/client';

export type Model = {
  id: string;
  firstName: string;
  lastName: string;
  nick: string;
  createdAt: string;
  avatarUrl?: string;
  avatarUpdatedAt?: string;
  lastActivityAt: string;
};

export const toUserModel = (model: Model): featuser.Model => {
  const out: featuser.Model = {
    id: model.id,
    firstName: model.firstName,
    lastName: model.lastName,
    nick: model.nick,
    createdAt: model.createdAt,
    lastOnlineAt: model.lastActivityAt,
    online: ((new Date().getTime() - new Date(model.lastActivityAt).getTime()) / 1000 / 60) < 5,
  };

  if (model.avatarUrl) {
    out.avatar = {
      url: model.avatarUrl,
      updatedAt: model.avatarUpdatedAt!,
    };
  }

  return out;
}

