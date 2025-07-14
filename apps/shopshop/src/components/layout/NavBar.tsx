/**
 * Top-level menu bar component for the daisyui-alone application.
 */

// External Imports ----------------------------------------------------------

import { AlignJustify } from "lucide-react";
import Link from "next/link";
//import { useEffect } from "react";

// Internal Imports ----------------------------------------------------------

import { SignedInMenu } from "@/components/layout/SignedInMenu";
import { ThemeSwitcher } from "@/components/layout/ThemeSwitcher";
import { findProfile } from "@/lib/ProfileHelpers";

// Public Objects ------------------------------------------------------------

export async function NavBar() {

  const profile = await findProfile();

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
        {profile && <SignedInMenu profile={profile}/>}
        <ThemeSwitcher />
      </div>

    </div>
  )

}
