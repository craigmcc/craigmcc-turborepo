"use client";

/**
 * Top-level menu bar component for the daisyui-alone application.
 */

// External Imports ----------------------------------------------------------

import { AlignJustify } from "lucide-react";
import Link from "next/link";
//import { useEffect } from "react";

// Internal Imports ----------------------------------------------------------

import { ThemeSwitcher } from "@/components/layout/ThemeSwitcher";

// Public Objects ------------------------------------------------------------

export function NavBar() {

/*
  useEffect(() => {
    // Trigger a re-render when the current profile changes
  }, [currentProfile]);
*/

  return (
    <div className="navbar bg-base-200">

      <div className="navbar-start">
        <Link href="/">
          <AlignJustify className="navbar-logo" size={32} />
        </Link>
        <Link className="font-semibold px-2" href="/">
          ShopShop
        </Link>
      </div>

      <div className="navbar-center gap-4">
        <span>Options go here</span>
      </div>

      <div className="navbar-end">
{/*
        {currentProfile && (
          <span className="text-secondary p-2">{currentProfile.email}</span>
        )}
*/}
        <ThemeSwitcher />
      </div>

    </div>
  )

}
