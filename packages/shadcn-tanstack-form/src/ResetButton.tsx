"use client";

/**
 * TanStack Form reset button (for ShadCN).
 */

// External Modules ----------------------------------------------------------

import { Button } from "@repo/shadcn-ui/components/button";
import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

// Internal Modules ----------------------------------------------------------

import { useFormContext } from "./useAppContexts";

// Public Objects ------------------------------------------------------------

type Props = {
  // Optional CSS classes to apply to the button.
  className?: string,
  // Optional label for the button.  [Reset]
  label?: string,
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function ResetButton({ className, label, ...props }: Props) {

  const form = useFormContext();

  return (
    <Button
      onClick={(e) => {
        e.preventDefault();
        form.reset();
      }}
      className={clsx("bg-accent text-accent", className)}
      role="button"
      type="button"
      {...props}
    >
      <span>{label ? label : "Reset"}</span>
    </Button>
  )

}
