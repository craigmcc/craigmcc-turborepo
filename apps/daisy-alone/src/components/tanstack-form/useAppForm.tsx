"use client";

/**
 * Shared infrastructure for forms based on TanStack Form.
 */

// External Modules ----------------------------------------------------------

import { createFormHook } from "@tanstack/react-form";

// Internal Modules ----------------------------------------------------------

import { InputField } from "@/components/tanstack-form/InputField";
import { ResetButton } from "@/components/tanstack-form/ResetButton";
import { SubmitButton } from "@/components/tanstack-form/SubmitButton";
import { fieldContext, formContext } from "@/components/tanstack-form/useAppContexts";

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
