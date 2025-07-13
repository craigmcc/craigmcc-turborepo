"use client";

/**
 * Shared infrastructure for forms based on TanStack Form.
 */

// External Modules ----------------------------------------------------------

import { createFormHook } from "@tanstack/react-form";

// Internal Modules ----------------------------------------------------------

import { InputField } from "./InputField";
import { ResetButton } from "./ResetButton";
import { SubmitButton } from "./SubmitButton";
import { fieldContext, formContext } from "./useAppContexts";

// Public Objects ------------------------------------------------------------

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    InputField,
  },
  fieldContext,
  formComponents: {
    ResetButton,
    SubmitButton,
  },
  formContext,
});
