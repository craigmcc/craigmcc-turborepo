/**
 * Overall layout for the daisyui-alone application.
 */

// External Imports ----------------------------------------------------------

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

// Internal Imports ----------------------------------------------------------

import "@/app/globals.css";
import { NavBar } from "@/components/layout/NavBar";

// Public Objects ------------------------------------------------------------

export const metadata: Metadata = {
  title: "DaisyUI Alone",
  description: "Standalone DaisyUI components with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavBar />
        <main className="h-[calc(100vh-80px)]">
          {children}
        </main>
      </body>
    </html>
  );
}

// Private Objects -----------------------------------------------------------

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

