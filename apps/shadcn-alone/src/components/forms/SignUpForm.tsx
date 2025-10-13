"use client";

/**
 * Form for the Sign Up page.
 *
 * @packageDocumentation
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
} from "@repo/shadcn-ui/components/card";
import { ServerResult } from "@repo/shadcn-tanstack-form/ServerResult";
import { useAppForm } from "@repo/shadcn-tanstack-form/useAppForm";
import { clientLogger as logger } from "@repo/shared-utils/ClientLogger";
import { Result } from "@repo/shared-utils/Result";
//import { useRouter } from "next/navigation";
import {  useState } from "react";
import { toast } from "react-toastify";

// Internal Modules ----------------------------------------------------------

import { doSignUpAction } from "@/actions/AuthActions";
import { useCurrentProfileContext } from "@/contexts/CurrentProfileContext";
import { Profile } from "@/types/types";
import { SignUpSchema, type SignUpSchemaType } from "@/zod-schemas/SignUpSchema";

// Public Objects ------------------------------------------------------------

export function SignUpForm() {

  const [result, setResult] = useState<Result<Profile> | null>(null);
  const { setCurrentProfile } = useCurrentProfileContext();
//  const router = useRouter();

  const defaultValues: SignUpSchemaType = {
    confirmPassword: "",
    email: "",
    firstName: "",
    lastName: "",
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

    const result = await doSignUpAction(formData);
    if (result.model) {

      logger.trace({
        context: "SignUpForm.submitForm.success",
        email: formData.email,
      })
      setResult(null);
      setCurrentProfile(result.model);
      toast.success(`Profile for '${formData.firstName} ${formData.lastName}' was successfully created`);
      // In a real application, we would redirect the user to the home page
//      router.push("/");

    } else {

      logger.trace({
        context: "SignUpForm.submitForm.error",
        error: result.message,
      })
      setResult(result);
    }

  }

  return (
    <Card className="w-128 bg-secondary text-secondary-foreground border-2 rounded-2xl">
      <CardHeader>
        <CardTitle className="w-full text-center">Sign Up</CardTitle>
        <CardDescription className="text-center">
          Enter your details to create your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ServerResult result={result}/>
        <form
          className="flex flex-col gap-4"
          name="SignUpForm"
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
          <div className="flex flex-row gap-2">
            <form.AppField name="firstName">
              {(field) =>
                <field.InputField
                  label="First Name"
                  placeholder="Your First Name"
                />}
            </form.AppField>
            <form.AppField name="lastName">
              {(field) =>
                <field.InputField
                  label="Last Name"
                  placeholder="Your Last Name"
                />}
            </form.AppField>
          </div>
          <div className="flex flex-row gap-2">
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
      </CardContent>
    </Card>
  )

}
