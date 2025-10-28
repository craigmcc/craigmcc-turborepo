"use client";

/**
 * TanStack Form reset button.
 */

// External Modules ----------------------------------------------------------

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
    <button
      onClick={(e) => {
        e.preventDefault();
        form.reset();
      }}
      className={`btn btn-accent ${className}`}
      role="button"
      type="button"
      {...props}
    >
      <span>{label ? label : "Reset"}</span>
    </button>
  )

}
