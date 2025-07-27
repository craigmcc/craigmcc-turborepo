"use server"

/**
 *  Actions for Category models.
 */

// External Modules ----------------------------------------------------------

import { dbShopShop as db, Category, MemberRole } from "@repo/db-shopshop/dist";
import { serverLogger as logger } from "@repo/shared-utils/ServerLogger";
import { ActionResult, ValidationActionResult, ERRORS } from "@repo/tanstack-form/ActionResult";
import { ZodError } from "zod";

// Internal Modules ----------------------------------------------------------

import { findProfile } from "@/lib/ProfileHelpers";
import { IdSchema, type IdSchemaType } from "@/zod-schemas/IdSchema";
import {
  CategoryCreateSchema,
  type CategoryCreateSchemaType,
  CategoryUpdateSchema,
  type CategoryUpdateSchemaType,
} from "@/zod-schemas/CategorySchema";

// Public Objects ------------------------------------------------------------

/**
 * Handle request to create a Category.
 */
export async function createCategory(data: CategoryCreateSchemaType): Promise<ActionResult<Category>> {

  // Check authentication
  const profile = await findProfile();
  if (!profile) {
    return ({ message: ERRORS.AUTHENTICATION });
  }

  // Check authorization
  const list = await db.list.findFirst({
    where: {
      id: data.listId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  if (!list) {
    return ({ message: ERRORS.NOT_MEMBER });
  }

  // Check data validity
  try {
    data = CategoryCreateSchema.parse(data);
  } catch (error) {
    return ValidationActionResult(error as ZodError);
  }

  // Perform the action
  try {

    const created = await db.category.create({
      data,
    });

    logger.info({
      context: "createCategory",
      message: "Category created successfully",
      categoryId: created.id,
    });
    return ({ model: created });

  } catch (error) {

    logger.error({
      context: "createCategory",
      message: "Error creating Category",
      error,
    });
    return ({ message: ERRORS.INTERNAL_SERVER_ERROR });

  }

}

/**
 * Handle request to remove a Category.
 */
export async function removeCategory(categoryId: IdSchemaType): Promise<ActionResult<Category>> {

  // Check authentication
  const profile = await findProfile();
  if (!profile) {
    return ({ message: ERRORS.AUTHENTICATION });
  }

  // Check authorization and Category existence
  const category = await db.category.findUnique({
    where: {
      id: categoryId,
    },
  });
  if (!category) {
    return ({ message: "That Category does not exist" });
  }
  const member = await db.member.findFirst({
    where: {
      listId: category.listId,
      profileId: profile.id,
    }
  });
  if (!member || member.role !== MemberRole.ADMIN) {
    return ({ message: ERRORS.NOT_ADMIN });
  }

  // Check data validity
  try {
    IdSchema.parse(categoryId);
  } catch (error) {
    return ValidationActionResult(error as ZodError);
  }

  // Perform the action
  try {

    const removed = await db.category.delete({
      where: {
        id: categoryId,
      },
    });

    logger.info({
      context: "removeCategory",
      message: "Category removed successfully",
      categoryId: removed.id,
    });
    return ({ model: removed });

  } catch (error) {

    logger.error({
      context: "removeCategory",
      message: "Failed to remove Category",
      categoryId,
      error
    });
    return ({ message: ERRORS.INTERNAL_SERVER_ERROR });

  }

}

/**
 * Handle request to update a Category.
 */
export async function updateCategory(categoryId: IdSchemaType, data: CategoryUpdateSchemaType): Promise<ActionResult<Category>> {

  // Check authentication
  const profile = await findProfile();
  if (!profile) {
    return ({ message: ERRORS.AUTHENTICATION });
  }

  // Check authorization and Category existence
  const category = await db.category.findUnique({
    where: {
      id: categoryId,
    },
  });
  if (!category) {
    return ({ message: "That Category does not exist" });
  }
  const member = await db.member.findFirst({
    where: {
      listId: category.listId,
      profileId: profile.id,
    }
  });
  if (!member) {
    return ({ message: ERRORS.NOT_MEMBER });
  }

  // Check data validity
  try {
    data = CategoryUpdateSchema.parse(data);
  } catch (error) {
    return ValidationActionResult(error as ZodError);
  }

  // Perform the action
  try {

    const updated = await db.category.update({
      data: {
        ...data,
        id: categoryId, // No cheating allowed
      },
      where: { id: categoryId },
    });

    logger.info({
      context: "updateCategory",
      message: "Category updated successfully",
      categoryId: updated.id,
    });
    return ({ model: updated });

  } catch (error) {

    logger.error({
      context: "updateCategory",
      message: "Failed to update Category",
      categoryId,
      error,
    });
    return ({ message: ERRORS.INTERNAL_SERVER_ERROR });

  }

}
