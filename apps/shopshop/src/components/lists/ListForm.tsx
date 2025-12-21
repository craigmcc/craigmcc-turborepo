"use client";

/**
 * Form for creating, removing, or updating Lists.
 */

// External Modules ----------------------------------------------------------

import { ActionResult } from "@repo/shadcn-tanstack-form/ActionResult";
import { ServerResult } from "@repo/shadcn-tanstack-form/ServerResult";
import { useAppForm } from "@repo/shadcn-tanstack-form/useAppForm";
import { Button } from "@repo/shadcn-ui/components/button";
import {
  Card,
//  CardAction,
  CardContent,
//  CardDescription,
//  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/shadcn-ui/components/card";
import { clientLogger as logger } from "@repo/shared-utils/ClientLogger";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

// Internal Modules ----------------------------------------------------------

import { createList, removeList, updateList } from "@/actions/ListActions";
import { ListPlus } from "@/types/Types";
import {
  ListCreateSchema,
  ListCreateSchemaType,
  ListUpdateSchema,
  ListUpdateSchemaType
} from "@/zod-schemas/ListSchema";

// Public Objects ------------------------------------------------------------

export type ListFormProps = {
  // The List to be removed or edited (if any).  Null means creating a new List
  list?: ListPlus;
  // Are we removing this List? [false]
  removing?: boolean;
}

const DESTINATION = "/lists";

export function ListForm({ list, removing }: ListFormProps) {

  const isCreating = !list;
  const isRemoving = removing && !!list;
  const isUpdating = !!list && !removing;
  const [result, setResult] = useState<ActionResult<ListPlus> | null>(null);
  const router = useRouter();

  // Set up the form
  const defaultValuesCreate: ListCreateSchemaType = {
    name: "",
    private: false,
  }
  const defaultValuesUpdate: ListUpdateSchemaType = {
    name: list?.name || "",
    private: list?.private || false,
  }
  const form = useAppForm({
    defaultValues: isCreating ? defaultValuesCreate : defaultValuesUpdate,
    onSubmit: async ({value}) => {
      await submitForm(value);
    },
    validators: {
      onBlur: isCreating ? ListCreateSchema : ListUpdateSchema,
      onChange: isCreating ? ListCreateSchema : ListUpdateSchema,
    },
  });

  // Invoke the requested action based on our mode
  async function submitForm(formData: ListCreateSchemaType | ListUpdateSchemaType) {
    {
      if (isCreating) {
        const response = await createList(formData as ListCreateSchemaType);
        if (response.message) {
          setResult(response);
          logger.error({
            context: "ListForm.submitForm.create.error",
            response,
          })
          toast.error(`Error creating List: ${response.message}`);
        } else {
          setResult(null);
          toast.success(`List '${response.model!.name}' created successfully`);
          router.push(DESTINATION);
        }
      } else if (isRemoving) {
        const response = await removeList(list!.id);
        if (response.message) {
          setResult(response);
          logger.error({
            context: "ListForm.submitForm.remove.error",
            list,
            response,
          })
          toast.error(`Error removing List: '${response.message}'`);
        } else {
          setResult(null);
          toast.success(`List "${response.model!.name}" removed successfully`);
          router.push(DESTINATION);
        }
      } else if (isUpdating) {
        const response = await updateList(list!.id, formData as ListUpdateSchemaType);
        if (response.message) {
          setResult(response);
          logger.error({
            context: "ListForm.submitForm.remove.error",
            list,
            response,
          })
          toast.error(`Error updating List: '${response.message}'`);
        } else {
          setResult(null);
          toast.success(`List '${response.model!.name}' updated successfully`);
          router.push(DESTINATION);
        }
      } else {
        logger.error({
          context: "ListForm.submitForm.mode",
          message: "Unknown mode",
          isCreating,
          isRemoving,
          isUpdating,
          list,
        });
        setResult({ message: "Unknown mode, 'removing' was set with no List" } );
      }
    }

  }

  return (
    <Card className="w-3xl bg-secondary text-secondary-foreground border-2 rounded-2xl">
      <CardHeader>
        <CardTitle className="w-full text-center">
          { isCreating && "Create New List" }
          { isRemoving && "Remove Existing List" }
          { isUpdating && "Update Existing List" }
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ServerResult result={result}/>
        { isRemoving ? (
          <>
          <div className="flex flex-row mb-3 w-full justify-center">
            Are you sure you want to remove List '{list!.name}'?)
          </div>
          <div className="flex flex-row w-full justify-center gap-4">
            <Button
              onClick={() => router.push(DESTINATION)}
              variant="default"
            >
              Cancel
            </Button>
            <Button
              onClick={() => form.handleSubmit(list)}
              variant="destructive"
            >
              Remove
            </Button>
          </div>
          </>
        ) : (
          <form
            className="flex flex-col gap-4"
            name={ isCreating ? "ListCreateForm" : "ListUpdateForm" }
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <form.AppField name="name">
              {(field) =>
                <field.InputField
                  autoFocus
                  label="List Name"
                  placeholder="List Name"
                />}
            </form.AppField>
            // TODO - add 'private' as a CheckboxField when we support it
            <form.AppForm>
              <div className="flex flex-row justify-between">
                <form.SubmitButton/>
                <form.ResetButton/>
              </div>
            </form.AppForm>
          </form>
        )}
      </CardContent>
    </Card>
  )

}
