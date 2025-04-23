"use client"

/**
 * Wrapper (for global layout) that sets the current theme for its children.
 */

// External Modules ----------------------------------------------------------

import { useContext } from "react";

// Internal Modules ----------------------------------------------------------

import { ThemeContext } from "./ThemeContext";

// Public Objects ------------------------------------------------------------

export const ThemeWrapper = ({children}: {
  children: React.ReactNode;
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div data-theme={theme}>
      {children}
    </div>
  );

}
