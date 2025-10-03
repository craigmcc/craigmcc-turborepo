"use client";

/**
 * Top-level menu bar component for the shadcn-ui-alone application.
 */

// External Imports ----------------------------------------------------------

import { Slash } from "lucide-react";
import Link from "next/link";
import {
  NavigationMenu,
//  NavigationMenuContent,
//  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
//  NavigationMenuTrigger,
//  NavigationMenuViewport,
} from "@repo/shadcn-ui/components/navigation-menu";

// Internal Imports ----------------------------------------------------------

import { ThemeToggle } from "@/components/layout/ThemeToggle";

// Public Objects ------------------------------------------------------------

export function NavBar() {

  return (
/*
    <div className="navbar bg-base-200">

      <div className="navbar-start">
        <Flower2 className="navbar-logo" size={32} />
        <Link className="font-semibold px-2" href="/">shadcn-alone</Link>
      </div>

      <div className="navbar-center gap-4">
        <Link className="btn btn-outline" href="/buttons">Buttons</Link>
        <Link className="btn btn-outline" href="/cards">Cards</Link>
        <Link className="btn btn-outline" href="/forms">Forms</Link>
        <Link className="btn btn-outline" href="/inputs">Inputs</Link>
        <Link className="btn btn-outline" href="/tables">Tables</Link>
      </div>

      <div className="navbar-end">
        {currentProfile && (
          <span className="text-secondary p-2">{currentProfile.email}</span>
        )}
        <ThemeSwitcher />
      </div>

    </div>
*/
    <div className="w-full bg-base-200 flex px-4 h-20">

      <div className="flex gap-2">
        <Slash size={32} />
        <Link className="font-semibold text-lg" href="/">shadcn-alone</Link>
      </div>

      <NavigationMenu className="flex justify-center">
        <NavigationMenuList className="ml-8">
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/buttons">Buttons</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex justify-end">
        <ThemeToggle />
      </div>

    </div>
  )

}
