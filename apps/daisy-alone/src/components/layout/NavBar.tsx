"use client";

/**
 * Top-level menu bar component for the daisyui-alone application.
 */

// External Imports ----------------------------------------------------------

import { Flower2 } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

// Internal Imports ----------------------------------------------------------

import { ThemeSwitcher } from "@/components/layout/ThemeSwitcher";
import { useCurrentProfileContext } from "@/contexts/CurrentProfileContext";

// Public Objects ------------------------------------------------------------

export function NavBar() {

  const { currentProfile } = useCurrentProfileContext();

  useEffect(() => {
    // Trigger a re-render when the current profile changes
  }, [currentProfile]);

  return (
    <div className="navbar bg-base-200">

      <div className="navbar-start">
        <Flower2 className="navbar-logo" size={32} />
        <Link className="font-semibold px-2" href="/">daisyui-alone</Link>
      </div>

      <div className="navbar-center gap-4">
        <Link className="btn btn-outline" href="/buttons">Buttons</Link>
        <Link className="btn btn-outline" href="/cards">Cards</Link>
        <Link className="btn btn-outline" href="/forms">Forms</Link>
        <Link className="btn btn-outline" href="/inputs">Inputs</Link>
      </div>

      <div className="navbar-end">
        {currentProfile && (
          <span className="text-secondary p-2">{currentProfile.email}</span>
        )}
        <ThemeSwitcher />
      </div>

    </div>
  )

}
