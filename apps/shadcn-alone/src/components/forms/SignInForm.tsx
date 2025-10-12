"use client";

/**
 * Form for the Sign In page.
 */

// External Modules ----------------------------------------------------------

import {
  Card,
//  CardAction,
  CardContent,
  CardDescription,
//  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/shadcn-ui/components/card"
import { clientLogger as logger } from "@repo/shared-utils/ClientLogger";
import { Result } from "@repo/shared-utils/Result";
import { ServerResult } from "@repo/shadcn-tanstack-form/ServerResult";
import { useAppForm } from "@repo/shadcn-tanstack-form/useAppForm";
//import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

// Internal Modules ----------------------------------------------------------

import { doSignInAction } from "@/actions/AuthActions";
import { useCurrentProfileContext } from "@/contexts/CurrentProfileContext";
import { Profile } from "@/types/types";
import { SignInSchema, type SignInSchemaType } from "@/zod-schemas/SignInSchema";

// Public Objects ------------------------------------------------------------

export function SignInForm() {

  const [result, setResult] = useState<Result<Profile> | null>(null);
  const { setCurrentProfile } = useCurrentProfileContext();
//  const router = useRouter();

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
      setCurrentProfile(result.model);
      toast.success("Welcome to this application!");
      // In a real application, we would redirect to a dashboard or home page.
//      router.push("/lists");

    } else {

      logger.trace({
        context: "SignInForm.submitForm.error",
        error: result.message,
      });
      setResult({ message: result.message });

    }

  }

  return (
    <Card className="w-96 bg-secondary border-2 rounded-2xl">
      <CardHeader>
        <CardTitle className="w-full text-center">Sign In</CardTitle>
        <CardDescription className="text-center">
          Enter your email and password to sign in.
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
            <div className="flex flex-row justify-center pt-2 gap-4">
              <form.SubmitButton label="Sign In"/>
              <form.ResetButton/>
            </div>
          </form.AppForm>
        </form>
      </CardContent>
    </Card>
/*
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
*/
  )

}
