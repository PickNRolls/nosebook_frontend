'use server';

import * as featcurrentuser from "@/features/current-user";
import * as featuser from "@/features/user/server";

import { HeaderButton } from "./HeaderButton";
import { HeaderFinder } from "./HeaderFinder";

export const Header = async () => {
  const res = await featcurrentuser.api.get();
  const isAuthenticated = res && !res.errors;

  return (
    <header className="h-12 bg-white border-b border-slate-200 flex items-center justify-center box-content fixed top-0 left-0 w-full z-50">
      <div className="container flex h-full items-center">
        <div className="flex items-center basis-[15%] shrink-0 mr-1">
          Nosebook
        </div>

        {isAuthenticated && (
          <HeaderFinder onUserSearch={(text) => {
            'use server';

            return featuser.api.findByText(text).then(res => res.data!);
          }} />
        )}

        {isAuthenticated &&
          <HeaderButton />
        }
      </div>
    </header>
  );
};

