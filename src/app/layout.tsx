import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: "The Guide",
  description: "A strange little expedition with your AI buddy.",
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#11110f",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
