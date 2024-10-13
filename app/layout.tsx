import type { Metadata } from "next";
import "./globals.css";

import {Open_Sans} from "next/font/google"

const font = Open_Sans({subsets: ["latin"]})

export const metadata: Metadata = {
  title: "Chat App",
  description: "A chat app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={font.className}
      >
        {children}
      </body>
    </html>
  );
}
