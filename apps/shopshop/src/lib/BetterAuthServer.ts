/**
 * Server side configuration for BetterAuth.
 */

// External Modules ----------------------------------------------------------

import { dbBetterAuth } from "@repo/db-betterauth/dist";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

// Internal Modules ----------------------------------------------------------

// Public Objects ------------------------------------------------------------

const auth = betterAuth({
  database: prismaAdapter(dbBetterAuth, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
});

export default auth;
