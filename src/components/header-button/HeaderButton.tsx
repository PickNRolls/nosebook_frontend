'use client';

import { logout } from "@/components/logout";
import { Button } from "@/components/button";

export type HeaderButtonProps = {
};

export const HeaderButton = (props: HeaderButtonProps) => {
  return (
    <div className="-mr-3 h-full">
      <Button view="ghost" height="full" onClick={logout}>
        Выйти
      </Button>
    </div>
  );
};
