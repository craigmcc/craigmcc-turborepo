/**
 * Forms example component.
 */

// External Modules ----------------------------------------------------------

// import clsx from "clsx";
// import Link from "next/link";

// Internal Modules ----------------------------------------------------------

import { SignInForm } from "@/components/forms/SignInForm";
import { SignOutForm } from "@/components/forms/SignOutForm";
import { SignUpForm } from "@/components/forms/SignUpForm";

// Public Objects ------------------------------------------------------------

export function Forms() {
  return (
    <div className="flex gap-8 justify-center">
      <SignInForm/>
      <SignOutForm/>
      <SignUpForm/>
    </div>
  );
}
