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
    <div className="flex w-full h-[60px] bg-primary/50 items-center justify-between">

      <div className="flex gap-2 ms-2 justify-start">
        <Link href="/">
          <AlignJustify size={24} />
        </Link>
        <Link className="font-semibold" href="/">
          ShopShop
        </Link>
      </div>

      <div className="flex flex-row gap-4 justify-center">
        <span>Options go here</span>
      </div>

      <div className="flex gap-2 items-center me-2 justify-end">
        {profile && <SignedInMenu profile={profile}/>}
        <ThemeToggle />
      </div>

    </div>
  )

}
