/**
 * Schema for the demo SignUpForm.
 */

// External Modules ----------------------------------------------------------

import { boolean, object, string } from "zod";

// Internal Modules ----------------------------------------------------------

// Public Objects ------------------------------------------------------------

export const SignUpSchema = object({
  city: string().min(2, "City is required"),
  firstName: string().min(2, "First name is required"),
  lastName: string().min(2, "Last name is required"),
  state: string().min(2, "State is required"),
  terms: boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
  username: string().min(2, "Username is required"),
  zip: string().min(2, "Zip code is required"),
});

export type SignUpSchemaType = typeof SignUpSchema._type;
