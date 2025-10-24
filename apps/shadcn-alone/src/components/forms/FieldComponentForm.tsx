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
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@repo/shadcn-ui/components/input-group";
import { SelectItem } from "@repo/shadcn-ui/components/select";
import { toast } from "sonner";
import { XIcon } from "lucide-react";

// Internal Modules ----------------------------------------------------------

import { ServerResult } from "@repo/shadcn-tanstack-form/ServerResult";
import { clientLogger as logger } from "@repo/shared-utils/ClientLogger";
import { Result } from "@repo/shared-utils/Result";
import { createProject } from "@/actions/ProjectActions";
import { ProjectSchema, ProjectSchemaType } from "@/zod-schemas/ProjectSchema";

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
        <CardDescription className="w-full text-center">
          Example form using the Shadcn UI Field component.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          {/* Form fields would go here */}
          <Button type="submit">Submit</Button>
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
//  users: [{ email: "" }],
}
