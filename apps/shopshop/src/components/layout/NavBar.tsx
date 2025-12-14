/**
 * Top-level menu bar component for the daisyui-alone application.
 */

// External Imports ----------------------------------------------------------

import { AlignJustify } from "lucide-react";
import Link from "next/link";

// Internal Imports ----------------------------------------------------------

import { SignedInMenu } from "@/components/layout/SignedInMenu";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { findProfile } from "@/lib/ProfileHelpers";

// Public Objects ------------------------------------------------------------

export async function NavBar() {

  const profile = await findProfile();

  return (
    <div className="flex w-full h-[60px] bg-base-200 items-center justify-between px-2">

      <div className="flex gap-2 justify-start">
        <Link href="/">
          <AlignJustify size={24} />
        </Link>
        <Link className="font-semibold" href="/">
          ShopShop
        </Link>
      </div>

      <div className="navbar-center gap-4">
        <span>Options go here</span>
      </div>

      <div className="navbar-end">
        {profile && <SignedInMenu profile={profile}/>}
        <ThemeToggle />
      </div>

    </div>
  )

}
