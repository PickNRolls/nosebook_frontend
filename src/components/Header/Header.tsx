'use server';

import { getWhoami } from "@/getWhoami";
import { HeaderButton } from "@/components/HeaderButton";

export const Header = async () => {
  const me = await getWhoami();

  return (
    <header className="h-12 bg-white border-b border-slate-200 flex items-center justify-center box-content fixed top-0 left-0 w-full z-50">
      <div className="container flex">
        <div className="mr-auto flex items-center">
          Nosebook
        </div>

        {!('error' in me) &&
          <HeaderButton me={me} />
        }
      </div>
    </header>
  );
};

