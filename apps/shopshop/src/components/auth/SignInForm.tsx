"use client";

/**
 * Form for the Sign In page.
 */

// External Modules ----------------------------------------------------------

import { Profile } from "@repo/db-shopshop/dist";
import { clientLogger as logger } from "@repo/shared-utils/ClientLogger";
import { ActionResult } from "@repo/tanstack-form/ActionResult";
import { ServerResult } from "@repo/tanstack-form/ServerResult";
import { useAppForm } from "@repo/tanstack-form/useAppForm";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

// Internal Modules ----------------------------------------------------------

import { doSignInAction } from "@/actions/AuthActions";
import { SignInSchema, type SignInSchemaType } from "@/zod-schemas/SignInSchema";

// Public Objects ------------------------------------------------------------

export function SignInForm() {

  const router = useRouter();
  const [result, setResult] = useState<ActionResult<Profile> | null>(null);

  const defaultValues: SignInSchemaType = {
    email: "",
    password: "",
  }

  const form = useAppForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      await submitForm(value);
    },
    validators: {
      onBlur: SignInSchema,
      onChange: SignInSchema,
    },
  });

  async function submitForm(formData: SignInSchemaType) {

    logger.trace({
      context: "SignInForm.submitForm.input",
      formData: {
        ...formData,
        password: "*REDACTED*",
      }
    });

    const result = await doSignInAction(formData);
    if (result.model) {

      logger.trace({
        context: "SignInForm.submitForm.success",
        email: formData.email,
      });
      setResult(null);
      toast.success("Welcome to this application!");
      router.push("/"); // TODO - choose a better landing page

    } else {

      logger.trace({
        context: "SignInForm.submitForm.error",
        error: result.message,
      });
      setResult({ message: "Invalid email or password, please try again" });

    }

  }

  return (
    <div className="card bg-info/50 border-2 rounded-2xl w-96">
      <div className="card-body">
        <h2 className="card-title justify-center">
          <p>Sign In</p>
        </h2>
        <ServerResult result={result}/>
        <form
          className="flex flex-col gap-2"
          name="SignInForm"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.AppField name="email">
            {(field) =>
              <field.InputField
                autoFocus
                label="Email"
                placeholder="Your email address"
              />}
          </form.AppField>
          <form.AppField name="password">
            {(field) =>
              <field.InputField
                label="Password"
                placeholder="Your Password"
                type="password"
              />}
          </form.AppField>
          <form.AppForm>
            <div className="flex flex-row justify-center pt-2 gap-4">
              <form.SubmitButton label="Sign In"/>
              <form.ResetButton/>
            </div>
          </form.AppForm>
        </form>
      </div>
    </div>
  )

}
