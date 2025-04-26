/**
 * Global layout for the application.
 */

// External Modules ----------------------------------------------------------

import { ThemeContextProvider } from "@craigmcc/daisyui-components/ThemeContext";
import { ThemeWrapper } from "@craigmcc/daisyui-components/ThemeWrapper";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

// Internal Modules ----------------------------------------------------------

import "./globals.css";
import { Header } from "@/components/layout/Header";

// Public Objects ------------------------------------------------------------

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  description: "Demonstration of DaisyUI and Tanstack Form components",
  title: "Components Showcase",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={inter.className}>
    <ThemeContextProvider>
      <ThemeWrapper>
        <Header />
        {children}
      </ThemeWrapper>
    </ThemeContextProvider>
    </body>
    </html>
  );
}
