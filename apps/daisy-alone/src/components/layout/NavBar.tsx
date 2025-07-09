/**
 * Top-level menu bar component for the daisyui-alone application.
 */

// External Imports ----------------------------------------------------------

import Image from "next/image";
import Link from "next/link";

// Internal Imports ----------------------------------------------------------

// Public Objects ------------------------------------------------------------

export function NavBar() {

  return (
    <div className="navbar bg-base-200">

      <div className="navbar-start">
{/*
        <Image
          alt="DaisyUI Logo"
          className="navbar-logo"
          height={50}
          src="/daisyui-logo-2000.png"
          width={50} />
*/}
        <Link className="font-semibold p-2" href="/">daisyui-alone</Link>
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
