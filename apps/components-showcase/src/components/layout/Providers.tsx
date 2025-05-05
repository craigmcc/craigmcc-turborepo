"use client";

/**
 * Wrapper (for use in layout.tsx) to provide the needed contexts for the app.
 */

// External Modules ----------------------------------------------------------

import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";

// Internal Modules ----------------------------------------------------------

// Public Objects ------------------------------------------------------------

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      {children}
    </NextThemesProvider>
  );
}
