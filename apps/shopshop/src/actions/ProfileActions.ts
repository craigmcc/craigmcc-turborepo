/**
 * Server actions for Profile models.
 */

// External Modules ----------------------------------------------------------

import { dbShopShop as db, Profile } from "@repo/db-shopshop/dist";
import { serverLogger as logger } from "@repo/shared-utils/ServerLogger";
import { ActionResult, ValidationActionResult, ERRORS } from "@repo/tanstack-form/ActionResult";
import { ZodError } from "zod";

// Internal Modules ----------------------------------------------------------

import { hashPassword } from "@/lib/Encryption";
import { findProfile } from "@/lib/ProfileHelpers";
import { ProfilePlus } from "@/types/Types";
import { IdSchema } from "@/zod-schemas/IdSchema";
import {
  ProfileCreateSchema,
  ProfileCreateSchemaType,
  ProfileUpdateSchema,
  ProfileUpdateSchemaType
} from "@/zod-schemas/ProfileSchema";

// Public Objects ------------------------------------------------------------

/**
 * Handle request to create a Profile.
 */
export async function createProfile(data: ProfileCreateSchemaType): Promise<ActionResult<ProfilePlus>> {

  // Check authentication
  // Not needed - signing up is open to all

  // Check authorization
  // Not needed - signing up is open to all

  // Check data validity
  try {
    ProfileCreateSchema.parse(data);
  } catch (error) {
    const result =  ValidationActionResult<ProfilePlus>(error as ZodError);
    logger.error({
      context: "ProfileActions.createProfile.validation",
      data: {
        ...data,
        password: data.password ? "*REDACTED*" : undefined,
      },
      result,
    });
    return (result);
  }

  // Check for uniqueness constraint violation
  const existing = await db.profile.findUnique({
    where: {
      email: data.email,
    },
  });
  if (existing) {
    logger.error({
      context: "ProfileActions.createProfile.uniqueness",
      email: data.email,
    })
    return ({ message: "That email address is already in use" });
  }

  // Perform the action
  try {

    const created = await db.profile.create({
      data,
    });

    logger.info({
      context: "ProfileActions.createProfile",
      message: "Profile created successfully",
      profileId: created.id,
    });
    return ({ model: created });

  } catch (error) {

    logger.error({
      context: "ProfileActions.createProfile",
      message: "Error creating Profile",
      data: {
        ...data,
        password: "*REDACTED*",
      },
      error,
    });
    return ({ message: ERRORS.INTERNAL_SERVER_ERROR });

  }

}

/**
 * Handle request to remove a Profile.
 */
export async function removeProfile(profileId: string): Promise<ActionResult<Profile>> {

  // Check authentication
  const profile = await findProfile();
  if (!profile) {
    return ({ message: ERRORS.AUTHENTICATION });
  }

  // Check authorization - only the Profile owner can remove it
  try {
    IdSchema.parse(profileId);
  } catch (error) {
    logger.error({
      context: "ListActions.removeProfile.validation",
      profileId,
      error,
    });
    return ValidationActionResult(error as ZodError);
  }

  if (profile.id !== profileId) {
    logger.error({
      context: "ProfileActions.removeProfile.ownership",
      callerId: profile.id,
      removeId: profileId,
    });
    return ({ message: "You can only remove your own Profile" });
  }

  // Perform the action
  try {

    const removed = await db.profile.delete({
      where: { id: profileId },
    });

    logger.trace({
      context: "ProfileActions.removeProfile",
      message: "Profile removed successfully",
      profileId: removed.id,
    });
    return ({ model: removed });

  } catch (error) {

    logger.error({
      context: "ProfileActions.removeProfile",
      message: "Failed to remove Profile",
      profileId,
      error,
    });
    return ({ message: ERRORS.INTERNAL_SERVER_ERROR });

  }

}

/**
 * Handle request to update a Profile.
 */
export async function updateProfile(profileId: string, data: ProfileUpdateSchemaType): Promise<ActionResult<Profile>> {

  // Check authentication
  const profile = await findProfile();
  if (!profile) {
    return ({ message: ERRORS.AUTHENTICATION });
  }

  // Check authorization - only the Profile owner can update it
  if (profile.id !== profileId) {
    return ({ message: "You can only update your own Profile" });
  }

  // Check data validity
  try {
    IdSchema.parse(profileId);
  } catch (error) {
    logger.error({
      context: "ProfileActions.updateList.validation.id",
      profileId,
      error,
    });
    return ValidationActionResult(error as ZodError);
  }
  try {
    ProfileUpdateSchema.parse(data);
  } catch (error) {
    return ValidationActionResult(error as ZodError);
  }

  // Check for uniqueness constraint violation
  if (data.email) {
    const existing = await db.profile.findUnique({
      where: {
        email: data.email,
        NOT: {
          id: profileId,
        }
      },
    });
    if (existing) {
      return ({ message: "That email address is already in use" });
    }
  }

  // Perform the action
  try {

    const updated = await db.profile.update({
      data: {
        name: data.name,
        email: data.email,
        password: data.password ? hashPassword(data.password) : undefined,
      },
      where: { id: profileId },
    });

    logger.trace({
      context: "ProfileActions.updateProfile",
      message: "Profile updated successfully",
      profileId: updated.id,
    });
    return ({ model: updated });

  } catch (error) {

    logger.error({
      context: "ProfileActions.updateProfile",
      message: "Error updating Profile",
      profileId,
      data: {
        ...data,
        password: data.password ? "*REDACTED*" : undefined,
      },
      error,
    });
    return ({ message: ERRORS.INTERNAL_SERVER_ERROR });

  }

}

