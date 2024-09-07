import { Header } from "@/components/header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="pt-12 h-full">
      <Header />
      {children}
    </div>
  );
}

