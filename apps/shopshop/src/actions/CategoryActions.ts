"use server"

/**
 *  Actions for Category models.
 */

// External Modules ----------------------------------------------------------

import { ActionResult, ValidationActionResult, ERRORS } from "@repo/shadcn-tanstack-form/ActionResult";
import { dbShopShop as db, Category, MemberRole } from "@repo/db-shopshop/dist";
import { serverLogger as logger } from "@repo/shared-utils/ServerLogger";
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
    logger.error({
      context: "CategoryActions.createCategory.authorization",
      message: "Not authorized to create Category for that List",
      profileId: profile.id,
      listId: data.listId,
    });
    return ({ message: ERRORS.NOT_MEMBER });
  }

  // Check data validity
  try {
    CategoryCreateSchema.parse(data);
  } catch (error) {
    const result = ValidationActionResult<Category>(error as ZodError);
    logger.error({
      context: "CategoryActions.createCategory.validation",
      data,
      result,
    })
    return (result);
  }

  // Perform the action
  try {

    logger.trace({
      context: "CategoryActions.createCategory.category",
      message: "Creating Category",
      data,
      profile: {
        ...profile,
        password: "*REDACTED*",
      },
    });
    const created = await db.category.create({
      data,
    });

    logger.trace({
      context: "CategoryActions.createCategory",
      message: "Category created successfully",
      categoryId: created.id,
    });
    return ({ model: created });

  } catch (error) {

    logger.error({
      context: "CategoryActions.createCategory",
      message: "Error creating Category",
      data,
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
    const message = "That Category does not exist";
    logger.error({
      context: "CategoryActions.removeCategory.existence",
      message,
      categoryId,
      profileId: profile.id,
    });
    return ({ message: "That Category does not exist" });
  }
  const member = await db.member.findFirst({
    where: {
      listId: category.listId,
      profileId: profile.id,
    }
  });
  if (!member || member.role !== MemberRole.ADMIN) {
    logger.error({
      context: "CategoryActions.removeCategory.authorization",
      message: "Not authorized to remove that Category",
      categoryId,
      profileId: profile.id,
    });
    return ({ message: ERRORS.NOT_ADMIN });
  }

  // Check data validity
  try {
    IdSchema.parse(categoryId);
  } catch (error) {
    logger.error({
      context: "CategoryActions.removeCategory.validation",
      categoryId,
      error,
    });
    return ValidationActionResult(error as ZodError);
  }

  // Perform the action
  try {

    const removed = await db.category.delete({
      where: { id: categoryId },
    });

    logger.trace({
      context: "CategoryActions.removeCategory",
      message: "Category removed successfully",
      categoryId: removed.id,
    });
    return ({ model: removed });

  } catch (error) {

    logger.error({
      context: "CategoryActions.removeCategory",
      message: "Failed to remove Category",
      categoryId,
      error,
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
    logger.error({
      context: "CategoryActions.updateCategory.existence",
      message: "That Category does not exist",
      categoryId,
      profileId: profile.id,
    });
    return ({ message: "That Category does not exist" });
  }
  const member = await db.member.findFirst({
    where: {
      listId: category.listId,
      profileId: profile.id,
    }
  });
  if (!member) {
    logger.error({
      context: "CategoryActions.updateCategory.membership",
      message: ERRORS.NOT_MEMBER,
      categoryId,
      profileId: profile.id,
    });
    return ({ message: ERRORS.NOT_MEMBER });
  }

  // Check data validity
  try {
    IdSchema.parse(categoryId);
  } catch (error) {
    logger.error({
      context: "CategoryActions.updateCategory.validation.id",
      categoryId,
      error,
    });
    return ValidationActionResult(error as ZodError);
  }
  try {
    CategoryUpdateSchema.parse(data);
  } catch (error) {
    logger.error({
      context: "CategoryActions.updateCategory.validation.data",
      data,
      error,
    });
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

    logger.trace({
      context: "CategoryActions.updateCategory",
      message: "Category updated successfully",
      categoryId: updated.id,
    });
    return ({ model: updated });

  } catch (error) {

    logger.error({
      context: "CategoryActions.updateCategory",
      message: "Failed to update Category",
      categoryId,
      data,
      error,
    });
    return ({ message: ERRORS.INTERNAL_SERVER_ERROR });

  }

}
