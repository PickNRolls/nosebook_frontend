'use client';

import * as featchat from '@/features/chat/client';
import * as featnotif from '@/features/notification/client';

export const Client = () => {
  return (
    <>
      <featchat.components.Root />
      <featnotif.components.Root />
    </>
  )
};
