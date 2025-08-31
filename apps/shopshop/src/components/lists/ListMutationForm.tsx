/**
 * Mutation form for lists (create, update, delete)
 */

// External Modules ----------------------------------------------------------

//import { List } from "@repo/db-shopshop/dist";
import { ActionResult, ServerResult, useAppForm } from "@repo/tanstack-form/useAppForm";
import { MutationFormProps } from "@repo/tanstack-table/DataTable";
import { useState } from "react";
import { toast } from "react-toastify";

// Internal Modules ----------------------------------------------------------

import { createList, removeList, updateList } from "@/actions/ListActions";
import { ListPlus } from "@/types/Types";
import {ListCreateSchema, ListCreateSchemaType, ListUpdateSchema, ListUpdateSchemaType} from "@/zod-schemas/ListSchema";

// Public Objects ------------------------------------------------------------

export function ListMutationForm<List>({ data, isRemoving, onComplete }: MutationFormProps<List>) {

  const isCreating = !data && !isRemoving;
  const isUpdating = !!data && !isRemoving;
  const [result, setResult] = useState<ActionResult<ListPlus> | null>(null);

  // Set up form

  const defaultValuesCreate: ListCreateSchemaType = {
    name: "",
    private: false,
  }
  const defaultValuesUpdate: ListUpdateSchemaType = {
    name: data? (data as any).name : "",
    private: data ? (data as any).private : false,
  }
  const form = useAppForm({
    defaultValues: isCreating ? defaultValuesCreate : defaultValuesUpdate,
    onSubmit: async ({ value }) => {
      await submitForm(value);
    },
    validators: {
      onBlur: isCreating ? ListCreateSchema : ListUpdateSchema,
      onChange: isCreating ? ListCreateSchema : ListUpdateSchema,
    },
  });

  async function confirmedCreate(formData: ListCreateSchemaType) {
    try {
      const response = await createList(formData);
      if (response.message) {
        setResult(response);
        toast.error(`Error creating List: ${response.message}`);
      } else {
        setResult(null);
        toast.success(`List '${response.model!.name}' created`);
        onComplete ? onComplete() : null;
      }
    } catch (error) {
      toast.error(`Error creating List: ${error}`);
    }
  }

  async function confirmedRemove(listId: string) {
    try {
      const response = await removeList(listId);
      if (response.message) {
        setResult(response);
        toast.error(`Error removing List: ${response.message}`);
      } else {
        setResult(null);
        toast.success(`List '${response.model!.name}' removed`);
        onComplete ? onComplete() : null;
      }
    } catch (error) {
      toast.error(`Error removing List: ${error}`);
    }
  }

  async function confirmedUpdate(listId: string, formData: ListUpdateSchemaType) {
    try {
      const response = await updateList(listId, formData);
      if (response.message) {
        setResult(response);
        toast.error(`Error updating List: ${response.message}`);
      } else {
        setResult(null);
        toast.success(`List '${response.model!.name}' updated`);
        onComplete ? onComplete() : null;
      }
    } catch (error) {
      toast.error(`Error updating List: ${error}`);
    }
  }

  async function submitForm(formData: ListCreateSchemaType | ListUpdateSchemaType) {
    if (isCreating) {
      await confirmedCreate(formData as ListCreateSchemaType);
    } else if (isUpdating) {
      await confirmedUpdate((data as any).id, formData as ListUpdateSchemaType);
    }
  }

  if (isRemoving && !data) {
    toast.error("Cannot delete a List without data!");
    return (<>ListMutationForm: No data to delete!</>);
  };

  return (
    <>
      {isRemoving && (
        <div className="card bg-base-300/50 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Confirm Deletion of List &apos;{(data as any).name}&apos;</h2>
          </div>
          <p>Are you sure you want to delete this List? This action cannot be undone.</p>
          <button
            className="btn btn-warning justify-center m-4"
            onClick={() => confirmedRemove((data as any).id)}
          >
            Confirm Delete
          </button>
        </div>
      )}
      {(isCreating || isUpdating) && (
        <div className="card bg-base-300/50 shadow-xl">
          <div className="card-body">
            {result && (
              <h2 className="card-title justify-center">
                <ServerResult result={result} />
              </h2>
            )}
            <h2 className="card-title justify-center">
              {isCreating && "Creating New List"}
              {isUpdating && "Updating Existing List"}
            </h2>
            <form
              className="flex flex-col gap-2"
              name="ListMutationForm"
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
              <form.AppForm>
                <div className="flex flex-row justify-between">
                  <form.SubmitButton/>
                  <form.ResetButton/>
                </div>
              </form.AppForm>
            </form>
          </div>
        </div>
      )}
    </>
  );

}
