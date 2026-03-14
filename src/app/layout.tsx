import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";

import { AppShell } from "@/components/app-shell";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: "Keldo",
  description: "A lightweight productivity dashboard for planning tasks and schedules."
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
