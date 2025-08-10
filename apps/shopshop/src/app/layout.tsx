/**
 * Overall layout for the daisyui-alone application.
 */

// External Imports ----------------------------------------------------------

import "@repo/tanstack-form/styles.css";
import "@repo/tanstack-table/styles.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ToastContainer } from "react-toastify";

// Internal Imports ----------------------------------------------------------

import "@/app/globals.css";
import { NavBar } from "@/components/layout/NavBar";
import { ThemeWrapper } from "@/components/layout/ThemeWrapper";
import { ThemeContextProvider } from "@/contexts/ThemeContext";

// Public Objects ------------------------------------------------------------

export const metadata: Metadata = {
  title: "ShopShop",
  description: "Online shopping list application",
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
      <ThemeContextProvider>
        <ThemeWrapper>
          <NavBar />
          <main className="bg-base-100 h-[calc(100vh-80px)]">
            {children}
          </main>
        </ThemeWrapper>
        <ToastContainer
          autoClose={5000}
          hideProgressBar={true}
          position="bottom-right"
          theme="colored"
        />
      </ThemeContextProvider>
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

