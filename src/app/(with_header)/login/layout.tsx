export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex justify-center">
      <div className="container flex">
        <div className="pt-4 mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}


