/**
 * Global layout for the application.
 */

// External Modules ----------------------------------------------------------

import type { Metadata } from "next";
import { Inter } from "next/font/google";
//import { ToastContainer } from "react-toastify";

// Internal Modules ----------------------------------------------------------

//import "./globals.css";
//import { MenuBar } from "@/components/layout/MenuBar";
//import { Providers } from "@/components/layout/Providers";

// Public Objects ------------------------------------------------------------

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  description: "Demonstration of React Boostrap and Tanstack Form components",
  title: "Bootstrap Showcase",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body className={inter.className}>
    {/*<MenuBar/>*/}
    {children}
    </body>
    </html>
  );
}
