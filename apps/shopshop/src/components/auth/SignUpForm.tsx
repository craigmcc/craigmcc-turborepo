"use client";

/**
 * Form for the Sign Up page.
 *
 * @packageDocumentation
 */

// External Modules ----------------------------------------------------------

import { dbShopShop, Profile } from "@repo/db-shopshop/dist";
import { clientLogger as logger } from "@repo/shared-utils/ClientLogger";
import { ActionResult } from "@repo/tanstack-form/ActionResult";
import { ServerResult } from "@repo/tanstack-form/ServerResult";
import { useAppForm } from "@repo/tanstack-form/useAppForm";
import { useRouter } from "next/navigation";
import {  useState } from "react";
import { toast } from "react-toastify";

// Internal Modules ----------------------------------------------------------

import { doSignUpAction } from "@/actions/AuthActions";
import { SignUpSchema, type SignUpSchemaType } from "@/zod-schemas/SignUpSchema";

// Public Objects ------------------------------------------------------------

export function SignUpForm() {

  const [result, setResult] = useState<ActionResult<Profile> | null>(null);
  const router = useRouter();

  const defaultValues: SignUpSchemaType = {
    confirmPassword: "",
    email: "",
    name: "",
    password: "",
  }

  const form = useAppForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      await submitForm(value);
    },
    validators: {
      onBlur: SignUpSchema,
      onChange: SignUpSchema,
    },
  });

  async function submitForm(formData: SignUpSchemaType) {

    logger.trace({
      context: "SignUpForm.submitForm.input",
      formData: {
        ...formData,
        confirmPassword: "*REDACTED*",
        password:"*REDACTED*",
      }
    });

    const response = await doSignUpAction(formData);
    if (response.model) {
      setResult(null);
      toast.success(`Profile for '${formData.name}' was successfully created`);
      router.push("/auth/signIn");
    } else {
      setResult(response);
    }

  }

  return (
    <div className="card bg-info/50 border-2 rounded-2xl w-128">
      <div className="card-body">
        <h2 className="card-title justify-center">
          <p>Sign Up</p>
        </h2>
        <ServerResult result={result}/>
        <form
          className="flex flex-col gap-2"
          name="SignUpForm"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div className="flex gap-2">
            <form.AppField name="email">
              {(field) =>
                <field.InputField
                  autoFocus
                  label="Email"
                  placeholder="Your email address"
                />}
            </form.AppField>
          </div>
          <div className="flex flex-row gap-2">
            <form.AppField name="name">
              {(field) =>
                <field.InputField
                  label="Name"
                  placeholder="Your Name"
                />}
            </form.AppField>
          </div>
          <div className="flex flex-row 2-full gap-2">
            <form.AppField name="password">
              {(field) =>
                <field.InputField
                  label="Password"
                  placeholder="Your Password"
                  type="password"
                />}
            </form.AppField>
            <form.AppField name="confirmPassword">
              {(field) =>
                <field.InputField
                  label="Confirm Password"
                  placeholder="Confirm Your Password"
                  type="password"
                />}
            </form.AppField>
          </div>
            <form.AppForm>
              <div className="flex flex-row justify-center pt-2 gap-4">
                <form.SubmitButton label="Sign Up" />
                <form.ResetButton/>
                </div>
            </form.AppForm>
        </form>
      </div>
    </div>
  )

}
