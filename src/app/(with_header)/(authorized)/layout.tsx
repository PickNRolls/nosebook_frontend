import * as featcurrentuser from '@/features/current-user';

import { Sidebar } from "@/components/sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  featcurrentuser.api.get();

  return (
    <>
      <div className="flex justify-center">
        <div className="container flex">
          <Sidebar />
          <div className="basis-[85%] pt-4">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}


