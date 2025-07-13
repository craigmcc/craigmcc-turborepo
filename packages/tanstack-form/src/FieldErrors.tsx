"use client";

/**
 * TanStack Form field error messages component.
 */

// External Modules ----------------------------------------------------------

import { AnyFieldApi } from "@tanstack/react-form";

// Internal Modules ----------------------------------------------------------

// Public Objects ------------------------------------------------------------

type Props = {
  // The field API for which to display errors.
  field: AnyFieldApi;
}

export function FieldErrors({ field }: Props) {
  return (
    <>
    {field.state.meta.errors && (
      <div className="label">
        <span className="label-text-alt text-error">
          {field.state.meta.errors.map((e => e.message)).join(', ')}
        </span>
      </div>
      )}
    </>
  )
}
