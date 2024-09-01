'use server';

import * as featcurrentuser from "@/features/current-user";

import { HeaderButton } from "@/components/header-button";

export const Header = async () => {
  const res = await featcurrentuser.api.get();

  return (
    <header className="h-12 bg-white border-b border-slate-200 flex items-center justify-center box-content fixed top-0 left-0 w-full z-50">
      <div className="container flex h-full items-center">
        <div className="mr-auto flex items-center">
          Nosebook
        </div>

        {res && !res.errors?.length &&
          <HeaderButton />
        }
      </div>
    </header>
  );
};

