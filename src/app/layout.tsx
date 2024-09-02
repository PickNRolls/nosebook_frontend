import type { Metadata } from "next";
import { setDefaultOptions } from "date-fns";
import { ru } from 'date-fns/locale';
import "./globals.css";

export const metadata: Metadata = {
  title: "Nosebook",
  description: "Social network",
};

setDefaultOptions({
  locale: ru,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-100 box-border">
        {children}
      </body>
    </html>
  );
}

