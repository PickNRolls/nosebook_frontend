'use client';

import * as featchat from '@/features/chat/client';
import * as featnotif from '@/features/notification/client';
import * as featlike from '@/features/like/client';
import * as featcurrentuser from '@/features/current-user';
import { FC } from 'react';

export type ClientProps = {
  currentUser: featcurrentuser.Model;
}

export const Client: FC<ClientProps> = (props) => {
  const { currentUser } = props;

  return (
    <>
      <featchat.components.Root currentUser={currentUser} />
      <featnotif.components.Root />
      <featlike.components.Root />
    </>
  )
};
