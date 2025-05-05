/**
 * Global layout for the application.
 */

// External Modules ----------------------------------------------------------

import type { Metadata } from "next";
import { Inter } from "next/font/google";
//import { ToastContainer } from "react-toastify";

// Internal Modules ----------------------------------------------------------

import "@craigmcc/ui/globals.css";
import { NavBar } from "@/components/layout/NavBar";
import { Providers } from "@/components/layout/Providers";

// Public Objects ------------------------------------------------------------

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  description: "Demonstration of ShadCN UI and Tanstack Form components",
  title: "Components Showcase",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body className={inter.className}>
    <Providers>
      <NavBar/>
      {children}
    </Providers>
    </body>
    </html>
  );
}
