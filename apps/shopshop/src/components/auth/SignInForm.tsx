"use client";

/**
 * Form for the Sign In page.
 */

// External Modules ----------------------------------------------------------

import { Profile } from "@repo/db-shopshop/dist";
import { ActionResult } from "@repo/shadcn-tanstack-form/ActionResult";
import { ServerResult } from "@repo/shadcn-tanstack-form/ServerResult";
import { useAppForm } from "@repo/shadcn-tanstack-form/useAppForm";
import {
  Card,
//  CardAction,
  CardContent,
  CardDescription,
//  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/shadcn-ui/components/card";
import { clientLogger as logger } from "@repo/shared-utils/ClientLogger";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

// Internal Modules ----------------------------------------------------------

import { doSignInAction } from "@/actions/AuthActions";
import { SignInSchema, type SignInSchemaType } from "@/zod-schemas/SignInSchema";

// Public Objects ------------------------------------------------------------

export function SignInForm() {

  const [result, setResult] = useState<ActionResult<Profile> | null>(null);
  const router = useRouter();

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

    const response = await doSignInAction(formData);
    if (response.model) {
      setResult(null);
      toast.success("Welcome to this application!");
      router.push("/"); // TODO - choose a better landing page
    } else {
      setResult(response);
    }

  }

  return (
    <Card className="w-lg bg-secondary text-secondary-foreground border-2 rounded-2xl">
      <CardHeader>
        <CardTitle className="w-full text-center">Sign In</CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to sign in to this application.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ServerResult result={result}/>
        <form
          className="flex flex-col gap-4"
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
            <div className="w-full flex flex-row justify-center pt-2 gap-4">
              <form.SubmitButton label="Sign In" />
              <form.ResetButton/>
            </div>
          </form.AppForm>
        </form>
      </CardContent>
    </Card>
  )

}
