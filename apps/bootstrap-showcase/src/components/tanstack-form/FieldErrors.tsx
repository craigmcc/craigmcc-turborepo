"use client";

/**
 * TanStack Form field info component (for displaying error messages).
 *
 * @packageDocumentation
 */

// External Modules ----------------------------------------------------------

import { AnyFieldApi } from "@tanstack/form-core";

// Internal Modules ----------------------------------------------------------

// Public Objects ------------------------------------------------------------

// TODO - use react-bootstrap components instead of daisyui CSS.
export function FieldErrors({ field }: { field: AnyFieldApi }) {
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
