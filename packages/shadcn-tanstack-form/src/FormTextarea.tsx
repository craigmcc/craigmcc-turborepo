/**
 * Textarea component using Tanstack Form and Shadcn UI.
 */

// External Modules ----------------------------------------------------------

import { Textarea } from "@repo/shadcn-ui/components/textarea";

// Internal Modules ----------------------------------------------------------

import { FormBase, FormControlProps } from "./FormBase";
import { useFieldContext } from "./useAppContexts";

// Public Objects ------------------------------------------------------------

export function FormTextarea(props: FormControlProps) {
  const field = useFieldContext<string>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <FormBase {...props}>
      <Textarea
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={e => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
      />
    </FormBase>
  )
}
