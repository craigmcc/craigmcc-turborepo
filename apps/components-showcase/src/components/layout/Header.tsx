/**
 * Navigation bar for the global layout of this application.
 */

// External Modules ----------------------------------------------------------

import Link from "next/link";

// Internal Modules ----------------------------------------------------------

import { ThemeSwitcher } from "@craigmcc/daisyui-components/ThemeSwitcher";

// Public Objects ------------------------------------------------------------

export function Header() {
  return (
    <div className="navbar justify-between items-center bg-base-200">
      <div className="flex flex-row">
        <Link href="/" className="mr-2">
          <span className="font-semibold">Component Showcase</span>
        </Link>
      </div>
      <div className="flex flex-row gap-2">
        <ThemeSwitcher />
      </div>
    </div>
  )
}
