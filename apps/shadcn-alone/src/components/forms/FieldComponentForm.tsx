"use client";

/**
 * Form component that features the Shadcn UI field component.
 */

// External Modules ----------------------------------------------------------

import { useAppForm } from "@repo/shadcn-tanstack-form/useAppForm";
import { Button } from "@repo/shadcn-ui/components/button";
import {
  Card,
//  CardAction,
  CardContent,
  CardDescription,
//  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/shadcn-ui/components/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
//  FieldSeparator,
  FieldSet,
} from "@repo/shadcn-ui/components/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@repo/shadcn-ui/components/input-group"
import { SelectItem } from "@repo/shadcn-ui/components/select";
import { toast } from "sonner";
import { XIcon } from "lucide-react";

// Internal Modules ----------------------------------------------------------

//import { ServerResult } from "@repo/shadcn-tanstack-form/ServerResult";
//import { clientLogger as logger } from "@repo/shared-utils/ClientLogger";
//import { Result } from "@repo/shared-utils/Result";
import { createProject } from "@/actions/ProjectActions";
import { ProjectSchema, ProjectSchemaType, PROJECT_STATUSES } from "@/zod-schemas/ProjectSchema";

// Public Objects ------------------------------------------------------------

export function FieldComponentForm() {

  const form = useAppForm({
    defaultValues,
    validators: {
      onBlur: ProjectSchema,
      onChange: ProjectSchema,
      onSubmit: ProjectSchema, // TODO - needed?
    },
    onSubmit: async ({ value }) => {
      const result = await createProject(value);
      if (result.success) {
        toast.success("Project created successfully!", {
          className: "whitespace-pre-wrap font-mono",
          description: JSON.stringify(value, null, 2),
        });
        form.reset();
      } else {
        toast.error("Failed to create project.");
      }
    },
  });

  return (
    <Card className="w-128 bg-secondary text-secondary-foreground border-2 rounded-2xl">
      <CardHeader>
        <CardTitle className="w-full text-center">Field Component Form</CardTitle>
{/*
        <CardDescription className="w-full text-center">
          Example form using the Shadcn UI Field component.
        </CardDescription>
*/}
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}>
          <FieldGroup>

            <div className="grid grid-cols-3 gap-2">

              <div className="col-span-2">
              <form.AppField name="name">
                {field => (
                  <field.Input label="Name"/>
                )}
              </form.AppField>
              </div>

              <form.AppField name="status">
                {field => (
                  <field.Select label="Status">
                    {PROJECT_STATUSES.map(status => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </field.Select>
                )}
              </form.AppField>

            </div>

            <form.AppField name="description">
              {field => (
                <field.Textarea
                  // description="Be as specific as possible"
                  label="Description"
                />
              )}
            </form.AppField>

            <FieldSet>
              <FieldContent>
                <FieldLegend>Notifications</FieldLegend>
                <FieldDescription>
                  Select how you would like to receive notifications.
                </FieldDescription>
              </FieldContent>

              <FieldGroup data-slot="checkbox-group">
                <div className="grid grid-cols-3 gap-2">
                  <form.AppField name="notifications.email">
                    {field => <field.Checkbox label="Email" />}
                  </form.AppField>

                  <form.AppField name="notifications.sms">
                    {field => <field.Checkbox label="Text" />}
                  </form.AppField>

                  <form.AppField name="notifications.push">
                    {field => <field.Checkbox label="In App" />}
                  </form.AppField>
                </div>
              </FieldGroup>
            </FieldSet>

            {/*<FieldSeparator/>*/}

            <form.AppField name="users" mode="array">
              {field => {
                return (
                  <FieldSet>
                    <div className="flex justify-between gap-2 items-center">
                      <FieldContent>
                        <FieldLegend variant="label" className="mb-0">
                          User Email Addresses
                        </FieldLegend>
                        <FieldDescription>
                          Add up to 5 users to this project (including yourself).
                        </FieldDescription>
                        {field.state.meta.errors && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </FieldContent>

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => field.pushValue({ email: "" })}
                      >
                        Add User
                      </Button>
                    </div>

                    <FieldGroup>
                      {field.state.value.map((_, index) => (
                        <form.AppField key={index} name={`users[${index}].email`}>
                          {innerField => {
                            const isInvalid =
                              innerField.state.meta.isTouched &&
                              !innerField.state.meta.isValid

                            return (
                              <Field data-invalid={isInvalid}>
                                <InputGroup>
                                  <InputGroupInput
                                    type="email"
                                    id={innerField.name}
                                    aria-invalid={isInvalid}
                                    aria-label={`User ${index + 1} email`}
                                    onBlur={innerField.handleBlur}
                                    onChange={e =>
                                      innerField.handleChange(e.target.value)
                                    }
                                    value={innerField.state.value}
                                  />
                                  <InputGroupAddon align="inline-end">
                                    <InputGroupButton
                                      type="button"
                                      variant="ghost"
                                      size="icon-xs"
                                      onClick={() => field.removeValue(index)}
                                      aria-label={`Remove user ${index + 1}`}
                                    >
                                      <XIcon />
                                    </InputGroupButton>
                                  </InputGroupAddon>
                                </InputGroup>

                                {isInvalid && (
                                  <FieldError
                                    errors={innerField.state.meta.errors}
                                  />
                                )}
                              </Field>
                            )
                          }}
                        </form.AppField>
                      ))}
                    </FieldGroup>
                  </FieldSet>
                )
              }}
            </form.AppField>

            <Button>Create</Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )

}

// Private Objects -----------------------------------------------------------

const defaultValues: ProjectSchemaType = {
  description: "",
  name: "",
  notifications: {
    email: false,
    push: false,
    sms: false,
  },
  status: "draft",
  users: [{ email: "" }],
}
