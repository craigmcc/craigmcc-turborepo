/**
 * Look up the current session, if any, including headers.
 * This is for use in Server Actions, so that they have access to headers.
 */

// External Modules ----------------------------------------------------------

import { Session } from "@repo/db-betterauth/dist";
import { headers } from "next/headers";

// Internal Modules ----------------------------------------------------------

import auth from "@/lib/BetterAuthServer";

// Public Objects ------------------------------------------------------------

// TODO - need to customize returned object(s) to include Profile.
export async function findSession(): Promise<Session | null> {
  const response  = await auth.api.getSession({
    headers: await headers(),
  });
  if (!response || !response.session) {
    return null;
  } else {
    return {
      id: response.session.id,
      createdAt: response.session.createdAt,
      expiresAt: response.session.expiresAt,
      ipAddress: response.session.ipAddress || null,
      token: response.session.token,
      updatedAt: response.session.updatedAt,
      userAgent: response.session.userAgent || null,
      userId: response.session.userId,
    };
  }
}
