"use server";

/**
 * Server actions for List models.
 */

// External Modules ----------------------------------------------------------

import { dbShopShop as db, List, MemberRole } from "@repo/db-shopshop/dist";
import { serverLogger as logger } from "@repo/shared-utils/ServerLogger";
import { ActionResult, ValidationActionResult, ERRORS } from "@repo/tanstack-form/ActionResult";
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
    return ValidationActionResult(error as ZodError);
  }

  // Perform the action
  try {

    const created = await db.list.create({
      data: {
        ...data,
        members: {
          create: {
            profileId: profile.id,
            role: MemberRole.ADMIN,
          },
        },
      },
      include: {
        members: true,
      },
    });
    await populateList(created.id, true, true);

    logger.info({
      context: "ListActions.createList",
      message: "List created successfully",
      listId: created.id,
    });
    return ({ model: created });

  } catch (error) {

    logger.error({
      context: "ListActions.createList",
      message: "Error creating List",
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
    return ({message: ERRORS.AUTHENTICATION});
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
    return ValidationActionResult(error as ZodError);
  }

  // Perform the action
  try {

    const removed = await db.list.delete({
      where: {id: listId},
    });

    logger.info({
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
    return ValidationActionResult(error as ZodError);
  }
  try {
    ListUpdateSchema.parse(data);
  } catch (error) {
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

    logger.info({
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
      error,
    });
    return ({ message: ERRORS.INTERNAL_SERVER_ERROR });

  }

}
