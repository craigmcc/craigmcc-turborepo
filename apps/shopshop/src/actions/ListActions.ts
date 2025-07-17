"use server";

/**
 * Server actions for List models.
 */

// External Modules ----------------------------------------------------------

import { dbShopShop, List, MemberRole } from "@repo/db-shopshop/dist";
import { serverLogger as logger } from "@repo/shared-utils/ServerLogger";
import { ActionResult, ValidationActionResult, ERRORS } from "@repo/tanstack-form/ActionResult";
import { ZodError } from "zod";

// Internal Modules ----------------------------------------------------------

import { findProfile } from "@/lib/ProfileHelpers";
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
export async function createList(data: ListCreateSchemaType): Promise<ActionResult<List>> {

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

    const list = await dbShopShop.list.create({
      data: {
        imageUrl: data.imageUrl,
        name: data.name,
        private: data.private ?? false,
        members: {
          create: {
            profileId: profile.id,
            role: MemberRole.ADMIN,
          },
        },
      },
    });

    logger.info({
      context: "createList",
      message: "List created successfully",
      listId: list.id,
    });
    return ({model: list});

  } catch (error) {

    logger.error({
      context: "createList",
      error: error,
      message: "Failed to create List",
    });
    return ({message: ERRORS.INTERNAL_SERVER_ERROR});

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
  const member = await dbShopShop.member.findFirst({
    where: {
      listId: listId,
      profileId: profile.id,
      role: MemberRole.ADMIN,
    },
  });
  if (!member) {
    return ({message: ERRORS.NOT_ADMIN});
  }

  // Check data validity
  try {
    IdSchema.parse(listId);
  } catch (error) {
    return ValidationActionResult(error as ZodError);
  }

  // Perform the action
  try {

    const list = await dbShopShop.list.delete({
      where: {id: listId},
    });

    logger.info({
      context: "removeList",
      message: "List removed successfully",
      listId: list.id,
    });
    return ({model: list});

  } catch (error) {

    logger.error({
      context: "removeList",
      error: error,
      message: "Failed to remove List",
    });
    return ({message: ERRORS.INTERNAL_SERVER_ERROR});

  }
}

/**
 * Handle request to update a List.
 */
export async function updateList(listId: string, data: ListUpdateSchemaType): Promise<ActionResult<List>> {

  // Check authentication
  const profile = await findProfile();
  if (!profile) {
    return ({message: ERRORS.AUTHENTICATION});
  }

  // Check authorization - must be an ADMIN member of the List to update it
  const member = await dbShopShop.member.findFirst({
    where: {
      listId: listId,
      profileId: profile.id,
      role: MemberRole.ADMIN,
    },
  });
  if (!member) {
    return ({message: ERRORS.NOT_ADMIN});
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

    const list = await dbShopShop.list.update({
      where: {id: listId},
      data: {
        imageUrl: data.imageUrl || undefined,
        name: data.name || undefined,
        private: data.private || undefined,
      },
    });

    logger.info({
      context: "updateList",
      message: "List updated successfully",
      listId: list.id,
    });
    return ({model: list});

  } catch (error) {

    logger.error({
      context: "updateList",
      error: error,
      message: "Failed to update List",
    });
    return ({message: ERRORS.INTERNAL_SERVER_ERROR});

  }

}
