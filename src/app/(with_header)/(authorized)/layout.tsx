import { Sidebar } from "@/components/Sidebar";
import { getWhoami } from "@/getWhoami";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  getWhoami();

  return (
    <>
      <div className="flex justify-center">
        <div className="container flex">
          <Sidebar />
          <div className="basis-5/6 pt-4">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}


