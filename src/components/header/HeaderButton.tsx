'use client';

import * as featws from '@/features/websocket/client';

import { logout } from "@/components/logout";
import { Button } from "@/components/button";

export type HeaderButtonProps = {
};

export const HeaderButton = () => {
  return (
    <div className="-mr-3 h-full">
      <Button view="ghost" height="full" onClick={async () => {
        featws.ws().close();
        await logout();
      }}>
        Выйти
      </Button>
    </div>
  );
};
