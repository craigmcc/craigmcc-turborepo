"use client";

/**
 * Navigation bar for this app.
 */

// External Modules ----------------------------------------------------------

import {
  Menubar,
//  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  // MenubarRadioGroup,
  // MenubarRadioItem,
  // MenubarSeparator,
  // MenubarShortcut,
  // MenubarSub,
  // MenubarSubContent,
  // MenubarSubTrigger,
  MenubarTrigger,
} from "@craigmcc/ui/components/menubar"
//import { cn } from "@craigmcc/ui/lib/utils";
import { Images } from "lucide-react";
import * as React from "react"
import Link from "next/link"

// Internal Modules ----------------------------------------------------------

import { ModeToggle } from "@/components/layout/ModeToggle"

// Public Objects ------------------------------------------------------------

export function NavBar() {
  return (
    <div className="flex flex-row justify-between items-center bg-accent test-accent-content p-2">
      <div className="flex flex-row">
        <Link className="px-2" href="/">
          <Images/>
        </Link>
        <Link href="/">
          <h1 className="font-semibold">Components Showcase</h1>
        </Link>
      </div>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>ShadCN UI</MenubarTrigger>
          <MenubarContent className="w-24 relative z-[10000]">
            <MenubarItem>
              <Link href="/shadcnui/form">Form</Link>
            </MenubarItem>
            <MenubarItem disabled={true}>
              <Link href="/shadcnui/checkbox">Checkbox</Link>
            </MenubarItem>
            <MenubarItem disabled={true}>
              <Link href="/shadcnui/input">Input</Link>
            </MenubarItem>
            <MenubarItem disabled={true}>
              <Link href="/shadcnui/select">Select</Link>
            </MenubarItem>
            <MenubarItem disabled>
              <Link href="/shadcnui/textarea">Textarea</Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Tanstack Form</MenubarTrigger>
          <MenubarContent className="w-24 relative z-[10000]">
            <MenubarItem>
              <Link href="/tanstack/form">Form</Link>
            </MenubarItem>
            <MenubarItem disabled={true}>
              <Link href="/tanstack/checkbox">Checkbox</Link>
            </MenubarItem>
            <MenubarItem disabled={true}>
              <Link href="/tanstack/input">Input</Link>
            </MenubarItem>
            <MenubarItem disabled={true}>
              <Link href="/tanstack/select">Select</Link>
            </MenubarItem>
            <MenubarItem disabled>
              <Link href="/tanstack/textarea">Textarea</Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <div>
        <ModeToggle className="px-2"/>
      </div>
    </div>

/*
    <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">Components Showcase</span>
      </div>
      <div className="block lg:hidden">
        <button
          className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
          type="button"
          aria-label="Menu"
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 5h20v2H0V8zm0 5h20v2H0v-2z" />
          </svg>
        </button>
      </div>
    </nav>
*/
  );
}
