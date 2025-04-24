/**
 * Navigation bar for the global layout of this application.
 */

// External Modules ----------------------------------------------------------

import { Images } from "lucide-react";
import Link from "next/link";

// Internal Modules ----------------------------------------------------------

import { DaisyuiDropdown } from "./DaisyuiDropdown";
import { TanstackDropdown } from "./TanstackFormDropdown";
import { ThemeSwitcher } from "@craigmcc/daisyui-components/ThemeSwitcher";

// Public Objects ------------------------------------------------------------

export function Header() {
  return (
    <div className="navbar justify-between items-center bg-base-200">
      <div className="flex flex-row">
        <Link href="/" className="pr-2">
          <Images/>
        </Link>
        <Link href="/" className="pr-4">
          <span className="font-semibold">Component Showcase</span>
        </Link>
        <DaisyuiDropdown className="pr-4"/>
        <TanstackDropdown/>
      </div>
      <div className="flex flex-row gap-2 pr-4">
        <ThemeSwitcher />
      </div>
    </div>
  )
}
