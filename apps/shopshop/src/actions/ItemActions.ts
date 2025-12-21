"use server";

/**
 *  Actions for Item models.
 */

// External Modules ----------------------------------------------------------

import { ActionResult, ValidationActionResult, ERRORS } from "@repo/shadcn-tanstack-form/ActionResult";
import {Category, dbShopShop as db, Item, MemberRole} from "@repo/db-shopshop/dist";
import { serverLogger as logger } from "@repo/shared-utils/ServerLogger";
import { ZodError } from "zod";

// Internal Modules ----------------------------------------------------------

import { findProfile } from "@/lib/ProfileHelpers";
import { IdSchema, type IdSchemaType } from "@/zod-schemas/IdSchema";
import {
  ItemCreateSchema,
  type ItemCreateSchemaType,
  ItemUpdateSchema,
  type ItemUpdateSchemaType,
} from "@/zod-schemas/ItemSchema";

// Public Objects ------------------------------------------------------------

/**
 * Handle request to create an Item.
 */
export async function createItem(data: ItemCreateSchemaType): Promise<ActionResult<Item>> {

  // Check authentication
  const profile = await findProfile();
  if (!profile) {
    return ({ message: ERRORS.AUTHENTICATION });
  }

  // Check authorization
  const member = await db.member.findFirst({
    where: {
      listId: data.listId,
      profileId: profile.id,
    },
  });
  if (!member) {
    logger.error({
      context: "ItemActions.createItem.authorization",
      message: "Not authorized to create Item for that List",
      profileId: profile.id,
      listId: data.listId,
    });
    return ({ message: ERRORS.NOT_MEMBER });
  }
  const category = await db.category.findFirst({
    where: {
      id: data.categoryId,
      listId: data.listId,
    },
  });
  if (!category) {
    logger.error({
      context: "ItemActions.createItem.authorization",
      message: "That Category does not exist on this List",
      profileId: profile.id,
      listId: data.listId,
      categoryId: data.categoryId,
    });
    return ({ message: "This Category does not exist on this List" });
  }

  // Check data validity
  try {
    ItemCreateSchema.parse(data);
  } catch (error) {
    const result = ValidationActionResult<Item>(error as ZodError);
    logger.error({
      context: "ItemActions.createItem.validation",
      data,
      result,
    })
    return (result);
  }

  // Perform the action
  try {

    logger.trace({
      context: "ItemActions.createItem.Item",
      message: "Creating Item",
      data,
      profile: {
        ...profile,
        password: "*REDACTED*",
      },
    });
    const created = await db.item.create({
      data,
    });

    logger.trace({
      context: "ItemActions.createItem",
      message: "Item created successfully",
      itemId: created.id,
    });
    return ({ model: created });

  } catch (error) {

    logger.error({
      context: "ItemActions.createItem",
      message: "Error creating Item",
      data,
      error,
    });
    return ({ message: ERRORS.INTERNAL_SERVER_ERROR });

  }

}

/**
 * Handle request to remove an Item.
 */
export async function removeItem(itemId: IdSchemaType): Promise<ActionResult<Item>> {

  // Check authentication
  const profile = await findProfile();
  if (!profile) {
    return ({ message: ERRORS.AUTHENTICATION });
  }

  // Check authorization and Item existence
  const item = await db.item.findUnique({
    where: {
      id: itemId,
    },
  });
  if (!item) {
    const message = "That Item does not exist";
    logger.error({
      context: "ItemActions.removeItem.existence",
      message,
      itemId,
      profileId: profile.id,
    });
    return ({ message: "That Item does not exist" });
  }
  const member = await db.member.findFirst({
    where: {
      listId: item.listId,
      profileId: profile.id,
    }
  });
  if (!member || member.role !== MemberRole.ADMIN) {
    logger.error({
      context: "ItemActions.removeItem.authorization",
      message: "Not authorized to remove that Item",
      itemId,
      profileId: profile.id,
    });
    return ({ message: ERRORS.NOT_ADMIN });
  }

  // Check data validity
  try {
    IdSchema.parse(itemId);
  } catch (error) {
    logger.error({
      context: "ItemActions.removeItem.validation",
      itemId,
      error,
    });
    return ValidationActionResult(error as ZodError);
  }

  // Perform the action
  try {

    const removed = await db.item.delete({
      where: { id: itemId },
    });

    logger.trace({
      context: "ItemActions.removeItem",
      message: "Item removed successfully",
      itemId: removed.id,
    });
    return ({ model: item });

  } catch (error) {

    logger.error({
      context: "ItemActions.removeItem",
      message: "Failed to remove Item",
      itemId,
      error
    });
    return ({ message: ERRORS.INTERNAL_SERVER_ERROR });

  }

}

/**
 * Handle request to update an Item.
 */
export async function updateItem(itemId: IdSchemaType, data: ItemUpdateSchemaType): Promise<ActionResult<Item>> {

  // Check authentication
  const profile = await findProfile();
  if (!profile) {
    return ({ message: ERRORS.AUTHENTICATION });
  }

  // Check authorization and Item existence
  const item = await db.item.findUnique({
    where: {
      id: itemId,
    },
  });
  if (!item) {
    logger.error({
      context: "ItemActions.updateItem.existence",
      message: "That Item does not exist",
      itemId,
      profileId: profile.id,
    });
    return ({ message: "That Item does not exist" });
  }
  const member = await db.member.findFirst({
    where: {
      listId: item.listId,
      profileId: profile.id,
    },
  });
  if (!member) {
    logger.error({
      context: "ItemActions.updateItem.membership",
      message: ERRORS.NOT_MEMBER,
      itemId,
      profileId: profile.id,
    });
    return ({ message: ERRORS.NOT_MEMBER });
  }

  // Check data validity
  try {
    IdSchema.parse(itemId);
  } catch (error) {
    logger.error({
      context: "ItemActions.updateItem.validation.id",
      itemId,
      error,
    });
    ValidationActionResult(error as ZodError)
  }
  try {
    ItemUpdateSchema.parse(data);
  } catch (error) {
    logger.error({
      context: "ItemActions.updateItem.validation.data",
      data,
      error,
    });
    return ValidationActionResult(error as ZodError);
  }

  // Perform the action
  try {

    const updated = await db.item.update({
      data: {
        ...data,
        id: itemId,   // No cheating allowed
      },
      where: { id: itemId },
    });

    logger.trace({
      context: "ItemActions.updateItem",
      message: "Item updated successfully",
      itemId: updated.id,
    });
    return ({ model: updated });

  } catch (error) {

    logger.error({
      context: "ItemActions.updateItem",
      message: "Failed to update Item",
      itemId,
      data,
      error,
    });
    return ({ message: ERRORS.INTERNAL_SERVER_ERROR });

  }

}

