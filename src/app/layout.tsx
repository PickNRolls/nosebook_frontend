import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nosebook",
  description: "Social network",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-100">
        <Header />
        <div className="flex justify-center">
          <div className="container flex">
            <Sidebar />
            <div className="basis-5/6">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
