"use server";

/**
 * Utility methods to interact with AuthJS, and to set up a new Profile.
 */

// External Modules ----------------------------------------------------------

import { dbShopShop as db, Profile } from "@repo/db-shopshop/dist";
import { serverLogger as logger } from "@repo/shared-utils/ServerLogger";
import { ActionResult } from "@repo/tanstack-form/ActionResult";

// Internal Modules ----------------------------------------------------------

import { signIn, signOut } from "@/auth";
import { hashPassword } from "@/lib/Encryption";
import { SignInSchemaType } from "@/zod-schemas/SignInSchema";
import { SignUpSchema, SignUpSchemaType } from "@/zod-schemas/SignUpSchema";

// Public Objects ------------------------------------------------------------

/**
 * Perform the AuthJS sign in action.
 */
export async function doSignInAction(formData: SignInSchemaType): Promise<ActionResult<Profile>> {

  logger.trace({
    context: "doSignInAction.input",
    email: formData.email,
    password: "*REDACTED*",
  });

  try {

    const response = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    logger.trace({
      context: "doSignInAction.output",
      response: response,
    });

    // Return a dummy Profile (app needs to consult the session for the real Profile)
    const profile: Profile = {
      createdAt: new Date(),
      email: formData.email,
      id: "",
      imageUrl: "",
      name: "",
      password: "*REDACTED*",
      updatedAt: new Date(),
    };
    return ({ model: profile });

  } catch (error) {

    // Appropriate logging already happened in the authorize() method
    logger.trace({
      context: "doSignInAction.error",
      error: error,
      message: (error as Error).message,
    });
    return ({ message: (error as Error).message });

  }

}

/**
 * Perform the AuthJS sign out action.
 */
export async function doSignOutAction(): Promise<ActionResult<Profile>> {

  logger.trace({
    context: "doSignOutAction.input",
  });

  try {

    await signOut();
    logger.trace({
      context: "doSignOutAction.output",
    });
    return ({ message: "Success" });

  } catch (error) {

    return ({ message: (error as Error).message });

  }

}

/**
 * Perform the AuthJS sign up action.
 */
export async function doSignUpAction(formData: SignUpSchemaType): Promise<ActionResult<Profile>> {

  logger.trace({
    context: "doSignUpAction.input",
    email: formData.email,
    password: "*REDACTED*",
  });

  // Check authentication - not required for signup

  // Check authorization - not required for signup

  // Check data validity
  try {
    SignUpSchema.parse(formData);
  } catch (error) {
    return ({ message: (error as Error).message });
  }

  // Check uniqueness constraint violation
  const existing = await db.profile.findUnique({
    where: {
      email: formData.email,
    },
  });
  if (existing) {
    return ({ message: "That email address is already in use" });
  }

  // Create and return the new Profile
  try {

    const created = await db.profile.create({
      data: {
        email: formData.email,
        // TODO - imageUrl when supported
        name: formData.name,
        password: hashPassword(formData.password),
      }
    });

    logger.trace({
      context: "doSignUpAction.output",
      profile: {
        ...created,
        password: "*REDACTED*",
      },
    });

    // Return a dummy Profile (app needs to consult the session for the real Profile)
    const profile: Profile = {
      createdAt: new Date(),
      email: formData.email,
      id: "",
      imageUrl: "",
      name: formData.name,
      password: "*REDACTED*",
      updatedAt: new Date(),
    };
    return ({ model: profile });

  } catch (error) {

    logger.trace({
      context: "doSignUpAction.error",
      error: error,
      message: (error as Error).message,
    });
    return ({ message: (error as Error).message });

  }

}
