'use client';

import * as featchat from '@/features/chat/client';
import * as featnotif from '@/features/notification/client';
import * as featlike from '@/features/like/client';

export const Client = () => {
  return (
    <>
      <featchat.components.Root />
      <featnotif.components.Root />
      <featlike.components.Root />
    </>
  )
};
