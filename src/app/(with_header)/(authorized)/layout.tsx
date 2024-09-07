import * as featcurrentuser from '@/features/current-user';

import { Sidebar } from "./sidebar";
import { Client } from './client';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  featcurrentuser.api.get();

  return (
    <>
      <div className="flex justify-center h-full">
        <div className="container flex h-full">
          <Sidebar />
          <div className="basis-[85%] grow-0 min-w-0 pt-4 h-full pb-4">
            {children}
          </div>
        </div>
      </div>

      <Client />
    </>
  );
}


