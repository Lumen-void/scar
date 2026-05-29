import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AppShell } from "@scar/ui";
import "./globals.css";

export const metadata: Metadata = {
  title: "SCAR Travel Architecture",
  description: "Scars to Remove, Recreate the World."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="spiritual">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
