import { Inter } from "next/font/google";
import type React from "react";
import Header from "@/modules/layout/components/Header";
import type { Metadata } from "next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CineVault",
};

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} bg-background text-foreground`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
