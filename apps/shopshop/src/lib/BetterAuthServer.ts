/**
 * Server side configuration for BetterAuth.
 */

// External Modules ----------------------------------------------------------

import { dbBetterAuth } from "@repo/db-betterauth/dist";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";

// Internal Modules ----------------------------------------------------------

// Public Objects ------------------------------------------------------------

const auth = betterAuth({
  database: prismaAdapter(dbBetterAuth, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    nextCookies(), // Recognizes when a server action creates/updates a cookie.
  ],
});

export default auth;
