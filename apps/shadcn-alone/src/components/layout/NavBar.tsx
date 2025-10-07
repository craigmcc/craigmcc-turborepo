"use client";

/**
 * Top-level menu bar component for the shadcn-ui-alone application.
 */

// External Imports ----------------------------------------------------------

import { Component } from "lucide-react";
import Link from "next/link";
import { Button } from "@repo/shadcn-ui/components/button";

// Internal Imports ----------------------------------------------------------

import { ThemeToggle } from "@/components/layout/ThemeToggle";

// Public Objects ------------------------------------------------------------

export function NavBar() {

  return (
    <div className="flex w-full h-[60px] bg-slate-200 items-center justify-between px-2">

      <div className="flex gap-2 justify-start">
        <Component size={24} />
        <Link className="font-semibold" href="/">shadcn-alone</Link>
      </div>

      <div className="flex flex-row gap-4 justify-center">
        <Button variant="outline">
          <Link href="/buttons">Buttons</Link>
        </Button>
        <Button variant="outline">
          <Link href="/cards">Cards</Link>
        </Button>
        <Button variant="outline">
          <Link href="/forms">Forms</Link>
        </Button>
        <Button variant="outline">
          <Link href="/inputs">Inputs</Link>
        </Button>
        <Button variant="outline">
          <Link href="/tables">Tables</Link>
        </Button>
      </div>

      <div className="flex justify-end">
        <ThemeToggle />
      </div>

    </div>
  )

}
