/**
 * Global layout for the application.
 */

// External Modules ----------------------------------------------------------

import type { Metadata } from "next";
import { Inter } from "next/font/google";

// Internal Modules ----------------------------------------------------------

import "./globals.css";
//import { ThemeContextProvider } from "@craigmcc/daisyui-components/ThemeContext";
//import { ThemeWrapper } from "@craigmcc/daisyui-components/ThemeWrapper";

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
      {/*<ThemeContextProvider>*/}
      {/*  <ThemeWrapper>*/}
      {/*  TODO - this will get replaced by the nav bar with dropdowns */}
          <div className="navbar bg-base-200">
            <div className="flex-1">
              <a className="btn btn-ghost normal-case text-xl">Components Showcase</a>
            </div>
          </div>
          {children}
      {/*  </ThemeWrapper>*/}
      {/*</ThemeContextProvider>*/}
        {children}
      </body>
    </html>
  );
}
