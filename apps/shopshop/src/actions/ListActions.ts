"use server";

/**
 * Server actions for List models.
 */

// External Modules ----------------------------------------------------------

import { ActionResult, ValidationActionResult, ERRORS } from "@repo/daisy-tanstack-form/ActionResult";
import { dbShopShop as db, List, MemberRole } from "@repo/db-shopshop/dist";
import { serverLogger as logger } from "@repo/shared-utils/ServerLogger";
import { ZodError } from "zod";

// Internal Modules ----------------------------------------------------------

import { populateList } from "@/lib/ListHelpers";
import { findProfile } from "@/lib/ProfileHelpers";
import { ListPlus } from "@/types/Types";
import { IdSchema } from "@/zod-schemas/IdSchema";
import {
  ListCreateSchema,
  ListCreateSchemaType,
  ListUpdateSchema,
  ListUpdateSchemaType
} from "@/zod-schemas/ListSchema";

// Public Objects ------------------------------------------------------------

/**
 * Handle request to create a List. The currently signed in Profile will be
 * added as an ADMIN member of the new List.
 */
export async function createList(data: ListCreateSchemaType): Promise<ActionResult<ListPlus>> {

  // Check authentication
  const profile = await findProfile();
  if (!profile) {
    return ({ message: ERRORS.AUTHENTICATION });
  }

  // Check authorization - not required - every Profile can create a List

  // Check data validity
  try {
    ListCreateSchema.parse(data);
  } catch (error) {
    const result = ValidationActionResult<ListPlus>(error as ZodError);
    logger.error({
      context: "ListActions.createList.validation",
      data,
      result,
    })
    return (result);
  }

  // Perform the action
  try {

    // Create the new List, with the current Profile as an ADMIN member
    logger.trace({
      context: "ListActions.createList.list",
      message: "Creating List",
      data,
      profile: {
        ...profile,
        password: "*REDACTED*",
      },
    });
    const created = await db.list.create({
      data: {
        ...data,
        members: {
          create: {
            profileId: profile.id,
            role: MemberRole.ADMIN,
          }
        }
      }
    });

    // Create initial Categories and Items for this List
    logger.trace({
      context: "ListActions.createList.populate",
      message: "Populating List",
      listId: created.id,
    });
    await populateList(created.id, true, true)

    logger.trace({
      context: "ListActions.createList",
      message: "List created and populated successfully",
      listId: created.id,
    });

    const populated = await db.list.findUnique({
      where: { id: created.id },
      include: {
        members: true,
      }
    });
    if (populated) {
      return {model: populated};
    } else {
      const message = "Failed to retrieve newly created List with Members";
      logger.error({
        context: "ListActions.createList",
        message,
        created,
      })
      return { message };
    }

  } catch (error) {

    logger.error({
      context: "ListActions.createList",
      message: "Error creating or populating List",
      data,
      error,
    });
    return ({ message: ERRORS.INTERNAL_SERVER_ERROR });

  }

}

/**
 * Handle request to remove a List.
 */
export async function removeList(listId: string): Promise<ActionResult<List>> {

  // Check authentication
  const profile = await findProfile();
  if (!profile) {
    return ({ message: ERRORS.AUTHENTICATION });
  }

  // Check authorization - must be an ADMIN member of the List to remove it
  const member = await db.member.findFirst({
    where: {
      listId: listId,
      profileId: profile.id,
      role: MemberRole.ADMIN,
    },
  });
  if (!member) {
    return ({ message: ERRORS.NOT_ADMIN });
  }

  // Check data validity
  try {
    IdSchema.parse(listId);
  } catch (error) {
    logger.error({
      context: "ListActions.removeList.validation",
      listId,
      error,
    });
    return ValidationActionResult(error as ZodError);
  }

  // Perform the action
  try {

    const removed = await db.list.delete({
      where: {id: listId},
    });

    logger.trace({
      context: "ListActions.removeList",
      message: "List removed successfully",
      listId: removed.id,
    });
    return ({ model: removed });

  } catch (error) {

    logger.error({
      context: "ListActions.removeList",
      message: "Failed to remove List",
      listId,
      error,
    });
    return ({ message: ERRORS.INTERNAL_SERVER_ERROR });

  }

}

/**
 * Handle request to update a List.
 */
export async function updateList(listId: string, data: ListUpdateSchemaType): Promise<ActionResult<ListPlus>> {

  // Check authentication
  const profile = await findProfile();
  if (!profile) {
    return ({message: ERRORS.AUTHENTICATION});
  }

  // Check authorization - must be an ADMIN member of the List to update it
  const member = await db.member.findFirst({
    where: {
      listId: listId,
      profileId: profile.id,
      role: MemberRole.ADMIN,
    },
  });
  if (!member) {
    return ({ message: ERRORS.NOT_ADMIN });
  }

  // Check data validity
  try {
    IdSchema.parse(listId);
  } catch (error) {
    logger.error({
      context: "ListActions.updateList.validation.id",
      listId,
      error,
    });
    return ValidationActionResult(error as ZodError);
  }
  try {
    ListUpdateSchema.parse(data);
  } catch (error) {
    logger.error({
      context: "ListActions.updateList.validation.data",
      data,
      error,
    });
    return ValidationActionResult(error as ZodError);
  }

  // Perform the action
  try {

    const updated = await db.list.update({
      data: {
        ...data,
        id: listId, // No cheating allowed
      },
      where: { id: listId },
    });

    logger.trace({
      context: "ListActions.updateList",
      message: "List updated successfully",
      listId: updated.id,
    });
    return ({ model: updated });

  } catch (error) {

    logger.error({
      context: "ListActions.updateList",
      message: "Failed to update List",
      listId,
      data,
      error,
    });
    return ({ message: ERRORS.INTERNAL_SERVER_ERROR });

  }

}
