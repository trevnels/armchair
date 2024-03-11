import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Armchair",
  description: "A web app for exploring FIRST Robotics Competition data",
  appleWebApp: {
    title: "Armchair",
    statusBarStyle: "black",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head />
      <body className={cn("h-dvh bg-background font-sans antialiased", fontSans.variable)}>{children}</body>
    </html>
  );
}
