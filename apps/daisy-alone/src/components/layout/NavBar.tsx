/**
 * Top-level menu bar component for the daisyui-alone application.
 */

// External Imports ----------------------------------------------------------

import { Flower2 } from "lucide-react";
import Link from "next/link";

// Internal Imports ----------------------------------------------------------

// Public Objects ------------------------------------------------------------

export function NavBar() {

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
      </div>

      <div className="navbar-end">
        <span>TODO: Theme Switcher</span>
      </div>

    </div>
  )

}
