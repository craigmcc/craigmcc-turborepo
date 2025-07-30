// NOTE: *Not* a "use server" file to prevent methods from being server actions

/**
 * Helper functions for Profile models, NOT exposed as server actions.
 */

// External Modules ----------------------------------------------------------

import { Profile } from "@repo/db-shopshop/dist";
//import { serverLogger as logger } from "@repo/shared-utils/ServerLogger";

// Internal Modules ----------------------------------------------------------

import { type Session } from "@/lib/BetterAuthServer";
import { findSession } from "@/lib/SessionHelpers";

const isTest = process.env.NODE_ENV === "test";
let testProfile: Profile | null = null;

// Public Objects ------------------------------------------------------------

/**
 * TEST MODE: Returns the Profile (if any) recorded by a test.
 *
 * PRODUCTION MODE: If a user is currently signed in, look up and return the
 * Profile associated with that user's email address.  Otherwise, return null.
 */
export async function findProfile(): Promise<Profile | null> {

  // TEST MODE: Return the test Profile (if any)
  if (isTest) {
    if (testProfile) {
      return {
        ...testProfile,
        password: "*REDACTED*",
      }
    } else {
      return testProfile;
    }
  }

  // PRODUCTION MODE: Return the Profile associated with the current session (if any)
  const session: Session | null = await findSession();
  return session?.profile || null;

}

/**
 * TEST MODE ONLY: Set the Profile to be returned by findProfile().
 */
export function setTestProfile(profile: Profile | null): void {
  if (isTest) {
    testProfile = profile;
  } else {
    throw new Error("Cannot call setTestProfile() outside of test mode");
  }
}
