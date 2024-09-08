import * as featcurrentuser from '@/features/current-user';

import { Sidebar } from "./sidebar";
import { Client } from './client-root';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await featcurrentuser.api.get();

  if (!currentUser?.data) {
    return null;
  }

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

      <Client currentUser={currentUser.data} />
    </>
  );
}


