/**
 * Overall layout for the shadcn-alone application.
 */

// External Imports ----------------------------------------------------------

//import "@repo/tanstack-form/styles.css";
//import "@repo/tanstack-table/styles.css";
import "@repo/shadcn-ui/globals.css";
import { ThemeProvider } from "@repo/shadcn-ui/components/theme-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
//import { ToastContainer } from "react-toastify";

// Internal Imports ----------------------------------------------------------

import { NavBar } from "@/components/layout/NavBar";
// import { ThemeWrapper } from "@/components/layout/ThemeWrapper";
// import { CurrentProfileContextProvider } from "@/contexts/CurrentProfileContext";
// import { ThemeContextProvider } from "@/contexts/ThemeContext";

// Public Objects ------------------------------------------------------------

export const metadata: Metadata = {
  title: "ShadCN Alone",
  description: "Standalone ShadCN components with Next.js",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      enableSystem
    >
      <NavBar />
      <main className="bg-base-100 h-[calc(100vh-60px)]">
        {children}
      </main>
    </ThemeProvider>
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
